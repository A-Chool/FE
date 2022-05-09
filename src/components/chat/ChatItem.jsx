import React from "react";
import styled from "styled-components";

import { setRoom } from "../../redux/modules/chat";
import { useDispatch } from "react-redux";

const ChatItem = (props) => {
  const dispatch = useDispatch();

  return <ChatItemWrap onClick={() => dispatch(setRoom(props.room))}>{props.room?.name}</ChatItemWrap>;
};

const ChatItemWrap = styled.div`
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.2), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  user-select: none;
  cursor: pointer;
  margin: 5px 0;
  background-color: white;
  :hover {
    z-index: 50;
  }
`;

export default ChatItem;
