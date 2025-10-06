import { api } from "../instance";
import type { components } from "../schema";

export const getNearbyStore = async (
  params: components["schemas"]["GetNearByStoreRequest"]
): Promise<components["schemas"]["GetNearByStoreResponses"]> => {
  return await api.get(`/store/nearby`, { params });
};

export const getStoreDetail = async (
  storeId: number
): Promise<components["schemas"]["GetStoreDetailResponse"]> => {
  return await api.get(`/store/detail/${storeId}`);
};
