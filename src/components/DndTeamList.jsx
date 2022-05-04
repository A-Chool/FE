import React from 'react';
import styled from "styled-components";
import Members from './Members';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { useDispatch, useSelector } from 'react-redux';
import { deleteMemberListFB } from '../redux/modules/TeamList';

const DndTeamList = (props) => {

  const dispatch = useDispatch();

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const members = props.e.memberList

  return (
    <>
      <AddTeam>
        <div>
        {props.e.teamName}
        </div>

        {
          members.map((e, idx)=>{
            return(
              <Members key={idx} e={e}></Members>
            )
          })
        }
        <AddMember onClick={handleOpen}>+ 팀원 추가</AddMember>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {props.e.teamName}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                유저명
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {
                  members.map((e, idx)=>{
                    return(
                      <>
                        <div key={idx} style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}>
                          <Members key={idx} e={e}></Members>
                            <button
                            onClick={() => {dispatch(deleteMemberListFB(e.memberId))}}
                            >제거</button>
                        </div>
                      </>
                    )
                  })
                }
                <div>

                </div>
              </Typography>
            </Box>
          </Modal>
      </AddTeam>
    </>
  );
};

const AddTeam = styled.div`
width : 200px;
height : 30px;
border : 1px solid black;
border-radius : 5px;
margin-top : 10px;
text-align : center;
line-height : 30px;
float : left;
margin : 10px 10px;
background-color : gray;
`

const AddMember = styled.button`
width : 200px;
height : 30px;
border : 1px solid black;
border-radius : 5px;
margin-top : 10px;
text-align : center;
line-height : 30px;
float : left;
margin : 10px 0px;
background-color : white;
  &:hover {
    background-color : gray;
  }
`

export default DndTeamList;