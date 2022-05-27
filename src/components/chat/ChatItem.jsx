import React from "react";
import styled from "styled-components";

import { setRoom } from "../../redux/modules/chat";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

const ChatItem = (props) => {
  const dispatch = useDispatch();

  return (
    <ChatItemWrap back>
      <ChatItemWrap onClick={() => dispatch(setRoom(props.room))}>
        <RoomTitleArea>
          <RoomTitle>{props.room?.name}</RoomTitle>
          {props.room?.lastMessage && (
            <time
              style={{
                minWidth: "max-content",
                height: "fit-content",
                color: "#282828",
                fontWeight: "400",
                fontSize: "0.9em",
              }}
              dateTime={dayjs(props.room.lastMessage?.createdAt).format("")}
            >
              {dayjs(props.room.lastMessage?.createdAt).format("h:m a")}
            </time>
          )}
        </RoomTitleArea>
        {props.room?.lastMessage ? (
          <LatestMsg>
            <span style={{ fontWeight: 600 }}>{props.room?.lastMessage?.nickname}     </span>
            {props.room?.lastMessage?.message}
          </LatestMsg>
        ) : (
          <LatestMsg blank>대화가 없습니다.</LatestMsg>
        )}
      </ChatItemWrap>
    </ChatItemWrap>
  );
};

const ChatItemWrap = styled.div`
  padding: 1rem 0;
  user-select: none;

  ${(props) =>
    props.back
      ? `
  cursor: pointer;
  padding: 0 1rem;
  :hover {
    z-index: 50;
    transition: all 200ms ease-in-out;
    background-color: rgba(255, 94, 0, 0.05);
  }
  `
      : `
  border-bottom: 1px solid #e0e0e0;
  `}
`;

const RoomTitleArea = styled.div`
  letter-spacing: -1px;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
`;

const RoomTitle = styled.p`
  margin: 0;
  /* max-width: 80%; */
  font-weight: 600;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  height: fit-content;
`;

const LatestMsg = styled.div`
  color: ${(props) => (props.blank ? "#a2a2a2" : "#000")};
`;

export default ChatItem;
