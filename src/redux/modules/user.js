import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

// 액션

const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const LOAD_TOKEN = "LOAD_TOKEN";
const WITHDRAWAL = "WITHDRAWAL";

// 초기값

const initialState = {
  userInfo: {
    userId: "",
    userPw: "",
  },
    is_login: false,
  };

// 액션 생성 함수
const logIn = createAction(LOG_IN, (user) => ({user}));
const logOut = createAction(LOG_OUT, (user) => ({user}));
const loadToken = createAction(LOAD_TOKEN, (token) => ({token}));
const withdrawal = createAction(WITHDRAWAL, (user) => ({user}));

// 미들웨어

// 회원탈퇴 액션
const withdrawalAC = (userId, userPw) => {
  return function (dispatch, getState, {history}) {
    axios
      .post("http://3.38.179.73/user/remove", {
        userId: userId,
        userPw: userPw,
      })
      .then(response => {
        window.alert(response.data);
        history.replace('/')
      })
      .catch(error => {
        window.alert("아이디와 비밀번호를 정확히 입력해주세요.")
        console.log("탈퇴 Error", error)
      })
  }
}

// 토큰로드 액션
const loadTokenFB = () => {
  return function (dispatch) {
    if (getCookie("Authorization")) {
      dispatch(loadToken());
    }
  };
};

// 로그인 액션
const loginDB = (userId, userPw) => {
  return function (dispatch, getState, {history}) {
    axios
      .post("http://3.38.179.73/user/login", {
        userId: userId,
        userPw: userPw,
      })
      .then(response => {
        console.log(response);
        console.log(response.config.data.split(":"))
        dispatch(
          logIn({
            is_login: true,
          })
        );
        setCookie("Authorization", response.headers.authorization.split(" ")[1]);
        setCookie("userId", userId);
        history.replace("/todoList");
      })
      .catch(error => {
        window.alert("아이디 또는 비밀번호를 확인해주세요.")
        console.log("Login Error", error)
      })
  }
}

// 회원가입 액션
const signupDB = (userId, userPw, pwCheck) => {
  return function (dispatch, getState, {history}) {
    axios
    .post("http://3.38.179.73/user/join", {
      userId: userId,
      userPw: userPw,
      pwCheck: pwCheck,
    })
    .then(response => {
      console.log(response);
      window.alert("회원가입을 축하합니다!")
      history.push("/login")
    })
    .catch(error => {
      alert("중복된 아이디가 존재합니다.");
      console.log("회원가입 DB Error", error);
    })
  };
};

// 리듀서
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
        draft.token = action.payload.user.token;
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
  logOut,
  withdrawal,
  loginDB,
  signupDB,
  loadTokenFB,
  withdrawalAC,
};

export { actionCreators };

