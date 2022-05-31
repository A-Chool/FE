import React, { useEffect } from "react";

import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";

const KakaoOauth = (props) => {
  const dispatch = useDispatch();
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    if (!!code) {
      dispatch(userActions.naverLoginDB(code));
    }
  }, [code]);

  return;
};

export default KakaoOauth;
