import { api } from "../instance"
import type { components, paths } from "../schema"

export const getNearbyStore = async (
  params: components["schemas"]["GetNearByStoreRequest"]
): Promise<components["schemas"]["GetNearByStoreResponses"]> => {
  return await api.get(`/store/nearby`, {
    params: { ...params, category: params.category?.join(",") },
  })
}

export const getStoreDetail = async (
  storeId: number
): Promise<components["schemas"]["GetStoreDetailResponse"]> => {
  return await api.get(`/store/detail/${storeId}`)
}

type GetRankingParams = Omit<
  components["schemas"]["GetStoreRankingRequest"],
  "status" | "type"
> & { status: "NORMAL" | "CHALLENGE"; type: "WEEKLY" | "MONTHLY" }

export const getRanking = async (
  params: GetRankingParams
): Promise<components["schemas"]["GetStoreRankingResponses"]> => {
  return await api.get("/store/rankings", { params })
}

export const getSearchedStores = async (
  params: components["schemas"]["GetSearchResultRequest"]
): Promise<components["schemas"]["GetSearchResultResponse"]> => {
  return await api.get("/store/search", { params })
}

export const getMammaMia = async (
  params: paths["/api/v1/store/like"]["get"]["parameters"]["query"]["request"]
): Promise<components["schemas"]["GetStoreLikeResponse"]> => {
  return await api.get("/store/like", { params })
}

export const postMammaMia = async (
  data: paths["/api/v1/store/like"]["post"]["requestBody"]["content"]["application/json"]
): Promise<components["schemas"]["ApplyStoreLikeRequest"]> => {
  return await api.post("/store/like", data)
}

export const getBookmark = async (
  params: paths["/api/v1/store/like"]["get"]["parameters"]["query"]["request"]
): Promise<components["schemas"]["GetStoreBookmarkResponse"]> => {
  return await api.get(`/store/${params.storeId}/bookmark`)
}

export const postBookmark = async (
  params: paths["/api/v1/store/like"]["get"]["parameters"]["query"]["request"]
): Promise<void> => {
  return await api.post(`/store/${params.storeId}/bookmark`)
}

export const deleteBookmark = async (
  params: paths["/api/v1/store/like"]["get"]["parameters"]["query"]["request"]
): Promise<void> => {
  return await api.delete(`/store/${params.storeId}/bookmark`)
}

export const postChallengeApplication = async (
  data: FormData
): Promise<void> => {
  return await api.post("/store/challenge-application", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}

export const getChallengeStoreDetail = async (
  storeId: number
): Promise<
  components["schemas"]["GetUnderReviewChallengeStoreDetailResponse"]
> => {
  return await api.get(`/store/pending/${storeId}`)
}

export const getDistanceToStore = async (params: {
  storeId: number
  latitude: number
  longitude: number
}): Promise<components["schemas"]["GetDistanceToStoreResponse"]> => {
  return await api.get(`/store/detail/${params.storeId}/distance`, {
    params: {
      latitude: params.latitude,
      longitude: params.longitude,
    },
  })
}
