import api from "./axiosClient";
export const postAuth = async (params) => {
  try {
    const url = "/auth/login";
    
    const response = await api.post(url, params);
    return response;
  } catch (err) {
    throw err.message;
  }
};
