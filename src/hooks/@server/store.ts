import type { components } from "@/apis/schema";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getNearbyStore } from "@/apis/store";

export const useGetNearbyStoreQuery = (
  params: components["schemas"]["GetNearByStoreRequest"]
) =>
  useSuspenseQuery({
    queryKey: ["getNearbyStore"],
    queryFn: () => getNearbyStore(params),
  });
