import { api } from "./api";

export function signupUser(userData) {
  return api("/auth/signup", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

export function loginUser(credentials) {
  return api("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function logoutUser() {
  return api("/auth/logout", {
    method: "POST",
  });
}

export function getCurrentUser() {
  return api("/auth/me");
}