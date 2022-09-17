import axios from "../utils/axios";

export const authUserLogin = async ({username, password}) => {
  try {
    const response = await axios.post("/auth/login", {
      username: username,
      password: password,
    });
    if (response.status) {
      document.cookie = "jwtToken=" + response.data.token + ";expires=" + new Date().setHours(new Date().getHours() + 1) + ";";

      return response;
    } else {
      return response.data.error;
    }
  } catch (error) {
    return error;
  }
};
