import React, { useState } from "react";
import styled from "styled-components";
import Timer from "./Timer";

import { userCheckIn } from "../redux/modules/CheckIn";
import { userCheckOut } from "../redux/modules/CheckIn";
import { loadCheckIn } from "../redux/modules/CheckIn";

import '../componentsCss/ControlButton.css'
import { useDispatch, useSelector } from "react-redux";

  
const StopWatch = () => {

  // const timestamp = + new Date();
  
  // console.log(timestamp.toLocaleString())

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadCheckIn());
  },[]);

  const checkInLog = useSelector((state) => state);

  // console.log(checkInLog)
  
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  
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
  

  return (
    <StopWatchDiv>
      <Timer time={time} />
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
