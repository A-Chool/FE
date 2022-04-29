import React from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import {getUserListFB} from "../redux/modules/UserList"

import DndUserList from '../components/DndUserList';

const AdminTeamSideBar = () => {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUserListFB());
  },[]);

  const userList = useSelector((state) => state.UserList.user_List);

  return (
    <React.Fragment>
    <Sidebar>
      {
        userList.map((e, idx)=>{
          return(
            <DndUserList key={idx} e={e}></DndUserList>
          )
        })
      }
    </Sidebar>
  </React.Fragment>
  );
};

const Sidebar = styled.div`
  width : 15%;
  height : 100vh;
  background-color : gray;
  float : left;
`


export default AdminTeamSideBar;