import type { components } from "@/apis/schema";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getNearbyStore, getStoreDetail } from "@/apis/store";

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
    ],
    queryFn: () => getNearbyStore(params),
    placeholderData: {
      items: [],
      hasNext: false,
      cursorId: 0,
      lastDistance: 0,
    },
  });

export const useGetStoreDetailQuery = (storeId: number) =>
  useSuspenseQuery({
    queryKey: ["getStoreDetail", storeId],
    queryFn: () => getStoreDetail(storeId),
  });
