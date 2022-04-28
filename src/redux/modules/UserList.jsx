import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import {getCookie} from "../../shared/Cookie";


// 액션

const LOAD_USER_LIST = "LOAD_USER_LIST";

// 초기값

const initialState = {
  user_List : []
  };

// 액션 생성 함수
const __loadUserList = createAction(LOAD_USER_LIST, (user_List) => ({user_List}));

// 미들웨어

export const getUserListFB = () => {
  return function (dispatch, getState, { history }) {
    // const myToken = getCookie("Authorization",)
  axios.get('http://localhost:3001/userList'
  // ,{headers : {"Authorization" : `Bearer ${myToken}`}}
  )
  .then((res) => {
    // console.log(res)
    dispatch(__loadUserList(res.data));
  })
  .catch((err)=> {
    console.log(err);
  })
}
}

// 리듀서
export default handleActions(
  {
    [LOAD_USER_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.user_List = action.payload.user_List;
        // console.log(draft.user_List)
  }),
  
  },
  initialState
);

