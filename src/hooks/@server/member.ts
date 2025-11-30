import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import {
  getMyBookmarkStore,
  getMyChallengeStore,
  getMyMammaMiaStore,
  patchProfile,
} from "@/apis/member";

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

export const useGetMyChallengeStoreQuery = () => {
  return useSuspenseQuery({
    queryKey: ["getMyChallengeStore"],
    queryFn: getMyChallengeStore,
  });
};

export const usePatchProfileMutation = () => {
  return useMutation({
    mutationFn: patchProfile,
  });
};
