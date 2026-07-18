import api from "../api/axios";
import type {
  LoginData,
  RegisterData,
} from "../types/auth.types";

export async function register(data: RegisterData) {
  const response = await api.post("/auth/register", data);

  localStorage.setItem(
    "accessToken",
    response.data.data.accessToken
  );

  return response.data;
}

export async function login(data: LoginData) {
  const response = await api.post("/auth/login", data);

  localStorage.setItem(
    "accessToken",
    response.data.data.accessToken
  );

  return response.data;
}

export async function getCurrentUser() {
  const response = await api.get("/auth/me");
  return response.data;
}

export function logout() {
  localStorage.removeItem("accessToken");
}