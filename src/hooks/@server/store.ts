import type { components } from "@/apis/schema";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getNearbyStore, getStoreDetail } from "@/apis/store";

export const useGetNearbyStoreQuery = (
  params: components["schemas"]["GetNearByStoreRequest"]
) =>
  useQuery({
    queryKey: ["getNearbyStore", params],
    queryFn: () => getNearbyStore(params),
    placeholderData: { items: [] },
  });

export const useGetStoreDetailQuery = (storeId: number) =>
  useSuspenseQuery({
    queryKey: ["getStoreDetail", storeId],
    queryFn: () => getStoreDetail(storeId),
  });
