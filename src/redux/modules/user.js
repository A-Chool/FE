import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import api, { baseUrl } from "../../api/api";
import cookies from "universal-cookie";
import jwt_decode from "jwt-decode";

// 액션
const LOG_IN = "LOG_IN";
const ADMINLOG_IN = "ADMINLOG_IN";
const LOG_OUT = "LOG_OUT";
const LOAD_TOKEN = "LOAD_TOKEN";
const WITHDRAWAL = "WITHDRAWAL";
const AUTH_FAILED = "AUTH_FAILED";

// 초기값

const initialState = {
  email: "",
  password: "",
  is_loading: true,
  is_login: false,
  user: {},
};

// 액션 생성 함수
const logIn = createAction(LOG_IN, (user) => ({ user }));
const adminlogIn = createAction(LOG_IN, (user) => ({ user }));
const authFailed = createAction(AUTH_FAILED, () => {});
export const logOut = createAction(LOG_OUT, (user) => ({ user }));
// const withdrawal = createAction(WITHDRAWAL, (user) => ({ user }));

// 미들웨어

// 로그인 액션
const loginDB = (userId, password) => {
  return async function (dispatch, getState, { history }) {
    await axios
      .post(`${baseUrl}/user/login`, {
        userId: userId,
        password: password,
      })
      .then((response) => {
        if (Math.floor(response.status / 100) === 2) {
          // console.log("로그인 성공", response);
          const userToken = response.headers?.authorization?.split(" ")[1];
          const decoded = jwt_decode(userToken);
          // EXPIRED_DATE: 1653700338
          // USER_EMAIL: ""
          // USER_LEVEL: 0
          // USER_NAME: ""
          // iss: "Mr.A-Chool"
          dispatch(
            logIn({
              expiredDate: decoded.EXPIRED_DATE,
              email: decoded.USER_EMAIL,
              name: decoded.USER_NAME,
              level: decoded.USER_LEVEL,
            })
          );
          setCookie("userToken", userToken);
          setCookie("userId", userId);
          history.replace("/check-in");
        } else {
          dispatch(authFailed());
        }
      })
      .catch((error) => {
        dispatch(authFailed());
        window.alert("아이디 또는 비밀번호를 확인해주세요.");
        console.log("Login Error", error);
      });
  };
};

// 로그인 액션
const getMyselfDB = (token) => {
  return async function (dispatch, getState, { history }) {
    await api
      .get(`/api/user/mypage`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (Math.floor(response.status / 100) === 2) {
          console.log("로그인 성공", response);
          localStorage.setItem("userInfo", JSON.stringify(response.data));
          dispatch(logIn({ ...getState().user, ...response.data }));
          const userToken = response.config.headers?.authorization?.split(" ")[1];
          if (userToken) setCookie("userToken", userToken);
          history.replace("/check-in");
        } else {
          dispatch(authFailed());
        }
      })
      .catch((error) => {
        dispatch(authFailed());
        console.log("Login Error", error);
      });
  };
};

export const adminloginDB = (userId, password) => {
  return async function (dispatch, getState, { history }) {
    await api
      .post("/api/admin/login", {
        email: userId,
        password: password,
      })
      .then((response) => {
        // console.log(response);
        dispatch(
          adminlogIn({
            is_loading: false,
            is_login: true,
          })
        );
        console.log("로그인 성공");
        const ACCESS_TOKEN = response.headers.authorization.split(" ")[1];
        // localStorage.setItem("adminUserToken", ACCESS_TOKEN);
        // localStorage.setItem("adminUserId", email);
        setCookie("userToken", ACCESS_TOKEN);
        setCookie("userId", userId);
        history.replace("/admin/user");
      })
      .catch((error) => {
        window.alert("어드민이 아닙니다.");
        console.log("Login Error", error);
      });
  };
};

const kakaoLoginDB = (code) => {
  return async function (dispatch, getState, { history }) {
    await axios
    .get(`${baseUrl}/api/user/kakao/callback?code=${code}`)
      .then((response) => {
        if (Math.floor(response.status / 100) === 2) {
          // console.log("카카오 로그인 성공", response);
          const userToken = response.headers?.authorization?.split(" ")[1];
          const decoded = jwt_decode(userToken);
          setCookie("userToken", userToken);
          dispatch(
            logIn({
              expiredDate: decoded.EXPIRED_DATE,
              email: decoded.USER_EMAIL,
              name: decoded.USER_NAME,
              level: decoded.USER_LEVEL,
            })
          );
          history.replace("/check-in");
        }
      })
      .catch((err) => {
        console.log("카카오 로그인 에러", err);
        window.alert("로그인에 실패하였습니다.");
        history.replace("/");
    });
  };
};

const naverLoginDB = (code) => {
  return async function (dispatch, getState, { history }) {
    await axios
      .get(`${baseUrl}/api/user/naver/callback?code=${code}`)
      .then((response) => {
        if (Math.floor(response.status / 100) === 2) {
          // console.log("네이버 로그인 성공", response);
          const userToken = response.headers?.authorization?.split(" ")[1];
          const decoded = jwt_decode(userToken);
          setCookie("userToken", userToken);

          // EXPIRED_DATE: 1653700338
          // USER_EMAIL: ""
          // USER_LEVEL: 0
          // USER_NAME: ""
          // iss: "Mr.A-Chool"
          dispatch(
            logIn({
              expiredDate: decoded.EXPIRED_DATE,
              email: decoded.USER_EMAIL,
              name: decoded.USER_NAME,
              level: decoded.USER_LEVEL,
            })
          );
          history.replace("/check-in");
        }
      })
      .catch((err) => {
        console.log("네이버 로그인 에러", err);
        window.alert("로그인에 실패하였습니다.");
        history.replace("/");
      });
  };
};

// 회원가입 액션
const signupDB = (email, userName, userPw, userPwCheck, phoneNumber) => {
  return async function (dispatch, getState, { history }) {
    await api
      .post("/api/user/signup", {
        email: email,
        userName: userName,
        userPw: userPw,
        userPwCheck: userPwCheck,
        phoneNumber: phoneNumber,
      })
      .then((response) => {
        // console.log(response);
        window.alert("회원가입을 축하합니다!");
        history.push("/");
      })
      .catch((error) => {
        alert("중복된 아이디가 존재합니다.");
        console.log("회원가입 DB Error", error);
      });
  };
};

// 회원탈퇴 액션
// const withdrawalAC = (userId, userPw) => {
//   return function (dispatch, getState, { history }) {
//     axios
//       .post("http://3.38.179.73/user/remove", {
//         userId: userId,
//         userPw: userPw,
//       })
//       .then((response) => {
//         window.alert(response.data);
//         history.replace("/");
//       })
//       .catch((error) => {
//         window.alert("아이디와 비밀번호를 정확히 입력해주세요.");
//         console.log("탈퇴 Error", error);
//       });
//   };
// };

// 리듀서
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = false;
        draft.is_login = true;
        draft.user = action.payload.user;
      }),
    [ADMINLOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_loading = false;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("userId");
        deleteCookie("userToken");
        deleteCookie("is_login");
        localStorage?.removeItem("userInfo");
        draft.is_loading = false;
        draft.is_login = false;
      }),
    [LOAD_TOKEN]: (state, action) =>
      produce(state, (draft) => {
        draft.is_login = true;
      }),
    [AUTH_FAILED]: (state, action) =>
      produce(state, (draft) => {
        draft.is_login = false;
        draft.user = {};
      }),
  },
  initialState
);

const actionCreators = {
  logIn,
  // logOut,
  // withdrawal,
  loginDB,
  signupDB,
  getMyselfDB,
  kakaoLoginDB,
  naverLoginDB,
  adminloginDB,
  // loadToken,
  // withdrawalAC,
};

export { actionCreators };
