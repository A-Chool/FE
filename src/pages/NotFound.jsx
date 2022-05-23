import React from "react";
import styled from "styled-components";

import errorPage from '../assets/img/notFound.png'

const NotFound = () => {
  return (
    <PageMain src={errorPage}>

    </PageMain>
  );
};

const PageMain = styled.img`
  width: 100vw;
  height: 100vh;

`;

export default NotFound;
