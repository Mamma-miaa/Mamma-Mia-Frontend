import { api } from "../instance";
import type { components } from "../schema";

export const getMyBookmarkStore = async (): Promise<
  components["schemas"]["GetMyBookmarkStoreResponses"]
> => {
  return await api.get("/member/bookmark-store");
};

export const getMyMammaMiaStore = async (): Promise<
  components["schemas"]["GetMyMammaMiaStoreResponses"]
> => {
  return await api.get("/member/mamma-mia-store");
};
