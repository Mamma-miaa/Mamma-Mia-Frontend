import type { components } from "@/apis/schema"
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query"
import {
  getNearbyStore,
  getRanking,
  getSearchedStores,
  getStoreDetail,
  postBookmark,
  deleteBookmark,
  postMammaMia,
  getMammaMia,
  getBookmark,
  postChallengeApplication,
  getChallengeStoreDetail,
  getDistanceToStore,
} from "@/apis/store"
import { getIsLoggedIn } from "@/utils/sessionStorage"

export const useGetNearbyStoreQuery = (
  params: components["schemas"]["GetNearByStoreRequest"]
) =>
  useQuery({
    queryKey: [
      "getNearbyStore",
      [
        params.minLatitude,
        params.maxLatitude,
        params.minLongitude,
        params.maxLongitude,
      ].every(Boolean),
      params.category,
      params.isOpen,
      params.isNew,
      params.minPrice,
      params.maxPrice,
    ],
    queryFn: () => getNearbyStore(params),
    placeholderData: {
      items: [],
      totalCount: 0,
      hasNext: false,
      cursorId: 0,
      lastDistance: 0,
    },
  })

export const useGetStoreDetailQuery = (storeId: number) =>
  useSuspenseQuery({
    queryKey: ["getStoreDetail", storeId],
    queryFn: () => getStoreDetail(storeId),
  })

export const useGetRankingQuery = (params: Parameters<typeof getRanking>[0]) =>
  useSuspenseQuery({
    queryKey: ["getRanking", params.status, params.type],
    queryFn: () => getRanking(params),
  })

export const useGetSearchedStoresQuery = (
  params: components["schemas"]["GetSearchResultRequest"]
) =>
  useSuspenseQuery({
    queryKey: ["getSearchedStores", params.keyword, params.storeStatus],
    queryFn: () => getSearchedStores(params),
  })

export const useGetMammaMiaQuery = (
  params: Parameters<typeof getMammaMia>[0]
) =>
  useQuery({
    queryKey: ["getMammaMia", params.storeId],
    queryFn: () => getMammaMia(params),
    enabled: getIsLoggedIn(),
  })

export const usePostMammaMiaMutation = () =>
  useMutation({
    mutationFn: postMammaMia,
  })

export const usePostBookmarkMutation = () =>
  useMutation({
    mutationFn: postBookmark,
  })

export const useDeleteBookmarkMutation = () =>
  useMutation({
    mutationFn: deleteBookmark,
  })

export const useGetBookmarkQuery = (
  params: Parameters<typeof getBookmark>[0]
) =>
  useQuery({
    queryKey: ["getBookmark", params],
    queryFn: () => getBookmark(params),
    enabled: getIsLoggedIn(),
  })

export const usePostChallengeApplicationMutation = () =>
  useMutation({
    mutationFn: postChallengeApplication,
  })

export const useGetChallengeStoreDetailQuery = (storeId: number) =>
  useSuspenseQuery({
    queryKey: ["getChallengeStoreDetail", storeId],
    queryFn: () => getChallengeStoreDetail(storeId),
  })

export const useGetDistanceToStoreQuery = (
  params: Parameters<typeof getDistanceToStore>[0]
) =>
  useQuery({
    queryKey: [
      "getDistanceToStore",
      params.storeId,
      params.latitude,
      params.longitude,
    ],
    queryFn: () => getDistanceToStore(params),
    enabled: getIsLoggedIn(),
  })
