import api from "..";
import type { components } from "../schema";

export const getNearbyStore = async (
  params: components["schemas"]["GetNearByStoreRequest"]
): Promise<components["schemas"]["GetNearByStoreResponses"]> => {
  const response = await api.get(`/store/nearby`, { params });
  return response.data;
};

export const getStoreDetail = async (
  storeId: number
): Promise<components["schemas"]["GetStoreDetailResponse"]> => {
  const response = await api.get(`/store/detail/${storeId}`);
  return response.data;
};
