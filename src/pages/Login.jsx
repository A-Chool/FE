/* eslint-disable */

import React from "react"
import { useDispatch } from "react-redux"

import styled from "styled-components"
import { SiNaver } from "react-icons/si"
import { BsFillChatFill } from "react-icons/bs"

import { FiArrowRight } from "react-icons/fi"
import { useHistory } from "react-router-dom"
import { actionCreators as userActions } from "../redux/modules/user"

import { adminloginDB } from "../redux/modules/user"


import loginPage from '../assets/img/loginPage.png'
import logo from '../assets/img/로고.svg'
import kakaoLogin from '../assets/img/kakaoLogin.svg'
import or from '../assets/img/or.svg'
import singUp from '../assets/img/singUp.svg'

import { KAKAO_AUTH_URL } from "../api/oauth";

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

  const [userLogin, setUserLogin] = React.useState(false);

  return (
    <React.Fragment>
      <PageMain>

        
        <InputMain>
          <img src={logo} style={{position : 'absolute',top : '32px',left : '0px'}}/>

          <MainContents>아출에 오신것을 환영합니다.</MainContents>
          <LoginContents>
            <UserLoginContents onClick={() => {setUserLogin(false)}} userLogin={userLogin}>아출 계정으로 로그인</UserLoginContents>
            <AdminLoginContents  onClick={() => {setUserLogin(true)}} userLogin={userLogin}>어드민 로그인</AdminLoginContents>
          </LoginContents>

          {
            userLogin === false 
            ?
            <UserLoginWrapper>
            <UserInput
              type="text"
              value={userId}
              placeholder="이메일 주소"
              onChange={(e) => {setUserId(e.target.value)}}/>
            <UserInput
              type="password"
              value={password}
              placeholder="비밀번호"
              onChange={(e) => {setPassword(e.target.value)}}/>
            <CollectionBtn onClick={login}>로그인</CollectionBtn>
            <img src = {or}  style={{margin : '20px 0'}} />
            <SocialLoginKakao href={KAKAO_AUTH_URL}>
              <img src = {kakaoLogin} style={{margin : '0 0 8px'}} />
            </SocialLoginKakao>
            <InfutSingup>
              <SignupContents>아직 계정이 없으신가요?</SignupContents>
              <img src = {singUp}  onClick={gosignup}  style={{margin : '2px 0'}} />
            </InfutSingup>
          </UserLoginWrapper>
          :
          <UserLoginWrapper>
            <UserInput
              type="text"
              value={userId}
              placeholder="이메일 주소"
              onChange={(e) => {setUserId(e.target.value)}}/>
            <UserInput
              type="password"
              value={password}
              placeholder="비밀번호"
              onChange={(e) => {setPassword(e.target.value)}}/>
            <CollectionBtn onClick = { () => {
              dispatch(adminloginDB(userId, password));
            } }>로그인</CollectionBtn>
            <SocialLoginKakao href={KAKAO_AUTH_URL}>
              <img src = {kakaoLogin} style={{margin : '8px 0 8px'}} />
            </SocialLoginKakao>
          </UserLoginWrapper>
          }




        </InputMain>

        <LogoMain src = {loginPage} />

      </PageMain>
    </React.Fragment>
  );
};

const PageMain = styled.div`
  display: flex;
`

const LogoMain = styled.img`
  width: 50%;
  height: 100%;
`

const InputMain = styled.div`
  width: 50%;
  height: 100%;
  text-align: center;
`

const MainContents = styled.div`
  font-weight: 700;
  font-size: 24px;
  margin : 23% 0 48px;
`

const LoginContents = styled.div`
  font-weight: 400;
  font-size: 16px;
  width: 380px;
  display: inline-block;
  text-align : left;
  margin: 8px 0;
`

const UserLoginContents = styled.div`
  font-weight: 400;
  font-size: 16px;
  width: 190px;
  display: inline-block;
  text-align : center;
  margin: 8px 0;
  float : left;
  border-bottom : ${({ userLogin }) => (userLogin === false ? '4px solid #FF5F00' : '4px solid #E0E0E0')};
`

const UserLoginWrapper = styled.div`
  width: 380px;
  height: 350px;
  display: inline-block;
`

const AdminLoginContents = styled.div`
  font-weight: 400;
  font-size: 16px;
  width: 190px;
  display: inline-block;
  text-align : center;
  margin: 8px 0;
  border-bottom : ${({ userLogin }) => (userLogin === true ? '4px solid #FF5F00' : '4px solid #E0E0E0')};
`

const CollectionBtn = styled.button`
  width: 380px;
  height: 40px;
  border-radius: 10px;
  background-color: #1F3A5E;
  font-size: 16px;
  font-weight: 700;
  border: none;
  color: white;
  margin: 8px 0;
`

const UserInput = styled.input`
  width: 364px;
  height: 20px;
  font-weight: 400;
  font-size: 16px;
  border: 1px solid #828282;
  border-radius: 10px;
  margin: 8px 0;
  padding : 10px 8px;
  &:hover {
    border: 1.2px solid #282828;
  }
  &:focus {
    outline: 1.2px solid #282828;
    border: 0px;
  }
`

const SocialLoginKakao = styled.a`
  width: 380px;
  height: 40px;
`;

const InfutSingup = styled.div`
  width: 380px;
  height: 40px;
  display: inline-block;
`

const SignupContents = styled.div`
  color: #4F4F4F;
  font-weight: 700;
  font-size: 16px;
  float : left;
  margin-right : -80px;
`

export default Login;
