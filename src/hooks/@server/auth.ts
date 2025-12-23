import {
  postLogout,
  postSocialLogin,
  postSocialLoginWithAgreements,
} from "@/apis/member";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "@/utils/toast";

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

export const usePostLogoutMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      sessionStorage.clear();
      toast({ message: "로그아웃에 성공하였습니다." });
      navigate("/");
    },
    onError: (error: unknown) => {
      const errorMessage =
        error && typeof error === "object" && "response" in error
          ? (error.response as { data?: { message?: string } })?.data?.message
          : undefined;

      toast({
        message:
          errorMessage || "로그아웃에 실패하였습니다. 다시 시도해주세요.",
      });
    },
  });
};
