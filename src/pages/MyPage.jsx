import { useState } from "react";
import AdminSidebar from "./admin/AdminSideBar";
import styled from "styled-components";
import camera from "../assets/img/camera.svg";

const MyPage = (props) => {
  const [my, setMy] = useState({
    nickname: "닉",
    email: "이",
    phoneNumber: "010",
    kakaoId: "asdf@asdf.asdf",
    github: "asdf.io",
    tags: ["FE"],
  });

  return (
    <div style={{ display: "flex" }}>
      {/* <AdminSidebar /> */}
      <BackgroundDiv>
        <PageName>팀관리</PageName>
        <Wrap>
          <figure
            style={{
              position: "relative",
              width: "fit-content",
              height: "fit-content",
            }}
          >
            <ProfileImg
              src="https://images.pexels.com/photos/9887601/pexels-photo-9887601.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt=""
            />
            <ProfilImgIcon>
              <img src={camera} alt="camera-icon" style={{ margin: "auto" }} />
            </ProfilImgIcon>
          </figure>
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <Label htmlFor="nickname">
              <p>닉네임</p>
              <input
                id="nickname"
                value={my.nickname}
                onChange={(e) =>
                  setMy({ ...my, [e.target.id]: e.target.value })
                }
              />
            </Label>
            <Label htmlFor="email">
              <p>이메일</p>
              <input
                id="email"
                type="email"
                value={my.email}
                onChange={(e) =>
                  setMy({ ...my, [e.target.id]: e.target.value })
                }
              />
            </Label>
            <Label htmlFor="phoneNumber">
              <p>전화번호</p>
              <input
                id="phoneNumber"
                value={my.phoneNumber}
                onChange={(e) =>
                  setMy({ ...my, [e.target.id]: e.target.value })
                }
              />
            </Label>
            <Label htmlFor="kakaoId">
              <p>카톡아이디</p>
              <input
                id="kakaoId"
                value={my.kakaoId}
                onChange={(e) =>
                  setMy({ ...my, [e.target.id]: e.target.value })
                }
              />
            </Label>
            <Label htmlFor="github">
              <p>github</p>
              <input
                id="github"
                value={my.github}
                onChange={(e) =>
                  setMy({ ...my, [e.target.id]: e.target.value })
                }
              />
            </Label>
            <Label htmlFor="tags">
              <p>태그</p>
              {my.tags?.map((tag, idx) => (
                <div key={idx} bgColor={"cyan"}>
                  {tag}
                </div>
              ))}
            </Label>

            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button buttonType="void">취소</Button>
              <Button buttonType="solid">완료</Button>
            </div>
          </div>
        </Wrap>
      </BackgroundDiv>
    </div>
  );
};

const BackgroundDiv = styled.div`
  height: 100vh;
  float: left;
  background-color: #f4f6f9;
  flex-grow: 1;
`;

const Wrap = styled.div`
  background-color: white;
  border-radius: 2rem;
  max-width: 50rem;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
`;

const ProfileImg = styled.img`
  object-fit: cover;
  object-position: center;
  width: 12rem;
  height: 12rem;
  overflow: hidden;
  border-radius: 100%;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const ProfilImgIcon = styled.i`
  position: absolute;
  right: 10px;
  bottom: 20px;
  z-index: 50;
  background-color: #1f3a5e;
  border-radius: 100%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  box-shadow: 0 2px 3px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  cursor: pointer;
`;

const PageName = styled.p`
  font-weight: 700;
  font-size: 24px;
  margin: 40px 0 32px 32px;
`;

const Label = styled.label`
  margin-top: 0.5rem;
  :first-child {
    margin-top: 0rem;
  }
  p {
    font-size: 0.8em;
    margin: 0.25rem auto;
    font-weight: bold;
  }
  input {
    padding: 0.5rem 0;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    border: 0px;
    border-bottom: 1px solid #e0e0e0;
    color: #828282;
    :focus {
      color: #282828;
      border-color: #282828;
    }
  }

  div {
    font-size: 0.75em;
    font-weight: bold;
    background-color: ${(props) => (props?.bgColor ? props.bgColor : "pink")};
    padding: 0.25rem 0.5rem;
    display: inline-flex;
    border-radius: 0.25rem;
  }
`;

const Button = styled.button`
  background-color: ${(props) =>
    props.buttonType === "solid" ? "#FF5F00" : "transparent"};
  color: ${(props) => (props.buttonType === "solid" ? "white" : "#FF5F00")};
  padding: 0.5rem 2rem;
  border-radius: 99rem;
  border: 1px solid #ff5f00;
  cursor: pointer;
  outline: none;
  margin-top: 2rem;
  margin-left: 0.5rem;
`;

export default MyPage;
