import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import UserSidebar from "../../components/UserSideBar";
import StopWatch from "../../components/StopWatch";
import UserTeamList from "./UserTeamList";

import mascot from "../../assets/img/mascot.svg";
import studyData from "../../assets/img/studydata.svg";

import { loadCheckList } from "../../redux/modules/checkIn";
import jwt_decode from "jwt-decode";

import { history } from "../../redux/configureStore";

import { getUserId, getCookie } from "../../shared/Cookie";

import axios from 'axios';

import { Link, Redirect, useLocation } from "react-router-dom";

import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";

const UserCheckIn = () => {
  const dispatch = useDispatch();

  // checkInList 조회를 위한 useEffect
  useEffect(() => {
    // setInterval(() => {
      dispatch(loadCheckList());
    // }, 1000*60*5);
  }, []);

  const teamList = useSelector((state) => state.checkIn.checkInList);

  const logList = useSelector((state) => state.checkIn.checkIn);

  const value = "; " + document.cookie;

  const parts = value.split('; userToken=');

  const [decode, setDecode] = React.useState("");

  const [sseData, setSseData] = React.useState(null);
  // console.log(sseData)

  // useEffect(() => {
  //   const userToken = getCookie("userToken");
  //   setDecode(jwt_decode(userToken));

  //   const userSSEId = decode.EXPIRED_DATE;
  
  //   const myToken = getCookie("Authorization")
  
  //   const EventSource = EventSourcePolyfill || NativeEventSource;
    
  //   const source = new EventSource(`https://achool.shop/api/subscribe/${userSSEId}`, {headers : {Authorization : `Bearer ${myToken}`},});
  //   // console.log(source)
  
  //   source.addEventListener('message', function(e) {
  //     setSseData(e.data);
  //     // console.log("data는 =", e.data);
  //   });

  //   source.addEventListener('open', function(e) {
  //     // Connection was opened.
  //   }, false);
    
  //   source.addEventListener('error', function(e) {
  //     if (e.readyState == EventSource.CLOSED) {
  //       // Connection was closed.
  //     }
  //   }, false);
  // }, []);

  

  return (
    <React.Fragment>
      <div style={{ display: "flex" }}>
        <BackgroundDiv>
          <UserSidebar teamList={teamList}/>
            <UpDataBox>
              <UpDataLeftBox>
                <Mascot src={mascot}></Mascot>
                <StudyData onClick={() => {history.push("/rank");}}>
                      {decode.USER_NAME}님 지금까지 <span style={{color : '#FF5F00', fontWeight : '600'}}>{logList?.totalSumTime}</span> 시간 <br />학습하셨어요!
                  {/* <div style={{marginLeft : '55%'}}>
                    <img src={studyData}></img>
                  </div> */}
                </StudyData>
              </UpDataLeftBox>
              
              <UpDataRightBox>
                <StopWatch logList={logList}>
                </StopWatch>  
              </UpDataRightBox>

            </UpDataBox>

            <CheckInList>
              {
                teamList.map((e, idx)=>{
                  return(
                    <UserTeamList key={idx} e={e} sseData={sseData}></UserTeamList>
                  )
                })
              }
            </CheckInList>
        </BackgroundDiv>
      </div>
    </React.Fragment>
  );
};

const BackgroundDiv = styled.div`
  height: 100vh;
  min-width: 1440px;
  float: left;
  background-color: #f4f6f9;
  flex-grow: 1;
`;

const UpDataBox = styled.div`
  height: 23%;
  margin-top: 4%;
  display: flex;
  // background-color : gray;
`;

const UpDataLeftBox = styled.div`
  width: 50%;
  height: 100%;
  float: left;
  display: flex;
  align-items: center;

  // background-color : red;
`;

const Mascot = styled.img`
width: 145.85px;
height: 185.79px;
margin : 30px 39px;
float : left;
@media screen and (min-width: 1920px) {
  width: 145.85px;
  height: 185.79px;
}
@media screen and (min-width: 2560px) {
  width: 187.54px;
  height: 252.2px;
}
`

const UpDataRightBox = styled.div`
  width: 50%;
  height: 100%;
  float: left;
  // display : flex;
  // align-items: center;
`;

const StudyData = styled.div`
  width: 372.15px;
  height: 140.61px;
  float: left;
  box-shadow: rgba(149, 157, 165, 0.4) 0px 8px 24px;
  // background-color: green;
  border-radius: 40px;
  padding: 20px;
  font-weight: 500;
  font-size: 22px;
  cursor : pointer;
  @media screen and (min-width: 1920px) {
    width: 580px;
    font-weight: 500;
    font-size: 30px;
    padding: 30px;
  }
  @media screen and (min-width: 2560px) {
    width: 746.15px;
    height: 176.16px;
    font-weight: 500;
    font-size: 38px;
    padding: 40px;
  }
`;

const StudyDataDiv = styled.div`
height : 70%;
background-color: green;
`

const CheckInList = styled.div`
  width: auto;
  height: 450px;
  margin-top: 40px;
  text-align: center;
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    height: 10%;
    background: gray;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: transition;
  }
  @media screen and (min-width: 1920px) {
    margin-top: 80px;
    height: 450px;
  }
  @media screen and (min-width: 2560px) {
    height: 750px;
  }
`;

export default UserCheckIn;
