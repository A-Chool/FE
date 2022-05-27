import React, { useEffect, useState, useRef } from "react";
import AdminSidebar from "./admin/AdminSideBar";
import UserSidebar from "../components/UserSideBar";
import styled from "styled-components";
import camera from "../assets/img/camera.svg";
import { useDispatch, useSelector } from "react-redux";

import jwt_decode from "jwt-decode";
import { getCookie } from "../shared/Cookie";

import { loadMyPage, editProfile } from "../redux/modules/myPage";
import axios from "axios";
import { baseUrl } from "../api/api";

const MyPage = (props) => {
  const dispatch = useDispatch();

  const teamList = useSelector((state) => state.checkIn.checkInList);
  // const [decode, setDecode] = useState("");
  const userData = useSelector((state) => state.myPage.userInfo);

  const [my, setMy] = useState({
    nickname: userData.username,
    // email: userData.userEmail,
    phoneNumber: userData.userPhoneNumber,
    kakaoId: userData.findKakaoId,
    github: userData.userGitHub,
    tags: userData.userTag,
  });

  // console.log("my.tags =", my.tags);
  // console.log(userData.userImage);

  useEffect(() => {
    // const userToken = getCookie("userToken");
    // setDecode(jwt_decode(userToken));
    dispatch(loadMyPage());
  }, []);

  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState(my.tags);
  const [userImage, setUserImage] = useState(userData?.userImage || "");

  useEffect(() => {
    setTagList(my.tags);
  }, [my.tags]);

  // console.log("tagItem 는 =",tagItem)
  // console.log("tagList 는 =",tagList)

  const handleUploadImage = async (e) => {
    if (e.target.files?.length > 0) {
      const userToken = getCookie("userToken");
      const res = await axios({
        method: "put",
        url: `https://achool.shop/api/user/mypage/image`,
        headers: { Authorization: `Bearer ${userToken}` },
        data: { userImage: e.target.files[0] },
      })
        .then((response) => {
          if (Math.floor(response.status / 100) === 2) {
            console.log(response);
          }
        })
        .catch((err) => {
          console.log("소셜로그인 에러", err);
        });
      // setUserImage(URL.createObjectURL(e.target.files[0]));
      // e.target.value = "";
    }
  };

  const onKeyPress = (e) => {
    if (e.target.value.length !== 0 && e.key === "Enter") {
      submitTagItem();
    }
  };

  const submitTagItem = () => {
    let updatedTagList = [...tagList];
    updatedTagList.push(tagItem);
    setTagList(updatedTagList);
    setTagItem("");
  };

  const deleteTagItem = (e) => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = tagList.filter((tagItem) => tagItem !== deleteTagItem);
    setTagList(filteredTagList);
  };

  useEffect(() => {
    setMy({
      nickname: userData.username,
      phoneNumber: userData.userPhoneNumber,
      kakaoId: userData.findKakaoId,
      github: userData.userGitHub,
      tags: userData.userTag,
    });
  }, [userData]);

  // const UserName = decode.USER_NAME
  return (
    <div style={{ display: "flex" }}>
      <UserSidebar teamList={teamList} />
      <BackgroundDiv>
        <PageName>팀관리</PageName>
        <FlexWrap>
          <Wrap>
            <figure
              style={{
                position: "relative",
                width: "fit-content",
                height: "fit-content",
              }}
            >
              <ProfileImg src={userImage || userData.userImage} alt="" />
              <ProfilImgIcon htmlFor="image-upload">
                <img src={camera} alt="camera-icon" style={{ margin: "auto" }} />
                <input
                  id="image-upload"
                  name="image-upload"
                  type="file"
                  accept="image/*"
                  style={{ height: 0, width: 0 }}
                  onChange={handleUploadImage}
                />
              </ProfilImgIcon>
            </figure>
            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <Label htmlFor="nickname">
                <p>이름</p>
                <input
                  id="nickname"
                  value={my.nickname || ""}
                  maxLength="7"
                  onChange={(e) => setMy({ ...my, [e.target.id]: e.target.value })}
                />
              </Label>
              <Label htmlFor="email">
                <p>이메일</p>
                <input
                  id="email"
                  type="email"
                  value={userData.userEmail}
                  onChange={(e) => setMy({ ...my, [e.target.id]: e.target.value })}
                />
              </Label>
              <Label htmlFor="phoneNumber">
                <p>전화번호</p>
                <input
                  id="phoneNumber"
                  value={my.phoneNumber || ""}
                  onChange={(e) => setMy({ ...my, [e.target.id]: e.target.value })}
                />
              </Label>
              <Label htmlFor="kakaoId">
                <p>카톡아이디</p>
                <input
                  id="kakaoId"
                  value={my.kakaoId || ""}
                  onChange={(e) => setMy({ ...my, [e.target.id]: e.target.value })}
                />
              </Label>
              <Label htmlFor="github">
                <p>github</p>
                <input
                  id="github"
                  value={my.github || ""}
                  onChange={(e) => setMy({ ...my, [e.target.id]: e.target.value })}
                />
              </Label>
              {/* <Label htmlFor="tags" >
              <p>태그</p>
              {my.tags?.map((e, idx) => (
                <div key={idx} bgColor={"cyan"} style={{marginRight : '5px'}}>
                  {e}
                </div>
              ))}

            </Label> */}
              <WholeBox>
                <TagBox>
                  {tagList?.map((tagItem, index) => {
                    return (
                      <TagItem key={index}>
                        <Text>{tagItem}</Text>
                        <TagButton onClick={deleteTagItem}>X</TagButton>
                      </TagItem>
                    );
                  })}
                  <TagInput
                    type="text"
                    placeholder="엔터로 Tag 추가"
                    tabIndex={10}
                    onChange={(e) => setTagItem(e.target.value)}
                    value={tagItem}
                    onKeyPress={onKeyPress}
                  />
                </TagBox>
              </WholeBox>

              <div style={{ display: "flex", justifyContent: "end" }}>
                {/* <Button buttonType="void">취소</Button> */}
                <Button
                  buttonType="solid"
                  onClick={() => {
                    dispatch(editProfile(my.nickname, tagList, my.github, my.kakaoId, my.phoneNumber));
                    window.alert("수정이 완료되었습니다!");
                  }}
                >
                  수정완료
                </Button>
              </div>
            </div>
          </Wrap>
        </FlexWrap>
      </BackgroundDiv>
    </div>
  );
};

const BackgroundDiv = styled.div`
  height: 100vh;
  float: left;
  background-color: #f4f6f9;
  flex-grow: 1;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  flex-grow: 1;
`;

const Wrap = styled.div`
  background-color: #fff;
  border-radius: 2rem;
  min-width: 50rem;
  flex-grow: 1;
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

const ProfilImgIcon = styled.label`
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
    background-color: transparent;
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
  background-color: ${(props) => (props.buttonType === "solid" ? "#FF5F00" : "transparent")};
  color: ${(props) => (props.buttonType === "solid" ? "white" : "#FF5F00")};
  padding: 0.5rem 2rem;
  border-radius: 99rem;
  border: 1px solid #ff5f00;
  cursor: pointer;
  outline: none;
  margin-top: 2rem;
  margin-left: 0.5rem;
`;

const WholeBox = styled.div`
  padding: 0px;
  height: auto;
  // background-color : red;
`;

const TagBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 50px;
  margin-top: 0.5rem;
  padding: 0rem 0;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  border: 0px;
  border-bottom: 1px solid #e0e0e0;

  &:focus-within {
    border-color: black;
  }
`;

const TagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 5px;
  background-color: #ffe8f3;
  border-radius: 5px;
  color: black;
  font-size: 13px;
  font-weight: 700;
`;

const Text = styled.span``;

const TagButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  margin-left: 5px;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  color: #ff5f00;
  cursor: pointer;
`;

const TagInput = styled.input`
  display: inline-flex;
  min-width: 150px;
  background: transparent;
  border: none;
  outline: none;
  cursor: text;
`;

export default MyPage;
