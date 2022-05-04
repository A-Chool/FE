import React, { useState } from 'react';


import AdminSidebar from "./AdminSideBar";
import DndTeamList from '../components/DndTeamList';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { getTeamListFB } from '../redux/modules/TeamList';
import { addTeamListFB } from '../redux/modules/TeamList';
import { getWeekListFB } from '../redux/modules/TeamList';
import { deleteTeamListFB } from '../redux/modules/TeamList';

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

  React.useEffect(() => {
    dispatch(getWeekListFB());
  },[]);

  const weekList = useSelector((state) => state.TeamList.week);

  // console.log(weekList)

  // React.useEffect(() => {
  //   dispatch(getTeamListFB(clickWeek));
  // },[]);

  const teamList = useSelector((state) => state.TeamList.teams);
  
  const teams = [];

  
  for (const i in teamList) {
    const teamDate = [i.split(':')]
    teams.push({'teamName' : teamDate[0][0], 'teamId' : teamDate[0][1] , 'memberList' : teamList[i]});
  }

  // console.log(...teams[0].teamName)
  // console.log(teams)

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

  const [week, setClickWeek] = React.useState('');

  const handleChange = (event) => {
    setClickWeek(event.target.value);
    dispatch(getTeamListFB(event.target.value));
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [is_week, setWeek] = React.useState();

  const handlesetWeek = (e) => {
    setWeek(e.target.value)
  }

  const [is_teamName, setTeamName] = React.useState();

  const handlesetTeamName = (e) => {
    setTeamName(e.target.value)
  }
    
  return (

    <React.Fragment>
      <AdminSidebar />

        <div style={{width: "1140px", height : "100vh", float : "left"}}>
          <h1>팀 관리</h1>
          <div style={{width : '100%', height : '60px' ,display: 'flex', justifyContent: 'space-between', border : '1px solid black', }}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl style={{width : '100px',float : 'left'}}>
                <InputLabel id="demo-simple-select-label">주차</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={week}
                  label="age"
                  onChange={handleChange}
                >
                    {
                      weekList && weekList.map((e, idx)=>{
                        return(
                          <MenuItem key={idx} value={e}>{e}</MenuItem>
                        )
                      })
                    }
                  <button onClick={() => {console.log()}}> 수정 </button>
                </Select>
              </FormControl>
            </Box>

            <div>
              <Button onClick={handleOpen} style = {{backgroundColor : 'gray', color : 'black', height : '30px'}}>팀 추가 / 삭제</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    팀 추가/삭제
                  </Typography>
                  
                    {
                      teams.map((e, idx)=>{
                        return(
                          <div key={idx}>
                            {e.teamName}
                            <button onClick={() => {dispatch(deleteTeamListFB(e.teamId))}}>삭제</button>
                          </div>
                        )
                      })
                    }
                  <input onChange={handlesetWeek} placeholder='주차'></input>
                  <input onChange={handlesetTeamName} placeholder='팀명'></input>
                  <button onClick={() => {dispatch(addTeamListFB(is_teamName ,is_week))}}>+</button>
                </Box>
              </Modal>
            </div>
          </div>

          {
            teams.map((e, idx)=>{
              return(
                <>
                  <DndTeamList key={idx} e={e}></DndTeamList>
                </>
              )
            })
          }
        </div>

    </React.Fragment>

  );
};

export default AdminTeamPage;