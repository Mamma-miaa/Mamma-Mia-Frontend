import axios from "axios";
import { api } from "../instance";
import type { components } from "../schema";

export const postSocialLogin = async (
  data: components["schemas"]["JoinSocialLoginRequest"]
): Promise<components["schemas"]["JoinSocialLoginResponse"]> => {
  return await api.post("/auth/social", data);
};

export const postSocialLoginWithAgreements = async (
  data: components["schemas"]["SaveAgreementRequest"]
) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/member/agreements`,
    data
  );
};
