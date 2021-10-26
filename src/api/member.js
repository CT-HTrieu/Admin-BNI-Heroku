import api from "./axiosClient";
export const getAllMembers = async (postList) => {
  try {
    const url = `chapter_admin/members?page=${postList.page}&per_page=${postList.limit}&q=${postList.q}`;
    const response = await api.get(url);
    return response;
  } catch (err) {
    throw err.message;
  }
};
export const UpdateMemberAction = async (id) => {
  try {
    const url = `chapter_admin/members/${id}/active`;
    const response = await api.put(url);
    return response;
  } catch (error) {
    throw error.message;
  }
};

export const createMember = async (params) => {
  try {
    const response = await api.post("chapter_admin/members", params);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getOnSearchMembers = async (params) => {
  try {
    const url = `chapter_admin/members?q=${params}`;
    const response = await api.get(url);
    return response;
  } catch (err) {
    throw err.message;
  }
};
