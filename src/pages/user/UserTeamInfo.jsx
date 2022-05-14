import React from 'react';
import styled from "styled-components";

const UserTeamInfo = (props) => {

  return (
    <UserInfoMenu>
      <UserInfoMenuP style={{width : '10%'}}>{props.e.user.userName}</UserInfoMenuP>
      <UserInfoMenuP style={{width : '15%'}}>준비중</UserInfoMenuP>
      <UserInfoMenuP style={{width : '13%'}}>{props.e.user.phoneNumber}</UserInfoMenuP>
      <UserInfoMenuP style={{width : '13%'}}>준비중</UserInfoMenuP>
      <UserInfoMenuP style={{width : '21%'}}>{props.e.user.userEmail}</UserInfoMenuP>
      <UserInfoMenuP style={{width : '28%'}}>준비중</UserInfoMenuP>
    </UserInfoMenu>
  );
};

const UserInfoMenu = styled.div`
  width : 1084px;
  height : 40px;
  background-color: white;
  font-weight: 400;
  font-size: 14px;
  text-align : center;
  display: inline-block;
`

const UserInfoMenuP = styled.p`
  font-weight: 700;
  font-size: 14px;
  float : left;
  line-height : 8px;
  color: #282828;
`

export default UserTeamInfo;