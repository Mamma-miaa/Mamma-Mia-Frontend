import { postSocialLogin, postSocialLoginWithAgreements } from "@/apis/member";
import { useMutation } from "@tanstack/react-query";

export const usePostSocialLoginMutation = () => {
  return useMutation({
    mutationFn: postSocialLogin,
  });
};

export const usePostSocialLoginWithAgreementsMutation = () => {
  return useMutation({
    mutationFn: postSocialLoginWithAgreements,
  });
};
