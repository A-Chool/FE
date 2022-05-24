/* eslint-disable */
import React from 'react';
import styled from "styled-components";
import { useDispatch } from 'react-redux';

import { editGroundRule } from '../../redux/modules/teamBoard';

import groundRuleImg from '../../assets/img/groundRule.svg'
import editBtn from '../../assets/img/editBtn.svg'

const UserGroundRole = (props) => {

  const dispatch = useDispatch();

  const [update, setupdate] = React.useState(false);

  const [rule, setRule] = React.useState();

  const handleChange = (event) => {
    setRule(event.target.value);
  };

  const groundRule = props.TeamBoard.groundRule
  const weekTeamId = props.TeamBoard.teamId

  const split = groundRule?.split("\n").map((line) => {
    return (
      <span>
        {line}
        <br />
      </span>
    );
  })

  return (
    <GroundRuleWrapper>
      <UpBar>
        <img src={groundRuleImg} style={{margin : '12px 0px 6px 12px'}} /> 

        {
          update === false
          ? <img 
            src={editBtn}
            style={{margin : '8px 8px 4px 0px'}} 
            onClick={()=>{
            setupdate(!update)}
            
            }></img>
          :<p 
            style={{margin : '8px 10px 4px 0px', fontWeight : '700', color : '#1F3A5E'}} 
            onClick={() => {
            setupdate(!update)
            dispatch(editGroundRule(weekTeamId, rule));
          }}>Done</p>
        }    
      </UpBar>
      <hr style={{width : '97%', margin : 'auto', border : '1px solid #E0E0E0'}}/>
        {
          update === false
          ? <Box>{split}</Box>
          :<UpdateBox defaultValue={groundRule} onChange={handleChange}></UpdateBox>
        }    

    </GroundRuleWrapper>
  );
};

const GroundRuleWrapper = styled.div`
  width : 36%;
  height : 180px;
  background-color: #FFFFFF;
  border-radius: 16px;
  @media screen and (min-width: 2560px) {
    height: 400px;
  }
`

const UpBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Box = styled.div`
  height : 120px;
  width : 95%;
  margin : 6px auto;
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    width: 4px;
    background: #c4c4c4;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transition;
  }
  @media screen and (min-width: 2560px) {
    height: 330px;
    font-size: 20px;
  }
`

const UpdateBox = styled.textarea`
  height : 120px;
  width : 95%;
  background-color : white;
  display : block;
  margin : 6px auto;
  border : 1px solid black;
  border-radius : 10px;
  resize : none;
  @media screen and (min-width: 2560px) {
    height: 330px;
    font-size: 20px;
  }
`

export default UserGroundRole;