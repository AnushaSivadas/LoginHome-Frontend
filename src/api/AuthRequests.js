import axios from 'axios';
export const BASE_URL= 'http://localhost:4000'

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/signup`, userData, {
      withCredentials: true,
    });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const googleSigninUser = async (credential) => {
    try {
        const response = await axios.post(`${BASE_URL}/googleSignin`, credential, {
      withCredentials: true,
    });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const verifyUserSession = async () => {
    try {
      const response = await axios.post(`${BASE_URL}`, {}, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

