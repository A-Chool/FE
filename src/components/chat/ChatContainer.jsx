import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { toggleChatBox, loadChatList, setRoom } from "../../redux/modules/chat";
import { useDispatch, useSelector } from "react-redux";
import ChatItem from "./ChatItem";
import ChatDetail from "./ChatDetail";

const ChatContainer = (props) => {
  const isOpen = useSelector((state) => state.chat.open);
  const isLogin = useSelector((state) => state.user.is_login);
  const chatList = useSelector((state) => state.chat.chatList);
  const room = useSelector((state) => state.chat.room);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin) {
      dispatch(loadChatList());
    } else {
    }
  }, [isLogin, isOpen]);

  console.log(isOpen);

  return (
    <ChatWrap isOpen={isOpen}>
      <ChatWrapper style={{ position: "relative" }}>
        <ChatWrapHeader>
          <div>
            {room && <Grid onClick={() => dispatch(setRoom(null))}>목록</Grid>}
            <h1>{room?.name || "항해99"}</h1>
            <Grid onClick={() => dispatch(toggleChatBox())}>닫기</Grid>
          </div>
        </ChatWrapHeader>

        <ChatWrapContent>
          {room ? <ChatDetail /> : chatList.map((item) => <ChatItem key={item.roomId} room={item} />)}
        </ChatWrapContent>
      </ChatWrapper>
    </ChatWrap>
  );
};

const ChatWrap = styled.div`
  position: absolute;
  /* top: 0; */
  bottom: 0;
  background-color: #ffffffd0;
  backdrop-filter: blur(10px);
  z-index: 100;

  border-radius: 1rem;
  /* padding: 1rem; */
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  max-height: 720px;
  min-height: 30vh;
  max-width: 350px;
  width: 100%;
  min-width: 20rem;
  white-space: pre-line;
  word-break: break-all;
  margin: 0.5rem;

  overflow: hidden;

  display: flex;
  flex-direction: column;

  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transform: ${(props) => (props.isOpen ? "translateX(0)" : "translateX(-12rem)")};
  opacity: ${(props) => (props.isOpen ? "1" : "0")};

  transition: all 200ms ease-in-out;
`;

const ChatWrapper = styled.div`
  position: relative;
  height: 100%;
  overflow-y: scroll;
`;

const ChatWrapHeader = styled.div`
  top: 0;
  z-index: 999;
  position: fixed;
  background-color: #fff;
  width: 100%;
  & > div {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    background-color: rgba(255, 94, 0, 0.5);
    border-bottom: rgba(255, 94, 0);
  }
  h1 {
    font-size: 1rem;
    font-weight: 700;
    margin: 0;

    max-width: 60%;
    width: fit-content;
    overflow: hidden;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    height: min-content;
  }
`;

const Grid = styled.div`
  /* justify-self: ${(props) => (props.end ? "end" : "start")}; */
  flex: none;
  cursor: pointer;
`;

const ChatWrapContent = styled.div`
  margin-top: 50px;
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
`;

export default ChatContainer;
