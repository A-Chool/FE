import React, { useState } from "react";
import styled from "styled-components";
import Timer from "./Timer";

import { userCheckIn } from "../redux/modules/CheckIn";
import { userCheckOut } from "../redux/modules/CheckIn";

import '../componentsCss/ControlButton.css'
import { useDispatch, useSelector } from "react-redux";
import { loadCheckList } from "../redux/modules/CheckIn";

  
const StopWatch = (props) => {

  const dispatch = useDispatch();  

  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  const logList = useSelector((state) => state.CheckIn.checkIn);

  const logs = logList?.todayLog
  const logsa = logs?.[logs?.length-1].checkOut
  
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
    if (logsa === null){
      setIsActive(true);
      setIsPaused(!isPaused);
    } else {
      setIsActive(false);
      setIsPaused(true);
    }
  }, [logsa]);

  React.useEffect(() => {
    dispatch(loadCheckList("1주차"));
  },[]);
  
  return (
    <StopWatchDiv>
      <Timer time={time}/>
      <div>
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
        
      </div>
    </StopWatchDiv>
  );
};

const StopWatchDiv = styled.div`
  height: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

export default StopWatch;
