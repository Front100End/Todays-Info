// 로그인,회원가입 등  api request 모음

import axios from "axios";

export const loginRequest = (id, password) => {
  axios.post("https://local:5000/login", {
    id: id,
    password: password,
  });
};
