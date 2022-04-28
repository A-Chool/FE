import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import api from "../../api/api";
// 액션

const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const LOAD_TOKEN = "LOAD_TOKEN";
const WITHDRAWAL = "WITHDRAWAL";

// 초기값

const initialState = {
  email: "",
  password: "",
  is_login: false,
};

// 액션 생성 함수
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
// const loadToken = createAction(LOAD_TOKEN, (token) => ({ token }));
// const withdrawal = createAction(WITHDRAWAL, (user) => ({ user }));

// 미들웨어

// 로그인 액션
const loginDB = (email, password) => {
  return async function (dispatch, getState, { history }) {
    await api
      .post("/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        dispatch(
          logIn({
            is_login: true,
          })
        );
        console.log("로그인 성공");
        // setCookie(
        //   "Authorization",
        //   response.headers.authorization.split(" ")[1]
        // );
        // setCookie("email", email);
        // history.replace("/todoList");
      })
      .catch((error) => {
        // window.alert("아이디 또는 비밀번호를 확인해주세요.");
        console.log("Login Error", error);
      });
  };
};

// 회원가입 액션
const signupDB = (email, userName, userPw, userPwCheck, phoneNumber) => {
  return async function (dispatch, getState, { history }) {
    await api
      .post("/signup", {
        email: email,
        userName: userName,
        userPw: userPw,
        userPwCheck: userPwCheck,
        phoneNumber: phoneNumber,
      })
      .then((response) => {
        console.log(response);
        // window.alert("회원가입을 축하합니다!");
        // history.push("/login");
      })
      .catch((error) => {
        // alert("중복된 아이디가 존재합니다.");
        console.log("회원가입 DB Error", error);
      });
  };
};

const logOutDb = (dispatch, getState, { history }) => {
  console.log("로그아웃");
  dispatch(logOut());
  const token = sessionStorage.getItem("token");
  history.replace("/");
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
        // setCookie("is_login", "success");
        // draft.token = action.payload.user.token;
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("Authorization");
        deleteCookie("userId");
        deleteCookie("is_login");
        draft.is_login = false;
      }),
    [LOAD_TOKEN]: (state, action) =>
      produce(state, (draft) => {
        draft.is_login = true;
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
  // loadTokenFB,
  // withdrawalAC,
};

export { actionCreators };
