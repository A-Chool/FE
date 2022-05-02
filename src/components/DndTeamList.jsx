import React from 'react';
import styled from "styled-components";
import Members from './Members';

const DndTeamList = (props) => {

  // console.log(props.e.memberList)

  const members = props.e.memberList

  return (
    <>
      <AddTeam>
        {props.e.teamName}

        {
          members.map((e, idx)=>{
            return(
              <Members key={idx} e={e}></Members>
            )
          })
        }
      </AddTeam>
    </>
  );
};

const AddTeam = styled.div`
width : 200px;
height : 30px;
border : 1px solid black;
border-radius : 5px;
margin-top : 10px;
text-align : center;
line-height : 30px;
float : left;
margin : 10px 10px;
background-color : gray;
`

export default DndTeamList;