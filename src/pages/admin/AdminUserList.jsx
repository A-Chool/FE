import React from "react";
import styled from "styled-components";

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch } from "react-redux";

import { deleteUserList } from "../../redux/modules/UserList";
import { editUserList } from "../../redux/modules/UserList";
import { height } from "@mui/system";


const AdminUserList = (props) => {

  const dispatch = useDispatch();
  
  // Modal Style
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '13%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  // Modal 온 오프 액션을 위한 스테이트
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 유저 권한 설정을 위한 스테이트
  const [Level, setLevel] = React.useState();

  // 유저 권한 설정을 위한 Input값 받아오기
  const handlesetLevel = (e) => {
    setLevel(e.target.value)
  }

  return (
    <React.Fragment>
          <UserList>
            <Userdata style={{width : "6%"}}>{props.idx + 1}</Userdata>
            <Userdata style={{width : "11%",   fontWeight: '700'}}>{props.e.userName}</Userdata>
            <Userdata style={{width : "25%"}}>{props.e.userEmail}</Userdata>
            <Userdata style={{width : "18%"}}>{props.e.phoneNumber}</Userdata>
            <Userdata style={{width : "18%"}}>{props.e.createdAt}</Userdata>
            <Userdata id="level" style={{width : "11%"}} onClick={handleOpen}>{props.e.userLevel >= 5 ? "Admin" : "User"}</Userdata>
            <DeleteSvg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => {dispatch(deleteUserList(props.e.userId))}}>
              <path d="M31.875 8.25H25.3125L24.7656 7.26562C24.5469 6.82812 24.1094 6.5 23.6172 6.5H17.3281C16.8359 6.5 16.3984 6.82812 16.1797 7.26562L15.6875 8.25H9.125C8.63281 8.25 8.25 8.6875 8.25 9.125V10.875C8.25 11.3672 8.63281 11.75 9.125 11.75H31.875C32.3125 11.75 32.75 11.3672 32.75 10.875V9.125C32.75 8.6875 32.3125 8.25 31.875 8.25ZM11.1484 32.0391C11.2031 33.4609 12.3516 34.5 13.7734 34.5H27.1719C28.5938 34.5 29.7422 33.4609 29.7969 32.0391L31 13.5H10L11.1484 32.0391Z" fill="#8F9CAF"/>
            </DeleteSvg>

            <div>
              <Modal
              open={open} onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description">
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">권한 설정하기</Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <input defaultValue={props.e.userLevel} onChange={handlesetLevel}></input>
                    <button onClick={() => {dispatch(editUserList(props.e.userId, Number(Level)))}}>설정확인</button>
                  </Typography>
                </Box>
              </Modal>
            </div>

          </UserList>
    </React.Fragment>
  )
}

const UserList = styled.div`
  background-color : white;
  width : auto;
  height : 40px;
  text-align : center;
  border-bottom : 1px solid #E0E0E0;
`

const Userdata = styled.p`
  float : left;
  margin : 10px auto;
  font-size: 14px;
`

const DeleteSvg = styled.svg`
  @media screen and (max-height: 1000px) {
    height : 30px;
    width : 30px;
    margin : 5px auto;
  }
`


export default AdminUserList



// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

// const [level, setLevel] = React.useState('');

// const handleChange = (event) => {
//   setLevel(event.target.value);
// };

// {/* <Box sx={{ minWidth: 120 }}>
//             <FormControl>
//               <InputLabel id="demo-simple-select-label">권한</InputLabel>
//               <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 value={level}
//                 label="level"
//                 onChange={handleChange}
//               >
//                 <MenuItem value={10}>User</MenuItem>
//                 <MenuItem value={20}>Admin</MenuItem>
//               </Select>
//             </FormControl>
//           </Box> */}