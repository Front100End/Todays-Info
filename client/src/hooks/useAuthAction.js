import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../modules/userReducer";
import { useNavigate } from "react-router-dom";
import * as authApi from "../api/authAPI";

const useAuthAction = async (loadingFunc) => {
  const [accessState, setAccessState] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const AuthCheck = async () => {
    try {
      const authRes = await authApi.authRequest();
      if (authRes.data.isAuth === true) {
        //인증 성공
        setAccessState(true);
        dispatch(setUser(authRes.data));
        loadingFunc(false);
        navigate(`/`);
      } else {
        //인증 실패
        setAccessState(false);
        loadingFunc(true);
        navigate(`/login`);
      }
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    AuthCheck();
  }, []);
};

export default useAuthAction;
