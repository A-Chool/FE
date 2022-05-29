import React from 'react';
import styled from "styled-components";

const DndUserList = (props) => {

  return (
    <AddMember>
      <Userdata>{props.e.userName}</Userdata>
    </AddMember>
  );
};

const AddMember = styled.div`
  height : 40px;
  width : 80%;
  border : 1px solid black;
  background-color : #fff;
  margin : 5px auto;
  cursor : pointer;
`
const Userdata = styled.p`
  margin : 10px auto;
  text-align : center;
  cursor : pointer;
`
export default DndUserList;