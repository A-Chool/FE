import React from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';

import UserSidebar from '../../components/UserSideBar';
import UserGroundRole from './UserGroundRole';
import UserWorkSpace from './UserWorkSpace';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { getWeekList } from '../../redux/modules/TeamList';
import { loadTeamBoard } from '../../redux/modules/TeamBoard';
import { setWeekTeamBoard } from '../../redux/modules/TeamBoard';


const UserTeamBoard = () => {

  const dispatch = useDispatch();

  const [test, setTest] = React.useState("안녕");

  const [team, setTeam] = React.useState();

  const handleChange = (event) => {
    setTeam(event.target.value);
    dispatch(setWeekTeamBoard(event.target.value));
  };

  console.log(team)

    React.useEffect(() => {
      dispatch(loadTeamBoard());
    }, []);

    const TeamBoard = useSelector((state) => state.TeamBoard.teamBoard);

    console.log(TeamBoard)
    console.log(TeamBoard.weekTeamList)

    const weekTeamList = TeamBoard.weekTeamList

  return (
    <React.Fragment>
      <div style={{display : 'flex'}}>
        <UserSidebar />
        <BackgroundDiv>
          <div style = {{
            width : "95%",
            margin : "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",

          }}>
          <TeamNum>{TeamBoard.teamName} 팀보드</TeamNum>

            <SelectBoxWrapper>
                  <Selecter
                  value={team}
                  label="week"
                  onChange={handleChange}
                  >
                    <option>---</option>
                    {
                      weekTeamList && weekTeamList.map((e, idx)=>{
                      return(
                        <option key={idx} value={e.weekTeamId}>{e.week}{e.weekTeamName}</option>
                      )
                      })
                    }
                  </Selecter>
                  <SelectSVG width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.98242 1.5L9.01911 8.5L16.0558 1.5" stroke="#1F3A5E" stroke-width="2" stroke-linecap="round"/>
                  </SelectSVG>
                </SelectBoxWrapper>
          </div>

          <Zone>팀원정보 들어갈거임</Zone>
          <Zone>
            <UserGroundRole TeamBoard={TeamBoard}></UserGroundRole>
          </Zone>
          <Zone>
            <UserWorkSpace TeamBoard={TeamBoard}></UserWorkSpace>
          </Zone>
        </BackgroundDiv>
      </div>
    </React.Fragment>

  );
};

const BackgroundDiv = styled.div`
  height : 100vh;
  float : left;
  background-color : #F4F6F9;
  flex-grow : 1;
`

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

const SelectBoxWrapper = styled.div`
	display: flex;
  float : left;
  margin-right : 44px;
`

const Selecter = styled.select`
width: 118px;
height : 40px;
padding: .5em .9em;
  border: 1px solid #999;
  font-weight: 700;
  font-size: 16px;
  // background: url('arrow.jpg') no-repeat 95% 50%;
  border: 2px solid #1F3A5E;
  box-sizing: border-box;
  border-radius: 4px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  &::-ms-expand {
    display: none;
  }
`

const SelectSVG = styled.svg`
  margin-left: -35px;
  align-self: center;
  width: 20px;
  height: 14px;
`

export default UserTeamBoard;