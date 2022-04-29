import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import { actionCreators as userActions } from "../redux/modules/user";
const AdminLogin = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const login = (event) => {
    dispatch(userActions.loginDB(email, password));
    event.stopPropagation();
  };
  const gosignup = () => {
    history.push("/signup");
  };

  return (
    <PageMain
      style={{
        backgroundImage: `url("https://c.wallhere.com/photos/12/6e/1920x1080_px_eye_relaxing-1601239.jpg!d")`,
      }}
    >
      <LogoMain>
        <LogoMainImg src="https://item.kakaocdn.net/do/0928e136f08ba05c038243f2c4509a14f604e7b0e6900f9ac53a43965300eb9a" />
        <LogoMainName>운영자 로그인</LogoMainName>
      </LogoMain>
      <InputMain>
        <MainName>아무튼 출석!</MainName>
        <MainContents>일정을 관리해주는 아무튼 출석에 입장하세요!</MainContents>

        <UserInput
          type="text"
          value={email}
          placeholder="이메일을 입력해주세요!"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <UserInput
          type="text"
          value={password}
          placeholder="비밀번호를 입력해주세요!"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <InputBtn>
          <CollectionBtn onClick={login}>로그인</CollectionBtn>
        </InputBtn>
      </InputMain>
    </PageMain>
  );
};

const PageMain = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LogoMain = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoMainImg = styled.img`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LogoMainName = styled.div`
  font-size: 50px;
  color: white;
  font-weight: bold;
`;

const InputMain = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainName = styled.div`
  color: wheat;
  font-size: 30px;
  font-weight: bold;
`;

const MainContents = styled.div`
  font-size: 15px;
  color: white;
  margin-top: 10px;
`;
const SocialLogin = styled.div`
  width: 300px;
  height: 40px;
  border-radius: 15px;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
`;

const UserInput = styled.input`
  width: 300px;
  font-size: 18px;
  text-decoration: none solid rgb(29, 28, 29);
  background-color: #ffffff;
  color: #1d1c1d;
  padding: 10px 10px 10px 10px;
  margin-top: 10px;
`;

const InputBtn = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const CollectionBtn = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 30px;
  margin: 0px 20px;
`;
export default AdminLogin;
