import axios from "axios";
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

export const getMyChallengeStore = async (): Promise<
  components["schemas"]["GetMyRegisteredChallengeStoreResponse"][]
> => {
  return await api.get("/member/challenge-store");
};

export const postSocialLogin = async (
  data: components["schemas"]["JoinSocialLoginRequest"]
): Promise<components["schemas"]["JoinSocialLoginResponse"]> => {
  return await api.post("/member/social", data);
};

export const postLogout = async (
  data: components["schemas"]["LogoutRequest"]
): Promise<void> => {
  return await api.post("/member/logout", data);
};

export const postSocialLoginWithAgreements = async (
  data: components["schemas"]["SaveAgreementRequest"]
): Promise<{ accessToken: string; refreshToken: string }> => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/member/agreements`,
    data
  );
};

export const getProfile = async (): Promise<
  components["schemas"]["GetMyProfileResponse"]
> => {
  return await api.get("/member/profile");
};

export const patchProfile = async (data: {
  nickname?: string;
  profileImage?: string;
}) => {
  return await api.patch("/member/profile-update", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
