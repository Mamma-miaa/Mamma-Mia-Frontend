import { useSuspenseQuery } from "@tanstack/react-query";
import { getMyPage } from "@/apis/member";

export const useGetMyPageQuery = () => {
  return useSuspenseQuery({
    queryKey: ["getMyPage"],
    queryFn: getMyPage,
  });
};
