import React from 'react';
import styled from "styled-components";

import UserCheckInList from './UserCheckInList';

const UserTeamList = (props) => {

  const userCheckInList = props.e.memberList

  return (
    <TeamTable>
      <h2>{props.e.teamName}</h2>
      {
        userCheckInList.map((e, idx)=>{
          return(
            <UserCheckInList key={idx} e={e}></UserCheckInList>
          )
        })
      }
    </TeamTable>
  );
};

const TeamTable = styled.div`
  height : 200px;
  width : 230px;
  border : 1px solid black;
  margin : 10px 10px;
  padding : 10px;
  display: inline-block;
  overflow : scroll;
  overflow-x : hidden;
  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-thumb {
    height: 100%;
    background: black;
    border-radius: 50px;
  }
`

export default UserTeamList;