import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
// 소켓 통신
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { getUserId, getCookie } from "../../shared/Cookie";
import axios from "axios";
import { toggleChatBox, loadChatList, setRoom } from "../../redux/modules/chat";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

const ChatDetail = (props) => {
  const room = useSelector((state) => state.chat.room);
  console.log(room?.roomId)

  const userId = getUserId();

  const [loaded, setLoaded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [enterMsg, setEnterMsg] = useState(null);
  const [content, setContent] = useState("");
  //   const [roomId, setRoomId] = useState("faaa902e-f2d4-4221-a0ca-e413025f8834");
  const myToken = getCookie("Authorization");

  const chattingRef = React.useRef();

  const latestChatWrapRef = useRef();

  // 소켓 연결에 필요한 변수
  // console.log(userId); const devTarget = "http://localhost:8080/ws-stomp";
  const devTarget = "https://www.a-chool.com:443/ws-stomp";
  let sock = new SockJS(devTarget);
  let ws = Stomp.over(sock);

  let reconnect = 0;

  // 소켓 연결
  const connect = () => {
    ws.connect(
      // {},
      { Authorization: `Bearer ${myToken}` },
      (frame) => {
        ws.subscribe("/sub/chat/room/" + room?.roomId, (message) => {
          const recv = JSON.parse(message.body);

          //채팅 내역 불러오기
          console.log(recv);
          if (recv.type === "ENTER") {
          setLoaded(true);
          setEnterMsg(recv);
          chattingRef.current.scrollIntoView({ behavior: "smooth" });
          } else if (recv.type === "TALK") {
          //소켓 연결 후 받은 채팅 출력
          recvMessage(recv);
          chattingRef.current.scrollIntoView({ behavior: "smooth" });
          }
          getMessageList();
        });
        ws.send(
          "/pub/chat/message",
          {
            Authorization: `Bearer ${myToken}`,
          },
          JSON.stringify({ type: "ENTER", roomId: room?.roomId, sender: userId, message: "구독!", createdAt: "" })
        );
      },
      (error) => {
        if (reconnect++ < 5) {
          setTimeout(function () {
            console.log("connection reconnect");
            sock = new SockJS(devTarget);
            ws = Stomp.over(sock);
            connect();
          }, 10 * 1000);
        }
      }
    );
  };
  // 채팅방 입장시 사용하는 코드들
  console.log(messages);
  const ExitChat = () => {
    console.log("exit");
  };

  // 메세지 보내기
  const sendMessage = () => {
    ws.send("/pub/chat/message", { Authorization: `Bearer ${myToken}` }, JSON.stringify({ type: "TALK", roomId: room?.roomId, sender: userId, message: content, createdAt: "" }));
    setContent("");
  };

  // 메세지 받기
  const recvMessage = (message) => {
    setMessages([...messages, message]);
  };

  // 저장된 메시지 출력
  const getMessageList = () => {
    axios
      .get(`https://www.a-chool.com:443/chat/message/${room?.roomId}`, {
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
      })
      .then((res) => {
        setMessages(res.data);
        // dispatch(__loadTeamList(res.data));
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleKeyUp = (e) => {
    // 엔터 키코드 13
    if (e.keyCode === 13) {
      sendMessage();
    }
  };

  // useEffect(() => {
  //   if (room?.roomId) setRoomId(room.roomId);
  // }, [room]);

  useEffect(() => {
    connect();
    return () => {
      setLoaded(false);
    };
  }, [room?.roomId]);

  useEffect(() => {
    console.log(enterMsg?.message || "");
  }, [enterMsg]);

  useEffect(() => {
    // if (messages.length > 0) latestChatWrapRef.current.scrollIntoView({ block: "end" });
  }, [messages]);

  if (!userId) return <>로그인이 필요합니다.</>;
  if (!room?.roomId) return <>연결된 방이 존재하지 않습니다.</>;

  return (
    <ChatDisplay>
      <ChatContents>
        {loaded ? (
          messages?.length > 0 &&
          messages.map((item, index) => {
            return (
              <ChatWrap key={index} ref={index === messages.length - 1 ? latestChatWrapRef : null} align={item.sender === userId ? "end" : "start"}>
                <ChatUser>{item.sender}</ChatUser>
                <ChatMsg self={item.sender === userId}>{item.message}</ChatMsg>
                <Time dateTime={dayjs(item.createdAt).format("")}>{dayjs(item.createdAt).format("hh:mm a")}</Time>
              </ChatWrap>
            );
          })
          ) : (
            <div style={{ textAlign: "center" }}>로딩중</div>
            )}
      </ChatContents>
      <div ref={chattingRef} />
      <ChatInputArea>
        <ChatInput type="text" placeholder="채팅을 입력해주세요" value={content} onChange={handleChange} onKeyUp={handleKeyUp} />
        <ChatBtn disabled={!content} onClick={sendMessage}>
          전송
        </ChatBtn>
      </ChatInputArea>
    </ChatDisplay>
  );
};

const ChatDisplay = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ChatContents = styled.div`
  /* flex: 1 1 100%; */
  width: 100%;
  overflow: scroll;
  padding: 1rem;
  box-sizing: border-box;
`;

const ChatWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.align};
  padding: 1rem 0;
  box-sizing: border-box;
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

const ChatInputArea = styled.div`
  position: sticky;
  bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0.5rem 0 0.5rem;
  box-sizing: border-box;
  z-index: 999;
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

export default ChatDetail;
