import React from 'react';
import styled from "styled-components";

const UserTeamInfo = (props) => {

  // console.log(props.e)

  return (
    <UserInfoMenu>
      <UserInfoMenuP style={{width : '10%'}}>{props.e.user.userName}</UserInfoMenuP>
      <UserInfoMenuP style={{width : '15%'}}>{props.e.user.userTag}</UserInfoMenuP>
      <UserInfoMenuP style={{width : '13%'}}>{props.e.user.phoneNumber}</UserInfoMenuP>
      <UserInfoMenuP style={{width : '13%'}}>{props.e.user.findKakaoId}</UserInfoMenuP>
      <UserInfoMenuP style={{width : '21%'}}>{props.e.user.userEmail}</UserInfoMenuP>
      <UserInfoMenuP style={{width : '28%'}}>{props.e.user.userGitHub}</UserInfoMenuP>
    </UserInfoMenu>
  );
};

const UserInfoMenu = styled.div`
  width : 100%;
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
  @media screen and (min-width: 2560px) {
    font-size: 18px;
  }
`

export default UserTeamInfo;