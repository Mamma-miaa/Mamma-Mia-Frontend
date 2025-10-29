import { api } from "../instance";

export const getMyPage = async () => {
  return await api.get(`/member/my-page`);
};
