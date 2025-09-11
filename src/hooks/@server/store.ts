import type { components } from "@/apis/schema";
import { useQuery } from "@tanstack/react-query";
import { getNearbyStore } from "@/apis/store";

export const useGetNearbyStoreQuery = (
  params: components["schemas"]["GetNearByStoreRequest"]
) =>
  useQuery({
    queryKey: ["getNearbyStore", params],
    queryFn: () => getNearbyStore(params),
    placeholderData: { items: [] },
  });
