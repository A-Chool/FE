import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
// 소켓 통신
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { getUserId, getCookie } from "../../shared/Cookie";
import {
  loadChatMessages,
  setLatestMessage,
  loadChatMessagesPrev,
  resetChatMessagesState,
} from "../../redux/modules/chat";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

const ChatDetail = (props) => {
  const dispatch = useDispatch();

  const room = useSelector((state) => state.chat.room);
  const chatMessages = useSelector((state) => state.chat.chatMessages);
  const isInitialized = useSelector((state) => state.chat.isInitialized);
  const chatMessagesPrevId = useSelector((state) => state.chat.chatMessagesPrevId);
  const isEnd = useSelector((state) => state.chat.isEnd);
  const lastChatCreatedAt = useSelector((state) => state.chat.lastChatCreatedAt);
  // console.log(chatMessages);

  const userId = getUserId();
  const [content, setContent] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isInLoadingArea, setInLoadingArea] = useState(false);

  //   const [roomId, setRoomId] = useState("faaa902e-f2d4-4221-a0ca-e413025f8834");
  const myToken = getCookie("Authorization");

  const chattingRef = useRef(null);
  const latestChatWrapRef = useRef(null);
  const chatContentsRef = useRef(null);
  const chatContentsRefCurrent = chatContentsRef.current;
  const theChat = useRef(null);

  // 소켓 연결에 필요한 변수
  // console.log(userId); const devTarget = "http://localhost:8080/ws-stomp";
  const devTarget = "https://achool.shop/ws-stomp";
  let sock = new SockJS(devTarget);
  let ws = Stomp.over(sock);
  const headers = { Authorization: `Bearer ${myToken}` };

  let reconnect = 0;

  // 소켓 연결
  const connect = () => {
    ws.connect(headers, subscribe, (error) => {
      if (reconnect++ < 5) {
        setTimeout(function () {
          console.log("connection reconnect");
          sock = new SockJS(devTarget);
          ws = Stomp.over(sock);
          connect();
        }, 10 * 1000);
      }
    });
  };

  const subscribe = (frame) => {
    setTimeout(() => {
      console.log("ㄴsubscribe");
      ws.subscribe("/sub/chat/room/" + room?.roomId, (message) => {
        const res = JSON.parse(message.body);

        //채팅 내역 불러오기
        const userInfo = JSON.parse(localStorage.userInfo);
        dispatch(setLatestMessage(res));
        //소켓 연결 후 받은 채팅 출력
      });
    }, 100);

    enterChat();
  };

  const enterChat = () => {
    ws.send(
      "/pub/chat/message",
      headers,
      JSON.stringify({
        type: "ENTER",
        roomId: room?.roomId,
        sender: userId,
        message: "",
        createdAt: "",
      })
    );
  };

  const sendMessage = () => {
    ws.send(
      "/pub/chat/message",
      headers,
      JSON.stringify({
        type: "TALK",
        roomId: room?.roomId,
        sender: userId,
        message: content,
        createdAt: "",
      })
    );
    setContent("");
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleKeyUp = (e) => {
    // 엔터 키코드 13
    if (!content) return;
    if (e.keyCode === 13) {
      sendMessage();
    }
  };

  useEffect(() => {
    connect();
    dispatch(loadChatMessages(room?.roomId));
    return () => {
      ws.disconnect();
      dispatch(resetChatMessagesState());
    };
  }, [room?.roomId]);

  const listenScrollChange = (e) => {
    // console.log(e.target.scrollTop);
    if (e.target.scrollTop < 50) {
      setInLoadingArea(true);
      e.preventDefault();
    } else {
      setInLoadingArea(false);
    }
  };

  useEffect(() => {
    if (isInitialized) {
      chattingRef.current.scrollIntoView({ block: "end" });
      setInLoadingArea(false);
      chatContentsRefCurrent?.addEventListener("scroll", listenScrollChange);
    }
    return () => {
      chatContentsRefCurrent?.removeEventListener("scroll", listenScrollChange);
    };
  }, [isInitialized]);

  useEffect(() => {
    if (chatMessagesPrevId) {
      if (theChat.current) {
        theChat.current.scrollIntoView({ block: "start" });
        theChat.current.style.borderTop = "1px solid #ff5e00";
        theChat.current.style.backgroundColor = "#ff5e0033";
        setTimeout(() => {
          theChat.current.style.borderTop = "0px solid transparent";
          theChat.current.style.backgroundColor = "transparent";
        }, 3000);
      }
    }
  }, [chatMessagesPrevId]);

  const loadChatPrev = async () => {
    setLoading(true);
    await dispatch(loadChatMessagesPrev(room?.roomId));
    setLoading(false);
  };

  useEffect(() => {
    if (isInLoadingArea && !isEnd) {
      loadChatPrev();
    }
  }, [isInLoadingArea, isEnd]);

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  if (!userId) return <>로그인이 필요합니다.</>;
  if (!room?.roomId) return <>연결된 방이 존재하지 않습니다.</>;

  return (
    <ChatDisplay ref={chatContentsRef}>
      {isLoading ? (
        <div
          style={{
            backgroundColor: "transparent",
            border: "0px solid transparent",
            cursor: !isEnd && "pointer",
            width: "100%",
            padding: "1rem 0 0.5rem",
            textAlign: "center",
            fontSize: "0.85rem",
            color: "#ff5e00",
          }}
        >
          이전 채팅을 불러오고 있어요.
        </div>
      ) : isEnd ? (
        <div
          style={{
            backgroundColor: "transparent",
            border: "0px solid transparent",
            cursor: !isEnd && "pointer",
            width: "100%",
            padding: "1rem 0 0.5rem ",
            textAlign: "center",
            fontSize: "0.85rem",
            color: "#ff5e00",
            position: "fixed",
            top: "20",
          }}
        >
          더 불러올 채팅이 없어요.
        </div>
      ) : (
        <></>
      )}
      <ChatContents>
        {chatMessages?.length > 0 &&
          chatMessages.map((item, index) => {
            // if (item.createdAt === lastChatCreatedAt) console.log(item.message);
            return (
              <ChatWrap
                key={index}
                ref={
                  index === chatMessages.length - 1
                    ? latestChatWrapRef
                    : item.createdAt === lastChatCreatedAt
                    ? theChat
                    : null
                }
                align={item.sender === userId ? "end" : "start"}
              >
                <ChatUser>{item.sender}</ChatUser>
                <ChatMsg self={item.sender === userId}>{item.message}</ChatMsg>
                <Time dateTime={dayjs(item.createdAt).format("")}>{dayjs(item.createdAt).format("hh:mm a")}</Time>
              </ChatWrap>
            );
          })}

        <BottomRef ref={chattingRef} />
      </ChatContents>
      <ChatInputArea htmlFor="chat-input">
        <ChatInput
          id="chat-input"
          type="text"
          placeholder="채팅을 입력해주세요"
          value={content}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          disabled={isLoading}
        />
        <ChatBtn disabled={isLoading || !content} onClick={sendMessage}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FF5F00" />
            <path
              d="M17.8383 6.16988C17.7595 6.09152 17.6599 6.03728 17.5513 6.01351C17.4427 5.98974 17.3295 5.99745 17.2251 6.03572L4.37689 10.7021C4.26609 10.7441 4.17069 10.8188 4.10337 10.9162C4.03605 11.0136 4 11.1292 4 11.2475C4 11.3659 4.03605 11.4815 4.10337 11.5789C4.17069 11.6763 4.26609 11.7509 4.37689 11.7929L9.39355 13.7937L13.0962 10.0838L13.9196 10.9063L10.1995 14.6219L12.2085 19.6325C12.2518 19.7411 12.3267 19.8341 12.4235 19.8996C12.5203 19.9651 12.6346 20.0001 12.7516 20C12.8696 19.9976 12.9841 19.9595 13.0801 19.8908C13.176 19.822 13.2488 19.7259 13.2889 19.615L17.961 6.78235C18.0008 6.67915 18.0104 6.56678 17.9887 6.45834C17.9669 6.3499 17.9148 6.24985 17.8383 6.16988Z"
              fill="white"
            />
          </svg>
        </ChatBtn>
      </ChatInputArea>
    </ChatDisplay>
  );
};

const ChatDisplay = styled.div`
  height: 100%;
  position: relative;
  margin-top: 50px;
  flex: 1 1 0;
  flex-grow: 1;
  overflow-y: scroll;
  height: 100%;
`;

const ChatContents = styled.div`
  /* flex: 1 1 100%; */
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
`;

const ChatWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.align};
  padding: 1rem 0;
  box-sizing: border-box;

  transition: all 500ms ease-in-out;
`;

const ChatUser = styled.div`
  font-weight: 700;
  font-size: 0.8em;
`;
const ChatMsg = styled.div`
  padding: 0.8rem 1rem 0.8rem 0.8rem;
  border-radius: ${(props) => (props.self ? " 2rem 0.5rem 2rem 2rem" : "0.5rem 2rem 2rem 2rem")};
  background-color: ${(props) => (props.self ? "#ff5e00" : "#fff")};
  border: ${(props) => (props.self ? "0" : "1px solid #ddd")};
  color: ${(props) => (props.self ? "#fff" : "inherit")};
  font-weight: 500;
  margin: 0.25rem 0;
  box-sizing: border-box;
`;

const ChatInputArea = styled.label`
  position: fixed;
  z-index: 999;
  bottom: 10px;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0.5rem 0 0.5rem;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 999rem;
  border: 1px solid #ddd;
  padding: 0.5rem;
`;

const ChatInput = styled.input`
  width: 100%;
  outline: none;
  background-color: transparent;
  border: 0;
  margin: 0.5rem;
`;

const ChatBtn = styled.button`
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  width: max-content;
  white-space: nowrap;
  outline: none;
  background-color: transparent;
  border-radius: 999rem;
  border: 1px solid #ddd;
  padding: 0.5rem;
`;

const Time = styled.time`
  font-size: 0.8em;
  font-weight: 400;
  color: #585858;
`;

const BottomRef = styled.div`
  height: 70px;
  width: 100%;
`;

export default ChatDetail;
