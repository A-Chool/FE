/* eslint-disable */

import React, { useEffect } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionCreators as userActions } from "../redux/modules/user";

import { adminloginDB } from "../redux/modules/user";

import loginPage from "../assets/img/loginPage.png";
import logo from "../assets/img/로고.svg";
import kakaoLogin from "../assets/img/kakaoLogin.svg";
import or from "../assets/img/or.svg";
import singUp from "../assets/img/singUp.svg";

import { KAKAO_AUTH_URL } from "../api/Oauth";
import AuthGuard from "../shared/AuthGuard";

const token = "3fa3aa6d41e97b2e2d44ea7d414b7a2b";

// const kakao = {
//   title: "KakaoLogin",
//   component: KakaoLogin,
// };

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.is_login);

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

  useEffect(() => {
    if (isLogin) return history.replace("/check-in");
  }, []);

  return (
    <AuthGuard>
      <PageMain>
        <InputMain>
          <img src={logo} style={{ position: "absolute", top: "32px", left: "30px" }} />
          <LoginContentsWrapper>
            <MainContents>아출에 오신것을 환영합니다.</MainContents>
            <LoginContents>
              <UserLoginContents
                onClick={() => {
                  setUserLogin(false);
                }}
                userLogin={userLogin}
              >
                아출 계정으로 로그인
              </UserLoginContents>
              <AdminLoginContents
                onClick={() => {
                  setUserLogin(true);
                }}
                userLogin={userLogin}
              >
                어드민 로그인
              </AdminLoginContents>
            </LoginContents>
            {userLogin === false ? (
              <UserLoginWrapper>
                <UserInput
                  type="text"
                  value={userId}
                  placeholder="이메일 주소"
                  onChange={(e) => {
                    setUserId(e.target.value);
                  }}
                />
                <UserInput
                  type="password"
                  value={password}
                  placeholder="비밀번호"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <CollectionBtn onClick={login}>로그인</CollectionBtn>
                <OrImg src={or} />
                <SocialLoginKakao href={KAKAO_AUTH_URL}>
                  <KakaoImg src={kakaoLogin} />
                </SocialLoginKakao>
                <InfutSingup>
                  <SignupContents>아직 계정이 없으신가요?</SignupContents>
                  <SingUpImg src={singUp} onClick={gosignup} />
                </InfutSingup>
              </UserLoginWrapper>
            ) : (
              <UserLoginWrapper>
                <UserInput
                  type="text"
                  value={userId}
                  placeholder="이메일 주소"
                  onChange={(e) => {
                    setUserId(e.target.value);
                  }}
                />
                <UserInput
                  type="password"
                  value={password}
                  placeholder="비밀번호"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <CollectionBtn
                  onClick={() => {
                    dispatch(adminloginDB(userId, password));
                  }}
                >
                  로그인
                </CollectionBtn>

                {/* <KakaoLogin
                  token={token}
                  onSuccess={(res) => {
                    console.log(res.response.access_token);
                    dispatch(
                      userActions.kakaoLoginDB(res.response.access_token)
                    );
                  }}
                  onFail={console.error}
                  onLogout={console.info}
                /> */}

<<<<<<< HEAD
                {/* <SocialLoginKakao href={KAKAO_AUTH_URL} onClick={() => {console.log(KAKAO_AUTH_URL)}}>
=======
                <SocialLoginKakao
                  href={KAKAO_AUTH_URL}
                  onClick={() => {
                    console.log(KAKAO_AUTH_URL);
                  }}
                >
>>>>>>> 38ec0f923bb30894602837f73aded7e502c10b6d
                  <KakaoImg src={kakaoLogin} />
                </SocialLoginKakao> */}
              </UserLoginWrapper>
            )}
          </LoginContentsWrapper>
        </InputMain>
        <LogoMain src={loginPage} />
      </PageMain>
    </AuthGuard>
  );
};

const PageMain = styled.div`
  display: flex;
`;

const LogoMain = styled.img`
  width: 50%;
  height: 100%;
`;

const InputMain = styled.div`
  width: 50%;
  height: 100vh;
  display: flex;
`;

const LoginContentsWrapper = styled.div`
  width: 380px;
  height: 500px;
  margin: auto;
  padding: 0 30px;
  @media screen and (min-width: 2560px) {
    width: 700px;
    height: 820px;
  }
`;

const MainContents = styled.div`
  font-weight: 700;
  font-size: 24px;
  margin: 0 45px 40px;
  @media screen and (min-width: 2560px) {
    font-size: 38px;
    margin: 0 125px 40px;
  }
`;

const LoginContents = styled.div`
  font-weight: 400;
  font-size: 16px;
  width: 380px;
  display: inline-block;
  text-align: left;
  margin: 8px 0;
  @media screen and (min-width: 2560px) {
    width: 700px;
  }
`;

const UserLoginContents = styled.div`
  font-weight: 400;
  font-size: 16px;
  width: 190px;
  display: inline-block;
  text-align: center;
  margin: 8px 0;
  float: left;
  border-bottom: ${({ userLogin }) => (userLogin === false ? "4px solid #FF5F00" : "4px solid #E0E0E0")};
  @media screen and (min-width: 2560px) {
    width: 350px;
    font-size: 24px;
  }

  cursor: pointer;
  padding: 0.5rem 0;
`;

const UserLoginWrapper = styled.div`
  width: 380px;
  height: 350px;
  display: inline-block;
`;

const AdminLoginContents = styled.div`
  font-weight: 400;
  font-size: 16px;
  width: 190px;
  display: inline-block;
  text-align: center;
  margin: 8px 0;
  border-bottom: ${({ userLogin }) => (userLogin === true ? "4px solid #FF5F00" : "4px solid #E0E0E0")};
  @media screen and (min-width: 2560px) {
    width: 350px;
    font-size: 24px;
  }

  cursor: pointer;
  padding: 0.5rem 0;
`;

const CollectionBtn = styled.button`
  width: 380px;
  height: 40px;
  border-radius: 10px;
  background-color: #1f3a5e;
  font-size: 16px;
  font-weight: 700;
  border: none;
  color: white;
  margin: 8px 0;
  @media screen and (min-width: 2560px) {
    width: 580px;
    height: 60px;
    font-size: 24px;
    margin: 8px 60px;
  }

  cursor: pointer;
`;

const UserInput = styled.input`
  width: 364px;
  height: 20px;
  font-weight: 400;
  font-size: 16px;
  border: 1px solid #828282;
  border-radius: 10px;
  margin: 8px 0;
  padding: 10px 8px;
  &:hover {
    border: 1px solid #282828;
  }
  &:focus {
    outline: 1px solid #282828;
    border: -1px solid white;
  }
  @media screen and (min-width: 2560px) {
    width: 564px;
    height: 40px;
    font-size: 24px;
    margin: 8px 60px;
  }
`;

const KakaoImg = styled.img`
  margin: 8px 0 8px;
  @media screen and (min-width: 2560px) {
    width: 580px;
    height: 60px;
    margin: 8px 60px;
  }
`;

const OrImg = styled.img`
  margin: 20px 0;
  @media screen and (min-width: 2560px) {
    width: 580px;
    margin: 8px 60px;
  }
`;

const SocialLoginKakao = styled.a`
  width: 380px;
  height: 40px;
`;

const InfutSingup = styled.div`
  width: 380px;
  height: 40px;
  display: inline-block;
  @media screen and (min-width: 2560px) {
    width: 580px;
    margin: 8px 60px;
  }
`;

const SignupContents = styled.div`
  color: #4f4f4f;
  font-weight: 700;
  font-size: 16px;
  float: left;
  margin-right: -80px;
  @media screen and (min-width: 2560px) {
    font-size: 24px;
  }
`;

const SingUpImg = styled.img`
  margin: 3px 0 0 110px;
  cursor: pointer;
  @media screen and (min-width: 2560px) {
    height: 30px;
    margin: 4.5px 0 0 115px;
  }
`;

export default Login;
