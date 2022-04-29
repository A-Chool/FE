import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { actionCreators as userActions } from "../redux/modules/user";
import {
  emailCheck,
  passwordCheck,
  phoneCheck,
  nickCheck,
} from "../shared/common";

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [userPw, setUserPw] = React.useState("");
  const [userPwCheck, setUserPwCheck] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const signup = () => {
    if (
      email === "" ||
      userName === "" ||
      userPw === "" ||
      userPwCheck === "" ||
      phoneNumber === ""
    ) {
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
      window.alert(
        "비밀번호는 숫자와 문자 포함 형태의 6~12자리 이내로 가능합니다!"
      );
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
  const gologin = () => {
    history.push("/");
  };

  return (
    <PageMain>
      <InputMain>
        <MainName>아무튼 출석</MainName>
        <PageInput>
          <MainContents>회원가입정보를</MainContents>
          <MainContents>입력해주세요.</MainContents>
          <SubContents>
            아래의 가입정보를 입력 후 회원가입 버튼을 클릭해 주세요.
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
            value={userName}
            placeholder="사용할 닉네임을 입력해주세요.(2글자 이상  10글자 이하) "
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <UserInput
            type="text"
            value={userPw}
            placeholder="비밀번호를 입력해주세요."
            onChange={(e) => {
              setUserPw(e.target.value);
            }}
          />
          <UserInput
            type="text"
            value={userPwCheck}
            placeholder="작성한 비밀번호를 한번더 입력해주세요."
            onChange={(e) => {
              setUserPwCheck(e.target.value);
            }}
          />
          <UserInput
            type="text"
            value={phoneNumber}
            placeholder="저장할 핸드폰 번호를 입력해주세요.( ‘-’ 포함)"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
          <InputBtn>
            <CollectionBtn onClick={signup}>회원가입</CollectionBtn>
          </InputBtn>
        </PageInput>
      </InputMain>
      <LogoMain>
        <LogoMainImg src="https://item.kakaocdn.net/do/0928e136f08ba05c038243f2c4509a14f604e7b0e6900f9ac53a43965300eb9a" />
        <LogoMainName>사용자 회원가입</LogoMainName>
      </LogoMain>
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
  position: absolute;
  top: 50px;
  left: 98px;
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

const UserInput = styled.input`
  width: 450px;
  font-size: 18px;
  text-decoration: none solid rgb(29, 28, 29);
  background-color: #ffffff;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 10px 15px 10px 15px;
  margin-top: 15px;
`;

export default Signup;
