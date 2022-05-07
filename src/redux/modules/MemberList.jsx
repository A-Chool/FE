import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import {getCookie} from "../../shared/Cookie";


// 액션
const LOAD_MEMBER_LIST = 'LOAD_MEMBER_LIST';
const ADD_MEMBER_LIST = 'ADD_MEMBER_LIST';
const DELETE_MEMBER_LIST = 'DELETE_MEMBER_LIST';


// 초기값
const initialState = {
  memberList : []
};

const initialTeam = {};


// 액션 생성 함수
const __loadMemberList = createAction( LOAD_MEMBER_LIST, (memberList) => ({memberList}) )
const __addMemberList = createAction( ADD_MEMBER_LIST, (teamId, userId) => ({teamId, userId}) )
const __deleteMemberList = createAction( DELETE_MEMBER_LIST, (memberId, userId) => ({memberId, userId}) ) 


// 미들웨어


// member 조회 미들웨어
export const loadMemberList = (week) => {
  return function (dispatch, getState, { history }) {
    const myToken = getCookie("Authorization");
    axios.get(`http://13.124.226.148/api/admin/teams/noMember/${week}`
    ,{headers : {"Authorization" : `Bearer ${myToken}`}}
    )
    .then((res) => {
      dispatch(__loadMemberList(res.data));
    })
    .catch((err)=> {
      console.log(err);
    })
  }
}

// member 추가 미들웨어
export const addMemberList = (teamId, userId) => {
  return function (dispatch, getState, {history}) {
    if(!userId) {window.alert("유저 이름이 없습니다!")}
    const myToken = getCookie("Authorization");
    axios({
      method: "post",
      url: `http://13.124.226.148/api/admin/teams/members`,
      data: {
      teamId : teamId,
      userId : userId
    },
    headers: {Authorization: `Bearer ${myToken}`},
    })
    .then((response) => {
      dispatch(__addMemberList(teamId, userId));
    })
    .catch((err) => {
      console.log("서버에러: ", err)
    })
  }
}

// 팀원 삭제

export const deleteMemberList = (memberId, userId) => {
  return function (dispatch, getState, {history}) {
    if(!memberId) {window.alert("유저 아이디가 없습니다!")}
    const myToken = getCookie("Authorization");
    axios({
      method: "delete",
      url: `http://13.124.226.148/api/admin/teams/members/${memberId}`,
      // data : {userId : userId},     
      headers: {
      Authorization: `Bearer ${myToken}`
      },
    })
    .then(() => {
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
    [LOAD_MEMBER_LIST]: (state, action) =>
      produce(state, (draft) => {
      draft.memberList = action.payload.memberList;  
    }),
    [ADD_MEMBER_LIST]: (state, action) =>
    produce(state, (draft) => {
    draft.memberList = state.memberList.filter((p) =>  p.userId !== action.payload.userId);
    // draft.teams.push({teamId : 0, teamName : action.payload.week, week : action.payload.teams, memberList : []})
    }),
    [DELETE_MEMBER_LIST]: (state, action) =>
    produce(state, (draft) => {
      // console.log(state);
      // console.log(state.memberList);
      // console.log(action.payload);
      // console.log(action.payload.userId);
    }),
  },
  initialState
);