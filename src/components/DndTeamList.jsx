import React from 'react';
import styled from "styled-components";

const DndTeamList = (props) => {
  return (
    <>
      <AddTeam>
        <p>{props.e.teamName}</p>
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