import React, { useState } from "react";
import styled from "styled-components";
import Timer from "./Timer";

import { userCheckIn } from "../redux/modules/CheckIn";
import { loadCheckIn } from "../redux/modules/CheckIn";

import '../componentsCss/ControlButton.css'
import { useDispatch, useSelector } from "react-redux";

  
function StopWatch() {
  
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
  
  // 시간 흐르게 하기
  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    setIsPaused(!isPaused);
  };
  
  return (
    <StopWatchDiv>
      <Timer time={time} />
      <div
        active={isActive}
        isPaused={isPaused}
        handleStart={handleStart}
      >
            <div className="btn btn-one btn-start"
                onClick={() => {
                  dispatch(userCheckIn());
                  setIsActive(true);
                  setIsPaused(false);
                  setIsPaused(!isPaused);
                }}>
              {isPaused ? "start" : "stop"}
            </div>
    {/* <div className="Control-Buttons">
      <div>{props.active ? ActiveButtons : StartButton}</div>
    </div> */}
      </div>
    </StopWatchDiv>
  );
}

const StopWatchDiv = styled.div`
  height: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`
  
export default StopWatch;