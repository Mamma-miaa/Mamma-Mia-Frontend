import { api } from "../instance";
import type { components, paths } from "../schema";

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
  return await api.get("/store/search", { params });
};

export const postMammaMia = async (
  data: paths["/api/v1/store/like"]["post"]["requestBody"]["content"]["application/json"]
): Promise<components["schemas"]["ApplyStoreLikeRequest"]> => {
  return await api.post("/store/like", { data });
};
