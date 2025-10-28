import { api } from "../instance";
import type { components } from "../schema";

export const getNearbyStore = async (
  params: components["schemas"]["GetNearByStoreRequest"]
): Promise<components["schemas"]["GetNearByStoreResponses"]> => {
  return await api.get(`/store/nearby`, {
    params: { ...params, category: params.category?.join(",") },
  });
};

export const getStoreDetail = async (
  storeId: number
): Promise<components["schemas"]["GetStoreDetailResponse"]> => {
  return await api.get(`/store/detail/${storeId}`);
};

export const getRanking = async ({
  period,
}: {
  period: "weekly" | "monthly";
}): Promise<components["schemas"]["GetStoreRankingResponses"]> => {
  return await api.get(`/store/${period}`);
};

export const getSearchedStores = async (
  params: components["schemas"]["GetSearchResultRequest"]
): Promise<components["schemas"]["GetSearchResultResponse"]> => {
  return await api.get(`/store/search`, { params });
};
