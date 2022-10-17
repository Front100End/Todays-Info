// 로그인,회원가입 등  api request 모음

import axios from "axios";

export const loginRequest = async (id, password) =>
  axios.post(
    "https://todays-info.herokuapp.com/api/users/login",
    {
      id: id,
      password: password,
    },
    { withCredentials: true }
  );

export const logoutRequest = async (id) =>
  axios.post(
    "https://todays-info.herokuapp.com/users/logout",
    {
      id: id,
    },
    { withCredentials: true }
  );

export const joinRequest = async (id, nickname, email, password) =>
  axios.post(
    "https://todays-info.herokuapp.com/api/users/join",
    {
      id: id,
      nickname: nickname,
      email: email,
      password: password,
    },
    { withCredentials: true }
  );
