import axios from "axios";

export const processAndAnalyzeImage = async (formData: FormData) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    accept: "application/json",
  };

  await axios.post(`/api/v1/process/file`, formData, { headers });
};
