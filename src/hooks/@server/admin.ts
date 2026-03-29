import {
  getAdminStoreList,
  patchAdminStore,
  postAdminStore,
} from "@/apis/admin"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetAdminStoreListQuery = (
  params?: Parameters<typeof getAdminStoreList>[0]
) =>
  useQuery({
    queryKey: ["getAdminStoreList", params?.keyword, params?.size],
    queryFn: () => getAdminStoreList(params),
    placeholderData: {
      stores: [],
    },
  })

export const usePostAdminStoreMutation = () =>
  useMutation({
    mutationFn: postAdminStore,
  })

export const usePatchAdminStoreMutation = () =>
  useMutation({
    mutationFn: patchAdminStore,
  })
