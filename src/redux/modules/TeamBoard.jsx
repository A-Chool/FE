import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import {getCookie} from "../../shared/Cookie";

// 액션
const LOAD_TEAM_BOARD = 'LOAD_TEAM_BOARD';
const SET_WEEK_TEAM_BOARD = 'SET_WEEK_TEAM_BOARD';
const EDIT_GROUNDRuLE = 'EDIT_GROUNDROLE';
const EDIT_WORKSPACE = 'EDIT_WORKSPACE';

// 초기값
const initialState = {
  teamBoard : [

  ]
}

// 액션 생성 함수
const __loadTeamBoard = createAction(LOAD_TEAM_BOARD, (teamBoard) => ({teamBoard}));
const __setWeekTeamBoard = createAction(SET_WEEK_TEAM_BOARD, (teamBoard) => ({teamBoard}))
const __editGroundRule = createAction(EDIT_GROUNDRuLE, (weekTeamId, groundRule) => ({weekTeamId, groundRule}));
const __editWorkSpace = createAction(EDIT_WORKSPACE, (weekTeamId, workSpace) => ({weekTeamId, workSpace}));

// 미들웨어

// 유저 팀보드 불러오기 미들웨어
export const loadTeamBoard = () => {
  return function (dispatch, getState, { history }) {
    const myToken = getCookie("Authorization");
    axios.get('http://3.39.0.208/api/user/teamBoard'
    ,{headers : {"Authorization" : `Bearer ${myToken}`}}
    )
    .then((res) => {
      dispatch(__loadTeamBoard(res.data));
    })
    .catch((err)=> {
      console.log(err);
    })
  }
}

export const setWeekTeamBoard = (weekTeamId) => {
  return function (dispatch, getState, { history }) {
    const myToken = getCookie("Authorization");
    axios.get(`http://3.39.0.208/api/user/teamBoard/${weekTeamId}`
    ,{headers : {"Authorization" : `Bearer ${myToken}`}}
    )
    .then((res) => {
      dispatch(__setWeekTeamBoard(res.data));
    })
    .catch((err)=> {
      console.log(err);
    })
  }
}

// 유저 팀보드 그라운드룰 수정 미들웨어
export const editGroundRule = (weekTeamId, groundRule) => {
  console.log(weekTeamId, groundRule)
  return function (dispatch, getState, {history}) {
    if(!weekTeamId) {window.alert("팀 아이디가 없습니다!")}
    const myToken = getCookie("Authorization");
    axios({
      method: "put",
      url: `http://3.39.0.208/api/user/teamBoard/groundRule/${weekTeamId}`,
      data: {
        groundRule
      },
      headers: {Authorization : `Bearer ${myToken}`},
    })
    .then(() => {
      dispatch(__editGroundRule(groundRule));
      axios.get(`http://3.39.0.208/api/user/teamBoard/${weekTeamId}`
      ,{headers : {"Authorization" : `Bearer ${myToken}`}}
      )
      .then((res) => {
        dispatch(__setWeekTeamBoard(res.data));
      })
      .catch((err)=> {
        console.log(err);
      })
      })
    .catch((err) => {
      console.log("서버에러: ", err)
    })
  }
}

// 유저 팀보드 워크스페이스 수정 미들웨어
export const editWorkSpace = (weekTeamId, workSpace) => {
  return function (dispatch, getState, {history}) {
    if(!weekTeamId) {window.alert("팀 아이디가 없습니다!")}
    const myToken = getCookie("Authorization");
    axios({
      method: "put",
      url: `http://3.39.0.208/api/user/teamBoard/workSpace/${weekTeamId}`,
      data: {
        workSpace
      },
      headers: {Authorization: `Bearer ${myToken}`},
    })
    .then(() => {
      dispatch(__editWorkSpace(workSpace));
      axios.get(`http://3.39.0.208/api/user/teamBoard/${weekTeamId}`
      ,{headers : {"Authorization" : `Bearer ${myToken}`}}
      )
      .then((res) => {
        dispatch(__setWeekTeamBoard(res.data));
      })
      .catch((err)=> {
        console.log(err);
      })
      })
    .catch((err) => {
      console.log("서버에러: ", err)
    })
  }
}

// 리듀서
export default handleActions(
  {
    [LOAD_TEAM_BOARD]: (state, action) =>
      produce(state, (draft) => {
      draft.teamBoard = action.payload.teamBoard;  
    }),
    [SET_WEEK_TEAM_BOARD]: (state, action) =>
    produce(state, (draft) => {
    draft.teamBoard = action.payload.teamBoard;  
    }),
  },
  initialState
);