import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import {getCookie} from "../../shared/Cookie";
import { createRef } from "react";

// 액션
const LOAD_WEEK_LIST = 'LOAD_WEEK_LIST';
const LOAD_TEAM_LIST = 'LOAD_TEAM_LIST';
const ADD_TEAM_LIST ='ADD_TEAM_LIST';
const DELETE_TEAM_LIST = 'DELETE_TEAM_LIST';
const DELETE_MEMBER_LIST = 'DELETE_MEMBER_LIST';


// 초기값
const initialState = {
  teams : []
};

// 액션 생성 함수
const __loadWeekList = createAction( LOAD_WEEK_LIST, (week) => ({week}) );
const __loadTeamList = createAction( LOAD_TEAM_LIST, (teams) => ({teams}) );
const __addTeamList = createAction( ADD_TEAM_LIST, (week, team_list) => ({week, team_list}) );
const __deleteTeamList = createAction( DELETE_TEAM_LIST, (teamId) => ({teamId}) );
const __deleteMemberList = createAction( DELETE_MEMBER_LIST, (memberId) => ({memberId}) ) 


// 미들웨어


// 주차 리스트 조회
export const getWeekListFB = () => {
return function (dispatch, getState, { history }) {
  const myToken = getCookie("Authorization")
  axios.get('http://13.124.226.148/api/admin/teams/week'
    ,{headers : {"Authorization" : `Bearer ${myToken}`}}
    )
    .then((res) => {
      dispatch(__loadWeekList(res.data));
    })
    .catch((err)=> {
      console.log(err);
    })
  }
} 

// 팀 리스트 조회
export const getTeamListFB = (week) => {
  return function (dispatch, getState, { history }) {
    const myToken = getCookie("Authorization");
    axios.get(`http://13.124.226.148/api/admin/teams/${week}`
    ,{headers : {"Authorization" : `Bearer ${myToken}`}}
    )
    .then((res) => {
      dispatch(__loadTeamList(res.data));
    })
    .catch((err)=> {
      console.log(err);
    })
  }
}

// 팀 추가
export const addTeamListFB = (teamName, week) => {
  return function (dispatch, getState, {history}) {
    if(!teamName) {window.alert("팀 이름이 없습니다!")}
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
      dispatch(__addTeamList(teamName, week));
    })
    .catch((err) => {
      console.log("서버에러: ", err)
    })
  }
}

// 팀 삭제
export const deleteTeamListFB = (teamId) => {
  return function (dispatch, getState, {history}) {
    if(!teamId) {window.alert("팀 아이디가 없습니다!")}
    const myToken = getCookie("Authorization");
    axios({
      method: "delete",
      url: `http://13.124.226.148/api/admin/teams/${teamId}`,     
      headers: {
      Authorization: `Bearer ${myToken}`
      },
    })
    .then((response) => {
      dispatch(__deleteTeamList(teamId));
    })
    .catch((err) => {
      console.log("서버에러: ", err)
    })
  }
}

// 팀원 삭제

export const deleteMemberListFB = (memberId) => {
  return function (dispatch, getState, {history}) {
    if(!memberId) {window.alert("유저 아이디가 없습니다!")}
    const myToken = getCookie("Authorization");
    axios({
      method: "delete",
      url: `http://13.124.226.148/api/admin/teams/members/${memberId}`,     
      headers: {
      Authorization: `Bearer ${myToken}`
      },
    })
    .then((response) => {
      dispatch(__deleteMemberList(memberId));
    })
    .catch((err) => {
      console.log("서버에러: ", err)
    })
  }
}




// 리듀서

export default handleActions(
  {
    [LOAD_TEAM_LIST]: (state, action) =>
      produce(state, (draft) => {
      draft.teams = action.payload.teams;      
    }),
    [LOAD_WEEK_LIST]: (state, action) =>
      produce(state, (draft) => {
      draft.week = action.payload.week;      
    }),
    // [ADD_TEAM_LIST]: (state, action) =>
    //   produce(state, (draft) => {
    //   draft.week = action.payload.week;
    //   // draft.todos.content.unshift(action.payload.post_list);      
    // }),
    // [DELETE_TEAM_LIST]: (state, action) =>
    //   produce(state, (draft) => {

    //   const teamList = state.teams;
    //   console.log(teamList)
    //   const teams = [];
    //   for (const i in teamList) {
    //     const teamData = [i.split(':')]
    //     teams.push({'teamName' : teamData[0][0], 'teamId' : teamData[0][1] , 'memberList' : teamList[i]});
    //   }
    //   console.log(teams)
    //   let a = teams.map((e, idx) => { return e.teamId })
    //   console.log(a)
    //   console.log(action.payload.temaId)

    //   console.log(a.filter((p) =>  p !== action.payload.teamId))

    //   const test = a.filter((p) =>  p !== action.payload.teamId)
      
      // // draft.teams = state.teams.filter((p) =>  p.teamId !== action.payload.teamId);
      // draft.teams = state.teams.map((e) => {
      //   const teamList = state.teams;
      //   const teams = [];
      //   for (const i in teamList) {
      //     const teamData = [i.split(':')]
      //     teams.push({'teamName' : teamData[0][0], 'teamId' : teamData[0][1] , 'memberList' : teamList[i]});
      //   }
      //   teams.map((data) => { return data.teamId })
      //   if (e.teamId === action.payload.teamId){
      //     return {...e, teamId : action.payload.teamId}
      //   }
      //   return e
      //   })
    // }),
  },
  initialState
);