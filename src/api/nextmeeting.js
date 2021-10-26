import api from "./axiosClient";
export const getQR = async () => {
  try {
    const url = `chapter_admin/next_meeting/qr_code`;
    const response = await api.get(url);
    return response;
  } catch (err) {
    throw err.message;
  }
};

export const getNextMeeting = async () => {
  try {
    const url = `chapter_admin/next_meeting`;
    const { data } = await api.get(url);
    return data;
  } catch (err) {
    throw err.message;
  }
};

export const upTime = async (params) => {
  try {
    const url = `chapter_admin/next_meeting`;
    const response = await api.put(url, { meeting: params });
    return response;
  } catch (err) {
    throw err.message;
  }
};

export const upBanner = async (params) => {
  try {
    const url = `chapter_admin/next_meeting/invitation`;
    const response = await api.put(url, { meeting: params });
    return response;
  } catch (err) {
    throw err.message;
  }
};

export const getListGuest = async (postList) => {
  try {
    const url = `chapter_admin/next_meeting/guests?page=${postList.page}&per_page=${postList.limit}&q=${postList.q}`;
    const response = await api.get(url);
    return response;
  } catch (error) {
    throw error.message;
  }
};

export const addGuest = async (params) => {
  const url = "chapter_admin/next_meeting/guests";
  try {
    const response = await api.post(url, params);
    return response;
  } catch (error) {
    throw error.message;
  }
};

export const editGuest = async (id, params) => {
  const url = `chapter_admin/next_meeting/guests/${id}`;
  try {
    const response = await api.put(url, params);
    return response;
  } catch (error) {
    throw error.message;
  }
};

export const deleteGuest = async (id) => {
  const url = `chapter_admin/next_meeting/guests/${id}`;
  try {
    const response = await api.delete(url);
    return response;
  } catch (error) {
    throw error.message;
  }
};
