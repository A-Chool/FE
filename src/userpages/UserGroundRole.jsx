import React from 'react';
import styled from "styled-components";

const UserGroundRole = () => {

  const [update, setupdate] = React.useState(false);

  return (
    <>
      <div style={{
        width : "90%",
        margin : "auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div style={{float : "left"}}>
          그라운드 룰 
        </div>
        {
          update === false
          ? <button style={{backgroundColor:"white", border:"none" }} onClick={()=>{setupdate(!update)}}>수정</button>
          :<button style={{backgroundColor:"white", border:"none"}} onClick={() => {setupdate(!update)}}>수정완료</button>
        }    
      </div>
        {
          update === false
          ? <Box>dfdfdfdfdfdf</Box>
          :<UpdateBox></UpdateBox>
        }    

    </>
  );
};

const Box = styled.div`
  height : 200px;
  width : 90%;
  background-color : white;
  margin : 10px auto;
  border-radius : 10px;
`

const UpdateBox = styled.textarea`
  height : 200px;
  width : 90%;
  background-color : white;
  display : block;
  margin : 10px auto;
  border : 2px solid black;
  border-radius : 10px;
`

export default UserGroundRole;