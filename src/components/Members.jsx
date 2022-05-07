import React from 'react';
import styled from 'styled-components';

const Members = (props) => {

  // member 추가를 위한 이름 조회
  // DndTeamList 에서 props 로 데이터 받아옴

  return (
    <Userdata>
      {props.e.user.userName}
    </Userdata>
  );
};

const Userdata = styled.div`
  width : 200px;
  height : 30px;
  border : 1px solid black;
  border-radius : 5px;
  margin-top : 10px;
  text-align : center;
  line-height : 30px;
`

export default Members;