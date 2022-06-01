import React, { useEffect } from 'react';
import styled from 'styled-components';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { borderRadius } from '@mui/system';

import { getUserId, getCookie } from "../../shared/Cookie";
import jwt_decode from "jwt-decode";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  height : 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
};

const UserCheckInList = (props) => {

  // console.log("프롭스 sse 는 = ", props.sse)
  // console.log("프롭스 e 는 = ", props.e)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    // const sseEmail = props.sse !== null ? props.sse.split(",")[1].split(":")[1] : props.sse;
    // const sseOnline = props.sse !== null ? props.sse.split(",")[4].split(":")[1] : props.sse;
    // const BooleanSseOnline = sseOnline === "true" ? true : false
    // const sseLate = props.sse !== null ? props.sse.split(",")[5].split(":")[1].split("}")[0] : props.sse;
    // const BooleanSseLate = sseLate === "true" ? true : false
  
    // console.log(BooleanSseLate)
    // console.log(sseOnline)
    // console.log(sseLate)
    
    // console.log("결과는222? =", sseEmail)
    // console.log("결과는3333? =", '"' + props.e.userEmail + '"')
    // console.log("결과는? =",sseEmail === '"' + props.e.userEmail + '"')
    
    // const SSE = (e) => {
    //   if (sseEmail === '"' + props.e.userEmail + '"'){
    //     return {...props.e, online : BooleanSseOnline, lateCheck : BooleanSseLate}
    //   } 
    //   return props.e
    // }
    
    // console.log(SSE())

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
            <ProfileImg src={props.e.imageUrl}></ProfileImg>
            <UserDataP>
            {props.e.userName}님은 <UserOnlineSpan>{props.e.online === false ? "오프라인" : "온라인" }</UserOnlineSpan> 입니다.
            </UserDataP>
            <UserDataP>
              Email : {props.e.userEmail}
            </UserDataP>
            <UserDataP>
              전화번호 : {props.e.phoneNumber}
            </UserDataP>
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
  cursor : pointer;
`

const UserDetail = styled.p`
  line-height : 9px;
  font-weight : 700;
  font-size : 14px;
`

const ProfileImg = styled.img`
  object-fit: cover;
  object-position: center;
  width: 6rem;
  height: 6rem;
  margin : 20px 0 0 15px;
  overflow: hidden;
  border-radius: 100%;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const UserDataP = styled.p`
  margin : 20px 0 0 15px;
  font-weight : 700;
`

const UserOnlineSpan = styled.span`
  color : #FF5F00;
`

export default UserCheckInList;