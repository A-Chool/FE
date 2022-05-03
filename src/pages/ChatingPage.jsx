import React, { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";
// 소켓 통신
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import axios from "axios";
import SelectInput from "@mui/material/Select/SelectInput";

//현재 백엔드분들이 만드신 서버내의 roomId 주소
let stompClient;
const ChatingPage = (props) => {
  //  const devTarget = "http://localhost:8080/ws-stomp";
  const devTarget = "http://3.39.0.208:8080/ws-stomp";
  const sock = new SockJS(devTarget);
  const ws = Stomp.over(sock);
  let reconnect = 0;
  
  const [chatMessage, setChatMessage] = useState("");
  const [list, setList] = useState([{ nick: "임시 사용자", text: "test" }]);
  const [text, setText] = useState('');
  const [test, setTest] = useState('');
  console.log(test);
  // useEffect(()=>{
  //   connect();
  //   return ()=>{};
  // }, []);

  const connect= () => {
    ws.subscribe(
      "/sub/chat/room/e7c86968-51f0-4206-8130-543e5fc1bc9b", 
      recvMessage
      );
    ws.send("/pub/chat/message", 
      {}, 
      JSON.stringify({
        type:'ENTER', 
        roomId:"e7c86968-51f0-4206-8130-543e5fc1bc9b", 
        sender:"123",
        message:"이몸등장"
      })
    );
  }
  // 채팅방 입장시 사용하는 코드들
  
  const ExitChat = () => {
    console.log(111);
  };

  const sendMessage = (chatMessage) => {
    ws.send("/pub/chat/message", 
      {}, 
      JSON.stringify({
        type:'TALK', 
        roomId:"e7c86968-51f0-4206-8130-543e5fc1bc9b", 
        sender:456, 
        message:chatMessage
      })
    );
    setChatMessage("");
  };

  const recvMessage = (message) =>{
    console.log(message);
    var paylodaData = JSON.parse(message.body);
    console.log(paylodaData);
    setList((list) => [
      ...list,
      { nick: paylodaData.sender, text: paylodaData.message },
    ]);
  }
  const onChange = (e) => {
    // e.target에는 이벤트가 발생한 input DOM에 대한 정보를 가지고 있다.
    // console.log(e.target);
    // 이벤트가 발생한 DOM의 값 가져오기
    // console.log(e.target.value);
    // let msg = e.target.value;
    // console.log(msg);
    // setChatMessage(msg); // e.target.value 바뀔때마다 콘솔에 찍음
    
    setTest(e.target.value);
    
  }
  
  setTimeout(connect, 1000);
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
            onChange={setTest}
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
  align-items: left;
  width: 95%;
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
  font-size: 15px;
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
  width: 95%;
  font-size:20px;
  margin: 10px 10px;
`;
const ChatBtn = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin-right: 5px;
`;

export default ChatingPage;