import React from 'react';
import styled from "styled-components";


import AdminSidebar from "./AdminSideBar";
import DndTeamList from '../../components/DndTeamList';
import AdminMemberList from './AdminMemberList';
import { useDispatch, useSelector } from 'react-redux';
import { getTeamList } from '../../redux/modules/TeamList';
import { addTeamList } from '../../redux/modules/TeamList';
import { getWeekList } from '../../redux/modules/TeamList';
import { deleteTeamList } from '../../redux/modules/TeamList';
import { loadMemberList } from '../../redux/modules/MemberList';

import teamAdd from '../../img/teamAdd.svg'
import memberAdd from '../../img/memberAdd.svg'
import addMember from '../../img/addMember.svg'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';



const AdminTeamPage = () => {
  
  const dispatch = useDispatch();

  // 주차 리스트 불러오기
  React.useEffect(() => {
    dispatch(getWeekList());
  },[]);

  // 주차 리스트 정보 꺼내기
  const weekList = useSelector((state) => state.TeamList.week);

  // 해당 주차의 팀 리스트 불러오기
  React.useEffect(() => {
    dispatch(getTeamList());
  },[]);

  // 팀 리스트 정보 꺼내기
  const teamList = useSelector((state) => state.TeamList.teams);

  // 팀 리스트에서 가공한 데이터를 정리해서 푸쉬할 빈 배열
  // const teams = [];

  // 팀 리스트에서 정보를 가공하는 로직
  // for (const i in teamList) {
  //   const teamDate = [i.split(':')]
  //   teams.push({'teamName' : teamDate[0][0], 'teamId' : teamDate[0][1] , 'memberList' : teamList[i]});
  // }

  // Modal style
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  // Modal 온 오프 액션을 위한 스테이트
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 드랍박스에서 주차를 클릭했을때 변화를 담을 스테이트
  const [week, setClickWeek] = React.useState('');

  // 드랍박스에서 주차를 클릭했을때 변화를 받아서 요청을 보내는 디스패치
  const handleChange = (event) => {
    setClickWeek(event.target.value);
    dispatch(getTeamList(event.target.value));
    dispatch(loadMemberList(event.target.value));
  };

  // 팀이 없는 맴버 꺼내오기
  const memberList = useSelector((state) => state.MemberList.memberList);

  // 팀 추가에서 주차를 입력 Input 변화를 담을 스테이트
  const [is_week, setWeek] = React.useState();

  // 팀 추가에서 주차를 입력 Input 변화추적하기 위한 액션
  const handlesetWeek = (e) => {
    setWeek(e.target.value)
  }

  // 팀 추가에서 팀이름을 입력 Input 변화를 담을 스테이트
  const [is_teamName, setTeamName] = React.useState();

  // 팀 추가에서 팀이름을 입력 Input 변화추적하기 위한 액션
  const handlesetTeamName = (e) => {
    setTeamName(e.target.value)
  }

  const [test, setTest] = React.useState(true);

  return (

    <React.Fragment>
      <div style={{display : 'flex'}}>
          <AdminSidebar />
          <BackgroundDiv>
            <PageName>팀관리</PageName>
            <FnWrapper>
              <SelectBoxWrapper>
                <Selecter
                value={week}
                label="week"
                onChange={handleChange}
                >
                  <option>---</option>
                  {
                    weekList && weekList.map((e, idx)=>{
                    return(
                      <option key={idx} value={e}>{e}</option>
                    )
                    })
                  }
                </Selecter>
                <SelectSVG width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.98242 1.5L9.01911 8.5L16.0558 1.5" stroke="#1F3A5E" stroke-width="2" stroke-linecap="round"/>
                </SelectSVG>
              </SelectBoxWrapper>

              <div>
                <img src={teamAdd} onClick={handleOpen}/>
                  <Modal
                  open={open} onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description">
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                      팀 추가/삭제
                      </Typography>
                      {
                        teamList.map((e, idx)=>{
                        return(
                          <div key={idx}>
                            {e.teamName}
                            <button onClick={() => {dispatch(deleteTeamList(e.teamId))}}>삭제</button>
                          </div>
                        )
                        })
                      }
                      <input onChange={handlesetWeek} placeholder='주차'></input>
                      <input onChange={handlesetTeamName} placeholder='팀명'></input>
                      <button onClick={() => {dispatch(addTeamList(is_teamName ,is_week))}}>+</button>
                    </Box>
                  </Modal>
              </div>
            </FnWrapper>
            <TeamListWrapper>
              {
                teamList.map((e, idx)=>{
                  return(
                  <DndTeamList key={idx} e={e} week={week} />
                  )
                })
              }
            </TeamListWrapper>
          </BackgroundDiv>

      </div>
          {/* <AdminMemberList week={week} teamList={teamList} /> */}
          {
            test === false 
            ?
            <MemberDiv>
              <AddMember>
                <OpenBtn src={memberAdd} onClick={() => {setTest(!test)}}/>
              </AddMember>
              {
                memberList.map((e, idx)=>{
                  return(
                  <AdminMemberList key={idx} e={e} teamList={teamList} week={week}/>
                  )
                })
              }
            </MemberDiv>
            :
            <MemberDivOff>
              <AddMember>
                <OpenBtn src={addMember} onClick={() => {setTest(!test)}}/>
              </AddMember>
              {
                memberList.map((e, idx)=>{
                  return(
                  <AdminMemberList key={idx} e={e} teamList={teamList} week={week}/>
                  )
                })
              }
            </MemberDivOff>
          }
          {/* <MemberDiv>
            <AddMember>
              <OpenBtn src={memberAdd} onClick={() => {
                setTest(!test)
              }}/>
            </AddMember>
            {
              memberList.map((e, idx)=>{
                return(
                <AdminMemberList key={idx} e={e} teamList={teamList} week={week}/>
                )
              })
            }
          </MemberDiv> */}


    </React.Fragment>
  );
};


const BackgroundDiv = styled.div`
  height : 100vh;
  float : left;
  background-color : #F4F6F9;
  flex-grow : 1;
`

const PageName = styled.p`
  font-weight: 700;
  font-size: 24px;
  margin : 40px 0 32px 32px;
`

const FnWrapper = styled.div`
  width : auto;
  height : 40px;
  display: flex;
  margin : 0 32px 24px;
  justify-content: space-between;
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

const TeamListWrapper = styled.div`
  width : auto;
  height : 70%;
  overflow : scroll;
  overflow-x : hidden;
  &::-webkit-scrollbar {
    width : 4px;
  }
  &::-webkit-scrollbar-thumb {
    width : 4px;
    background: #C4C4C4;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transition;
  }
`

const MemberDiv = styled.div`
  width : 738px;
  height : 216px;
  background-color : white;
  float : right;
  position : absolute;
  bottom : 46px;
  right : 0px;
  border-radius: 24px 0px 0px 24px;
	-webkit-animation: slide-in-left 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: slide-in-left 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  @-webkit-keyframes slide-in-left {
    0% {
      -webkit-transform: translateX(738px);
      transform: translateX(738px);
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
  }
  @keyframes slide-in-left {
    0% {
      -webkit-transform: translateX(738px);
      transform: translateX(738px);
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
  }
          `

const MemberDivOff = styled.div`
  width : 738px;
  height : 216px;
  background-color : white;
  float : right;
  position : absolute;
  bottom : 46px;
  right : -684px;
  border-radius: 24px 0px 0px 24px;
  transition : 300ms ease-in-out;
  -webkit-animation: slide-in-right 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: slide-in-right 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  @-webkit-keyframes slide-in-right {
    0% {
      -webkit-transform: translateX(-738px);
      transform: translateX(-738px);
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
  }
  @keyframes slide-in-right {
    0% {
      -webkit-transform: translateX(-738px);
      transform: translateX(-738px);
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
  }
  
`

const AddMember = styled.div`
  width : 54px;
  height : 216px;
  background: #FF5F00;
  border-radius: 24px 0px 0px 24px;
  text-align : center;
  margin-right : 8px;
  float : left;
`

const OpenBtn = styled.img`
position : absolute;
margin : 92px 0 0 -38px;
`

export default AdminTeamPage;