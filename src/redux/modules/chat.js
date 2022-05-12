import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getCookie } from "../../shared/Cookie";

const api_url = "http://3.39.0.208";

const TOGGLE_CHATBOX = "TOGGLE_CHATBOX";
const LOAD_CHAT_LIST = "LOAD_CHAT_LIST";
const SET_ROOM = "SET_ROOM";

const initialState = {
  open: false,
  chatList: [],
  room: null,
};

const __toggleChatBox = createAction(TOGGLE_CHATBOX, () => ({}));
const __loadChatList = createAction(LOAD_CHAT_LIST, (chatList) => ({ chatList }));
const __setRoom = createAction(SET_ROOM, (room) => ({ room }));

export const toggleChatBox = () => {
  return function (dispatch, getState, { history }) {
    dispatch(__toggleChatBox());
  };
};

export const loadChatList = () => {
  return function (dispatch, getState, { history }) {
    const myToken = getCookie("Authorization");
    axios
      .get(`${api_url}/chat/rooms`, { headers: { Authorization: `Bearer ${myToken}` } })
      .then((res) => {
        if (parseInt(res.status / 100) === 2) {
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
  },
  initialState
);
