import React, { useState } from "react";
import styled from "styled-components";
import Timer from "./Timer";

import { userCheckIn } from "../redux/modules/checkIn";
import { userCheckOut } from "../redux/modules/checkIn";

import '../componentsCss/ControlButton.css'
import { useDispatch, useSelector } from "react-redux";
import { loadCheckList } from "../redux/modules/checkIn";

  
const StopWatch = (props) => {

  const dispatch = useDispatch();  

  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  const logList = useSelector((state) => state.checkIn.checkIn);

  const logs = logList?.todayLog
  const lastLog = logs?.length === 0 ? logs?.[logs?.length-1] : logs?.[logs?.length-1].checkOut
  
  React.useEffect(() => {
    let interval = null;
    
    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  React.useEffect(() => {
    if (lastLog === null){
      setIsActive(true);
      setIsPaused(!isPaused);
    } else {
      setIsActive(false);
      setIsPaused(true);
    }
  }, [lastLog]);

  React.useEffect(() => {
    dispatch(loadCheckList());
  },[]);
  
  return (
    <StopWatchDiv>
      <Timer time={time}/>
      <TimerWarrape>
        <TodayTotalP>오늘 누적 학습 시간</TodayTotalP>
        { isPaused === true 
          ?
          <div className="btn btn-one btn-start"
          onClick={() => {
            dispatch(userCheckIn());

            setIsActive(true);
            setIsPaused(!isPaused);
          }}>start</div>
          :
          <div className="btn btn-one btn-start"
          onClick={() => {
            dispatch(userCheckOut());

            setIsPaused(false);
            setIsPaused(!isPaused);
          }}>stop</div>
        }
      </TimerWarrape>
    </StopWatchDiv>
  );
};

const StopWatchDiv = styled.div`
  height: 100%;
  max-height : 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  // background-color : green;
  @media screen and (min-width: 1920px) {
    max-height : 300px;
  }
  @media screen and (min-width: 2560px) {
    max-height : 300px;
  }
`

const TimerWarrape = styled.div`
  width: 100%;
  max-width : 520px;
  height: 50px;
  // background-color : red;
  align-items: center;
  @media screen and (min-width: 1920px) {
    max-width : 620px;
  }
  @media screen and (min-width: 2560px) {
    max-width : 720px;
  }
`

const TodayTotalP = styled.p`
float : left;
margin: 0px 0px 0px 20px;
line-height : 40px
font-weight: 400;
font-size: 22px;
@media screen and (min-width: 1920px) {
  font-size: 26px;
}
@media screen and (min-width: 2560px) {
  font-size: 30px;
}
`

export default StopWatch;
