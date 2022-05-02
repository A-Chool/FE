import React, { useEffect } from "react";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import { getCookie } from "./Cookie";

const KakaoOauth = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");
    console.log(code);
    dispatch(userActions.kakaoLoginDB(code));
  }, []);

  return <div>잠시만 기다려주세요</div>;
};

export default KakaoOauth;
