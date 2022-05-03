import React from "react";
import styled from "styled-components";

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch } from "react-redux";

import { deleteUserListFB } from "../redux/modules/UserList";
import { editUserListFB } from "../redux/modules/UserList";


const AdminUserList = (props) => {

  const dispatch = useDispatch();
  
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
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [Level, setLevel] = React.useState();

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
              {props.e.userLevel >= 5 ? "Admin" : "User"}
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
                    <button onClick={() => {dispatch(editUserListFB(props.e.userId, Number(Level)))
                    console.log(Number(Level))
                    }}>설정확인</button>
                    <button onClick={() => {dispatch(deleteUserListFB(props.e.userId))}}>delete</button>
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
  width : 1000px;
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