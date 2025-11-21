import { useSuspenseQuery } from "@tanstack/react-query";
import { getMyBookmarkStore, getMyMammaMiaStore } from "@/apis/member";

export const useGetMyBookmarkStoreQuery = () => {
  return useSuspenseQuery({
    queryKey: ["getMyBookmarkStore"],
    queryFn: getMyBookmarkStore,
  });
};

export const useGetMyMammaMiaStoreQuery = () => {
  return useSuspenseQuery({
    queryKey: ["getMyMammaMiaStore"],
    queryFn: getMyMammaMiaStore,
  });
};
