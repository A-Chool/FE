import React, { useEffect } from "react";

import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";
//현재 백엔드분들이 만드신 서버내의 roomId 주소

const KakaoOauth = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (!!code) {
      console.log(code);
      dispatch(userActions.kakaoLoginDB(code));
    }
  }, []);

  return <div />;
};

export default KakaoOauth;
