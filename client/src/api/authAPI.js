import axios from "axios";
import { setUser } from "../modules/userReducer";

export const authRequest = async (accessCheck, dispatch) => {
  try {
    const res = await axios.get("https://todays-info.site/api/users/auth", {
      withCredentials: true,
    });
    if (res.data.isAuth === true) {
      accessCheck(res.data.isAuth, dispatch(setUser(res.data)));
    } else {
      return;
    }
  } catch (err) {
    return err;
  }
};

//api 로 결과 값을 isAuth를 받아왔는데 true이다?
//그러면 dispatch로 user데이터 저장해주고
//Home화면으로 이동 시키는 것.
