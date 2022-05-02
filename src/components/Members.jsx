import React from 'react';
import styled from 'styled-components';

const Members = (props) => {
  return (
    <Userdata>
      {props.e.userName}
    </Userdata>
  );
};

const Userdata = styled.div`

`

export default Members;