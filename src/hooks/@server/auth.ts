import { useMutation } from "@tanstack/react-query";
import postSocialLogin from "@/apis/auth";

export const usePostSocialLoginMutation = () => {
  return useMutation({
    mutationFn: postSocialLogin,
  });
};
