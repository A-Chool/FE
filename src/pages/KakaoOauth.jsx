import React, { useEffect } from "react";

import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import axios from "axios";
import { baseUrl } from "../api/api";
//현재 백엔드분들이 만드신 서버내의 roomId 주소

const KakaoOauth = (props) => {
  const dispatch = useDispatch();
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code)

  const _ = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/user/kakao/callback?code=${code}`,
        { Authorization: `Bearer ` }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!!code) {
      // console.log(code);
      _();
      dispatch(userActions.kakaoLoginDB(code));
    }
  }, [code]);

  return <div />;
};

export default KakaoOauth;
