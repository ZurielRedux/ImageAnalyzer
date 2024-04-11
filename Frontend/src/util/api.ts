import axios from "axios";

export const processAndAnalyzeImage = async (formData: FormData) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    accept: "application/json",
  };

  await axios.post(`/api/v1/process/file`, formData, { headers });
};

export const analyzeImage = async (formData: FormData) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    accept: "application/json",
  };

  await axios.post(`/api/v1/process/analyze`, formData, { headers });
};

export const createUser = async (payload) => {
  await axios.post(`/api/v1/users/create`, { payload });
};

export const updateUserProfilePic = async (payload) => {
  await axios.post(`/api/v1/users/profile-pic`, { payload });
};
