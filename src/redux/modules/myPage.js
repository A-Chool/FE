import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import {getCookie} from "../../shared/Cookie";

// 액션
const LOAD_MYPAGE = 'LOAD_MYPAGE';

// 초기값
const initialState = {
  userInfo : [

  ]
}

// 액션 생성 함수
const __loadMyPage = createAction(LOAD_MYPAGE, (userInfo) => ({userInfo}));

// 미들웨어

//유저 정보 불러오기 미들웨어
export const loadMyPage = () => {
  return function (dispatch, getState, { history }) {
    const myToken = getCookie("Authorization");
    axios.get('https://achool.shop/api/user/mypage'
    ,{headers : {"Authorization" : `Bearer ${myToken}`}}
    )
    .then((res) => {
      dispatch(__loadMyPage(res.data));
    })
    .catch((err)=> {
      console.log("마이페이지 정보 불러오기 err", err);
    })
  }
}

// 수정 미들웨어
// export const editGroundRule = (teamId, groundRule, weekId) => {
//   console.log(teamId, groundRule)
//   return function (dispatch, getState, {history}) {
//     if(!teamId) {window.alert("팀 아이디가 없습니다!")}
//     const myToken = getCookie("Authorization");
//     axios({
//       method: "put",
//       url: `https://achool.shop/api/user/teamBoard/groundRule/${teamId}`,
//       data: {
//         groundRule
//       },
//       headers: {Authorization : `Bearer ${myToken}`},
//     })
//     .then(() => {
//       dispatch(__editGroundRule(groundRule));
//       const bucket = {
//         headers : {"Authorization" : `Bearer ${myToken}`}
//         ,params: {teamId: teamId}
//       }
//       axios.get('https://achool.shop/api/user/teamBoard', bucket)
//       .then((res) => {
//         dispatch(__loadTeamBoard(res.data));
//       })
//       .catch((err)=> {
//         console.log(err);
//       })
//       })
//     .catch((err) => {
//       console.log("서버에러: ", err)
//     })
//   }
// }

// 리듀서
export default handleActions(
  {
    [LOAD_MYPAGE]: (state, action) =>
      produce(state, (draft) => {
      draft.userInfo = action.payload.userInfo;  
    }),
    // [EDIT_TODO_LIST]: (state, action) =>
    //   produce(state, (draft) => {
    //   draft.teamBoard.toDoList = state.teamBoard.toDoList.map((e) => {
    //     if (e.todoId === action.payload.todoId.todoId){
    //       return {...e, todoContent : action.payload.todoId.todoContent}
    //     }
    //     return e
    //     })
    // }),
  },
  initialState
);