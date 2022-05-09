import React from 'react';
import styled from "styled-components";
import Members from './Members';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useDispatch, useSelector } from 'react-redux';
import { deleteMemberList } from '../redux/modules/MemberList';
import { loadMemberList } from '../redux/modules/MemberList';

import deleteUser from '../img/deleteUser.svg'

const DndTeamList = (props) => {

  const dispatch = useDispatch();

  // 모달 스타일
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

  // Modal 온/오프 스테이트
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 해당 팀의 팀원들 정보
  const members = props.e.memberList

  // 아직 사용안한 스테이트 값들
  // const [member, setMember] = React.useState('');

  // const handleChange = (event) => {
  //   setMember(event.target.value);
  //   dispatch(loadMemberList(event.target.value));
  // };

  return (
    <TemaList>
      <TeamName>
        {props.e.teamName}
      </TeamName>

      <MemberList>
        <DeleteMember src={deleteUser} onClick={handleOpen}></DeleteMember>
        
        {
          members.map((e, idx)=>{
            return(
              <Members key={idx} e={e}></Members>
            )
          })
        }
      </MemberList>
        
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          {props.e.teamName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          유저명
          </Typography>
          {
            members.map((e, idx)=>{
            const user_id = e.user.userId
              return(
                <div key={idx} >
                  <div style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  }}>
                  <Members e={e}></Members>
                    <button onClick={() => {dispatch(deleteMemberList(e.memberId, user_id))}}>제거</button>
                  </div>
                </div>
              )
            })
          }
        </Box>
      </Modal>

    </TemaList>
  );
};

const TemaList = styled.div`
  background-color : white;
  width : 1108px;
  height: 72px;
  margin : 0 32px 16px;
  border-radius : 8px;
  display : flex;
`

const TeamName = styled.div`
  float : left;
  width: 117px;
  height: 72px;
  text-align : center;
  font-weight: 700;
  font-size: 16px;
  line-height: 72px;
  background: rgba(59, 135, 155, 0.3);
  border-radius : 8px 0 0 8px;
`

const MemberList = styled.div`
display : flex;
border-radius : 0 8px 8px 0;
padding : 16px 8px;
overflow : hidden;
overflow-x : scroll;
&::-webkit-scrollbar {
  height : 4px;
}
&::-webkit-scrollbar-thumb {
  width : 100px;
  background: #C4C4C4;
  border-radius: 4px;
}
&::-webkit-scrollbar-track {
  background: transition;
}
`

const DeleteMember = styled.img`
  margin : 0px 8px;
  float : left;
`

export default DndTeamList;