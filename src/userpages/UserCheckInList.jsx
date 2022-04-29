import React from 'react';
import styled from 'styled-components';

const UserCheckInList = (props) => {
  return (
    <UserTag>
      {props.e.userName}
    </UserTag>
  );
};

const UserTag = styled.div`
  width : 100px;
  height : 30px;
  border : 1px solid black;
  float : left;
  margin : 10px auto

`

export default UserCheckInList;