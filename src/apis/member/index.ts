import { apiWithAuth } from "../instance";

export const getMyPage = async () => {
  return await apiWithAuth.get(`/member/my-page`);
};
