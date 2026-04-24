import { sleep } from "@/helpers/utils";
import { LoginFormValues } from "@/validations/authSchema";
import secureStorage from "../secureStorage";

export async function login(data: LoginFormValues) {
  await sleep(1000);
  const { email, password } = data;
  if (email !== "test@example.com" || password !== "password123") {
    throw new Error("Invalid credentials");
  }

  return {
    token: "123456",
    user: { name: "Ali mohamed" },
  };
}

export async function logout() {
  await secureStorage.removeItem("app_token");
}
