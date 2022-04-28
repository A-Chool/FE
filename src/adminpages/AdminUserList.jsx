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
    dispatch(getUserListFB(id));
  },[]);

  const userList = useSelector((state) => state.UserList.user_List);

  const [Level, setLevel] = React.useState();

  const handlesetLevel = (e) => {
    setLevel(e.target.value)
}

  const params = useParams();

    const id = params.id;

    console.log(id)

  return (
    <React.Fragment>
        
      <div style={{width: "85%", height : "100vh", float : "left"}}>
      <UserList style={{backgroundColor : "#808080"}}>
          <Userdata style={{width : "10%", borderLeft: "0px solid gray"}}>이름</Userdata>
          <Userdata style={{width : "28%"}}>email</Userdata>
          <Userdata style={{width : "20%"}}>전화번호</Userdata>
          <Userdata style={{width : "15%"}}>가입일자</Userdata>
          <Userdata style={{width : "15%"}}>권한</Userdata>          
        </UserList>

        {props.userList.map ((data, idx) => { 
          
          console.log(userList[idx].userId)
          
          return ( 

          <UserList key={data.userId}>
            <Userdata style={{width : "10%" , borderLeft: "0px solid gray"}}>{data.userName}</Userdata>
            <Userdata style={{width : "28%"}}>{data.userEmail}</Userdata>
            <Userdata style={{width : "20%"}}>{data.phoneNumber}</Userdata>
            <Userdata style={{width : "15%"}}>{data.createdAt}</Userdata>
            <Userdata id="level" style={{width : "15%"}}>{data.userLevel === 10 ? "User" : "Admin"}</Userdata>
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
                    <textarea onChange={handlesetLevel}>{props.userList.userLevel}</textarea>
                    <button onClick={() => {}}>설정확인</button>
                  </Typography>
                </Box>
              </Modal>
            </div>
          </UserList>
        ) })}

        

        
      </div>
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