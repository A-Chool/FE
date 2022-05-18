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
    // dispatch(loadChatList());
  }, []);

  // console.log(chatList);

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
      <ChatWrapHeader>
        <div>
          {room && <Grid onClick={() => dispatch(setRoom(null))}>목록</Grid>}
          <h1>{room?.name || "항해99"}</h1>
          <Grid onClick={() => setTrigger(false)}>닫기</Grid>
        </div>
      </ChatWrapHeader>
      <ChatWrapContent>
        {room ? (
          <ChatDetail />
        ) : (
          chatList.map((item) => <ChatItem key={item.roomId} room={item} />)
        )}
      </ChatWrapContent>
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
  max-height: 400px;
  min-height: 10vh;
  max-width: 20vw;
  width: 16rem;
  min-width: 16rem;
  overflow: scroll;
  white-space: pre-line;
  word-break: break-all;
  margin: 0.5rem;

  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;

  animation: ${(props) => (props.animationTrigger ? "fadeIn" : "fadeOut")} 200ms
    ease-in-out;

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

const ChatWrapHeader = styled.div`
  top: 0;
  z-index: 999;
  position: sticky;
  background-color: #fff;
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
`;

const ChatWrapContent = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default ChatContainer;
