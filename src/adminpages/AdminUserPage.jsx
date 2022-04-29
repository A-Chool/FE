import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import AdminSidebar from "./AdminSideBar";
import {getUserListFB} from "../redux/modules/UserList"
import AdminUserList from "./AdminUserList";

const AdminUserPage = () => {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUserListFB());
  },[]);

  const userList = useSelector((state) => state.UserList.user_List);

  // console.log(userList)

  return (
    <React.Fragment>
      <AdminSidebar />
      <div style={{width: "85%", height : "100vh", float : "left"}}>
      

        <UserList style={{backgroundColor : "#808080"}}>
          <Userdata style={{width : "10%", borderLeft: "0px solid gray"}}>이름</Userdata>
          <Userdata style={{width : "28%"}}>email</Userdata>
          <Userdata style={{width : "20%"}}>전화번호</Userdata>
          <Userdata style={{width : "15%"}}>가입일자</Userdata>
          <Userdata style={{width : "15%"}}>권한</Userdata>          
        </UserList>

        {
          userList.map((e, idx)=>{
            return(
              <AdminUserList key={idx} e={e}></AdminUserList>
            )
          })
        }
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

export default AdminUserPage