import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { SiNaver } from "react-icons/si";
import { BsFillChatFill } from "react-icons/bs";

import { FiArrowRight } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { actionCreators as userActions } from "../redux/modules/user";
import { KAKAO_AUTH_URL } from "../api/oauth";
const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const login = (event) => {
    dispatch(userActions.adminloginDB(email, password));
    event.stopPropagation();
  };

  return (
    <React.Fragment>
      <PageMain>
        <InputMain>
          <PageInput>
            <MainName>아무튼 출석</MainName>

            <MainContents>아출에 오신것을</MainContents>
            <MainContents>환영합니다 (관리자ver)</MainContents>
            <SubContents>
              이메일 주소 또는 SNS 간편 로그인을 통하여 로그인 해 주세요.
            </SubContents>

            <UserInput
              type="text"
              value={email}
              placeholder="이메일 주소"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <UserInput
              type="text"
              value={password}
              placeholder="비밀번호"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <InputBtn>
              <CollectionBtn onClick={login}>관리자 로그인</CollectionBtn>
            </InputBtn>
          </PageInput>
        </InputMain>
        <LogoMain>
          <LogoMainImg src="https://item.kakaocdn.net/do/0928e136f08ba05c038243f2c4509a14f604e7b0e6900f9ac53a43965300eb9a" />
          <LogoMainName>사용자 로그인</LogoMainName>
        </LogoMain>
      </PageMain>
    </React.Fragment>
  );
};

const PageMain = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PageInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
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
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 50px;
`;

const MainContents = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-top: 10px;
`;
const SubContents = styled.div`
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: 50px;
`;
const InputBtn = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const CollectionBtn = styled.button`
  width: 480px;
  height: 45px;
  border-radius: 10px;
  background-color: #939393;
  font-size: 16px;
  font-weight: bold;
  border: none;
  color: white;
`;
const CenterLineBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
const CenterLine = styled.div`
  font-size: 20px;
  text-decoration: none solid rgb(29, 28, 29);
  background-color: #ffffff;
  height: 1px;
  width: 225px;
  border-top: 1px solid #dddddd;
`;

const UserInput = styled.input`
  width: 450px;
  font-size: 18px;
  text-decoration: none solid rgb(29, 28, 29);
  background-color: #ffffff;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 10px 15px 10px 15px;
  margin-top: 10px;
`;

const SocialLoginKakao = styled.a`
  width: 480px;
  height: 40px;
  border-radius: 10px;
  background-color: #fee500;
  border: 2px solid gray;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  text-decoration: none;
  color: black;
`;
const SocialLoginNaver = styled.button`
  width: 480px;
  height: 40px;
  border-radius: 10px;
  background-color: white;
  border: 2px solid gray;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
const SocialGoogle = styled.div`
  margin-left: 40px;
`;
const SocialKakao = styled.div`
  margin-left: 30px;
  margin-right: -30px;
`;

const InfutSingup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
const SignupContents = styled.div`
  color: #706f6f;
  font-size: 15px;
  font-weight: 700;
`;
const SignupBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: none;
  font-size: 15px;
  font-weight: bold;
`;
export default Login;
