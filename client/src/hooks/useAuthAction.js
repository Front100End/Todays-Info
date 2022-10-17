import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../modules/userReducer";
import { Navigate, useNavigate } from "react-router-dom";

const useAuthAction = async (loadingFunc) => {
  const [accessState, setAccessState] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const AuthCheck = async () => {
    try {
      const authRes = await axios.get("http://3.35.237.101/api/users/auth", {
        withCredentials: true,
      });
      if (authRes.data.isAuth === true) {
        //인증 성공
        setAccessState(true);
        dispatch(setUser(authRes.data));
        loadingFunc(true);
        navigate(`/`);
      } else {
        //인증 실패
        setAccessState(false);
        loadingFunc(false);
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
