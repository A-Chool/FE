import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import AdminSidebar from "./AdminSideBar";
import {getUserListFB} from "../redux/modules/UserList"
import AdminUserList from "./AdminUserList";

const AdminUserPage = () => {

  const dispatch = useDispatch();

  // UserList 조회를 위한 useEffect
  React.useEffect(() => {
    dispatch(getUserListFB());
  },[]);

  // 받아온 값에서 필요한 값 꺼내오기
  const userList = useSelector((state) => state.UserList.user_List);

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

export default AdminUserPage