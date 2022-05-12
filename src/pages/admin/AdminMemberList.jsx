import React from 'react';
import styled from "styled-components";
import { addMemberList } from '../../redux/modules/memberList';
import { getMemberList } from '../../redux/modules/memberList';
import { getTeamList } from '../../redux/modules/teamList';

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

  // console.log(props.e)
  // console.log(props.teamList)
  // console.log(props.week)

  const tema_list = props.teamList
  const user_id = props.e.userId
  // const weeks = props.week

  return (
    <>
      <Userdata onClick={handleOpen}>{props.e.userName}</Userdata>
      <Modal
      open={open} onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          추가 할 팀
          </Typography>
          {
            tema_list.map((data, idx)=>{
            return(
              <div key={idx}>
                {data.teamName}
                <button onClick={() => {
                  dispatch(addMemberList(data.teamId, user_id));
                  setOpen(false);
                  }}>추가</button>
              </div>
            )
            })
          }
          {/* <button onClick={() => {dispatch(addTeamList(is_teamName ,is_week))}}>+</button> */}
        </Box>
      </Modal>
    </>
  )





  // const weeks = props.week

  
  // return (
  //   <MemberDiv>
  //     {
  //       memberList.map((e, idx)=>{
  //         const thisMember = e.userId
  //         // console.log(e.userId)
  //         return(
  //           <div>
  //           <MemberName key={idx} onClick={handleOpen}>{e.userName}</MemberName>
  //           <Modal
  //           open={open} onClose={handleClose}
  //           aria-labelledby="modal-modal-title"
  //           aria-describedby="modal-modal-description">
  //             <Box sx={style}>
  //               <Typography id="modal-modal-title" variant="h6" component="h2">
  //               추가 할 팀
  //               </Typography>
  //               {
  //                 props.teamList.map((data, idx)=>{
  //                   // console.log(thisMember)
  //                   // console.log(e)
  //                 return(
  //                   <div key={idx}>
  //                     {data.teamName}
  //                     <button onClick={() => {
  //                       // dispatch(getMemberList(weeks))
  //                       dispatch(addMemberList(data.teamId, thisMember));
  //                       // dispatch(getMemberList(weeks))
  //                       setOpen(false);
  //                       }}>추가</button>
  //                   </div>
  //                 )
  //                 })
  //               }
  //               {/* <button onClick={() => {dispatch(addTeamList(is_teamName ,is_week))}}>+</button> */}
  //             </Box>
  //           </Modal>
  //           </div>
  //         )
  //       })
  //     }
  //   </MemberDiv>
  // );
};

// dispatch(addMemberList( e.teamId , e.userId ))

const MemberDiv = styled.div`
  width : 800px;
  height : 200px;
  background-color : gray;
  float : right;
`

const Userdata = styled.div`
width: 110px;
min-width : 115px;
height: 40px;
border: 1px solid rgba(31, 58, 94, 0.5);
border-radius: 8px;
font-weight: 700;
font-size: 14px;
line-height: 40px;
text-align : center;
margin : 8px 8px;
display : inline-block;
`

export default AdminMemberList;