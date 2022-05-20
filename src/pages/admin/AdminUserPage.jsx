import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import AdminSidebar from "./AdminSideBar";
import {getUserList} from "../../redux/modules/userList"
import AdminUserList from "./AdminUserList";

const AdminUserPage = () => {

  const dispatch = useDispatch();

  // UserList 조회를 위한 useEffect
  React.useEffect(() => {
    dispatch(getUserList());
  },[]);

  // 받아온 값에서 필요한 값 꺼내오기
  const userList = useSelector((state) => state.userList.user_List);

  return (
    <React.Fragment>
      <div style={{display : 'flex'}}>
        <AdminSidebar />
        <BackgroundDiv>
        <TableName>
          유저관리
        </TableName>
        <FnLine>
          <SelectBoxWrapper>
            <Selecter>
              <option>전체</option>
              <option>1번입니다</option>
              <option>2번입니다</option>
              <option>3번입니다</option>
            </Selecter>
            <SelectSVG width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.98242 1.5L9.01911 8.5L16.0558 1.5" stroke="#1F3A5E" stroke-width="2" stroke-linecap="round"/>
            </SelectSVG>
          </SelectBoxWrapper>
          
          <InputBoxWrapper>
            <SearchBox placeholder="검색">
            </SearchBox>
            <InputSVG width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.38">
              <path fillRule="evenodd" clipRule="evenodd" d="M14.76 13.27L20.49 19L19 20.49L13.27 14.76C12.2 15.53 10.91 16 9.5 16C5.91 16 3 13.09 3 9.5C3 5.91 5.91 3 9.5 3C13.09 3 16 5.91 16 9.5C16 10.91 15.53 12.2 14.76 13.27ZM9.5 5C7.01 5 5 7.01 5 9.5C5 11.99 7.01 14 9.5 14C11.99 14 14 11.99 14 9.5C14 7.01 11.99 5 9.5 5Z" fill="#1F3A5E"/>
              </g>
            </InputSVG>
          </InputBoxWrapper>

          <UserAddSVG width="102" height="40" viewBox="0 0 102 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M41.0901 22.968V28.424H43.2661V22.968H41.0901ZM46.2101 22.968V28.424H48.3861V22.968H46.2101ZM38.0661 21.848V23.56H51.4901V21.848H38.0661ZM44.7381 14.104C41.5861 14.104 39.3941 15.4 39.3941 17.432C39.3941 19.432 41.5861 20.728 44.7381 20.728C47.9061 20.728 50.0981 19.432 50.0981 17.432C50.0981 15.4 47.9061 14.104 44.7381 14.104ZM44.7381 15.8C46.6901 15.8 47.9061 16.376 47.9061 17.432C47.9061 18.472 46.6901 19.048 44.7381 19.048C42.8021 19.048 41.5701 18.472 41.5701 17.432C41.5701 16.376 42.8021 15.8 44.7381 15.8ZM63.0889 13.592V28.456H65.2169V13.592H63.0889ZM60.4969 18.776V20.488H63.5849V18.776H60.4969ZM56.2089 15.944V17.256C56.2089 20.008 55.0409 22.84 52.5609 24.008L53.8089 25.688C56.5769 24.328 57.8889 20.872 57.8889 17.256V15.944H56.2089ZM56.7049 15.944V17.256C56.7049 20.76 57.9849 24.072 60.7689 25.384L62.0009 23.72C59.5209 22.6 58.3689 19.864 58.3689 17.256V15.944H56.7049ZM53.1689 15.032V16.744H61.4089V15.032H53.1689ZM73.1356 23.096V28.44H75.2476V23.096H73.1356ZM67.5196 22.472V24.2H80.9116V22.472H67.5196ZM73.1196 16.264V16.616C73.1196 17.992 71.5356 19.672 68.1916 20.056L68.9276 21.72C72.8476 21.256 74.9916 19.096 74.9916 16.616V16.264H73.1196ZM73.3916 16.264V16.616C73.3916 19.032 75.5356 21.272 79.4396 21.72L80.1916 20.056C76.8636 19.672 75.2636 17.96 75.2636 16.616V16.264H73.3916ZM68.7196 15.304V16.984H79.6956V15.304H68.7196ZM73.1356 13.64V15.88H75.2476V13.64H73.1356ZM91.6944 13.592V28.408H93.8384V13.592H91.6944ZM93.2784 19.256V21H95.8864V19.256H93.2784ZM87.8064 15.128V15.496C87.8064 19.512 85.9664 22.232 82.0784 24.248L83.2624 25.864C88.1904 23.384 89.8864 19.576 89.8864 15.128H87.8064ZM82.8944 15.128V16.84H88.8944V15.128H82.8944Z" fill="#1F3A5E"/>
            <path d="M17.3571 21.4291C20.0397 21.4291 22.2143 19.2545 22.2143 16.572C22.2143 13.8895 20.0397 11.7148 17.3571 11.7148C14.6746 11.7148 12.5 13.8895 12.5 16.572C12.5 19.2545 14.6746 21.4291 17.3571 21.4291Z" fill="#1F3A5E"/>
            <path d="M20.5069 21.668H13.9931C12.9345 21.6692 11.9196 22.0612 11.171 22.7582C10.4224 23.4551 10.0013 24.4001 10 25.3857V29.168H24.5V25.3857C24.4987 24.4001 24.0776 23.4551 23.329 22.7582C22.5804 22.0612 21.5655 21.6692 20.5069 21.668Z" fill="#1F3A5E"/>
            <path d="M27.4987 18.332V15.832H25.832V18.332H23.332V19.9987H25.832V22.4987H27.4987V19.9987H29.9987V18.332H27.4987Z" fill="#1F3A5E"/>
          </UserAddSVG>
          
        </FnLine>
        <UserList>
          <Userdata style={{width : "6%"}}></Userdata>
          <Userdata style={{width : "11%"}}>이름</Userdata>
          <Userdata style={{width : "25%"}}>이메일주소</Userdata>
          <Userdata style={{width : "18%"}}>전화번호</Userdata>
          <Userdata style={{width : "18%"}}>가입일자</Userdata>
          <Userdata style={{width : "11%"}}>권한부여</Userdata> 
          <Userdata style={{width : "11%"}}>유저삭제</Userdata>         
        </UserList>
        <UserDataWrapper>
          {
            userList.map((e, idx)=>{
              return(
                <AdminUserList key={idx} e={e} idx={idx}></AdminUserList>
              )
            })
          }
        </UserDataWrapper>
        
        </BackgroundDiv>
      </div>
      
    </React.Fragment>
  )
}

const BackgroundDiv = styled.div`
  height : 100vh;
  float : left;
  background-color : #F4F6F9;
  flex-grow : 1;
`

const TableName = styled.div`
  width : 95px;
  height : 24px;
  margin : 40px 0 32px 32px;
  font-weight: 900;
  font-size: 24px;
  line-height: 24px;
`

const FnLine = styled.div`
  width : auto;
  height : 40px;
  margin : 0 39px 16px 32px;
`

const SelectBoxWrapper = styled.div`
	display: flex;
  float : left;
  margin-right : 44px;
`

const Selecter = styled.select`
width: 118px;
height : 40px;
padding: .5em .9em;
  border: 1px solid #999;
  font-weight: 700;
  font-size: 16px;
  // background: url('arrow.jpg') no-repeat 95% 50%;
  border: 2px solid #1F3A5E;
  box-sizing: border-box;
  border-radius: 4px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  &::-ms-expand {
    display: none;
  }
`
  
  const SelectSVG = styled.svg`
    margin-left: -35px;
    align-self: center;
    width: 20px;
    height: 14px;
  `

  const InputBoxWrapper = styled.div`
	display: flex;
  float : left;
`

  const SearchBox = styled.input`
  width : 259px;
  height: 40px;
  background-color:transparent;
  border: 2px solid rgba(31, 58, 94, 0.3);
  color : rgba(31, 58, 94, 0.3);
  box-sizing: border-box;
  border-radius: 4px;
  padding-left : 40px;
  &:hover {
    border : 2px solid #1F3A5E;
  };
  &:focus {
    outline: none;
  };
  &::placeholder {
    color: rgba(31, 58, 94, 0.3);
    font-weight: 400;
    font-size: 16px;
    line-height: 40px;
    display: flex;
  };
`

  const InputSVG = styled.svg`
  margin-left: -250px;
  align-self: center;
  width: 25px;
  height: 25px;
  &:hover {
    fill : #1F3A5E;
  };
`

const UserAddSVG = styled.svg`
  float : right;
`

const UserList = styled.div`
  background-color : #1F3A5E;
  margin : 0 32px 0 32px;
  color : white;
  width : auto;
  height : 40px;
  text-align : center;
  border-radius: 10px 10px 0px 0px ;
`

const Userdata = styled.p`
  float : left;
  margin : 10px auto;
  font-weight: 600;
  font-size: 14px;
`

const UserDataWrapper = styled.div`
  width : auto;
  height : 80vh;
  background-color : white;
  margin : 0px 32px 34px 32px;
  border-radius : 0px 0px 10px 10px;
  overflow : overlay;
  overflow-x : hidden;
  &::-webkit-scrollbar {
    width: 8px;    
  }
  &::-webkit-scrollbar-thumb {
    height: 400px;
    background: #8F9CAF;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transition;
  }
  @media screen and (max-height: 1000px) {
    height : 70vh;
  }
  @media screen and (max-height: 650px) {
    height : 60vh;
  }
`

export default AdminUserPage