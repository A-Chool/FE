import React from 'react';
import styled from "styled-components";
import { addMemberList } from '../../redux/modules/teamList';
import { getMemberList } from '../../redux/modules/teamList';
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

  // console.log(props)

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
    width: 320,
    height : 435,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
  };

  // console.log(props.e)
  // console.log(props.teamList)
  // console.log(props.week)

  const tema_list = props.teamList
  const user_id = props.e.userId
  const weekId = props.weekBucket
  // const weeks = props.week

  return (
    <>
      <Userdata onClick={handleOpen}>{props.e.userName}</Userdata>
      <Modal
      open={open} onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
        <Box sx={style}>
          <TeamChoice>팀 지정</TeamChoice>
          <TeamChoiceSub>팀 리스트</TeamChoiceSub>
          <TeamChoiceBg>
            {
              tema_list.map((e, idx)=>{
                return(
                  <TeamChoiceList key={idx} onClick={() => {dispatch(addMemberList(user_id, e.teamId,  e.weekId));setOpen(false);}}>
                    {e.teamName}
                  </TeamChoiceList>
                )
              })
            }
          </TeamChoiceBg>

        </Box>
      </Modal>
    </>
  )
};

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

const TeamChoice = styled.p`
  font-weight: 700;
  font-size: 18px;
  margin-left : 20px;
`

const TeamChoiceSub = styled.p`
  font-weight: 400;
  font-size: 13px;
  margin-left : 20px;
  margin-bottom : 4px;
`

const TeamChoiceBg = styled.div`
  width: 304px;
  height: 313px;
  background: #F3F6F9;
  border-radius: 4px;
  margin : 0px auto;
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    width: 4px;
    background: #c4c4c4;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transition;
  }
`

const TeamChoiceList = styled.div`
  width: 256px;
  height: 40px;
  font-weight: 700;
  font-size: 14px;
  line-height: 40px;
  margin : 0px auto;
  border-bottom: 1px solid #EEEEEE;
  padding : 0px 12px;
  &:hover{
    background: rgba(59, 135, 155, 0.3);
    border-radius: 4px;
  }
`

export default AdminMemberList;