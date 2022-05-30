import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import {getCookie} from "../../shared/Cookie";

// 액션 
const LOAD_USER_STUDY = 'LOAD_USER_STUDY';
const LOAD_CARROT = 'LOAD_CARROT';
const LOAD_LINE = 'LOAD_LINE';
const LOAD_RANKLIST = 'LOAD_RANKLIST';

// 초기값
const initialState = {
  rank : [],
  carrot : [
    {
      day: '2022-01-01', 
      value: 0
    },
    {
      day: '2022-01-02', 
      value: 1
    },
  ],
  line : {
      usersAvg:[
      "1:10",
      "2:12",
      "3:15",
      ],
      myTotal:[
      "1:0",
      "2:14",
      "3:11",
      ]
    }
  
}

// 액션 생성 함수
const __loadUserStudy = createAction(LOAD_USER_STUDY, (rank) => ({rank}))
const __loadCarrot = createAction(LOAD_CARROT, (carrot) => ({carrot}))
const __loadLine = createAction(LOAD_LINE, (line) => ({line}))
const __loadRankList = createAction(LOAD_RANKLIST, (rankList) => ({rankList}))

// 미들웨어
export const loadUserStudy = () => {
  return function (dispatch, getState, { history }) {
    const myToken = getCookie("Authorization")
    axios.get('https://achool.shop/api/user/analysis/top'
      ,{headers : {"Authorization" : `Bearer ${myToken}`}}
      )
      .then((res) => {
        dispatch(__loadUserStudy(res.data));
      })
      .catch((err)=> {
        console.log("공부시간 불러오기 에러: ", err)
      })
    }
  }

export const loadCarrot = () => {
  return function (dispatch, getState, { history }) {
    const myToken = getCookie("Authorization")
    axios.get('https://achool.shop/api/user/analysis'
      ,{headers : {"Authorization" : `Bearer ${myToken}`}}
      )
      .then((res) => {
        dispatch(__loadCarrot(res.data));
      })
      .catch((err)=> {
        console.log("당근밭 불러오기 에러: ", err)
      })
    }
  }

export const loadLine = () => {
  return function (dispatch, getState, { history }) {
    const myToken = getCookie("Authorization")
    axios.get('https://achool.shop/api/user/analysis/line'
      ,{headers : {"Authorization" : `Bearer ${myToken}`}}
      )
      .then((res) => {
        dispatch(__loadLine(res.data));
      })
      .catch((err)=> {
        console.log("line 불러오기 에러: ", err)
      })
    }
  }

export const loadRankList = () => {
  return function (dispatch, getState, { history }) {
    const myToken = getCookie("Authorization")
    axios.get('https://achool.shop/api/user/analysis/rank'
      ,{headers : {"Authorization" : `Bearer ${myToken}`}}
      )
      .then((res) => {
        dispatch(__loadRankList(res.data));
      })
      .catch((err)=> {
        console.log("랭킹 불러오기 에러: ", err)
      })
    }
  }

// 리듀서
export default handleActions(
  {
    [LOAD_USER_STUDY]: (state, action) =>
      produce(state, (draft) => {
      draft.rank = action.payload.rank;  
    }),
    [LOAD_CARROT]: (state, action) =>
      produce(state, (draft) => {
      draft.carrot = action.payload?.carrot;
    }),
    [LOAD_LINE]: (state, action) =>
      produce(state, (draft) => {
      draft.line = action.payload.line;  
    }),
    [LOAD_RANKLIST]: (state, action) =>
      produce(state, (draft) => {
      draft.rankList = action.payload.rankList;  
    }),
  },
  initialState
);