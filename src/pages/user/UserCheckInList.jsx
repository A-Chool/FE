import React from 'react';
import styled from 'styled-components';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
    <UserTag>
      <div>
      <Log style={{backgroundColor : props.e.online === false ? '#C4C4C4' : 'blue'}}></Log>
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
    </div>
    </UserTag>
  );
};

const UserTag = styled.div`
  width : 95px;
  height : 32px;
  float : left;
  margin : 8px 16px;
  font-size : 14px;
  font-weight : 700;
  align-items: center;
`

const UserDetail = styled.p`
  align-items : center;
  text-align : center;
  margin : 5px;
`

const Log = styled.div`
  width : 8px; 
  height : 8px; 
  float : left;
  border-radius : 50px;
  margin-top : 5px;
  margin-left : 20px;
`

export default UserCheckInList;