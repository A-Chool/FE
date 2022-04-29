import React from 'react';

import UserSidebar from '../components/UserSideBar';
import StopWatch from '../components/StopWatch';

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