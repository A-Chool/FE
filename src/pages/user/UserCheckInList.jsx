import React from 'react';
import styled from 'styled-components';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { borderRadius } from '@mui/system';

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

const UserCheckInList = (props) => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <UserTag style={{
      backgroundColor : props.e.online === false ? 'rgba(224, 224, 224, 0.5)' : props.e.lateCheck === false ? 'white' : 'rgba(242, 3, 3, 0.1)' ,
      border : props.e.online === false ? '1.5px solid #C4C4C4' : props.e.lateCheck === false ? '1.5px solid #3B879B' : '1.5px solid #F20303' ,
      borderRadius : '24px'
      }}>
      <UserDetail onClick={handleOpen}>{props.e.userName}</UserDetail>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {props.e.userName}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {props.e.userEmail}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {props.e.phoneNumber}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {props.e.online === false 
              ? "오프라인 입니다"
              : "온라인 입니다" }
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </UserTag>
  );
};

const UserTag = styled.div`
  width : 100px;
  height : 36px;

  margin : 10px 10px;
  display : inline-block;
`

const UserDetail = styled.p`
  line-height : 9px;
  font-weight : 700;
  font-size : 14px;
`

export default UserCheckInList;