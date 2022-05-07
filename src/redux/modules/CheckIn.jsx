import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import {getCookie} from "../../shared/Cookie";


// 액션
const LOAD_CHECKIN_LIST = 'LOAD_CHECKIN_LIST';
const LOAD_CHECKIN = 'LOAD_CHECKIN';
const USER_CHECKIN = 'USER_CHECKIN';
const USER_CHECKOUT = 'USER_CHECKOUT';


// 초기값
const initialState ={
  checkInList : []
}


// 액션 생성 함수
const __loadCheckInList = createAction(LOAD_CHECKIN_LIST, (checkInList) => ({checkInList}));
const __loadCheckIn = createAction(LOAD_CHECKIN, (checkIn) => ({checkIn}));
const __userCheckIn = createAction(USER_CHECKIN, (checkIn) => ({checkIn}));
const __userCheckOut = createAction(USER_CHECKOUT, (checkOut) => ({checkOut}))


// 미들웨어

// 전체 유저 체크인 여부 및 정보 가져오는 미들웨어
export const loadCheckList = (week) => {
  return function (dispatch, getState, { history }) {
    const myToken = getCookie("Authorization");
    axios.get(`http://3.39.0.208/api/checkInList/${week}`
    ,{headers : {"Authorization" : `Bearer ${myToken}`}}
    )
    .then((res) => {
      dispatch(__loadCheckInList(res.data));
    })
    .catch((err)=> {
      console.log(err);
    })
  }
}

// 체크인을 눌러놨다면 다시 접속했을때 기록을 띄워주는 미들웨어
export const loadCheckIn = () => {
  return function (dispatch, getState, { history }) {
    const myToken = getCookie("Authorization");
    axios.get('http://3.39.0.208/api/checkIn'
    ,{headers : {"Authorization" : `Bearer ${myToken}`}}
    )
    .then((res) => {
      dispatch(__loadCheckIn(res.data));
    })
    .catch((err)=> {
      console.log(err);
    })
  }
}

// 체크인을 눌렀을 때 요청을 보내주는 미들웨어 
export const userCheckIn = () => {
  return function (dispatch, getState, { history }){
    const myToken = getCookie("Authorization");
    axios.post('http://3.39.0.208/api/checkIn',
    {headers : {"Authorization" : `Bearer ${myToken}`}}
    )
    .then((res) => {
      dispatch(__userCheckIn(res.data))
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

// 체크아웃을 눌렀을 때 요청을 보내주는 미들웨어 
export const userCheckOut = () => {
  return function (dispatch, getState, { history }){
    const myToken = getCookie("Authorization");
    axios.post('http://3.39.0.208/api/checkOut',
    {headers : {"Authorization" : `Bearer ${myToken}`}}
    )
    .then((res) => {
      dispatch(__userCheckOut(res.data))
    })
    .catch((err) => {
      console.log(err)
    })
  }
}


// 리듀서
export default handleActions(
  {
    [LOAD_CHECKIN_LIST]: (state, action) =>
      produce(state, (draft) => {
      draft.checkInList = action.payload.checkInList;  
    }),
    // [LOAD_CHECKIN]: (state, action) =>
    // produce(state, (draft) => {
    // draft.checkIn = action.payload.checkIn;  
    // }),
    // [USER_CHECKIN]: (state, action) =>
    //   produce(state, (draft) => {
    //   draft.checkIn = action.payload.checkIn;  
    // }),
    // [USER_CHECKOUT]: (state, action) =>
    // produce(state, (draft) => {
    // draft.checkOut = action.payload.checkOut;  
    // }),
  },
  initialState
);