import React from 'react';
import styled from "styled-components";

const UserTeamInfo = (props) => {

  // console.log(props.e)
  
  const tags = props.e.user.userTags
  
  // console.log(...tags)
  return (
    <UserInfoMenu>
      <UserInfoMenuDiv style={{width : '10%'}}>{props.e.user.userName}</UserInfoMenuDiv>
      <UserInfoMenuDiv style={{width : '20%'}}>
        {
          tags && tags.map((e, idx) => {
            return (
              <UserTags e={e} >{e}</UserTags>
            )
          })
        }
      </UserInfoMenuDiv>
      <UserInfoMenuDiv style={{width : '13%'}}>{props.e.user.phoneNumber}</UserInfoMenuDiv>
      <UserInfoMenuDiv style={{width : '13%'}}>{props.e.user.findKakaoId}</UserInfoMenuDiv>
      <UserInfoMenuDiv style={{width : '21%'}}>{props.e.user.userEmail}</UserInfoMenuDiv>
      <UserInfoMenuDiv style={{width : '23%'}}>{props.e.user.userGitHub}</UserInfoMenuDiv>
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

const UserInfoMenuDiv = styled.div`
  height : 40px;
  font-weight: 700;
  font-size: 14px;
  float : left;
  line-height : 40px;
  color: #282828;
  display: inline-block;
  text-align: center;
  overflow : scroll;
  overflow-x : hidden;
  &::-webkit-scrollbar {
    width: 1px;
  }
  &::-webkit-scrollbar-thumb {
    height: 50%;
    background: gray;
    border-radius: 50px;
  }
  @media screen and (min-width: 2560px) {
    font-size: 18px;
  }
`

const UserTags = styled.div`
  width: auto;
  height: 24px;
  background: #FFE8F3;
  border-radius: 4px;
  line-height : 24px;
  margin : 8px 4px;
  padding : 0px 5px;
  display : inline-block;
`

export default UserTeamInfo;