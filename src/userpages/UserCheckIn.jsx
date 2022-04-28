import React from 'react';
import StopWatch from '../components/StopWatch';

import UserSidebar from '../components/UserSideBar';

const UserCheckIn = () => {
  return (
    <React.Fragment>
      <UserSidebar />
      <div style={{width: "85%", height : "100vh", float : "left"}}>
        <StopWatch></StopWatch>
      </div>
    </React.Fragment>
  );
};

export default UserCheckIn;