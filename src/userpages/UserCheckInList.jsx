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
      <Log></Log>
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
          </Box>
        </Fade>
      </Modal>
    </div>
    </UserTag>
  );
};

const UserTag = styled.div`
  width : 100px;
  height : 30px;
  border : 1px solid black;
  border-radius : 5px;
  float : left;
  margin : 5px;
  
`

const UserDetail = styled.p`
  align-items : center;
  text-align : center;
  margin : 5px
`

const Log = styled.div`
  width : "4px"; 
  height : '4px'; 
  backgroundColor : 'red'; 
  float : 'left';
`

export default UserCheckInList;