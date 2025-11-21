import { useSuspenseQuery } from "@tanstack/react-query";
import { getMyBookmarkStore } from "@/apis/member";

export const useGetMyBookmarkStoreQuery = () => {
  return useSuspenseQuery({
    queryKey: ["getMyBookmarkStore"],
    queryFn: getMyBookmarkStore,
  });
};
