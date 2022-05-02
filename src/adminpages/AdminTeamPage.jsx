import React, { useState } from 'react';

import AdminTeamSideBar from './AdminTeamSideBar';
import AdminSidebar from "./AdminSideBar";
import DndTeamList from '../components/DndTeamList';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { getUserListFB } from '../redux/modules/UserList';

const AdminTeamPage = () => {

  const dispatch = useDispatch

  const [team, setTeam] = React.useState(
    [
      {
          teamName : "장미반",
          memberList : [
                {
                      userId : 2,
                      userName : "짱구",
                      userEmail : "zzangubrother"
                },
                {
                      userId : 3,
                      userName : "짱구",
                      userEmail : "zzangubrother"
                },
                {
                      userId : 4,
                      userName : "짱아",
                      userEmail : "zzangusister"
                },
          ]
      },{
        teamName : "잡초반",
        memberList : [
              {
                    userId : 5,
                    userName : "공룡",
                    userEmail : "zzangubrother"
              },
              {
                    userId : 6,
                    userName : "거북이",
                    userEmail : "zzangubrother"
              },
              {
                    userId : 7,
                    userName : "말보루 레드 피는 짱아",
                    userEmail : "zzangusister"
              },
        ]
    }
    ])

  return (

    <React.Fragment>
      <AdminSidebar />

        <button>버튼임</button>
      <DragDropContext>
        <div style={{width: "70%", height : "100vh", float : "left"}}>
          {
            team.map((e, idx)=>{
              return(
                <DndTeamList key={idx} e={e}></DndTeamList>
              )
            })
          }
        </div>
        <AdminTeamSideBar style={{float : "left"}}/>
      </DragDropContext>
    </React.Fragment>

  );
};

export default AdminTeamPage;