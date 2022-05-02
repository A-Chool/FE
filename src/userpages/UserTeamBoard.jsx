import React from 'react';
import styled from "styled-components";

import UserSidebar from '../components/UserSideBar';
import UserGroundRole from './UserGroundRole';
import UserWorkSpace from './UserWorkSpace';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const UserTeamBoard = () => {

  const [test, setTest] = React.useState("안녕");

  const [week, setWeek] = React.useState('');

  const handleChange = (event) => {
    setWeek(event.target.value);
  };

  return (
    <React.Fragment>
      <UserSidebar />
      <div style={{width: "85%", height : "100vh", float : "left"}}>
        <div style = {{
          width : "95%",
          margin : "auto",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",

        }}>
          <TeamNum>? 조 팀보드</TeamNum>

          <Box  style = {{marginRight: "0px"}} sx={{ minWidth: 120 }}>
            <FormControl style = {{marginRight: "0px"}} >
              <InputLabel id="demo-simple-select-label">주차</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={week}
                label="주차"
                onChange={handleChange}
              >
                <MenuItem value={1}>1주차</MenuItem>
                <MenuItem value={2}>2주차</MenuItem>
                <MenuItem value={3}>3주차</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>

        <Zone>팀원정보 들어갈거임</Zone>
        <Zone>
          <UserGroundRole></UserGroundRole>
        </Zone>
        <Zone>
          <UserWorkSpace></UserWorkSpace>
        </Zone>
      </div>
    </React.Fragment>

  );
};

const Zone = styled.div`
  height : 250px;
  width : 95%;
  background-color : gray;
  margin : 10px auto;
  border-radius : 10px;
  padding : 5px;
`

const TeamNum = styled.h2`

`

export default UserTeamBoard;