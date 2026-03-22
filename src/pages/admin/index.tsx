import { css } from "@emotion/react"
import type { components } from "@/apis/schema"
import { getStoreDetail } from "@/apis/store"
import VIEWPORT from "@/constants/viewport"
import THEME from "@/constants/theme"
import TYPOGRAPHY from "@/constants/typography"
import {
  useGetAdminStoreListQuery,
  usePatchAdminStoreMutation,
  usePostAdminStoreMutation,
} from "@/hooks/@server/admin"
import { useQueryClient } from "@tanstack/react-query"
import { useLayoutEffect, useMemo, useState } from "react"
import StoreListPanel from "./_components/StoreListPanel"
import StoreForm from "./_components/StoreForm"
import {
  DAY_ORDER,
  type BasicFormState,
  type BusinessHourState,
  type FacilitiesState,
  type MenuState,
} from "./_components/types"

const createMenuId = () => `${Date.now()}-${Math.random()}`

const buildInitialBasicFormState = (): BasicFormState => ({
  storeId: "",
  name: "",
  status: "NORMAL",
  category: "",
  stationName: "",
  address: "",
  latitude: "",
  longitude: "",
  comment: "",
})

const buildInitialBusinessHours = (): BusinessHourState[] =>
  DAY_ORDER.map(({ code }) => ({
    dayOfWeek: code,
    openTime: "",
    closeTime: "",
    breakStart: "",
    breakEnd: "",
    lastOrder: "",
    closed: false,
  }))

const buildInitialFacilities = (): FacilitiesState => ({
  parking: false,
  takeout: false,
  delivery: false,
  indoorRestroom: false,
  outdoorRestroom: false,
  groupSeating: false,
})

const buildInitialMenus = (): MenuState[] => [
  { id: createMenuId(), name: "", price: "", imageUrl: "", imageFile: null },
]

function AdminPage() {
  const queryClient = useQueryClient()

  const [keywordInput, setKeywordInput] = useState("")
  const [sizeInput, setSizeInput] = useState("20")
  const [listKeyword, setListKeyword] = useState("")
  const [listSize, setListSize] = useState(20)
  const [basicFormState, setBasicFormState] = useState<BasicFormState>(
    buildInitialBasicFormState
  )
  const [storeImageUrls, setStoreImageUrls] = useState<string[]>([""])
  const [storeImageFiles, setStoreImageFiles] = useState<File[]>([])
  const [businessHours, setBusinessHours] = useState<BusinessHourState[]>(
    buildInitialBusinessHours
  )
  const [facilities, setFacilities] = useState<FacilitiesState>(
    buildInitialFacilities
  )
  const [menus, setMenus] = useState<MenuState[]>(buildInitialMenus)

  const {
    data: adminStoreListData,
    isFetching: isAdminStoreListFetching,
    refetch: refetchAdminStoreList,
  } = useGetAdminStoreListQuery({
    keyword: listKeyword || undefined,
    size: listSize || undefined,
  })

  const { mutate: postAdminStore, isPending: isPostAdminStorePending } =
    usePostAdminStoreMutation()
  const { mutate: patchAdminStore, isPending: isPatchAdminStorePending } =
    usePatchAdminStoreMutation()
  const isSaving = isPostAdminStorePending || isPatchAdminStorePending

  const { requestData, menuImageFiles } = useMemo(() => {
    const filteredStoreImageUrls = storeImageUrls
      .map((url) => url.trim())
      .filter(Boolean)

    const menuFiles: File[] = []
    const requestMenus: components["schemas"]["AdminStoreMenu"][] = menus
      .map((menu) => {
        const name = menu.name.trim()
        if (!name) return null

        let imageUploadIndex = -1
        if (menu.imageFile) {
          imageUploadIndex = menuFiles.length
          menuFiles.push(menu.imageFile)
        }

        return {
          name,
          price: Number(menu.price) || 0,
          imageUrl: menu.imageUrl.trim(),
          imageUploadIndex,
        }
      })
      .filter((menu): menu is components["schemas"]["AdminStoreMenu"] =>
        Boolean(menu)
      )

    const request: components["schemas"]["AdminUpsertStoreRequest"] = {
      storeId: Number(basicFormState.storeId) || 0,
      name: basicFormState.name.trim(),
      comment: basicFormState.comment.trim(),
      category: basicFormState.category.trim(),
      stationName: basicFormState.stationName.trim(),
      address: basicFormState.address.trim(),
      latitude: Number(basicFormState.latitude) || 0,
      longitude: Number(basicFormState.longitude) || 0,
      status: basicFormState.status,
      storeImageUrls: filteredStoreImageUrls,
      businessHours: businessHours.map((hour) => ({
        dayOfWeek: hour.dayOfWeek,
        openTime: hour.openTime,
        closeTime: hour.closeTime,
        breakStart: hour.breakStart,
        breakEnd: hour.breakEnd,
        lastOrder: hour.lastOrder,
        closed: hour.closed,
      })),
      facilities,
      menus: requestMenus,
    }

    return { requestData: request, menuImageFiles: menuFiles }
  }, [basicFormState, businessHours, facilities, menus, storeImageUrls])

  const handleBasicChange = (field: keyof BasicFormState, value: string) => {
    setBasicFormState((prev) => ({ ...prev, [field]: value }))
  }

  const handleBusinessHourChange = (
    index: number,
    field: keyof BusinessHourState,
    value: string | boolean
  ) => {
    setBusinessHours((prev) =>
      prev.map((hour, currentIndex) =>
        currentIndex === index ? { ...hour, [field]: value } : hour
      )
    )
  }

  const handleFacilityChange = (
    field: keyof FacilitiesState,
    value: boolean
  ) => {
    setFacilities((prev) => ({ ...prev, [field]: value }))
  }

  const handleMenuChange = (
    id: string,
    field: keyof MenuState,
    value: string | File | null
  ) => {
    setMenus((prev) =>
      prev.map((menu) => {
        if (menu.id !== id) return menu
        if (field === "imageFile") {
          return { ...menu, imageFile: value as File | null }
        }
        return { ...menu, [field]: value as string }
      })
    )
  }

  const resetForm = () => {
    setBasicFormState(buildInitialBasicFormState())
    setStoreImageUrls([""])
    setStoreImageFiles([])
    setBusinessHours(buildInitialBusinessHours())
    setFacilities(buildInitialFacilities())
    setMenus(buildInitialMenus())
  }

  const handleAddMenu = () => {
    setMenus((prev) => [
      ...prev,
      {
        id: createMenuId(),
        name: "",
        price: "",
        imageUrl: "",
        imageFile: null,
      },
    ])
  }

  const handleStoreImageUrlChange = (index: number, nextValue: string) => {
    setStoreImageUrls((prev) =>
      prev.map((url, currentIndex) =>
        currentIndex === index ? nextValue : url
      )
    )
  }

  const handleAddStoreImageUrl = () => {
    setStoreImageUrls((prev) => [...prev, ""])
  }

  const handleLoadStoreList = async () => {
    const nextKeyword = keywordInput.trim()
    const parsedSize = Number(sizeInput)
    const nextSize =
      Number.isFinite(parsedSize) && parsedSize > 0 ? parsedSize : 20

    setListKeyword(nextKeyword)
    setListSize(nextSize)
    await refetchAdminStoreList()
  }

  const fillFormByStoreDetail = (
    storeDetail: components["schemas"]["GetStoreDetailResponse"]
  ) => {
    setBasicFormState({
      storeId: String(storeDetail.storeId),
      name: storeDetail.name || "",
      status: storeDetail.status === "CHALLENGE" ? "CHALLENGE" : "NORMAL",
      category: storeDetail.category || "",
      stationName: storeDetail.station?.name || "",
      address: storeDetail.address || "",
      latitude:
        typeof storeDetail.latitude === "number"
          ? String(storeDetail.latitude)
          : "",
      longitude:
        typeof storeDetail.longitude === "number"
          ? String(storeDetail.longitude)
          : "",
      comment: storeDetail.comment || "",
    })

    setFacilities({
      parking: Boolean(storeDetail.facilities?.parking),
      takeout: Boolean(storeDetail.facilities?.takeout),
      delivery: Boolean(storeDetail.facilities?.delivery),
      indoorRestroom: Boolean(storeDetail.facilities?.indoorRestroom),
      outdoorRestroom: Boolean(storeDetail.facilities?.outdoorRestroom),
      groupSeating: Boolean(storeDetail.facilities?.groupSeating),
    })

    setStoreImageUrls(
      storeDetail.images && storeDetail.images.length > 0
        ? storeDetail.images
        : [""]
    )
    setStoreImageFiles([])

    setBusinessHours(
      DAY_ORDER.map(({ code }) => {
        const matchedHour = storeDetail.businessHours?.find(
          (hour) => hour.dayOfWeek === code
        )
        return {
          dayOfWeek: code,
          openTime: matchedHour?.openTime || "",
          closeTime: matchedHour?.closeTime || "",
          breakStart: matchedHour?.breakStart || "",
          breakEnd: matchedHour?.breakEnd || "",
          lastOrder: matchedHour?.lastOrder || "",
          closed: Boolean(matchedHour?.isClosed),
        }
      })
    )

    setMenus(
      storeDetail.menus && storeDetail.menus.length > 0
        ? storeDetail.menus.map((menu) => ({
            id: createMenuId(),
            name: menu.name || "",
            price: String(menu.price || ""),
            imageUrl: menu.imageUrl || "",
            imageFile: null,
          }))
        : buildInitialMenus()
    )
  }

  const handleLoadStoreById = async () => {
    const storeId = Number(basicFormState.storeId)
    if (!storeId) {
      return
    }
    try {
      const storeDetail = await getStoreDetail(storeId)
      fillFormByStoreDetail(storeDetail)
    } catch {
      /* noop */
    }
  }

  const handleStoreRowLoad = async (storeId: number) => {
    setBasicFormState((prev) => ({ ...prev, storeId: String(storeId) }))
    try {
      const storeDetail = await getStoreDetail(storeId)
      fillFormByStoreDetail(storeDetail)
    } catch {
      /* noop */
    }
  }

  const handleSave = () => {
    const payload = {
      request: requestData,
      storeImages: storeImageFiles,
      menuImages: menuImageFiles,
    }

    const onSuccess = (
      response: components["schemas"]["AdminUpsertStoreResponse"]
    ) => {
      if (!basicFormState.storeId && response.storeId) {
        setBasicFormState((prev) => ({
          ...prev,
          storeId: String(response.storeId),
        }))
      }
      queryClient.invalidateQueries({ queryKey: ["getAdminStoreList"] })
    }

    if (basicFormState.storeId) {
      patchAdminStore(
        { storeId: Number(basicFormState.storeId), ...payload },
        { onSuccess }
      )
      return
    }

    postAdminStore(payload, { onSuccess })
  }

  useLayoutEffect(() => {
    document.documentElement.style.setProperty("max-width", "100vw")
    document.body.style.setProperty("max-width", "100vw")
    return () => {
      document.documentElement.style.setProperty(
        "max-width",
        `${VIEWPORT.MAX_WIDTH}px`
      )
      document.body.style.setProperty("max-width", `${VIEWPORT.MAX_WIDTH}px`)
    }
  }, [])

  return (
    <div css={pageStyle}>
      <header css={headerStyle}>
        <h1 css={titleStyle}>Store Admin Console</h1>
        <p css={subtitleStyle}>운영 데이터 직접 수정용 임시 화면</p>
      </header>

      <div css={layoutStyle}>
        <StoreListPanel
          keyword={keywordInput}
          size={sizeInput}
          storeIdInput={basicFormState.storeId}
          selectedStoreId={
            basicFormState.storeId.trim() === "" ||
            Number.isNaN(Number(basicFormState.storeId))
              ? null
              : Number(basicFormState.storeId)
          }
          isLoading={isAdminStoreListFetching}
          stores={adminStoreListData?.stores}
          onKeywordChange={setKeywordInput}
          onSizeChange={setSizeInput}
          onStoreIdChange={(value) => handleBasicChange("storeId", value)}
          onLoadList={handleLoadStoreList}
          onLoadStore={handleLoadStoreById}
          onSelectStore={(storeId) => void handleStoreRowLoad(storeId)}
        />

        <main css={rightPanelStyle}>
          <StoreForm
            basicFormState={basicFormState}
            storeImageUrls={storeImageUrls}
            businessHours={businessHours}
            facilities={facilities}
            menus={menus}
            storeImageFiles={storeImageFiles}
            isSaving={isSaving}
            onBasicChange={handleBasicChange}
            onStoreImageUrlChange={handleStoreImageUrlChange}
            onAddStoreImageUrl={handleAddStoreImageUrl}
            onStoreImageFilesChange={setStoreImageFiles}
            onBusinessHourChange={handleBusinessHourChange}
            onFacilityChange={handleFacilityChange}
            onMenuChange={handleMenuChange}
            onAddMenu={handleAddMenu}
            onSave={handleSave}
            onReset={resetForm}
          />
        </main>
      </div>
    </div>
  )
}

const pageStyle = css({
  minHeight: "100vh",
  backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
  padding: "20px 16px 40px",
})

const headerStyle = css({
  padding: "20px 0 12px",
  textAlign: "center",
})

const titleStyle = css({
  ...TYPOGRAPHY.HEADERS["22B"],
  margin: 0,
  color: THEME.COLORS.GRAYSCALE.NORMAL,
})

const subtitleStyle = css({
  ...TYPOGRAPHY.BODY["14R"],
  color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
  margin: "6px 0 0",
})

const layoutStyle = css({
  display: "grid",
  gridTemplateColumns: "0.3fr 0.7fr",
  gap: 16,
  alignItems: "flex-start",
  "@media (max-width: 1024px)": {
    gridTemplateColumns: "1fr",
  },
})

const rightPanelStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 16,
})

export default AdminPage
