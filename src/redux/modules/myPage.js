import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getCookie } from "../../shared/Cookie";

// 액션
const LOAD_MYPAGE = "LOAD_MYPAGE";
const EDIT_PROFILE = "EDIT_PROFILE";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";

// 초기값
const initialState = {
  userInfo: [],
};

// 액션 생성 함수
const __loadMyPage = createAction(LOAD_MYPAGE, (userInfo) => ({ userInfo }));
const __editProfile = createAction(EDIT_PROFILE, (userInfo) => ({ userInfo }));
const __uploadImage = createAction(UPLOAD_IMAGE, (userImage) => ({ userImage }));

// 미들웨어

//유저 정보 불러오기 미들웨어
export const loadMyPage = () => {
  return function (dispatch, getState, { history }) {
    const myToken = getCookie("Authorization");
    axios
      .get("https://achool.shop/api/user/mypage", { headers: { Authorization: `Bearer ${myToken}` } })
      .then((res) => {
        dispatch(__loadMyPage(res.data));
      })
      .catch((err) => {
        console.log("마이페이지 정보 불러오기 err", err);
      });
  };
};

// 수정 미들웨어
export const editProfile = (userName, userTag, userGitHub, findKakaoId, phoneNumber) => {
  console.log(userName, userTag, userGitHub, findKakaoId, phoneNumber);
  return function (dispatch, getState, { history }) {
    // if(!) {window.alert("팀 아이디가 없습니다!")}
    const myToken = getCookie("Authorization");
    console.log(myToken);
    axios({
      method: "put",
      url: `https://achool.shop/api/user/mypage`,
      data: {
        userName: userName,
        userTag: userTag,
        userGitHub: userGitHub,
        findKakaoId: findKakaoId,
        phoneNumber: phoneNumber,
      },
      headers: { Authorization: `Bearer ${myToken}` },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(__editProfile(res.data));
        // const bucket = {
        //   headers : {"Authorization" : `Bearer ${myToken}`}
        //   ,params: {teamId: teamId}
        // }
        // axios.get('https://achool.shop/api/user/teamBoard', bucket)
        // .then((res) => {
        //   dispatch(__loadTeamBoard(res.data));
        // })
        // .catch((err)=> {
        //   console.log(err);
        // })
      })
      .catch((err) => {
        console.log("프로필 수정 에러: ", err);
      });
  };
};

// 수정 미들웨어
export const uploadImage = (imageUrl) => {
  return function (dispatch, getState, { history }) {
    const formData = new FormData();
    formData.append("imageUrl", imageUrl);
    const myToken = getCookie("Authorization");
    axios({
      method: "put",
      url: `https://achool.shop/api/user/mypage/image`,
      data: formData,
      headers: {
        Authorization: `Bearer ${myToken}`,
        "Content-Type": `multipart/form-data`,
      },
    })
      .then((res) => {
        dispatch(__uploadImage(res.data));
        return res.data;
      })
      .catch((err) => {
        console.log("프로필 사진 수정 에러: ", err);
      });
  };
};

// 리듀서
export default handleActions(
  {
    [LOAD_MYPAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo = action.payload.userInfo;
      }),
    [UPLOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo.userImage = action.payload.userImage;
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
