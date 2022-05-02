import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom"

const AdminSidebar = () => {
  return (
    <React.Fragment>
      <Sidebar>

        <AdminLogo>아무튼 출석 백오피스</AdminLogo>

        <hr style={{width : '200px', }}></hr>

        <Link to="/AdminUserPage" style={{ textDecoration: 'none', color : "black", fontSize : "20px", fontWeight : "700" }}>
          <Adminmenu>유저 관리</Adminmenu>
        </Link>

        <Link to="/AdminTeamPage" style={{ textDecoration: 'none', color : "black", fontSize : "20px", fontWeight : "700" }}>
          <Adminmenu>팀 관리</Adminmenu>
        </Link>

        <Link to="/AdminTeamPage" style={{ textDecoration: 'none', color : "black", fontSize : "20px", fontWeight : "700" }}>
          <Adminmenu>게시판 관리</Adminmenu>
        </Link>

      </Sidebar>
    </React.Fragment>
  )
}

const Sidebar = styled.div`
  width : 210px;
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