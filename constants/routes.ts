export const BASE_URL = "/";

export const AUTH_ROUTES = {
  LOGIN: "/login",
  SIGN_UP: "/signup",
};

export const CHAT_ROUTES = {
  CONVERSATIONS: "/c",
};

export const PROTECTED_ROUTES = [BASE_URL, CHAT_ROUTES.CONVERSATIONS];
export const PUBLIC_ROUTES = [AUTH_ROUTES.LOGIN, AUTH_ROUTES.SIGN_UP];
