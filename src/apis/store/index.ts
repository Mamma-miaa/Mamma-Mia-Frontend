import { supabase } from "@/lib/supabase"
import type { components, paths } from "../schema"

const PAGE_SIZE_DEFAULT = 10
const rpc = (name: string, args: Record<string, unknown>) =>
  (supabase as { rpc: (n: string, a: Record<string, unknown>) => ReturnType<typeof supabase.rpc> }).rpc(name, args)
const fromView = (table: string) =>
  (supabase as { from: (t: string) => ReturnType<typeof supabase.from> }).from(table)

export const getNearbyStore = async (
  params: components["schemas"]["GetNearByStoreRequest"]
): Promise<components["schemas"]["GetNearByStoreResponses"]> => {
  const pageSize = Math.min(Math.max(params.size ?? PAGE_SIZE_DEFAULT, 1), 50)
  const { data, error } = await rpc("get_nearby_stores", {
    p_user_lat: params.userLatitude,
    p_user_long: params.userLongitude,
    p_min_lat: params.minLatitude,
    p_max_lat: params.maxLatitude,
    p_min_long: params.minLongitude,
    p_max_long: params.maxLongitude,
    p_page_size: pageSize,
    p_last_store_id: params.lastStoreId ?? null,
    p_last_distance: params.lastDistance ?? null,
    p_status: params.status ?? "NORMAL",
    p_is_new: params.isNew ?? null,
    p_min_price: params.minPrice ?? null,
    p_max_price: params.maxPrice ?? null,
    p_categories: params.category?.length ? params.category : null,
  })

  if (error) {
    console.error("Error fetching nearby stores:", error)
    throw new Error(error.message)
  }

  const rows = (data || []) as Array<{
    id: number
    name: string
    address: string
    category: string
    image_url: string | null
    distance_meters: number
    latitude: number
    longitude: number
    parking: boolean
    takeout: boolean
    delivery: boolean
    total_like: number
    is_new: boolean
    status: string
  }>

  const hasNext = rows.length > pageSize
  const slice = hasNext ? rows.slice(0, pageSize) : rows
  const storeIds = slice.map((r) => r.id)

  let rankMap: Record<number, { WEEKLY?: number; MONTHLY?: number }> = {}
  if (storeIds.length > 0) {
    const { data: ranks } = await rpc("get_unified_ranks", {
      p_store_ids: storeIds,
    })
    const list = (ranks || []) as Array<{ store_id: number; weekly_rank: number | null; monthly_rank: number | null }>
    list.forEach((r) => {
      rankMap[r.store_id] = {}
      if (r.weekly_rank != null) rankMap[r.store_id].WEEKLY = r.weekly_rank
      if (r.monthly_rank != null) rankMap[r.store_id].MONTHLY = r.monthly_rank
    })
  }

  const items = slice.map((store) => ({
    storeId: store.id,
    name: store.name,
    address: store.address,
    category: store.category,
    latitude: store.latitude,
    longitude: store.longitude,
    distanceMeters: store.distance_meters ?? 0,
    totalLike: Number(store.total_like ?? 0),
    parking: store.parking,
    takeout: store.takeout,
    delivery: store.delivery,
    imageUrl: store.image_url ?? undefined,
    ranks: rankMap[store.id] ?? {},
    isOpen: true,
    isNew: store.is_new,
  }))

  const { data: totalCountData } = await rpc("get_nearby_stores_count", {
    p_min_lat: params.minLatitude,
    p_max_lat: params.maxLatitude,
    p_min_long: params.minLongitude,
    p_max_long: params.maxLongitude,
    p_status: params.status ?? "NORMAL",
    p_is_new: params.isNew ?? null,
    p_min_price: params.minPrice ?? null,
    p_max_price: params.maxPrice ?? null,
    p_categories: params.category?.length ? params.category : null,
  })
  const totalCount = Number(totalCountData ?? 0)

  const last = slice[slice.length - 1]
  return {
    items,
    totalCount,
    hasNext,
    cursorId: last ? last.id : 0,
    lastDistance: last ? last.distance_meters : 0,
  }
}

type StoreDetailRow = {
  id: number
  name: string
  status: string | null
  category: string
  address: string
  latitude: number
  longitude: number
  image_url: string | null
  price_range: string | null
  business_hours: Array<{
    day_of_week: string
    open_time: string | null
    close_time: string | null
    break_start: string | null
    break_end: string | null
    last_order: string | null
    is_closed: boolean | null
  }>
  facilities: {
    parking: boolean | null
    takeout: boolean | null
    delivery: boolean | null
    indoor_restroom: boolean | null
    outdoor_restroom: boolean | null
    group_seating: boolean | null
  } | null
  menus: Array<{ name: string; price: number; image_url: string | null }>
}

export const getStoreDetail = async (
  storeId: number
): Promise<components["schemas"]["GetStoreDetailResponse"]> => {
  const [{ data: storeData, error }, totalRes, weeklyRes, monthlyRes] = await Promise.all([
    fromView("store_details_view")
      .select(
        `
      *,
      menus (*),
      business_hours (*),
      facilities (*)
    `
      )
      .eq("id", storeId)
      .single(),
    supabase.from("store_likes").select("id", { count: "exact", head: true }).eq("store_id", storeId),
    supabase
      .from("store_likes")
      .select("id", { count: "exact", head: true })
      .eq("store_id", storeId)
      .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
    supabase
      .from("store_likes")
      .select("id", { count: "exact", head: true })
      .eq("store_id", storeId)
      .gte("created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
  ])

  if (error) throw new Error(error.message)
  const store = storeData as unknown as StoreDetailRow | null
  if (!store) throw new Error("Store not found")

  const total = totalRes.count ?? 0
  const weekly = weeklyRes.count ?? 0
  const monthly = monthlyRes.count ?? 0

  const rankRows = await rpc("get_unified_ranks", { p_store_ids: [storeId] })
  const rankList = (rankRows.data || []) as Array<{ store_id: number; weekly_rank: number | null; monthly_rank: number | null }>
  const first = rankList[0]
  const ranks: Record<string, number> = {}
  if (first) {
    if (first.weekly_rank != null) ranks.WEEKLY = first.weekly_rank
    if (first.monthly_rank != null) ranks.MONTHLY = first.monthly_rank
  }

  return {
    storeId: store.id,
    status: store.status || "NORMAL",
    name: store.name,
    comment: "",
    category: store.category,
    address: store.address,
    latitude: store.latitude,
    longitude: store.longitude,
    images: store.image_url ? [store.image_url] : [],
    businessHours: (store.business_hours || []).map((h) => ({
      dayOfWeek: h.day_of_week as "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY",
      openTime: h.open_time ?? undefined,
      closeTime: h.close_time ?? undefined,
      breakStart: h.break_start ?? undefined,
      breakEnd: h.break_end ?? undefined,
      lastOrder: h.last_order ?? undefined,
      isClosed: h.is_closed || false,
    })),
    facilities: store.facilities
      ? {
          parking: store.facilities.parking || false,
          takeout: store.facilities.takeout || false,
          delivery: store.facilities.delivery || false,
          indoorRestroom: store.facilities.indoor_restroom || false,
          outdoorRestroom: store.facilities.outdoor_restroom || false,
          groupSeating: store.facilities.group_seating || false,
        }
      : {
          parking: false,
          takeout: false,
          delivery: false,
          indoorRestroom: false,
          outdoorRestroom: false,
          groupSeating: false,
        },
    priceRange: (store.price_range as "WON_1" | "WON_2" | "WON_3") || "WON_1",
    likes: { total, weekly, monthly },
    menus: (store.menus || []).map((m) => ({
      name: m.name,
      price: m.price,
      imageUrl: m.image_url || "",
    })),
    ranks,
  }
}

type GetRankingParams = Omit<
  components["schemas"]["GetStoreRankingRequest"],
  "status" | "type"
> & { status: "NORMAL" | "CHALLENGE"; type: "WEEKLY" | "MONTHLY" }

export const getRanking = async (
  params: GetRankingParams
): Promise<components["schemas"]["GetStoreRankingResponses"]> => {
  const { data, error } = await rpc("get_store_ranking", {
    p_status: params.status,
    p_type: params.type,
  })

  if (error) throw new Error(error.message)

  const rows = (data || []) as Array<{
    rank: number
    store_id: number
    name: string
    category: string
    likes: number
    main_image: string | null
  }>
  return {
    stores: rows.map((r) => ({
      rank: r.rank,
      storeId: r.store_id,
      name: r.name,
      category: r.category,
      likes: Number(r.likes ?? 0),
      mainImage: r.main_image ?? "",
    })),
  }
}

export const getSearchedStores = async (
  params: components["schemas"]["GetSearchResultRequest"]
): Promise<components["schemas"]["GetSearchResultResponse"]> => {
  const { keyword, storeStatus } = params
  if (!keyword?.trim()) {
    return { stores: [] }
  }

  const k = `%${keyword.trim()}%`
  const storeStatusFilter = storeStatus && storeStatus !== "" ? storeStatus.toUpperCase() : null

  const [nameRes, categoryRes, menuRes] = await Promise.all([
    supabase.from("stores").select("id").ilike("name", k),
    supabase.from("stores").select("id").ilike("category", k),
    supabase.from("menus").select("store_id").ilike("name", k),
  ])

  const idSet = new Set<number>()
  ;(nameRes.data || []).forEach((r: { id: number }) => idSet.add(r.id))
  ;(categoryRes.data || []).forEach((r: { id: number }) => idSet.add(r.id))
  ;(menuRes.data || []).forEach((r: { store_id: number }) => idSet.add(r.store_id))
  const storeIds = Array.from(idSet)

  if (storeIds.length === 0) return { stores: [] }

  let query = fromView("store_details_view")
    .select("id, name, category, image_url")
    .in("id", storeIds)
  if (storeStatusFilter) {
    query = query.eq("status", storeStatusFilter)
  }
  const { data: storesData, error } = await query

  if (error) throw new Error(error.message)
  const stores = (storesData || []) as unknown as Array<{ id: number; name: string; category: string; image_url: string | null }>

  let rankMap: Record<number, { WEEKLY?: number; MONTHLY?: number }> = {}
  if (stores.length > 0) {
    const { data: ranks } = await rpc("get_unified_ranks", {
      p_store_ids: stores.map((s) => s.id),
    })
    const list = (ranks || []) as Array<{ store_id: number; weekly_rank: number | null; monthly_rank: number | null }>
    list.forEach((r) => {
      rankMap[r.store_id] = {}
      if (r.weekly_rank != null) rankMap[r.store_id].WEEKLY = r.weekly_rank
      if (r.monthly_rank != null) rankMap[r.store_id].MONTHLY = r.monthly_rank
    })
  }

  return {
    stores: stores.map((s) => ({
      storeId: s.id,
      name: s.name,
      category: s.category,
      imageUrl: s.image_url ?? undefined,
      distanceToStationMeters: 0,
      ranks: rankMap[s.id] ?? {},
    })),
  }
}

export const getMammaMia = async (
  params: paths["/api/v1/store/like"]["get"]["parameters"]["query"]["request"]
): Promise<components["schemas"]["GetStoreLikeResponse"]> => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { isLike: false }

  const { data, error } = await supabase
    .from("store_likes")
    .select("*")
    .eq("store_id", params.storeId)
    .eq("user_id", user.id)
    .single()

  if (error && error.code !== 'PGRST116') throw new Error(error.message) // PGRST116 is no rows found

  return { isLike: !!data }
}

export const postMammaMia = async (
  data: paths["/api/v1/store/like"]["post"]["requestBody"]["content"]["application/json"]
): Promise<components["schemas"]["ApplyStoreLikeRequest"]> => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Login required")

  // Toggle like
  const { data: existing } = await supabase
    .from("store_likes")
    .select("id")
    .eq("store_id", data.storeId)
    .eq("user_id", user.id)
    .single()

  if (existing) {
    await supabase.from("store_likes").delete().eq("id", existing.id)
  } else {
    await supabase.from("store_likes").insert({
      store_id: data.storeId,
      user_id: user.id
    })
  }

  return { storeId: data.storeId }
}

export const getBookmark = async (
  params: paths["/api/v1/store/like"]["get"]["parameters"]["query"]["request"]
): Promise<components["schemas"]["GetStoreBookmarkResponse"]> => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { isBookmark: false }

  const { data, error } = await supabase
    .from("store_bookmarks")
    .select("*")
    .eq("store_id", params.storeId)
    .eq("user_id", user.id)
    .single()

  if (error && error.code !== 'PGRST116') throw new Error(error.message)

  return { isBookmark: !!data }
}

export const postBookmark = async (
  params: paths["/api/v1/store/like"]["get"]["parameters"]["query"]["request"]
): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Login required")

  await supabase.from("store_bookmarks").insert({
    store_id: params.storeId,
    user_id: user.id
  })
}

export const deleteBookmark = async (
  params: paths["/api/v1/store/like"]["get"]["parameters"]["query"]["request"]
): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Login required")

  await supabase.from("store_bookmarks").delete().match({
    store_id: params.storeId,
    user_id: user.id
  })
}

export const getDistanceToStore = async (params: {
  storeId: number
  latitude: number
  longitude: number
}): Promise<components["schemas"]["GetDistanceToStoreResponse"]> => {
  const { data, error } = await rpc("get_store_distance", {
    store_id: params.storeId,
    user_lat: params.latitude,
    user_long: params.longitude,
  })

  if (error) throw new Error(error.message)

  return { distance: Number(data ?? 0) }
}

// Challenge API는 별도 구현 필요 (이미지 업로드 등)
export const postChallengeApplication = async (
  _data: FormData
): Promise<void> => {
  // TODO: Supabase Storage + DB Insert
  throw new Error("Not implemented yet")
}

export const getChallengeStoreDetail = async (
  reviewStoreId: number
): Promise<
  components["schemas"]["GetUnderReviewChallengeStoreDetailResponse"]
> => {
  type ChallengeApp = {
    id: number
    store_id: number | null
    applicant_id: string | null
    comment: string | null
    status: string | null
  }
  let app: ChallengeApp | null = null
  const byId = await supabase
    .from("challenge_applications")
    .select("id, store_id, applicant_id, comment, status")
    .eq("id", reviewStoreId)
    .single()
  if (byId.data) {
    app = byId.data as ChallengeApp
  } else {
    const byStoreId = await supabase
      .from("challenge_applications")
      .select("id, store_id, applicant_id, comment, status")
      .eq("store_id", reviewStoreId)
      .limit(1)
      .single()
    if (byStoreId.data) app = byStoreId.data as ChallengeApp
  }
  if (!app) throw new Error("Store not found")
  const storeId = app.store_id ?? reviewStoreId

  const { data: storeData, error } = await fromView("store_details_view")
    .select(
      `
      *,
      menus (*),
      business_hours (*),
      facilities (*)
    `
    )
    .eq("id", storeId)
    .single()

  if (error || !storeData) throw new Error("Store not found")
  const store = storeData as unknown as StoreDetailRow

  let commentAuthor: { nickname: string; profileImage?: string } | undefined
  if (app.applicant_id) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("nickname, profile_image")
      .eq("id", app.applicant_id)
      .single()
    if (profile) {
      commentAuthor = { nickname: profile.nickname ?? "", profileImage: profile.profile_image ?? undefined }
    }
  }

  return {
    reviewStoreId: app.id,
    reviewStatus: app.status ?? "PENDING",
    name: store.name,
    comment: app.comment ?? "",
    commentAuthor: commentAuthor ?? undefined,
    category: store.category,
    address: store.address,
    latitude: store.latitude,
    longitude: store.longitude,
    images: store.image_url ? [store.image_url] : [],
    businessHours: (store.business_hours || []).map((h) => ({
      dayOfWeek: h.day_of_week as "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY",
      openTime: h.open_time ?? undefined,
      closeTime: h.close_time ?? undefined,
      breakStart: h.break_start ?? undefined,
      breakEnd: h.break_end ?? undefined,
      lastOrder: h.last_order ?? undefined,
      isClosed: h.is_closed ?? false,
    })),
    facilities: store.facilities
      ? {
          parking: store.facilities.parking ?? false,
          takeout: store.facilities.takeout ?? false,
          delivery: store.facilities.delivery ?? false,
          indoorRestroom: store.facilities.indoor_restroom ?? false,
          outdoorRestroom: store.facilities.outdoor_restroom ?? false,
          groupSeating: store.facilities.group_seating ?? false,
        }
      : {
          parking: false,
          takeout: false,
          delivery: false,
          indoorRestroom: false,
          outdoorRestroom: false,
          groupSeating: false,
        },
    station: undefined,
    menus: (store.menus || []).map((m) => ({
      name: m.name,
      price: m.price,
      imageUrl: m.image_url ?? "",
    })),
  }
}
