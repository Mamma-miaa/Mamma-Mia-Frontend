import {
  getLocationByCategory,
  type SearchByCategoryRequest,
} from "@/apis/kakao";
import { useQuery } from "@tanstack/react-query";

export const useGetLocationByCategoryQuery = (
  params: SearchByCategoryRequest
) => {
  return useQuery({
    queryKey: ["getLocationByCategory", params],
    queryFn: () => getLocationByCategory(params),
  });
};
