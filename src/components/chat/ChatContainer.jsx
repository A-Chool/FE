import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { toggleChatBox, loadChatList, setRoom } from "../../redux/modules/chat";
import { useDispatch, useSelector } from "react-redux";
import ChatItem from "./ChatItem";
import ChatDetail from "./ChatDetail";

const ChatContainer = (props) => {
  const isOpen = useSelector((state) => state.chat.open);
  const chatList = useSelector((state) => state.chat.chatList);
  const room = useSelector((state) => state.chat.room);
  const dispatch = useDispatch();
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    if (isOpen) setTrigger(true);
    // dispatch(loadChatList());
  }, [isOpen]);

  useEffect(() => {
    dispatch(loadChatList());
  }, [dispatch]);

  return (
    <ChatWrap
      isOpen={isOpen}
      animationTrigger={trigger}
      onAnimationEnd={() => {
        if (!trigger) {
          dispatch(toggleChatBox());
          setTrigger(true);
        }
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Grid onClick={() => setTrigger(false)}>닫기</Grid>
        <Grid onClick={() => dispatch(setRoom(null))}>목록</Grid>
        {room ? <ChatDetail /> : chatList.map((item) => <ChatItem key={item.roomId} room={item} />)}
      </div>
    </ChatWrap>
  );
};

const ChatWrap = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: #f4f6f9;
  z-index: 100;

  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  max-width: 20vw;
  width: 14rem;
  min-width: 13rem;
  overflow: scroll;
  white-space: pre-line;
  word-break: break-all;
  margin: 0.5rem;

  display: ${(props) => (props.isOpen ? "block" : "none")};

  animation: ${(props) => (props.animationTrigger ? "fadeIn" : "fadeOut")} 200ms ease-in-out;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateX(-2rem);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
      transform: translateX(0);
    }
    100% {
      opacity: 0;
      transform: translateX(-10rem);
    }
  }
`;

const Grid = styled.div`
  flex: none;
`;
export default ChatContainer;
