/* eslint-disable */
import React from 'react';
import styled from "styled-components";

import AdminSidebar from "./AdminSideBar";
import DndTeamList from '../../components/DndTeamList';
import AdminMemberList from './AdminMemberList';
import AdminWeekList from './AdminWeekList';
import { useDispatch, useSelector } from 'react-redux';
import { getTeamList } from '../../redux/modules/teamList';
import { addTeamList } from '../../redux/modules/teamList';
import { getWeekList } from '../../redux/modules/teamList';
import { deleteTeamList } from '../../redux/modules/teamList';
import { loadMemberList } from '../../redux/modules/teamList';
import { loadWeekList } from '../../redux/modules/week';
import { addWeekList } from '../../redux/modules/week';

import teamAdd from '../../assets/img/teamAdd.svg'
import memberAdd from '../../assets/img/memberAdd.svg'
import addMember from '../../assets/img/addMember.svg'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';



const AdminTeamPage = () => {
  const dispatch = useDispatch();

  // 주차 리스트 불러오기
  // React.useEffect(() => {
  //   dispatch(getWeekList());
  // },[]);

  // 주차 리스트 정보 꺼내기
  // const weekList = useSelector((state) => state.teamList.week);

  // 해당 주차의 팀 리스트 불러오기
  React.useEffect(() => {
    dispatch(getTeamList());
  }, []);

  // 팀 리스트 정보 꺼내기
  const teamList = useSelector((state) => state.teamList.teams);

  React.useEffect(() => {
    dispatch(loadWeekList());
  },[]);

  // 주차 리스트 정보 꺼내기
  const week_list = useSelector((state) => state.week.weekList);

  // console.log(week_list)

  // 팀 리스트에서 가공한 데이터를 정리해서 푸쉬할 빈 배열
  // const teams = [];

  // 팀 리스트에서 정보를 가공하는 로직
  // for (const i in teamList) {
  //   const teamDate = [i.split(':')]
  //   teams.push({'teamName' : teamDate[0][0], 'teamId' : teamDate[0][1] , 'memberList' : teamList[i]});
  // }

  // Modal style
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // Modal 온 오프 액션을 위한 스테이트
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 드랍박스에서 주차를 클릭했을때 변화를 담을 스테이트
  const [week, setClickWeek] = React.useState("");

  // 팀이 없는 맴버 꺼내오기
  const memberList = useSelector((state) => state.memberList.memberList);

  // 팀 추가에서 팀이름을 입력 Input 변화를 담을 스테이트
  const [is_teamName, setTeamName] = React.useState();

  // 팀 추가에서 팀이름을 입력 Input 변화추적하기 위한 액션
  const handlesetTeamName = (e) => {
    setTeamName(e.target.value);
  };

  const [test, setTest] = React.useState(true);

  const [weekBucket, setWeekBucket] = React.useState();

  // console.log(weekBucket)



    // 주차 추가 모달
    const [addWeekOpen, setAddWeekOpen] = React.useState(false);
    const addWeekHandleOpen = () => setAddWeekOpen(true);
    const addWeekHandleClose = () => setAddWeekOpen(false);

    const [addWeekName, setAddWeekName] = React.useState("");

    const handleAddWeekName = (e) => {
      setAddWeekName(e.target.value)
    }

  return (
    <React.Fragment>
      <div style={{display : 'flex'}}>
          <AdminSidebar />
          <BackgroundDiv>
            <PageName>팀관리</PageName>
            <FnWrapper>
              {
                week_list && week_list.map((e, idx)=>{
                  // const [teamOpen, setTeamOpen] = React.useState(false);
                  return(
                    <AdminWeekList e={e} teamList={teamList}></AdminWeekList>
                  )
                })
              }
              <WeekTag>
                <WeekTagName onClick={addWeekHandleOpen}>추가</WeekTagName>
                <Modal
                  open={addWeekOpen}
                  onClose={addWeekHandleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      주차추가
                    </Typography>
                    <input onChange={handleAddWeekName}></input>
                    <button onClick={() => {dispatch(addWeekList(addWeekName))}}>추가</button>
                  </Box>
                </Modal>
              </WeekTag>
            </FnWrapper>

            <TeamListWrapper>
              {
                teamList.map((e, idx)=>{
                  return(
                  <DndTeamList key={idx} e={e} week={week} />
                  )
                })
              }
            </TeamListWrapper>


          </BackgroundDiv>

      </div>
          {/* <AdminMemberList week={week} teamList={teamList} /> */}
          {
            test === false 
            ?
            <MemberDiv>
              <AddMember>
                <OpenBtn src={memberAdd} onClick={() => {setTest(!test)}}/>
              </AddMember>
              {
                memberList.map((e, idx)=>{
                  return(
                    <AdminMemberList key={idx} e={e} teamList={teamList} weekBucket={weekBucket} week={week}/>
                  )
                })
              }
            </MemberDiv>
            :
              <AddMemberOff>
                <OpenBtnOff src={addMember} onClick={() => {setTest(!test)}}/>
              </AddMemberOff>
          }
          {/* <MemberDiv>
            <AddMember>
              <OpenBtn src={memberAdd} onClick={() => {
                setTest(!test)
              }}/>
            </AddMember>
            {
              memberList.map((e, idx)=>{
                return(
                <AdminMemberList key={idx} e={e} teamList={teamList} week={week}/>
                )
              })
            }
          </MemberDiv> */}
    </React.Fragment>
  );
};

const BackgroundDiv = styled.div`
  height: 100vh;
  float: left;
  background-color: #f4f6f9;
  flex-grow: 1;
`;

const PageName = styled.p`
  font-weight: 700;
  font-size: 24px;
  margin: 40px 0 32px 32px;
`;

const FnWrapper = styled.div`
  width : auto;
  height : 42px;
  display: flex;
  margin : 0 32px 24px;

`

const TeamAddWrapper = styled.div`
  background-color : transition;
  width : 1106px;
  height: 72px;
  margin : 0 32px 16px;
  border: 1px solid #E0E0E0;
  border-radius : 8px;
  display : flex;
`

const WeekTag = styled.div`
  width: 129px;
  height: 33px;
  text-align : center;
  background-color: ${({ teamOpen }) => (teamOpen === true ? 'white' : 'none')};
  border-right : 1px solid #C4C4C4;
  border-bottom : ${({ e }) => (e === true ? '2px solid #FF5F00;' : 'none')};
  &:hover {
    background: rgba(196, 219, 225, 0.5);
    border-radius: 8px 8px 0px 0px;
  }
`

const WeekTagName = styled.div`
  width: 129px;
  height: 33px;
  font-weight: 700;
  font-size: 16px;
  margin : 0px auto;
  float : left;
  position : absolute;
  line-height : 33px;
  // ${WeekTag}:hover & {
  //   width: 110px;
  // }
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

const Selecter = styled.select`
  width: 118px;
  height : 40px;
  padding: .5em .9em;
  border: 1px solid #999;
  font-weight: 700;
  font-size: 16px;
  // background: url('arrow.jpg') no-repeat 95% 50%;
  border: 2px solid #1f3a5e;
  box-sizing: border-box;
  border-radius: 4px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  &::-ms-expand {
    display: none;
  }
`;

const SelectSVG = styled.svg`
  margin-left: -35px;
  align-self: center;
  width: 20px;
  height: 14px;
`;

const TeamListWrapper = styled.div`
  width: auto;
  height: 70%;
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
`;

const MemberDiv = styled.div`
  width: 738px;
  height: 216px;
  background-color: white;
  float: right;
  position: absolute;
  bottom: 46px;
  right: 0px;
  border-radius: 24px 0px 0px 24px;
  -webkit-animation: slide-in-left 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-in-left 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  @-webkit-keyframes slide-in-left {
    0% {
      -webkit-transform: translateX(738px);
      transform: translateX(738px);
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
  }
  @keyframes slide-in-left {
    0% {
      -webkit-transform: translateX(738px);
      transform: translateX(738px);
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
  }
`

const MemberDivOff = styled.div`
  width: 738px;
  height: 216px;
  background-color: white;
  float: right;
  position: absolute;
  bottom: 46px;
  right: -684px;
  border-radius: 24px 0px 0px 24px;
  display : ;
  transition : 300ms ease-in-out;
  -webkit-animation: slide-in-right 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: slide-in-right 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  @-webkit-keyframes slide-in-right {
    0% {
      -webkit-transform: translateX(-738px);
      transform: translateX(-738px);
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
  }
  @keyframes slide-in-right {
    0% {
      -webkit-transform: translateX(-738px);
      transform: translateX(-738px);
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
  }
`;

const AddMember = styled.div`
  width: 54px;
  height: 216px;
  background: #ff5f00;
  border-radius: 24px 0px 0px 24px;
  text-align : center;
  margin-right : 8px;
  float : left;
`
const AddMemberOff = styled.div`
width : 54px;
height : 216px;
background: #FF5F00;
float : right;
position : absolute;
bottom : 46px;
right : 0px;
border-radius: 24px 0px 0px 24px;
transition : 300ms ease-in-out;
-webkit-animation: slide-in-right 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
animation: slide-in-right 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
@-webkit-keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(-738px);
    transform: translateX(-738px);
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}
@keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(-738px);
    transform: translateX(-738px);
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}
`

const OpenBtn = styled.img`
position : absolute;
margin : 92px 0 0 -38px;
`
const OpenBtnOff = styled.img`
position : absolute;
margin : 92px 0 0 -11px;
`

export default AdminTeamPage;
