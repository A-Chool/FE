import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import {getCookie} from "../../shared/Cookie";


// 액션
const LOAD_USER_LIST = "LOAD_USER_LIST";
const DELETE_USER_LIST = "DELETE_USER_LIST";
const EDIT_USER_LIST = "EDIT_USER_LIST";


// 초기값
const initialState = {
  user_List : [
    {
    createdAt: "1000-01-01",
    kakaoId: null,
    naverId: null,
    phoneNumber: "010-0000-0000",
    userEmail: "user@user.com",
    userId: 0,
    userLevel: 0,
    userName: "user",
    }
  ]
};


// 액션 생성 함수
const __loadUserList = createAction(LOAD_USER_LIST, (user_List) => ({user_List}));
const __deleteUserList = createAction(DELETE_USER_LIST, (userId) => ({userId}));
const __editUserList = createAction(EDIT_USER_LIST, (userId, userLevel) => ({userId, userLevel}));


// 미들웨어


// User 조회 미들웨어
export const getUserList = () => {
  return function (dispatch, getState, { history }) {
    const myToken = getCookie("Authorization",)
    axios.get('https://a-chool.com:443/api/admin/userList'
    ,{headers : {"Authorization" : `Bearer ${myToken}`}}
    )
    .then((res) => {
      dispatch(__loadUserList(res.data));
    })
    .catch((err)=> {
      console.log(err);
    })
  }
}

//User 삭제 미들웨어
export const deleteUserList = (userId) => {
  return function (dispatch, getState, {history}) {
    if(!userId) {window.alert("유저 아이디가 없습니다!")}
    const myToken = getCookie("Authorization");
    axios({
      method: "delete",
      url: `https://a-chool.com:443/api/admin/${userId}`,     
      headers: {Authorization: `Bearer ${myToken}`},
    })
    .then((response) => {
      dispatch(__deleteUserList(userId));
    })
    .catch((err) => {
      console.log("서버에러: ", err)
    })
  }
}

//User 권한 수정 미들웨어
export const editUserList = (userId, userLevel) => {
  return function (dispatch, getState, {history}) {
    if(!userId) {window.alert("유저 아이디가 없습니다!")}
    const myToken = getCookie("Authorization");
    axios({
      method: "put",
      url: `https://a-chool.com:443/api/admin/${userId}`,
      data: {userLevel : userLevel},
      headers: {Authorization: `Bearer ${myToken}`},
    })
    .then(() => {
      dispatch(__editUserList(userId ,userLevel));
    })
    .catch((err) => {
      console.log("서버에러: ", err)
    })
  }
}

// 리듀서
export default handleActions(
  {
    [LOAD_USER_LIST]: (state, action) =>
      produce(state, (draft) => {
      draft.user_List = action.payload.user_List;
    }),
    [DELETE_USER_LIST]: (state, action) =>
      produce(state, (draft) => {
      draft.user_List = state.user_List.filter((p) =>  p.userId !== action.payload.userId);
    }),
    [EDIT_USER_LIST]: (state, action) =>
    produce(state, (draft) => {
      draft.user_List = state.user_List.map((e) => {
      if (e.userId === action.payload.userId){
        return {...e, userLevel : action.payload.userLevel}
      }
      return e
      })
    }),
  },
  initialState
);