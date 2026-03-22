import { api } from "@/apis/instance"
import type { components, paths } from "@/apis/schema"

type AdminStoreListParams =
  paths["/api/v1/admin/store/list"]["get"]["parameters"]["query"]

type AdminStoreRequest = components["schemas"]["AdminUpsertStoreRequest"]

interface AdminUpsertStorePayload {
  request: AdminStoreRequest
  storeImages?: File[]
  menuImages?: File[]
}

const buildAdminStoreFormData = ({
  request,
  storeImages = [],
  menuImages = [],
}: AdminUpsertStorePayload) => {
  const formData = new FormData()

  formData.append(
    "request",
    new Blob([JSON.stringify(request)], {
      type: "application/json",
    })
  )

  storeImages.forEach((imageFile) => {
    formData.append("storeImages", imageFile)
  })

  menuImages.forEach((imageFile) => {
    formData.append("menuImages", imageFile)
  })

  return formData
}

export const getAdminStoreList = async (
  params?: AdminStoreListParams
): Promise<components["schemas"]["AdminStoreListResponse"]> => {
  return await api.get("/admin/store/list", { params })
}

export const postAdminStore = async (
  payload: AdminUpsertStorePayload
): Promise<components["schemas"]["AdminUpsertStoreResponse"]> => {
  const formData = buildAdminStoreFormData(payload)

  return await api.post("/admin/store", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}

export const patchAdminStore = async ({
  storeId,
  ...payload
}: {
  storeId: number
} & AdminUpsertStorePayload): Promise<components["schemas"]["AdminUpsertStoreResponse"]> => {
  const formData = buildAdminStoreFormData(payload)

  return await api.patch(`/admin/store/${storeId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}
