import React from 'react';
import styled from "styled-components";
import { addMemberListFB } from '../redux/modules/MemberList';

import { useDispatch, useSelector } from 'react-redux';


import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const AdminMemberList = (props) => {

  const dispatch = useDispatch();

  const memberList = useSelector((state) => state.MemberList.memberList);

  const weeks = props.week

  console.log(weeks)

    // Modal 온 오프 액션을 위한 스테이트
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
  
  return (
    <MemberDiv>
      {
        memberList.map((e, idx)=>{
          const thisMember = e.userId
          return(
            <div>
            <MemberName key={idx} onClick={handleOpen}>{e.userName}</MemberName>
            <Modal
            open={open} onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                추가 할 팀
                </Typography>
                {
                  props.teamList.map((e, idx)=>{
                  return(
                    <div key={idx}>
                      {e.teamName}
                      <button onClick={() => {
                        dispatch(addMemberListFB(e.teamId, thisMember));
                        // setOpen(false);
                        }}>추가</button>
                    </div>
                  )
                  })
                }
                {/* <button onClick={() => {dispatch(addTeamListFB(is_teamName ,is_week))}}>+</button> */}
              </Box>
            </Modal>
            </div>
          )
        })
      }
    </MemberDiv>
  );
};

// dispatch(addMemberListFB( e.teamId , e.userId ))

const MemberDiv = styled.div`
  width : 800px;
  height : 200px;
  background-color : gray;
  float : right;
`

const MemberName = styled.div`
  width : 100px;
  height : 20px;
  background-color : white;
  border : 1px solid black;
  float : left;
  text-align : center;
`

export default AdminMemberList;