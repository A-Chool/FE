import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getCookie } from "../../shared/Cookie";

const api_url = "https://achool.shop";

const TOGGLE_CHATBOX = "TOGGLE_CHATBOX";
const LOAD_CHAT_LIST = "LOAD_CHAT_LIST";
const SET_ROOM = "SET_ROOM";
const LOAD_CHAT_MESSAGES = "LOAD_CHAT_MESSAGES";
const LOAD_CHAT_MESSAGES_PREV = "LOAD_CHAT_MESSAGES_PREV";
const SET_LATEST_MESSAGE = "SET_LATEST_MESSAGE";
const RESET_CHAT_MESSAGES_STATE = "RESET_CHAT_MESSAGES_STATE";

const initialState = {
  open: false,
  chatList: [],
  room: null,
  chatMessages: [],
  chatMessagesPrevId: null,
  isInitialized: false,
  isEnd: false,
  lastChatCreatedAt: null,
};

const __loadChatList = createAction(LOAD_CHAT_LIST, (chatList) => ({
  chatList,
}));
const __setRoom = createAction(SET_ROOM, (room) => ({ room }));
const __loadChatMessages = createAction(LOAD_CHAT_MESSAGES, (chatMessages) => ({
  chatMessages,
}));
const __loadChatMessagesPrev = createAction(LOAD_CHAT_MESSAGES_PREV, (chatMessages, chatMessagesPrevId) => ({
  chatMessages,
  chatMessagesPrevId,
}));
const __setLatestMessage = createAction(SET_LATEST_MESSAGE, (latestMessage) => ({
  latestMessage,
}));

export const toggleChatBox = createAction(TOGGLE_CHATBOX, () => ({}));
export const resetChatMessagesState = createAction(RESET_CHAT_MESSAGES_STATE, () => ({}));

export const loadChatList = () => {
  return function (dispatch, getState, { history }) {
    const myToken = getCookie("Authorization");
    axios
      .get(`${api_url}/chat/rooms`, {
        headers: { Authorization: `Bearer ${myToken}` },
      })
      .then((res) => {
        if (parseInt(res.status / 100) === 2) {
          // chat 방이 하나여도 보여짐
          dispatch(__loadChatList(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setRoom = (room) => {
  return function (dispatch, getState, { history }) {
    dispatch(__setRoom(room));
  };
};

export const loadChatMessages = (roomId) => {
  return function (dispatch, getState, { history }) {
    const userToken = getCookie("userToken");
    axios
      .get(`https://achool.shop/chat/message/${roomId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        dispatch(__loadChatMessages(res.data));
        // console.log(res.data.chatMessageList);
      })
      .catch((err) => console.log(err));
  };
};

export const loadChatMessagesPrev = (roomId) => {
  return async function (dispatch, getState, { history }) {
    const userToken = getCookie("userToken");
    const prevId = getState().chat.chatMessagesPrevId;
    const isEnd = getState().chat.isEnd;
    if (isEnd) return console.log("마지막 내역입니다.");
    // console.log("prevId", prevId);
    await axios
      .get(`https://achool.shop/chat/message/file/${roomId}${!!prevId ? `?prevId=${prevId}` : ``}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        // console.log(res);
        dispatch(__loadChatMessagesPrev(res.data.chatMessageList, res.data.prevId));
      })
      .catch((err) => console.log(err));
  };
};

export const setLatestMessage = (latestChat) => {
  return function (dispatch, getState, { history }) {
    dispatch(__setLatestMessage(latestChat));
  };
};

export default handleActions(
  {
    [TOGGLE_CHATBOX]: (state, action) =>
      produce(state, (draft) => {
        draft.open = !state.open;
      }),
    [LOAD_CHAT_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.chatList = action.payload.chatList;
      }),
    [SET_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.room = action.payload.room;
      }),
    [LOAD_CHAT_MESSAGES]: (state, action) =>
      produce(state, (draft) => {
        draft.chatMessages = action.payload.chatMessages;
        draft.isInitialized = true;
        draft.lastChatCreatedAt = action.payload?.chatMessages[0]?.createdAt;
      }),
    [LOAD_CHAT_MESSAGES_PREV]: (state, action) =>
      produce(state, (draft) => {
        let _chatMessages = [...state?.chatMessages];
        const prevChatMessages = action.payload.chatMessages || [];
        _chatMessages = prevChatMessages.concat(_chatMessages);
        draft.chatMessages = _chatMessages;
        draft.lastChatCreatedAt = _chatMessages[5]?.createdAt; // 추가 로드될때 채팅 개수 늘어나는 만큼 수정해야
        draft.chatMessagesPrevId = action.payload?.chatMessagesPrevId || null;
        draft.isEnd = action?.payload?.chatMessagesPrevId === 0;
      }),
    [SET_LATEST_MESSAGE]: (state, action) =>
      produce(state, (draft) => {
        let _chatMessages = [...state?.chatMessages];
        draft.chatMessages = _chatMessages.concat([action.payload.latestMessage]);
      }),
    [RESET_CHAT_MESSAGES_STATE]: (state, action) =>
      produce(state, (draft) => {
        draft.chatMessages = [];
        draft.chatMessagesPrevId = null;
        draft.isInitialized = false;
        draft.isEnd = false;
      }),
  },
  initialState
);
