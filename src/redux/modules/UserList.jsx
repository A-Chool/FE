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
  user_List : []
  };

// 액션 생성 함수
const __loadUserList = createAction(LOAD_USER_LIST, (user_List) => ({user_List}));
const __deleteUserList = createAction(DELETE_USER_LIST, (user) => ({user}));
const __editUserList = createAction(DELETE_USER_LIST, (user) => ({user}));

// 미들웨어

export const getUserListFB = () => {
  return function (dispatch, getState, { history }) {
    // const myToken = getCookie("Authorization",)
  axios.get('http://13.124.226.148/api/admin/userList'
  // ,{headers : {"Authorization" : `Bearer ${myToken}`}}
  )
  .then((res) => {
    console.log(res)
    dispatch(__loadUserList(res.data));
  })
  .catch((err)=> {
    console.log(err);
  })
}
}

export const deleteUserListFB = (userId) => {
  console.log("userId",userId)
    return function (dispatch, getState, {history}) {
      if(!userId) {
        window.alert("유저 아이디가 없습니다!")
      }
      // const myToken = getCookie("Authorization");
      axios({
        method: "delete",
        url: `http://13.124.226.148/api/admin/${userId}`,     
        // headers: {
        //   Authorization: `${myToken}`
        // },
      })
      .then((response) => {
        console.log(response);
        dispatch(__deleteUserList(userId));
        window.location.reload();
      })
      .catch((err) => {
        console.log("서버에러: ", err)
      })
    }
  }

  export const editUserListFB = (userId, userLevel) => {
    return function (dispatch, getState, {history}) {
      console.log(userId, userLevel)
      if(!userId) {
        window.alert("유저 아이디가 없습니다!")
      }
      // const myToken = getCookie("Authorization");
      axios({
        method: "put",
        url: `http://13.124.226.148/api/admin/${userId}`,
        data: {
          userLevel : userLevel,
        },
        // headers: {
        //   Authorization: `Bearer ${myToken}`
        // },
      })
      .then((response) => {
        console.log(response);
        dispatch(__editUserList(userLevel));
      })
      .catch((err) => {
        console.log("서버에러: ", err)
      })
  }}

// 리듀서
export default handleActions(
  {
    [LOAD_USER_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.user_List = action.payload.user_List;
        // console.log(draft.user_List)
    }),
    // [DELETE_USER_LIST]: (state, action) =>
    //   produce(state, (draft) => {
    //   console.log("스테이트 액션",state, action)
    //   draft.user = draft.user.filter((p) =>  p.userId !== action.payload.userId);
    //   }),
  
  },
  initialState
);

