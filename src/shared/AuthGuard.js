import React, { useEffect, useState } from "react";
import { history } from "../redux/configureStore";

import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";

import { getCookie } from "../shared/Cookie";

const AuthGuard = ({ children }) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.is_login);

  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const kakaoToken = localStorage.kakaoToken;
    const userToken = getCookie("userToken");

    if (!!kakaoToken || !!userToken) {
      console.log(getCookie("userToken"));
      // console.log(kakaoToken);
      dispatch(userActions.getMyselfDB(userToken));
    }
  }, []);

  useEffect(() => {
    if (["/", "/register"].includes(history.location.pathname) && isLogin) {
      return history.replace("/check-in");
    } else if (
      !["/", "/register"].includes(history.location.pathname) &&
      !isLogin
    ) {
      return history.replace("/");
    }
  }, [history.location.pathname, isLogin]);

  if (!isLoaded) return history.replace("/");
  return <></>;
};
export default AuthGuard;
