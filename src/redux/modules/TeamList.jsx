import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import {getCookie} from "../../shared/Cookie";

// 액션
const LOAD_TEAM_LIST = 'LOAD_TEAM_LIST';
const ADD_TEAM_LIST ='ADD_TEAM_LIST';

// 초기값
const initialState = {
  teams : []
};

// 액션 생성 함수
const __loadTeamList = createAction( LOAD_TEAM_LIST, (teams) => ({teams}) );
const __addTeamList = createAction( ADD_TEAM_LIST, (team_list) => ({team_list}) )

// 미들웨어
export const getTeamListFB = (week) => {
  return function (dispatch, getState, { history }) {
    // console.log(week)
    const myToken = getCookie("Authorization")
    // console.log(myToken);
    axios.get(`http://13.124.226.148/api/admin/teams/${week}`
    ,{headers : {"Authorization" : `Bearer ${myToken}`}}
    )
    .then((res) => {
      // console.log(res)
      dispatch(__loadTeamList(res.data));
    })
    .catch((err)=> {
      console.log(err);
    })
  }
}

export const addTeamListFB = (teamName, week) => {
  return function (dispatch, getState, {history}) {
    console.log(teamName, week)
    if(!teamName) {
      window.alert("팀 이름이 없습니다!")
    }
    const myToken = getCookie("Authorization");
    axios({
      method: "post",
      url: `http://13.124.226.148/api/admin/teams/`,
      data: {
        teamName : teamName,
        week : week
      },
      headers: {
        Authorization: `Bearer ${myToken}`
      },
    })
    .then((response) => {
      console.log(response);
      dispatch(__addTeamList(teamName, week));
    })
    .catch((err) => {
      console.log("서버에러: ", err)
    })
}}


// 리듀서

export default handleActions(
  {
    [LOAD_TEAM_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.teams = action.payload.teams;      
        console.log(draft.teams)
    }),
  
  },
  initialState
);