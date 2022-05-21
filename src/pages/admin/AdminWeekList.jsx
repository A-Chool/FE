/* eslint-disable */
import React from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import etcBtn from '../../assets/img/etc.svg'

import { getTeamList } from '../../redux/modules/teamList';
import { loadMemberList } from '../../redux/modules/teamList';
import { deleteWeekList, editWeekName, setDisplayWeek } from '../../redux/modules/week';
import { addTeamList } from '../../redux/modules/teamList';
import { deleteTeamList } from '../../redux/modules/teamList';

import todoUpBtnImg from '../../assets/img/todoUpBtn.svg'
import editBtnImg from '../../assets/img/editBtn.svg'

const AdminWeekList = (props) => {

  const dispatch = useDispatch();

  // console.log(props.teamList)

    // Modal style
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 320,
      height : 435,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,

    };

    // 주차 모달
    const [weekOpen, setWeekOpen] = React.useState(false);
    const weekHandleOpen = () => setWeekOpen(true);
    const weekHandleClose = () => setWeekOpen(false);

    const [teamOpen, setTeamOpen] = React.useState(false);

    // 팀 추가에서 팀이름을 입력 Input 변화를 담을 스테이트
    const [is_teamName, setTeamName] = React.useState();

    // 팀 추가에서 팀이름을 입력 Input 변화추적하기 위한 액션
    const handlesetTeamName = (e) => {
      setTeamName(e.target.value)
    }

    const [weekNameEdit, setWeekNameEdit] = React.useState(false);

    const [weekName, setWeekName] = React.useState();
  
    const teamEdithandleEvent = (event) => {
      setWeekName(event.target.value);
    };

  return (
    <WeekTag
    e = {props.e.display}
    teamOpen = {teamOpen}
    
    onClick={() => {
    dispatch(getTeamList(props.e.weekId));
    dispatch(loadMemberList(props.e.weekId));
    setTeamOpen(!teamOpen)
    }}>
    <WeekTagName>
      {props.e.weekName}
      {/* <hr style={{
        width : '0px',
        height : '20px',
        border: '0.7px solid #C4C4C4',
        }}/> */}
    </WeekTagName>
    <WeekTagEdit>
      <img src = {etcBtn} onClick={weekHandleOpen}/>
      <Modal
        open={weekOpen}
        onClose={weekHandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditWrapper>
            {
              weekNameEdit === false 
              ?
              <EditTeamNameP>
                {props.e.weekName}
              </EditTeamNameP>
              :
              <EditTeamNameInput defaultValue={props.e.weekName} onChange={teamEdithandleEvent}>

              </EditTeamNameInput>
            } 
            {
              weekNameEdit === false 
              ?
              <HideBtn src={editBtnImg} onClick={() => {
                setWeekNameEdit(true);
                }} ></HideBtn>
              :
              <HideBtn src={editBtnImg} onClick={() => {
                dispatch(editWeekName(props.e.weekId, weekName));
                setWeekNameEdit(false);
                }} ></HideBtn>
            }
          </EditWrapper>
          <FnWrapper>
            <WeekDeleteDiv onClick={() => {dispatch(deleteWeekList(props.e.weekId))}}>
              주차삭제
            </WeekDeleteDiv>
            <WeekDisplayDiv onClick={() => {dispatch(setDisplayWeek(props.e.weekId))}}>
              메인으로 설정
            </WeekDisplayDiv>
          </FnWrapper>
          <TeamListHeader>팀 리스트</TeamListHeader>
          <TeamListBackDiv>
            {
              props.teamList.map((e, idx)=>{
                return(
                  <TeamNameList key={idx}>
                    <TeamNameListP>{e.teamName}</TeamNameListP>
                    <TeamNameListImg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"  onClick={() => {dispatch(deleteTeamList(e.teamId, props.e.weekId))}}>
                      <path d="M31.875 8.25H25.3125L24.7656 7.26562C24.5469 6.82812 24.1094 6.5 23.6172 6.5H17.3281C16.8359 6.5 16.3984 6.82812 16.1797 7.26562L15.6875 8.25H9.125C8.63281 8.25 8.25 8.6875 8.25 9.125V10.875C8.25 11.3672 8.63281 11.75 9.125 11.75H31.875C32.3125 11.75 32.75 11.3672 32.75 10.875V9.125C32.75 8.6875 32.3125 8.25 31.875 8.25ZM11.1484 32.0391C11.2031 33.4609 12.3516 34.5 13.7734 34.5H27.1719C28.5938 34.5 29.7422 33.4609 29.7969 32.0391L31 13.5H10L11.1484 32.0391Z" fill="#8F9CAF"/>
                    </TeamNameListImg>
                  </TeamNameList>
                )
              })
            }
            <TeamAddWrapper>
              <TeamNameInput onChange={handlesetTeamName} placeholder='팀명을 입력해 주세요.'></TeamNameInput>
              <TeamNameAddBtn 
                src={todoUpBtnImg}  
                onClick={() => {dispatch(addTeamList(is_teamName ,props.e.weekId))}}>
              </TeamNameAddBtn>
            </TeamAddWrapper>

          </TeamListBackDiv>
        </Box>
      </Modal>
    </WeekTagEdit>
  </WeekTag>
  );
};

const WeekTag = styled.div`
  width: 129px;
  height: 33px;
  text-align : center;
  // background-color: ${({ teamOpen }) => (teamOpen === true ? 'white' : 'none')};
  
  border-bottom : ${({ e }) => (e === true ? '2px solid #FF5F00;' : 'none')};
  &:hover {
    background: rgba(196, 219, 225, 0.5);
    border-radius: 8px 8px 0px 0px;
  }
`

const WeekTagName = styled.div`
  width: 130px;
  height: 33px;
  font-weight: 700;
  font-size: 16px;
  margin : 0px auto;
  float : left;
  position : absolute;
  line-height : 33px;
`

const WeekTagEdit = styled.div`
  height: 33px;
  width: 20px;
  // background-color : green;
  display : none;
  padding-top : 7px;
  margin-left : 100px;
  ${WeekTag}:hover & {
    display : inline-block;
    position: relative;
    z-index : 9999;
  }
`

const EditWrapper = styled.div`
  width: 200px;
  height: 24px; 
  margin : 23px 0 0 20px;
`

const EditTeamNameP = styled.p`
font-weight: 700;
font-size: 18px;
float : left;
display : inline-block;
line-height : 24px;
margin : 0 11px 0 0;
`

const EditTeamNameInput = styled.input`
  width: 160px;
  height: 24px; 
  border : none;
  border-bottom : 1px solid #EEEEEE;
  background-color : transparent;
  float : left;
  background-color: none;
  float : left;
  &:focus {
    outline : none;
  }
`

const HideBtn = styled.img`
    display : inline-block;
    width: 28px;
    height: 24px; 
`

const FnWrapper = styled.div`
  margin : 14px 16px 24px;
`

const WeekDeleteDiv = styled.div`
  width: 116px;
  height: 40px; 
  background: #E0E0E0;
  border-radius: 100px;
  text-align : center;
  line-height : 40px;
  font-weight: 700;
  font-size: 14px;
  color: #1F3A5E;
  display : inline-block;
  float : left;
  margin-right : 8px;
`

const WeekDisplayDiv = styled.div`
  width: 142px;
  height: 40px;
  background: #FF5F00;
  border-radius: 100px;
  display : inline-block;
  text-align : center;
  line-height : 40px;
  font-weight: 700;
  font-size: 14px;
  color : white;
`

const TeamListHeader = styled.p`
  font-weight: 400;
  font-size: 13px;
  color: #1F3A5E;
  margin-left : 20px;
`

const TeamListBackDiv = styled.div`
  width: 304px;
  height: 272px;
  background: #F3F6F9;
  border-radius: 4px;
  margin : 4px 8px 20px;
  overflow : scroll;
  overflow-x : hidden;
  &::-webkit-scrollbar {
    width : 4px;
  }
  &::-webkit-scrollbar-thumb {
    width : 4px;
    background: #C4C4C4;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transition;
  }
`

const TeamNameList = styled.div`
width: 280px;
height: 40px;
border-bottom: 1px solid #eeeeee;
display : inline-block;
margin : 0px 12px;
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

const TeamAddWrapper = styled.div`
  margin-top : 16px;
`

const TeamNameInput = styled.input`
  height : 16px;
  width: 260px;
  margin : 0px 12px;
  border : none;
  border-bottom : 1px solid #E0E0E0;
  padding : 8px 10px;
  background-color : transparent;
  float : left;
  background-color: none;
  float : left;
  &:focus {
    outline : none;
  }
`

const TeamNameAddBtn = styled.img`
  margin-left : -42px;
`

export default AdminWeekList;