import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import {getCookie} from "../../shared/Cookie";

// 액션
const LOAD_TEAM_BOARD = 'LOAD_TEAM_BOARD';
const EDIT_GROUNDROLE = 'EDIT_GROUNDROLE';
const EDIT_WORKSPACE = 'EDIT_WORKSPACE';

// 초기값
const initialState = {
  teamBoard : [

  ]
}

// 액션 생성 함수
const __loadTeamBoard = createAction(LOAD_TEAM_BOARD, (teamBoard) => ({teamBoard}));
const __editGroundRole = createAction(EDIT_GROUNDROLE, (week, teamId, groundRole) => ({week, teamId, groundRole}));
const __editWorkSpace = createAction(EDIT_WORKSPACE, (week, teamId, workSpace) => ({week, teamId, workSpace}));

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

// 유저 팀보드 그라운드룰 수정 미들웨어
export const editTeamBoard = (week, teamId, groundRole) => {
  return function (dispatch, getState, {history}) {
    if(!teamId) {window.alert("팀 아이디가 없습니다!")}
    const myToken = getCookie("Authorization");
    axios({
      method: "put",
      url: 'http://3.39.0.208/api/user/teamBoard/groundRole',
      data: {
        week : week,
        teamId : teamId,
        groundRole : groundRole,
      },
      headers: {Authorization: `Bearer ${myToken}`},
    })
    .then(() => {
      dispatch(__editGroundRole(week, teamId, groundRole));
    })
    .catch((err) => {
      console.log("서버에러: ", err)
    })
  }
}

// 유저 팀보드 워크스페이스 수정 미들웨어
export const editWorkSpace = (week, teamId, workSpace) => {
  return function (dispatch, getState, {history}) {
    if(!teamId) {window.alert("팀 아이디가 없습니다!")}
    const myToken = getCookie("Authorization");
    axios({
      method: "put",
      url: 'http://3.39.0.208/api/user/teamBoard/workSpace',
      data: {
        week : week,
        teamId : teamId,
        groundRole : workSpace,
      },
      headers: {Authorization: `Bearer ${myToken}`},
    })
    .then(() => {
      dispatch(__editWorkSpace(week, teamId, workSpace));
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
    // [EDIT_GROUNDROLE]: (state, action) =>
    // produce(state, (draft) => {
    //   draft.groundRole = state.groundRole.map((e) => {
    //   if (e.teamId === action.payload.teamId){
    //     return {...e, groundRole : action.payload.groundRole}
    //   }
    //   return e
    //   })
    // }),
    // 워크스페이스는 돌려막기
  },
  initialState
);