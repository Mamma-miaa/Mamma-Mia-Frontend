import { api } from "../instance";
import type { components } from "../schema";

export const postSocialLogin = async (
  data: components["schemas"]["JoinSocialLoginRequest"]
): Promise<components["schemas"]["JoinSocialLoginResponse"]> => {
  return await api.post(`/auth/social`, data);
};
