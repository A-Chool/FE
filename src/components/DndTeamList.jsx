import React from 'react';
import styled from "styled-components";
import Members from './Members';
import DeleteMember from './DeleteMember';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useDispatch, useSelector } from 'react-redux';
import { deleteMemberList } from '../redux/modules/teamList';
import { loadMemberList } from '../redux/modules/teamList';

import deleteUser from './../assets/img/deleteUser.svg'
import deleteuser from './../assets/img/deleteUser.svg'

const DndTeamList = (props) => {

  const dispatch = useDispatch();

  // 모달 스타일
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 280,
    height : 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '4px',
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
        <DeleteMemberImg src={deleteuser} onClick={handleOpen}></DeleteMemberImg>
        
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
          <DeleteMemberHeader>
          {props.e.teamName} 팀원 삭제
          </DeleteMemberHeader>
          {
            members.map((e, idx)=>{
            const user_id = e.user.userId
              return(
                // <div key={idx} >
                //   <div style={{
                //   display: "flex",
                //   flexDirection: "row",
                //   justifyContent: "space-between",
                //   alignItems: "center",
                //   }}>
                //   <DeleteMember e={e}></DeleteMember>
                //     <button onClick={() => {dispatch(deleteMemberList(e.memberId, user_id, props.e.weekId))}}>제거</button>
                //   </div>
                // </div>
                    <TeamNameList key={idx}>
                    <TeamNameListP>{e.user.userName}</TeamNameListP>
                    <TeamNameListImg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"  onClick={() => {dispatch(deleteMemberList(e.memberId, user_id, props.e.weekId))}}>
                      <path d="M31.875 8.25H25.3125L24.7656 7.26562C24.5469 6.82812 24.1094 6.5 23.6172 6.5H17.3281C16.8359 6.5 16.3984 6.82812 16.1797 7.26562L15.6875 8.25H9.125C8.63281 8.25 8.25 8.6875 8.25 9.125V10.875C8.25 11.3672 8.63281 11.75 9.125 11.75H31.875C32.3125 11.75 32.75 11.3672 32.75 10.875V9.125C32.75 8.6875 32.3125 8.25 31.875 8.25ZM11.1484 32.0391C11.2031 33.4609 12.3516 34.5 13.7734 34.5H27.1719C28.5938 34.5 29.7422 33.4609 29.7969 32.0391L31 13.5H10L11.1484 32.0391Z" fill="#8F9CAF"/>
                    </TeamNameListImg>
                  </TeamNameList>
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
  min-width : 117px;
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

const DeleteMemberImg = styled.img`
  height : 42px;
  margin : 0px 8px;
  float : left;
`

const DeleteMemberHeader = styled.div`
width: 264px;
height: 48px;
background: #C4DBE1;
border-radius: 4px 4px 0px 0px;
font-weight: 700;
font-size: 16px;
color: #1F3A5E;
line-height: 48px;
padding-left : 16px;
`

const TeamNameList = styled.div`
width: 248px;
height: 40px;
border-bottom: 1px solid #eeeeee;
display : inline-block;
padding : 0 16px;
display: flex;
justify-content: space-between;
`

const TeamNameListP = styled.p`
  font-weight: 700;
  font-size: 14px;
  color: #282828;
  float : left;
  display : inline-block;
  margin-left : 12px;
  line-height : 14px;
`

const TeamNameListImg = styled.svg`
  
`


export default DndTeamList;