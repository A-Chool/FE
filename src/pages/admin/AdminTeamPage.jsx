import React, { useState } from 'react';
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

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
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

  return (

    <React.Fragment>

    <AdminSidebar />

    <div style={{width: "1140px", height : "550px", float : "left"}}>
      <h1>팀 관리</h1>
      <div style={{
        width : '100%', 
        height : '60px' ,
        display: 'flex', 
        justifyContent: 'space-between', 
        border : '1px solid black', }}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl style={{width : '100px',float : 'left'}}>
            <InputLabel id="demo-simple-select-label">주차</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={week}
            label="age"
            onChange={handleChange}>
            {
              weekList && weekList.map((e, idx)=>{
              return(
                <MenuItem key={idx} value={e}>{e}</MenuItem>
              )
              })
            }
            </Select>
          </FormControl>
        </Box>

        <div>
          <Button onClick={handleOpen} style = {{backgroundColor : 'gray', color : 'black', height : '30px'}}>팀 추가 / 삭제</Button>
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
      </div>

        {
          teamList.map((e, idx)=>{
            return(
            <DndTeamList key={idx} e={e} week={week} />
            )
          })
        }
    </div>

    {/* <AdminMemberList week={week} teamList={teamList} /> */}
    <MemberDiv>
      {
        memberList.map((e, idx)=>{
          return(
          <AdminMemberList key={idx} e={e} teamList={teamList} week={week}/>
          )
        })
      }
    </MemberDiv>

    </React.Fragment>
  );
};

const MemberDiv = styled.div`
  width : 800px;
  height : 200px;
  background-color : gray;
  float : right;
`

export default AdminTeamPage;