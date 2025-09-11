import api from "..";
import type { components } from "../schema";

const getNearbyStore = async (
  params: components["schemas"]["GetNearByStoreRequest"]
): Promise<components["schemas"]["GetNearByStoreResponses"]> => {
  const response = await api.get(`/store/nearby`, { params });
  return response.data;
};

export { getNearbyStore };
