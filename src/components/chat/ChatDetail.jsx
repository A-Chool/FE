import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
// 소켓 통신
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { getUserId, getCookie } from "../../shared/Cookie";
import axios from "axios";
import { toggleChatBox, loadChatList, setRoom } from "../../redux/modules/chat";
import { useDispatch, useSelector } from "react-redux";

const ChatDetail = (props) => {
  const room = useSelector((state) => state.chat.room);

  const userId = getUserId();

  const [loaded, setLoaded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [enterMsg, setEnterMsg] = useState(null);
  const [content, setContent] = useState("");
  const [roomId, setRoomId] = useState(null);
  //   const [roomId, setRoomId] = useState("faaa902e-f2d4-4221-a0ca-e413025f8834");
  const myToken = getCookie("Authorization");

  const latestChatWrapRef = useRef();

  // 소켓 연결에 필요한 변수
  // console.log(userId); const devTarget = "http://localhost:8080/ws-stomp";
  const devTarget = "http://3.39.0.208:8080/ws-stomp";
  let sock = new SockJS(devTarget);
  let ws = Stomp.over(sock);

  let reconnect = 0;

  // 소켓 연결
  const connect = (roomId) => {
    ws.connect(
      // {},
      { Authorization: `Bearer ${myToken}` },
      (frame) => {
        ws.subscribe("/sub/chat/room/" + roomId, (message) => {
          const recv = JSON.parse(message.body);

          //채팅 내역 불러오기
          console.log(recv);
          // if (recv.type === "ENTER") {
          setLoaded(true);
          setEnterMsg(recv);
          // } else if (recv.type === "TALK") {
          //소켓 연결 후 받은 채팅 출력
          recvMessage(recv);
          // }
        });
        ws.send(
          "/pub/chat/message",
          {
            Authorization: `Bearer ${myToken}`,
          },
          JSON.stringify({ type: "ENTER", roomId: roomId, sender: userId, message: "구독!", createdAt: "" })
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

  const ExitChat = () => {
    console.log("exit");
  };

  // 메세지 보내기
  const sendMessage = () => {
    ws.send("/pub/chat/message", { Authorization: `Bearer ${myToken}` }, JSON.stringify({ type: "TALK", roomId: roomId, sender: userId, message: content, createdAt: "" }));
    setContent("");
  };

  // 메세지 받기
  const recvMessage = (message) => {
    setMessages([...messages, message]);
  };

  // 저장된 메시지 출력
  const getMessageList = () => {
    axios
      .get(`http://3.39.0.208:8080/chat/message/${roomId}`, {
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

  useEffect(() => {
    if (room?.roomId) setRoomId(room.roomId);
  }, [room]);

  useEffect(() => {
    connect(roomId);
    getMessageList();
    return () => {
      setRoomId(null);
      setLoaded(false);
    };
  }, [roomId]);

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
      <ChatRoom>
        <h3>{room.name}</h3>
      </ChatRoom>
      <ChatContents>
        {loaded ? (
          messages?.length > 0 &&
          messages.map((item, index) => {
            return (
              <div key={index} ref={index === messages.length - 1 ? latestChatWrapRef : null} align={item.sender === userId ? "end" : "start"}>
                <ChatUser>{item.sender}</ChatUser>
                <ChatMsg>{item.message}</ChatMsg>
              </div>
            );
          })
        ) : (
          <div style={{ textAlign: "center" }}>로딩중</div>
        )}
      </ChatContents>
      {/* <ChatInputMenu>
        <ChatInput type="text" placeholder="채팅을 입력해주세요" value={content} onChange={handleChange} onKeyUp={handleKeyUp} />
        <ChatBtn disabled={!content} onClick={sendMessage}>
          전송
        </ChatBtn>
      </ChatInputMenu> */}
    </ChatDisplay>
  );
};

const ChatDisplay = styled.div`
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
`;
const ChatRoom = styled.div`
  flex: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ChatRoomBtn = styled.button`
  width: 5vh;
  height: 5vh;
`;
const ChatContents = styled.div`
  /* flex: 1 1 100%; */
  width: 100%;
  height: 85vh;
  overflow: scroll;
`;
const ChatWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.align};
  margin: 1rem 0;
`;
const ChatUser = styled.div`
  margin-left: 10px;
  font-weight: 700;
`;
const ChatMsg = styled.div`
  color: black;
  margin-left: 10px;
`;
const ChatInputMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #ebe6e6;
`;
const ChatInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  background-color: transparent;
  border: 0;
`;
const ChatBtn = styled.button`
  padding: 1rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  width: max-content;
  outline: none;
`;

export default ChatDetail;
