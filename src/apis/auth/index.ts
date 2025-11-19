import type { AxiosRequestConfig } from "axios";
import { api } from "../instance";
import type { components } from "../schema";

export const postSocialLogin = async ({
  data,
  config,
}: {
  data: components["schemas"]["JoinSocialLoginRequest"];
  config?: AxiosRequestConfig;
}): Promise<components["schemas"]["JoinSocialLoginResponse"]> => {
  return await api.post(`/auth/social`, data, config);
};
