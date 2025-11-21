import { useMutation } from "@tanstack/react-query";
import { postSocialLogin, postSocialLoginWithAgreements } from "@/apis/auth";

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
