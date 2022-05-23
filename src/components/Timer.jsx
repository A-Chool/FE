import React, { useState } from "react";
import styled from 'styled-components';

import { useDispatch, useSelector } from "react-redux";

import { loadCheckIn } from "../redux/modules/checkIn";

const Timer = (props) => {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadCheckIn())
  },[]);

    
  const checkInLog = useSelector((state) => state.checkIn.checkIn);
  
  const CheckInTime = checkInLog?.daySumTime
  
  const setCheckInTime = CheckInTime?.split(":")
  
  const hour = setCheckInTime?.[0]*3600000
  const minute = setCheckInTime?.[1]*60000
  const second = setCheckInTime?.[2]*1000
  
  const totalTime = hour + minute + second

  const allTime = totalTime + props.time

  return (
    <TimerBox>
      <Times>
        {("0" + Math.floor((allTime / 3600000) % 60)).slice(-2)}:
      </Times>
      <Times>
        {("0" + Math.floor((allTime / 60000) % 60)).slice(-2)}:
      </Times>
      <Times>
        {("0" + Math.floor((allTime / 1000) % 60)).slice(-2)}
      </Times>
    </TimerBox>
  );
};

export default Timer;


const TimerBox = styled.div`
  margin: 3rem 0 0 0;
  width: 100%;
  display: flex;
  height: 12%;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 1920px) {
    max-height : 300px;
  }
  @media screen and (min-width: 2560px) {
    max-height : 300px;
  }
`

const Times = styled.span`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 700;
  font-size: 100px;
  color: #000000;

  @media screen and (min-width: 1920px) {
    font-weight: 700;
    font-size: 140px;
  }
  @media screen and (min-width: 2560px) {
    font-size: 150px;
  }
`

