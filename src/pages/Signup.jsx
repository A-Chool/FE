/* eslint-disable */
import React from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionCreators as userActions } from "../redux/modules/user";
import {emailCheck, passwordCheck, phoneCheck, nickCheck} from "../shared/common";

import loginPage from '../assets/img/loginPage.png'
import logo from '../assets/img/로고.svg'

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [userPw, setUserPw] = React.useState("");
  const [userPwCheck, setUserPwCheck] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const signup = () => {
    if (email === "" || userName === "" || userPw === "" || userPwCheck === "" || phoneNumber === "") {
      window.alert("입력값을 모두 입력해주세요");
      return;
    }
    // 비밀번호 확인
    if (userPw !== userPwCheck) {
      window.alert("비밀번호가 같지 않습니다!");
      return;
    }
    //이메일 체크
    if (!emailCheck(email)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }
    //닉네임 체크
    if (!nickCheck(userName)) {
      window.alert("닉네임은 한글, 영문, 숫자만 가능하며 2-10자리 가능합니다!");
      return;
    }
    //비밀번호 체크
    if (!passwordCheck(userPw)) {
      window.alert("비밀번호는 숫자와 문자 포함 형태의 6~12자리 이내로 가능합니다!");
      return;
    }
    //핸드폰 번호 체크
    if (!phoneCheck(phoneNumber)) {
      window.alert("핸드폰번호는 000-0000-0000 의 형태로 숫자를 입력해주세요");
      return;
    }
    dispatch(
      userActions.signupDB(email, userName, userPw, userPwCheck, phoneNumber)
    );
  };

  return (
    <PageMain>
      <InputMain>
        <img src={logo} style={{position : 'absolute',top : '32px',left : '30px'}} onClick={() => {history.push('/')}}/>
        <SingUpContentsWrapper>
          <MainContents>회원가입</MainContents>
          <SubContents>가입정보를 입력 후 회원가입 버튼을 클릭해 주세요.</SubContents>
          <UserInput
            type="text"
            value={email}
            placeholder="이메일 주소"
            onChange={(e) => {setEmail(e.target.value)}}
          />
          <UserInput
            type="text"
            value={userName}
            placeholder="이름 (2글자 이상 7글자 이하)"
            onChange={(e) => {setUserName(e.target.value)}}
            maxLength="7"
          />
          <UserInput
            type="password"
            value={userPw}
            placeholder="비밀번호(특수문자를 제외한 6~12자리)"
            onChange={(e) => {setUserPw(e.target.value)}}
          />
          <UserInput
            type="password"
            value={userPwCheck}
            placeholder="비밀번호 확인"
            onChange={(e) => {setUserPwCheck(e.target.value)}}
          />
          <UserInput
            type="text"
            value={phoneNumber}
            placeholder="휴대폰 번호(‘-’ 포함)"
            onChange={(e) => {setPhoneNumber(e.target.value)}}
          />
          <CollectionBtn onClick={signup}>회원가입</CollectionBtn>
        </SingUpContentsWrapper>
      </InputMain>
      <LogoMain src = {loginPage} />
    </PageMain>
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

const PageInput = styled.form`
  display: flex;
`;

const LogoMain = styled.img`
  width: 50%;
  height: 100%;
`;

const InputMain = styled.div`
width: 50%;
height: 100%;
text-align: center;
display: flex;
`;

const SingUpContentsWrapper = styled.div`
  width: 380px;
  height: 500px;
  margin: auto;
  padding : 0 30px;
    @media screen and (min-width: 2560px) {
      width: 700px;
      height: 820px;
    }
`

const MainContents = styled.div`
  font-weight: 700;
  font-size: 24px;
  margin : 0 0 48px;
    @media screen and (min-width: 2560px) {
      font-size: 38px;
      margin: 0 125px 40px;
    }
`;

const SubContents = styled.div`
  font-weight: 400;
  font-size: 16px;
    @media screen and (min-width: 2560px) {
      font-size: 24px;
      margin: 0 95px 40px;
    }
`;

const CollectionBtn = styled.div`
  width: 384px;
  height: 40px;
  border-radius: 10px;
  background-color: #1F3A5E;
  font-weight: 700;
  font-size: 16px;
  color: white;
  text-align : center;
  line-height: 40px;
  display : inline-block;
  cursor: pointer;
  margin-top : 16px;
    @media screen and (min-width: 2560px) {
      width: 580px;
      height: 60px;
      font-size: 24px;
      margin : 8px 60px;
      line-height: 60px;
    }
`;

const UserInput = styled.input`
  width: 372px;
  height : 40px;
  font-weight: 400;
  font-size: 16px;
  border: 1px solid #828282;
  border-radius: 10px;
  margin-top: 16px;
  padding-left : 8px; 
  &:hover {
    border: 1px solid #282828;
  }
  &:focus {
    outline: 1px solid #282828;
    border: -1px solid white;
  }
    @media screen and (min-width: 2560px) {
      width: 564px;
      height: 60px;
      font-size: 24px;
      margin : 8px 60px;
    }
`;

export default Signup;


// @media screen and (min-width: 2560px) {
//   height: 750px;
// }