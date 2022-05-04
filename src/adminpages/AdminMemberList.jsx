import React from 'react';
import styled from "styled-components";
import { getMemberListFB } from '../redux/modules/MemberList';
import { addMemberListFB } from '../redux/modules/MemberList';

import { useDispatch, useSelector } from 'react-redux';

const AdminMemberList = (props) => {

  const dispatch = useDispatch();

  const memberList = useSelector((state) => state.MemberList.memberList);

  const weeks = props.week
  
  return (
    <MemberDiv>
      <button onClick={() => {dispatch(getMemberListFB(weeks))}}>조회하기</button>
      {
        memberList.map((e, idx)=>{
          return(
            <MemberName
            onClick={() => {dispatch(addMemberListFB( 3 , e.userId ))}}
            >{e.userName}</MemberName>
          )
        })
      }
    </MemberDiv>
  );
};

const MemberDiv = styled.div`
  width : 800px;
  height : 200px;
  background-color : gray;
  float : right;
`

const MemberName = styled.div`
  width : 100px;
  height : 20px;
  background-color : white;
  border : 1px solid black;
  float : left;
  text-align : center;
`

export default AdminMemberList;