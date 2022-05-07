import React from "react";
import styled from 'styled-components';

const Timer = (props) => {
  return (
    <TimerBox>
      <Times>
        {("0" + Math.floor((props.time / 3600000) % 60)).slice(-2)}:
      </Times>
      <Times>
        {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
      </Times>
      <Times>
        {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}
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
`

const Times = styled.span`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 700;
  font-size: 80px;
  color: #000000;
`

