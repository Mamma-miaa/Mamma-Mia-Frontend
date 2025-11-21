import { api } from "../instance";
import type { components } from "../schema";

export const getMyBookmarkStore = async (): Promise<
  components["schemas"]["GetMyBookmarkStoreResponses"]
> => {
  return await api.get("/member/bookmark-store");
};
