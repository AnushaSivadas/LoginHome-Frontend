import API from '../utils/axios.js';

export const loginUser = async (userData) => {
  try {
    const response = await API.post('/login', userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userData) => {
    try {
        const response = await API.post(`/signup`, userData, {
      withCredentials: true,
    });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const googleSigninUser = async (credential) => {
    try {
        const response = await API.post(`/googleSignin`, credential, {
      withCredentials: true,
    });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const verifyUserSession = async () => {
    try {
      const response = await API.post(`/`, {}, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

