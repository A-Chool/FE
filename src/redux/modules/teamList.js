import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import {getCookie} from "../../shared/Cookie";

// 액션
const LOAD_WEEK_LIST = 'LOAD_WEEK_LIST';
const LOAD_TEAM_LIST = 'LOAD_TEAM_LIST';
const ADD_TEAM_LIST ='ADD_TEAM_LIST';
const DELETE_TEAM_LIST = 'DELETE_TEAM_LIST';

const LOAD_MEMBER_LIST = 'LOAD_MEMBER_LIST';
const ADD_MEMBER_LIST = 'ADD_MEMBER_LIST';
const DELETE_MEMBER_LIST = 'DELETE_MEMBER_LIST';



// 초기값
const initialState = {
  teams : []
};

// 액션 생성 함수
const __loadWeekList = createAction( LOAD_WEEK_LIST, (week) => ({week}) );
const __loadTeamList = createAction( LOAD_TEAM_LIST, (teams) => ({teams}) );
const __addTeamList = createAction( ADD_TEAM_LIST, (week, teams) => ({week, teams}) );
const __deleteTeamList = createAction( DELETE_TEAM_LIST, (teamId) => ({teamId}) );

const __loadMemberList = createAction( LOAD_MEMBER_LIST, (memberList) => ({memberList}) )
const __addMemberList = createAction( ADD_MEMBER_LIST, (userId, teamId, weekId) => ({weekId, teamId, userId}) )
const __deleteMemberList = createAction( DELETE_MEMBER_LIST, (memberId, userId) => ({memberId, userId}) ) 



// 미들웨어


// 주차 리스트 조회
export const getWeekList = () => {
return function (dispatch, getState, { history }) {
  const myToken = getCookie("Authorization")
  axios.get('https://a-chool.com:443/api/admin/teams/week'
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
export const getTeamList = (weekId) => {
  return function (dispatch, getState, { history }) {
    const myToken = getCookie("Authorization");
    axios.get(`https://a-chool.com:443/api/admin/teams/${weekId}`
    ,{headers : {"Authorization" : `Bearer ${myToken}`}}
    )
    .then((res) => {
      console.log(res.data)
      console.log(weekId)
      dispatch(__loadTeamList(res.data, weekId));
    })
    .catch((err)=> {
      console.log("팀리스트 조회 에러: ", err)
    })
  }
}

// 팀 추가
export const addTeamList = (teamName, weekId) => {
  return function (dispatch, getState, {history}) {
    if(!teamName) {window.alert("팀 이름이 없습니다!")}
    const myToken = getCookie("Authorization");
    axios({
      method: "post",
      url: `https://a-chool.com:443/api/admin/teams/${weekId}`,
      data: {teamName},
      headers: {
      Authorization: `Bearer ${myToken}`
      },
    })
    .then((res) => {
      dispatch(__addTeamList(res.data));
      axios.get(`https://a-chool.com:443/api/admin/teams/${weekId}`
      ,{headers : {"Authorization" : `Bearer ${myToken}`}}
      )
      .then((res) => {
        console.log(res.data)
        console.log(weekId)
        dispatch(__loadTeamList(res.data, weekId));
      })
      .catch((err)=> {
        console.log("팀리스트 조회 에러: ", err)
      })
    })
    .catch((err) => {
      console.log("팀 추가 에러: ", err)
    })
  }
}

// 팀 삭제
export const deleteTeamList = (teamId, weekId) => {
  return function (dispatch, getState, {history}) {
    if(!teamId) {window.alert("팀 아이디가 없습니다!")}
    const myToken = getCookie("Authorization");
    axios({
      method: "delete",
      url: `https://a-chool.com:443/api/admin/teams/${teamId}`,     
      headers: {
      Authorization: `Bearer ${myToken}`
      },
    })
    .then((res) => {
      dispatch(__deleteTeamList(res.data));
      axios.get(`https://a-chool.com:443/api/admin/teams/${weekId}`
      ,{headers : {"Authorization" : `Bearer ${myToken}`}}
      )
      .then((res) => {
        dispatch(__loadTeamList(res.data, weekId));
      })
      .catch((err)=> {
        console.log("팀리스트 조회 에러: ", err)
      })
    })
    .catch((err) => {
      console.log("팀 삭제 에러 : ", err)
    })
  }
}


// member 조회 미들웨어
export const loadMemberList = (weekId) => {
  return function (dispatch, getState, { history }) {
    const myToken = getCookie("Authorization");
    axios.get(`https://a-chool.com:443/api/admin/noMember/${weekId}`
    ,{headers : {"Authorization" : `Bearer ${myToken}`}}
    )
    .then((res) => {
      dispatch(__loadMemberList(res.data));
    })
    .catch((err)=> {
      console.log("멤버 조회 에러: ", err)
    })
  }
}

// member 추가 미들웨어
export const addMemberList = (userId, teamId, weekId) => {
  console.log(userId, teamId, weekId)
  return function (dispatch, getState, {history}) {
    if(!userId) {window.alert("유저 이름이 없습니다!")}
    const myToken = getCookie("Authorization");
    axios({
      method: "post",
      url: `https://a-chool.com:443/api/admin/member/${weekId}`,
      data: {
      userId : userId,
      teamId : teamId,
    },
    headers: {Authorization: `Bearer ${myToken}`},
    })
    .then((res) => {
      dispatch(__addMemberList(res.data));
      axios.get(`https://a-chool.com:443/api/admin/teams/${weekId}`
      ,{headers : {"Authorization" : `Bearer ${myToken}`}}
      )
      .then((res) => {
        console.log(res.data)
        console.log(weekId)
        dispatch(__loadTeamList(res.data, weekId));
      })
      .catch((err)=> {
        console.log("팀리스트 조회 에러: ", err)
      })
      axios.get(`https://a-chool.com:443/api/admin/noMember/${weekId}`
      ,{headers : {"Authorization" : `Bearer ${myToken}`}}
      )
      .then((res) => {
        dispatch(__loadMemberList(res.data));
      })
      .catch((err)=> {
        console.log("멤버 조회 에러: ", err)
      })
    })
    .catch((err) => {
      console.log("멤버 추가 에러: ", err)
    })
  }
}

// 팀원 삭제

export const deleteMemberList = (memberId, userId, weekId) => {
  return function (dispatch, getState, {history}) {
    if(!memberId) {window.alert("유저 아이디가 없습니다!")}
    const myToken = getCookie("Authorization");
    axios({
      method: "delete",
      url: `https://a-chool.com:443/api/admin/member/${memberId}`,
      // data : {userId : userId},     
      headers: {
      Authorization: `Bearer ${myToken}`
      },
    })
    .then(() => {
      dispatch(__deleteMemberList(memberId));
      axios.get(`https://a-chool.com:443/api/admin/teams/${weekId}`
      ,{headers : {"Authorization" : `Bearer ${myToken}`}}
      )
      .then((res) => {
        console.log(res.data)
        console.log(weekId)
        dispatch(__loadTeamList(res.data, weekId));
      })
      .catch((err)=> {
        console.log("팀리스트 조회 에러: ", err)
      })
      axios.get(`https://a-chool.com:443/api/admin/noMember/${weekId}`
      ,{headers : {"Authorization" : `Bearer ${myToken}`}}
      )
      .then((res) => {
        dispatch(__loadMemberList(res.data));
      })
      .catch((err)=> {
        console.log("멤버 조회 에러: ", err)
      })
    })
    .catch((err) => {
      console.log("멤버 삭제 에러: ", err)
    })
  }
}



// 리듀서

export default handleActions(
  {
    [LOAD_WEEK_LIST]: (state, action) =>
      produce(state, (draft) => {
      draft.week = action.payload.week;      
    }),
    [LOAD_TEAM_LIST]: (state, action) =>
      produce(state, (draft) => {
      draft.teams = action.payload.teams;      
    }),
    // [DELETE_TEAM_LIST]: (state, action) =>
    //   produce(state, (draft) => {
    //     console.log(state)
    //     console.log(action.payload)
    //   draft.teams = state.teams.filter((p) =>  p.teamId !== action.payload.teamId);
    // }),

    [LOAD_MEMBER_LIST]: (state, action) =>
    produce(state, (draft) => {
    draft.memberList = action.payload.memberList;  
    }),
  },
  initialState
);