import axios from "axios";

const func_app_url = "https://image-analyzer-func-app.azurewebsites.net";

export const processAndAnalyzeImage = async (formData: FormData) => {
  const headers = {
    accept: "application/json", // Ensure the server responds with JSON
  };

  try {
    const response = await axios.put(
      `${func_app_url}/api/v1/process/file`,
      formData,
      {
        headers,
      }
    );
    console.log("Response data:", response.data); // Logging the response data
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data); // More detailed error logging
    } else {
      console.error("Unexpected error:", error);
    }
    throw error; // Rethrow the error to handle it further up the call stack or inform the user
  }
};

export const analyzeImage = async (formData: FormData) => {
  const headers = {
    accept: "application/json",
  };

  return await axios.put(`${func_app_url}/api/v1/process/analyze`, formData, {
    headers,
  });
};

export const testImageRoute = async () => {
  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
  };
  const payload = { message: "hello" };

  try {
    const response = await fetch(`${func_app_url}/api/v1/process/test`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const getUsers = async () => {
  return await axios.get(`${func_app_url}/api/v1/users/listAll`);
};

// export const createUser = async (payload) => {
//   await axios.post(`/api/v1/users/create`, { payload });
// };

// export const updateUserProfilePic = async (payload) => {
//   await axios.post(`/api/v1/users/profile-pic`, { payload });
// };
