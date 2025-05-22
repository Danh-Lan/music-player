import axios from 'axios';

const baseUrl = '/api/login';

const login = async (username, password) => {
  try {
    const response = await axios.post(baseUrl, { username, password });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

const loginService = {
  login,
};

export default loginService;
