import React from "react";
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import AdminSidebar from "../components/AdminSideBar";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import {getUserListFB} from "../redux/modules/UserList"

import { useEffect } from "react";

const AdminUserList = (props) => {
  
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

  console.log(props)
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUserListFB());
  },[]);

  const userList = useSelector((state) => state.UserList.user_List);

  const [Level, setLevel] = React.useState();

  // console.log(Level)

  const handlesetLevel = (e) => {
    setLevel(e.target.value)
}

  return (
    <React.Fragment>
          <UserList>
            <Userdata style={{width : "10%" , borderLeft: "0px solid gray"}}>{props.e.userName}</Userdata>
            <Userdata style={{width : "28%"}}>{props.e.userEmail}</Userdata>
            <Userdata style={{width : "20%"}}>{props.e.phoneNumber}</Userdata>
            <Userdata style={{width : "15%"}}>{props.e.createdAt}</Userdata>
            <Userdata id="level" style={{width : "15%"}}>
              {props.e.userLevel === 10 ? "User" : "Admin"}
              </Userdata>
            <div>
              <Userdata style={{width : "10%"}} onClick={handleOpen}>권한설정</Userdata>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    권한 설정하기
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <input defaultValue={props.e.userLevel} onChange={handlesetLevel}></input>
                    <button onClick={() => {}}>설정확인</button>
                    <button onClick={() => {}}>delete</button>
                  </Typography>
                </Box>
              </Modal>
            </div>
          </UserList>
    </React.Fragment>
  )
}

const UserList = styled.div`
  background-color : #F2F2F2;
  width : 97%;
  height : 40px;
  margin : 10px auto;
  text-align : center;
`

const Userdata = styled.p`
  float : left;
  margin : 10px auto;
  border-left: 1px solid black;
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