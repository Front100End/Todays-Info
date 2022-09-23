import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../modules/userReducer";
import { Navigate, useNavigate } from "react-router-dom";

const useAuthAction = async (route) => {
  const [accessState, setAccessState] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const AuthCheck = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/auth", {
        withCredentials: true,
      });
      console.log(res);
      if (res.data.isAuth === true) {
        //인증 성공
        console.log("인증성공");
        setAccessState(true);
        dispatch(setUser(res.data));
        navigate(`/`);
      } else {
        //인증 실패
        console.log("인증실패");
        setAccessState(false);
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
