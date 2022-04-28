import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom"

const UserSidebar = () => {
  return (
    <React.Fragment>
      <Sidebar>

        <UserLogo>아무튼 출석</UserLogo>

        <Link to="/UserCheckIn" style={{ textDecoration: 'none', color : "black", fontSize : "20px", fontWeight : "700" }}>
          <Adminmenu>Check-In</Adminmenu>
        </Link>

        <Link to="/UserTeamBoard" style={{ textDecoration: 'none', color : "black", fontSize : "20px", fontWeight : "700" }}>
          <Adminmenu>팀보드</Adminmenu>
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
const UserLogo = styled.h2`
  color : white;
  display : inline-block;
  margin : 30px 40px
`

const Adminmenu = styled.p`
  margin : 30px 55px
`


export default UserSidebar;