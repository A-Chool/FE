import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom"

const AdminSidebar = () => {
  return (
    <React.Fragment>
      <Sidebar>

        <AdminLogo>Admin Page</AdminLogo>

        <Link to="/AdminUserPage" style={{ textDecoration: 'none', color : "black", fontSize : "20px", fontWeight : "700" }}>
          <Adminmenu>유저 관리</Adminmenu>
        </Link>

        <Link to="/AdminTeamList" style={{ textDecoration: 'none', color : "black", fontSize : "20px", fontWeight : "700" }}>
          <Adminmenu>팀 관리</Adminmenu>
        </Link>

      </Sidebar>
    </React.Fragment>
  )
}

const Sidebar = styled.div`
  width : 15%;
  height : 100vh;
  background-color : gray;
  float : left;
`
const AdminLogo = styled.h2`
  color : white;
  display : inline-block;
  margin : 30px 40px
`

const Adminmenu = styled.p`
  margin : 30px 55px
`


export default AdminSidebar