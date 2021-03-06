import React from 'react';
import styled from "styled-components";

import UserCheckInList from './UserCheckInList';

const UserTeamList = (props) => {

  const userCheckInList = props.e.memberList

  const sse = props.sseData

  // console.log(userCheckInList)
  // console.log(sse)

  return (
    <TeamTable>
      <TeamNameTable>{props.e.teamName}</TeamNameTable>
      <UserNameTable>
        {
          userCheckInList.map((e, idx)=>{
            return(
              <UserCheckInList key={idx} e={e} sse={sse}></UserCheckInList>
            )
          })
        }
      </UserNameTable>
    </TeamTable>
  );
};

const TeamTable = styled.div`
  height : 198px;
  width : 259px;
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  margin : 10px 10px;
  display: inline-block;
  text-align: center;
  @media screen and (min-width: 2560px) {
    width : 384px;
    height : 325px;
  }
`

const TeamNameTable = styled.div`
  position: static;
  width: 259px;
  height: 40px;
  background: #1F3A5E;
  border-radius: 8px 8px 0px 0px;
  font-weight: 700;
  font-size: 16px;
  line-height: 40px;
  color: #FFFFFF;
  margin-bottom : 0px;
  @media screen and (min-width: 2560px) {
    width : 384px;
    height: 60px;
    font-size: 22px;
    line-height: 60px;
  }
`

const UserNameTable = styled.div`
  width: 259px;
  height: 158px;
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
  @media screen and (min-width: 2560px) {
    width : 384px;
    height: 258px;
  }
`

export default UserTeamList;