import React from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';

import UserSidebar from '../../components/UserSideBar';
import UserTeamInfo from './UserTeamInfo';
import UserGroundRule from './UserGroundRule';
import UserTodo from './UserTodo';
import UserWorkSpace from './UserWorkSpace';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { getWeekList } from '../../redux/modules/teamList';
import { loadTeamBoard } from '../../redux/modules/teamBoard';
import { setWeekTeamBoard } from '../../redux/modules/teamBoard';
import { loadCheckList } from "../../redux/modules/checkIn";

import teamInfo from '../../assets/img/teamInfo.svg'


const UserTeamBoard = () => {

  const dispatch = useDispatch();

  const [test, setTest] = React.useState("안녕");

  const [team, setTeam] = React.useState();

  const handleChange = (event) => {
    console.log(event.target.value);
    setTeam(event.target.value);
    dispatch(loadTeamBoard(event.target.value));
  };

    React.useEffect(() => {
      dispatch(loadCheckList());
    }, []);

    React.useEffect(() => {
      dispatch(loadTeamBoard());
    }, []);

    const TeamBoard = useSelector((state) => state.teamBoard.teamBoard);

    const teamList = useSelector((state) => state.checkIn.checkInList);

    // const memberList = useSelector((state) => state.teamBoard.teamBoard.memberList);
    
    // const todoList = useSelector((state) => state.checkIn.checkInList);

    // console.log(TeamBoard.weekTeamList)
    
    const weekTeamList = TeamBoard.teamDtoList
    
    const MemberList = TeamBoard.memberList

    // console.log(TeamBoard);
    // console.log(MemberList);

  return (
    <React.Fragment>
      <div style={{display : 'flex'}}>
        <UserSidebar teamList={teamList} />
        <BackgroundDiv>
          <UpBar>
          <TeamNum>{TeamBoard.teamName} 팀보드</TeamNum>

            <SelectBoxWrapper>
                  <Selecter
                  value={team}
                  label="week"
                  onChange={handleChange}
                  >

                    {
                      weekTeamList && weekTeamList.map((e, idx)=>{
                      return(
                        <option key={idx} value={e.teamId}>{e.weekName}{e.TeamName}</option>
                      )
                      })
                    }
                  </Selecter>
                  <SelectSVG width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.98242 1.5L9.01911 8.5L16.0558 1.5" stroke="#1F3A5E" stroke-width="2" stroke-linecap="round"/>
                  </SelectSVG>
                </SelectBoxWrapper>
          </UpBar>

          <TeamInfoBox>
            <UserInfoImg src={teamInfo} />
            <UserInfoBox>
              <UserInfoMenu>
                <UserInfoMenuP style={{width : '10%'}}>이름</UserInfoMenuP>
                <UserInfoMenuP style={{width : '20%'}}>태그</UserInfoMenuP>
                <UserInfoMenuP style={{width : '13%'}}>전화번호</UserInfoMenuP>
                <UserInfoMenuP style={{width : '13%'}}>카톡아이디</UserInfoMenuP>
                <UserInfoMenuP style={{width : '21%'}}>이메일주소</UserInfoMenuP>
                <UserInfoMenuP style={{width : '23%'}}>GitHub</UserInfoMenuP>
              </UserInfoMenu>
                <UserDataWrapper>
                  {
                    MemberList && MemberList.map((e, idx)=>{
                    return(
                      <UserTeamInfo e={e} key={idx}></UserTeamInfo>
                    )
                    })
                  }
                </UserDataWrapper>
            </UserInfoBox>
          </TeamInfoBox>

          <WorkspaceWrapper>
            <UserGroundRule TeamBoard={TeamBoard}></UserGroundRule>
            
            <UserTodo TeamBoard={TeamBoard}></UserTodo>
          </WorkspaceWrapper>

          <UserWorkSpace TeamBoard={TeamBoard}></UserWorkSpace>

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
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    width: 4px;
    background: #c4c4c4;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transition;
  }
`

const UpBar = styled.div`
  margin : 5px 32px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const TeamInfoBox = styled.div`
  width : auto;
  height : 291px;
  margin : 0 32px 0px;
  background-color : white;
  border-radius: 16px;
  @media screen and (min-width: 2560px) {
    height: 430px;
  }
`

const UserInfoImg = styled.img`
  margin : 12px 0px 8px 3%;
`

const WorkspaceWrapper = styled.div`
  width : auto;
  height : 180px;
  margin : 24px 32px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media screen and (min-width: 2560px) {
    height: 430px;
  }
`

const UserInfoBox = styled.div`
  height : 236px;
  width : 99%;
  min-width : 1109px;
  margin : 0px auto;
  
`

const UserInfoMenu = styled.div`
  width : 95%;
  height : 35px;
  background-color: #FFF9D9;
  border-radius: 8px 8px 0px 0px;
  font-weight: 700;
  font-size: 14px;
  text-align : center;
  margin : auto;
`

const UserInfoMenuP = styled.p`
  font-weight: 700;
  font-size: 14px;
  float : left;
  line-height : 8px;
  color: #1F3A5E;
  @media screen and (min-width: 2560px) {
    font-size: 18px;
    line-height : 4px;
  }
`

const UserDataWrapper = styled.div`
  width : 95%;
  height : 200px;

  margin : auto;
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-track {
    background: transition;
  }
  @media screen and (min-width: 2560px) {
    height: 340px;
  }
`



const Zone = styled.div`
  height : 250px;
  width : 95%;
  background-color : gray;
  margin : 10px auto;
  border-radius : 10px;
  padding : 5px;
`

const TeamNum = styled.p`
  font-weight: 700;
  font-size: 24px;
`

const SelectBoxWrapper = styled.div`
	display: flex;
  margin-right : 16px;
`

const Selecter = styled.select`
width: 118px;
height : 40px;
padding: .5em .9em;
cursor : pointer;
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