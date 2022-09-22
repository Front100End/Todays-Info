import { Link } from "react-router-dom";
import * as api from "../../api/registerAPI";

export const loginAction = async (id, password) => {
  let loginResult = await api.loginRequest(id, password);
  console.log(loginResult);
};
