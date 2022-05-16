import React from "react";
import styled from "styled-components";

const NotFound = () => {
  return (
    <PageMain>
      <div>
        <p>404</p>
        <p>페이지가 존재하지 않습니다.</p>
      </div>
    </PageMain>
  );
};

const PageMain = styled.div`
  font-weight: 500;
  width: 100vw;
  height: 100vh;
  display: flex;
  font-size: 1.5rem;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export default NotFound;
