import axios from "axios";

export const authRequest = async () =>
  axios.get("https://todays-info.site/api/users/auth", {
    withCredentials: true,
  });
