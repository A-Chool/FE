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
  float : left;
  margin : 10px 10px;
  padding : 10px;
  display: inline-block;
`

export default UserTeamList;