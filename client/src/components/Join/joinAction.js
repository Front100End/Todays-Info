import { Link } from "react-router-dom";
import * as api from "../../api/registerAPI";

export const joinAction = async (id, nickname, email, password, navigate) => {
  let joinResult = await api.joinRequest(id, nickname, email, password);
  console.log(joinResult);
  if (joinResult.data === "join success") {
    navigate("/login");
  }
  //비밀번호 암호화
  //모든 회원가입 절차 이후 로그인 창으로 이동
};
