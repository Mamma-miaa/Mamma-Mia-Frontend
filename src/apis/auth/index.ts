import api from "..";
import type { components } from "../schema";

const postSocialLogin = async (
  data: components["schemas"]["JoinSocialMemberWithIdTokenRequest"]
) => {
  return await api.post(`/auth/social`, data);
};

export default postSocialLogin;
