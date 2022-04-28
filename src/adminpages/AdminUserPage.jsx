import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import AdminSidebar from "../components/AdminSideBar";
import {getUserListFB} from "../redux/modules/UserList"
import AdminUserList from "./AdminUserList";

const AdminUserPage = () => {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUserListFB());
  },[]);

  const userList = useSelector((state) => state.UserList.user_List);
  
  
  const [Level, setLevel] = React.useState(10);

  console.log(Level) 
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  

  return (
    <React.Fragment>
      <AdminSidebar />
      <AdminUserList userList={userList}></AdminUserList>
    </React.Fragment>
  )
}



export default AdminUserPage



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