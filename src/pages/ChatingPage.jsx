import React, { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import axios from "axios";

var stompClient = null;
//현재 백엔드분들이 만드신 서버내의 roomId 주소

function ChatingPage(props) {
  const server = "http://13.124.226.148/";

  const [chatMessage, setChatMessage] = useState("");
  const [list, setList] = useState([{ nick: "임시 사용자", text: "test" }]);
  console.log(list);

  useEffect(() => {
    connect();
    return () => {};
  }, []);

  // connect 함수
  const connect = () => {
    let Sock = new SockJS(server + "ws-stomp");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  //채팅 룸에 접속한다음  소켓연결이 되야하는 라인  : 방 입장하는 버튼
  const onConnected = (id) => {
    // stompClient.disconnect(),
    //   connect(),
    stompClient.subscribe(
      "/sub/chat/room/bc771c84-5141-4369-9467-bc6742630dd1",
      onMessageReceived
    );
    stompClient.send(
      "/pub/chat/message",
      {},
      JSON.stringify({
        type: "ENTER",
        roomId: "bc771c84-5141-4369-9467-bc6742630dd1",
        sender: "유저 이름",
        message: "as님이 입장하셨습다.",
      })
    );
  };

  //연결된 서버와의 통신시 payloadData의 타입에 따른 정보들 //메세지 읽어오는부분
  const onMessageReceived = (payload) => {
    console.log(payload);
    var payloadData = JSON.parse(payload.body);
    console.log(payloadData); //서버에서 보내주는 정보
    switch (payloadData.type) {
      case "JOIN":
        break;
      case "MESSAGE":
        break;
      case "TALK":
        setList((list) => [
          ...list,
          { nick: payloadData.sender, text: payloadData.message },
        ]);
        break;
    }
  };

  const onError = (err) => {
    console.log(err);
  };
  const sendMessage = (message) => {
    stompClient.send(
      "/pub/chat/message",
      {},
      JSON.stringify({
        roomId: "bc771c84-5141-4369-9467-bc6742630dd1",
        type: "TALK",
        sender: "임시 사용자",
        message: message,
      })
    );
  };

  const ExitChat = () => {
    console.log(111);
  };

  return (
    <React.Fragment>
      <ChatDisplay>
        <ChatRoom>
          <ChatRoomId>1</ChatRoomId>
          <ChatRoomBtn onClick={ExitChat}>X</ChatRoomBtn>
        </ChatRoom>
        <ChatContents>
          {list.map((item, index) => {
            return (
              <ChatOnce key={index}>
                <ChatUser>
                  <b style={{ float: "left", color: "#000000" }}>{item.nick}</b>
                  {/* <span style={{ color: "#fff" }}>시간</span> */}
                </ChatUser>
                <ChatCon>{item.text}</ChatCon>
              </ChatOnce>
            );
          })}
        </ChatContents>
        <ChatInputMenu>
          <ChatInput
            type="text"
            placeholder="채팅을 입력해주세요"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
          />
          <ChatBtn
            onClick={() => {
              sendMessage(chatMessage);
            }}
          />
        </ChatInputMenu>
      </ChatDisplay>
    </React.Fragment>
  );
}

const ChatDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  height: 100vh;
  background-color: gray;
  position: fixed;
  left: 0px;
`;
const ChatRoom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10vh;
`;

const ChatRoomId = styled.div`
  margin-left: 10px;
  font-size: 25px;
  font-weight: bold;
`;
const ChatRoomBtn = styled.button`
  width: 5vh;
  height: 5vh;
  background-color: gray;
  border: 2px solid black;
  border-radius: 25px;
`;
const ChatContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 85vh;
  overflow: auto;
`;
const ChatOnce = styled.div`
  &:hover {
    background: #313438;
  }
  float: left;
`;

const ChatUser = styled.div`
  margin-left: 10px;
  font-size: 10px;
`;
const ChatCon = styled.div`
  color: black;
  margin-left: 10px;
  font-size: 10px;
`;

const ChatInputMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5vh;
  background-color: #ebe6e6;
`;
const ChatInput = styled.input`
  width: 110px;
  margin-left: 10px;
`;
const ChatBtn = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin-right: 5px;
`;
export default ChatingPage;
