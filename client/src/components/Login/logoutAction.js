import * as api from "../../api/registerAPI";

export const logoutAction = async (id, navigate) => {
  let loginResult = await api.logoutRequest(id);
  if (loginResult.data.logoutSuccess === true) {
    navigate("/login");
  }
};
