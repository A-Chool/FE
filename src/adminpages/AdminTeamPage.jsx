import React, { useState } from 'react';

import AdminTeamSideBar from './AdminTeamSideBar';
import AdminSidebar from "./AdminSideBar";
import DndTeamList from '../components/DndTeamList';
import { DragDropContext } from 'react-beautiful-dnd';

const AdminTeamPage = () => {

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
      }
    ])

  return (

    <React.Fragment>
      <AdminSidebar />

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