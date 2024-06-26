import axios from "axios";

const isDev = import.meta.env.DEV;
const func_app_url = isDev
  ? "http://localhost:7071"
  : "https://image-analyzer-func-app.azurewebsites.net";

export const processAndAnalyzeImage = async (formData: FormData) => {
  const headers = {
    accept: "application/json", // Ensure the server responds with JSON
  };

  try {
    const response = await axios.put(
      `${func_app_url}/api/v1/process/analyze`,
      formData,
      { headers }
    );
    console.log(response, "response data");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data); // More detailed error logging
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

export const analyzeImage = async (formData: FormData) => {
  const headers = {
    accept: "application/json",
  };

  const response = await axios.put(
    `${func_app_url}/api/v1/process/analyze`,
    formData,
    {
      headers,
    }
  );
  return response.data;
};

export const getAllUsers = async () => {
  const response = await axios.get(
    `https://image-analyzer-func-app.azurewebsites.net/api/v1/users/listAll`
  );
  return response.data;
};

// export const createUser = async (payload) => {
//   await axios.post(`/api/v1/users/create`, { payload });
// };

// export const updateUserProfilePic = async (payload) => {
//   await axios.post(`/api/v1/users/profile-pic`, { payload });
// };
