import React from 'react';
import styled from 'styled-components';

const DeleteMember = (props) => {

  // member 추가를 위한 이름 조회
  // DndTeamList 에서 props 로 데이터 받아옴

  return (
    <Userdata>{props.e.user.userName}바꿈</Userdata>

  );
};

const Userdata = styled.div`
width: 120px;
min-width : 120px;
height: 40px;
border: 1px solid rgba(31, 58, 94, 0.5);
border-radius: 8px;
font-weight: 700;
font-size: 14px;
line-height: 40px;
text-align : center;
margin : 0px 8px;
display : inline-block;
`





export default DeleteMember;