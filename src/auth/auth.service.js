import { API_BASE_URL, ACCESS_TOKEN_NAME } from "@/config/serverApiConfig";

import * as auth from "../api/auth";
import errorHandler from "@/request/errorHandler";
import successHandler from "@/request/successHandler";
import storePersist from "@/redux/storePersist";

import { getCookie, setCookie, deleteCookie } from "./cookie";

export const login = async (loginAdminData) => {
  const response = await auth.postAuth(loginAdminData);
  try {
    token.set(`Bearer ${response.data.token}`);
    return successHandler(response);
  } catch (error) {
    return errorHandler(response);
  }
};

export const logout = () => {
  token.remove();
  storePersist.clear();
};

export const token = {
  get: () => {
    return getCookie(ACCESS_TOKEN_NAME);
  },
  set: (token) => {
    return setCookie(ACCESS_TOKEN_NAME, token);
  },
  remove: () => {
    return deleteCookie(ACCESS_TOKEN_NAME);
  },
};
