import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { SiNaver } from "react-icons/si";
import { BsFillChatFill } from "react-icons/bs";

import { FiArrowRight } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { actionCreators as userActions } from "../redux/modules/user";
import { KAKAO_AUTH_URL } from "../api/Oauth";

import loginPage from '../assets/img/loginPage.png'
import loginPage2 from '../assets/img/Frame 2330.svg'
import loginPage3 from '../assets/img/Group 2162.svg'
import loginPage4 from '../assets/img/Group 2187.png'


const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [userId, setUserId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const login = (event) => {
    dispatch(userActions.loginDB(userId, password));
    event.stopPropagation();
  };
  const gosignup = () => {
    history.push("/signup");
  };

  return (
    <React.Fragment>
      <PageMain>
        <InputMain>
          <PageInput>
            <MainName>아무튼 출석</MainName>

            <MainContents>아출에 오신것을</MainContents>
            <MainContents>환영합니다</MainContents>
            <SubContents>
              이메일 주소 또는 SNS 간편 로그인을 통하여 로그인 해 주세요.
            </SubContents>

            <UserInput
              type="text"
              value={userId}
              placeholder="이메일 주소"
              onChange={(e) => {
                setUserId(e.target.value);
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
              <CollectionBtn onClick={login}>로그인</CollectionBtn>
            </InputBtn>
            <CenterLineBox>
              <CenterLine />
              또는
              <CenterLine />
            </CenterLineBox>
            {/* <SocialLoginNaver>
              <SiNaver />
              <SocialGoogle>네이버 시작하기</SocialGoogle>
            </SocialLoginNaver> */}
            <SocialLoginKakao href={KAKAO_AUTH_URL}>
              <BsFillChatFill />
              <SocialKakao>카카오톡으로 시작하기</SocialKakao>
            </SocialLoginKakao>
            <InfutSingup>
              <SignupContents>아직 계정이 없으신가요?</SignupContents>
              <SignupBtn onClick={gosignup}>
                회원가입
                <FiArrowRight />
              </SignupBtn>
            </InfutSingup>
          </PageInput>
        </InputMain>
        <LogoMain src = {loginPage4} />
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

const LogoMain = styled.img`
  width: 50%;
  height: 100%;
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
  width: 380px;
  height: 40px;
  border-radius: 10px;
  background-color: #1F3A5E;
  font-size: 16px;
  font-weight: 700;
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
  width: 364px;
  height: 20px;
  font-weight: 400;
  font-size: 16px;
  border: 1px solid #828282;
  border-radius: 10px;
  margin-top: 16px;
  padding : 10px 8px;
`;

const SocialLoginKakao = styled.a`
  width: 380px;
  height: 40px;
  border-radius: 10px;
  background-color: #fee500;

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
  // border: 2px solid gray;
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
