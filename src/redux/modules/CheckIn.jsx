import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import {getCookie} from "../../shared/Cookie";


// 액션
const LOAD_CHECKIN_LIST = 'LOAD_CHECKIN_LIST';

// 초기값
const initialState ={
  teamList : []
}

// 액션 생성 함수
const __loadCheckInList = createAction((teamList) => ({teamList}));

// 미들웨어
export const loadCheckList = (week) => {
  return function (dispatch, getState, { history }) {
    const myToken = getCookie("Authorization");
    axios.get(`http://13.124.226.148/api/checkInList/${week}`
    ,{headers : {"Authorization" : `Bearer ${myToken}`}}
    )
    .then((res) => {
      console.log(res)
      dispatch(__loadCheckInList(res.data));
    })
    .catch((err)=> {
      console.log(err);
    })
  }
}

// 리듀서
export default handleActions(
  {
    [LOAD_CHECKIN_LIST]: (state, action) =>
      produce(state, (draft) => {
      draft.teamList = action.payload.teamList;  
    }),
  },
  initialState
);