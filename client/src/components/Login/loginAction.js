import { Link } from "react-router-dom";
import * as api from "../../api/registerAPI";

export const loginAction = async (id, password, navigate, alertSetting) => {
  let loginResult = await api.loginRequest(id, password);
  if (loginResult.data.loginSuccess === true) {
    navigate("/");
  } else {
    alertSetting(loginResult.data.message);
  }
};
