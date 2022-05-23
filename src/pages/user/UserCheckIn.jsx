import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import UserSidebar from "../../components/UserSideBar";
import StopWatch from "../../components/StopWatch";
import UserTeamList from "./UserTeamList";

import mascot from "../../assets/img/mascot.svg";
import studyData from "../../assets/img/studydata.svg";

import { loadCheckList } from "../../redux/modules/checkIn";
import jwt_decode from "jwt-decode";

const UserCheckIn = () => {
  const dispatch = useDispatch();

  // checkInList 조회를 위한 useEffect
  React.useEffect(() => {
    setInterval(() => {
      dispatch(loadCheckList());
    }, 300000);
  }, []);

  const teamList = useSelector((state) => state.checkIn.checkInList);

  const logList = useSelector((state) => state.checkIn.checkIn);

  const value = "; " + document.cookie;

  const parts = value.split('; userToken=');

  const decode = jwt_decode ( parts[1] ) ; 

  return (
    <React.Fragment>
      <div style={{ display: "flex" }}>
        <BackgroundDiv>
          <UserSidebar teamList={teamList}/>
            <UpDataBox>
              <UpDataLeftBox>
                <Mascot src={mascot}></Mascot>
                <StudyData>
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
                    <UserTeamList key={idx} e={e}></UserTeamList>
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
