import { login } from "@/services/auth";
import secureStorage from "@/services/secureStorage";
import { LoginFormValues, loginSchema } from "@/validations/authSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function useLogin() {
  const {
    control,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const { bottom } = useSafeAreaInsets();
  const {
    isPending: loginLoading,
    mutate: loginMutation,
    error: loginError,
  } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: login,
    onSuccess: async (data) => {
      await secureStorage.saveItem("app_token", data.token);
      router.replace("/homeScreen");
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    loginMutation(data);
  });

  return {
    control,
    isValid,
    errors,
    bottom,
    loginLoading,
    loginError,
    onSubmit,
  };
}
