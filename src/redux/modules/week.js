import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import {getCookie} from "../../shared/Cookie";

// 액션
const LOAD_WEEKLIST = 'LOAD_WEEKLIST';
const ADD_WEEKLIST = 'ADD_WEEKLIST';
const DELETE_WEEKLIST = 'DELETE_WEEKLIST';
const EDIT_WEEK_NAME = 'EDIT_WEEK_NAME';
const SET_DISPLAY_WEEK = 'SET_DISPLAY_WEEK';

// 초기값
const initialState = {
  week : []
}

// 액션 생성 함수
const __loadWeekList = createAction(LOAD_WEEKLIST, (week) => ({week}))
const __addWeekList = createAction(ADD_WEEKLIST, (week) => ({week}))
const __deleteWeekList = createAction(DELETE_WEEKLIST, (weekId) => ({weekId}))
const __editWeekName = createAction(EDIT_WEEK_NAME, (weekId, weekName) => ({weekId, weekName}))
const __setDisplayWeek = createAction(SET_DISPLAY_WEEK, (weekId) => ({weekId}))

// 미들웨어

// 모든 주차 조회 미들웨어 
export const loadWeekList = () => {
  return function (dispatch, getState, { history }) {
    const myToken = getCookie("Authorization")
    axios.get('https://13.209.21.57/api/admin/week'
      ,{headers : {"Authorization" : `Bearer ${myToken}`}}
      )
      .then((res) => {
        dispatch(__loadWeekList(res.data));
      })
      .catch((err)=> {
        console.log("모든 주차 조회 에러: ", err)
      })
    }
  }

// 주차 추가 미들웨어 
export const addWeekList = (weekName) => {
  return function (dispatch, getState, {history}) {
    if(!weekName) {window.alert("주차 이름이 없습니다!")}
    const myToken = getCookie("Authorization");
    axios({
      method: "post",
      url: `https://13.209.21.57/api/admin/week`,
      data: {
        weekName : weekName,
      },
      headers: {
      Authorization: `Bearer ${myToken}`
      },
    })
    .then((res) => {
      dispatch(__addWeekList(res.data));
    })
    .catch((err) => {
      console.log("주차 추가 에러: ", err)
    })
  }
}

// 주차 삭제
export const deleteWeekList = (weekId) => {
  return function (dispatch, getState, {history}) {
    if(!weekId) {window.alert("주차 아이디가 없습니다!")}
    const myToken = getCookie("Authorization");
    axios({
      method: "delete",
      url: `https://13.209.21.57/api/admin/week/${weekId}`,     
      headers: {
      Authorization: `Bearer ${myToken}`
      },
    })
    .then((res) => {
      dispatch(__deleteWeekList(res.data));
    })
    .catch((err) => {
      console.log("주차 삭제 에러: ", err)
    })
  }
}

// 주차 수정 미들웨어
export const editWeekName = (weekId, weekName) => {
  return function (dispatch, getState, {history}) {
    if(!weekId) {window.alert("주차 아이디가 없습니다!")}
    const myToken = getCookie("Authorization");
    axios({
      method: "put",
      url: `https://13.209.21.57/api/admin/week/${weekId}`,
      data: {
        weekName
      },
      headers: {Authorization: `Bearer ${myToken}`},
    })
    .then((res) => {
      dispatch(__editWeekName(res.data));
      })
    .catch((err) => {
      console.log("주차 수정 에러: ", err)
    })
  }
}

// 디폴트 주차 추가 미들웨어 
export const setDisplayWeek = (weekId) => {
  return function (dispatch, getState, {history}) {
    if(!weekId) {window.alert("주차 이름이 없습니다!")}
    const myToken = getCookie("Authorization");
    axios({
      method: "post",
      url: `https://13.209.21.57/api/admin/week/${weekId}`,
      data: {},
      headers: {
      Authorization: `Bearer ${myToken}`
      },
    })
    .then((res) => {
      dispatch(__setDisplayWeek(res.data));
    })
    .catch((err) => {
      console.log("주차 추가 에러: ", err)
    })
  }
}

// 리듀서

export default handleActions(
  {
    [LOAD_WEEKLIST]: (state, action) =>
      produce(state, (draft) => {
      draft.weekList = action.payload.week.data;  
    }),
    [ADD_WEEKLIST]: (state, action) =>
    produce(state, (draft) => {
      draft.weekList = [...state.weekList , action.payload.week.data]
    }),
    [DELETE_WEEKLIST]: (state, action) =>
      produce(state, (draft) => {
      draft.weekList = state.weekList.filter((p) =>  p.weekId !== action.payload.weekId.data);
    }),
    [EDIT_WEEK_NAME]: (state, action) =>
      produce(state, (draft) => {
      draft.weekList = state.weekList.map((e) => {
      if (e.weekId === action.payload.weekId.data.weekId){
        return {...e, weekName : action.payload.weekId.data.weekName}
      }
      return e
      })
      }),
      [SET_DISPLAY_WEEK]: (state, action) =>
      produce(state, (draft) => {
        draft.weekList = state.weekList.map((e) => {
        if (e.weekId === action.payload.weekId.data.weekId){
          return {...e, display : action.payload.weekId.data.display}
        } else {
          return {...e, display : false}
        }
        })
      }),
  },
  initialState
);