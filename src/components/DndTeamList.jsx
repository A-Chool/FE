import React from 'react';
import styled from "styled-components";
import Members from './Members';

const DndTeamList = (props) => {

  console.log(props.e.memberList)

  const members = props.e.memberList

  return (
    <>
      <AddTeam>
        <p>{props.e.teamName}</p>
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
  width : 31%;
  height : 200px;
  background-color : gray;
  margin : 10px 10px;
  float : left;
`

export default DndTeamList;