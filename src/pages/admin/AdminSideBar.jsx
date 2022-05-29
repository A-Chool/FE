import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "../../componentsCss/Font.css";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { logOut } from "../../redux/modules/user";

import jwt_decode from "jwt-decode";

import { loadMyPage } from "../../redux/modules/myPage";
import editBtn from '../../assets/img/editBtn.svg'

const AdminSidebar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const value = "; " + document.cookie;

  const parts = value.split("; userToken=");

  const decode = jwt_decode(parts[1]);

  const userData = useSelector((state) => state.myPage.userInfo);

  useEffect(() => {
    dispatch(loadMyPage());
  }, []);

  return (
    <React.Fragment>
      <Sidebar>
        <AdminLogo>
          <svg
            width="161"
            height="65"
            viewBox="0 0 161 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M70.61 40.46C70.61 48.425 75.74 52.565 83.12 52.565C90.5 52.565 95.585 48.425 95.585 40.46V23.99C95.585 16.025 90.5 11.885 83.12 11.885C75.74 11.885 70.61 16.025 70.61 23.99V40.46ZM100.13 53.42H109.04V34.745H110.525C113.225 34.745 114.08 32.675 114.08 30.83C114.08 29.03 113.27 26.915 110.525 26.915H109.04V15.53C109.04 12.695 106.88 11.165 104.585 11.165C102.245 11.165 100.13 12.65 100.13 15.53V53.42ZM79.43 23.765C79.43 20.75 80.96 19.265 83.12 19.265C85.28 19.265 86.81 20.75 86.81 23.765V40.685C86.81 43.745 85.28 45.185 83.12 45.185C80.96 45.185 79.43 43.745 79.43 40.685V23.765Z"
              fill="#1F3A5E"
            />
            <path
              d="M156.68 53.42C158.39 53.42 158.975 52.07 158.975 51.035C158.975 49.82 158.345 48.56 156.68 48.56H129.14C128.555 48.56 128.33 48.29 128.33 47.84C128.33 47.48 128.555 47.075 129.14 47.075H157.715V40.73C157.715 38.075 156.59 36.77 152.855 36.77H143.045V35.24H156.365C158.66 35.24 159.56 34.025 159.56 32.405C159.56 30.92 158.705 29.57 156.365 29.57H120.59C118.295 29.57 117.44 30.92 117.44 32.405C117.44 34.025 118.34 35.24 120.59 35.24H133.955V36.77H121.535C119.825 36.77 119.15 38.03 119.15 39.155C119.15 40.28 119.96 41.495 121.535 41.495H147.635C148.265 41.495 148.445 41.63 148.445 42.17V42.98H124.28C120.545 42.98 118.7 44.78 118.7 47.84V48.11C118.7 51.08 120.59 53.42 124.28 53.42H156.68ZM122.66 13.64C120.185 13.64 119.24 14.9 119.24 16.52C119.24 18.185 120.23 19.445 122.66 19.445H134.045C132.425 21.74 127.88 22.775 122.525 22.235C120.545 22.055 118.835 22.595 118.43 24.44C117.98 26.51 119.24 28.04 121.4 28.31C126.305 28.895 132.11 28.4 136.475 26.375C142.235 25.025 148.175 25.52 150.11 28.49H159.245C157.22 21.65 151.235 20.03 142.235 21.065C142.46 20.57 142.64 20.03 142.73 19.445H154.34C156.77 19.445 157.76 18.185 157.76 16.52C157.76 14.9 156.815 13.64 154.34 13.64H143.18C142.82 11.57 141.065 10.49 138.59 10.49C136.115 10.49 134.315 11.525 133.955 13.64H122.66Z"
              fill="#1F3A5E"
            />
            <path
              d="M58.8179 46.2119C60.2012 46.9326 60.7485 48.6463 59.9105 49.9619C56.8654 54.7419 52.613 58.6574 47.5619 61.2991C41.674 64.3785 34.9836 65.5792 28.3923 64.7394C21.8011 63.8996 15.6255 61.0596 10.6979 56.6022C5.77022 52.1448 2.3272 46.2841 0.832718 39.8098C-0.66176 33.3355 -0.135879 26.5586 2.33951 20.3924C4.81489 14.2261 9.12083 8.96673 14.6772 5.32288C20.2335 1.67902 26.7732 -0.174207 33.4151 0.012886C39.1131 0.173389 44.6514 1.82886 49.4835 4.79059C50.8134 5.6057 51.0726 7.38591 50.1452 8.64002V8.64002C49.2177 9.89412 47.4555 10.1445 46.111 9.35382C42.2194 7.06539 37.7992 5.78712 33.2561 5.65915C27.7685 5.50457 22.3654 7.03571 17.7748 10.0463C13.1841 13.0568 9.62657 17.4021 7.5814 22.4967C5.53624 27.5912 5.10175 33.1903 6.33649 38.5394C7.57123 43.8884 10.4159 48.7306 14.4871 52.4133C18.5583 56.096 23.6605 58.4423 29.1063 59.1362C34.552 59.83 40.0795 58.838 44.9441 56.2938C48.9715 54.1875 52.3842 51.1012 54.879 47.3386C55.741 46.0386 57.4346 45.4912 58.8179 46.2119V46.2119Z"
              fill="#FF5F00"
            />
            <rect
              x="13.6211"
              y="34.5"
              width="8.80472"
              height="28.4301"
              rx="4.40236"
              transform="rotate(-45.5117 13.6211 34.5)"
              fill="#FF5F00"
            />
            <rect
              x="58.6289"
              y="17"
              width="8.80472"
              height="43.9389"
              rx="4.40236"
              transform="rotate(43.6621 58.6289 17)"
              fill="#FF5F00"
            />
            <path
              d="M36.5571 10.1839C37.056 9.35355 38.326 9.64676 38.4105 10.6118L38.4272 10.8028C38.4649 11.2344 38.7763 11.5926 39.1984 11.69L39.3853 11.7332C40.3292 11.9511 40.4428 13.2495 39.5511 13.628L39.3745 13.703C38.9758 13.8723 38.7313 14.2791 38.7691 14.7106L38.7858 14.9017C38.8702 15.8667 37.6704 16.376 37.0349 15.6449L36.9091 15.5002C36.6249 15.1732 36.1624 15.0664 35.7636 15.2357L35.5871 15.3106C34.6954 15.6891 33.8403 14.7055 34.3392 13.8751L34.438 13.7107C34.6611 13.3394 34.6198 12.8666 34.3355 12.5396L34.2097 12.3949C33.5742 11.6638 34.2455 10.5466 35.1894 10.7645L35.3762 10.8076C35.7984 10.9051 36.2352 10.7196 36.4584 10.3483L36.5571 10.1839Z"
              fill="#FF5F00"
            />
            <path
              d="M23.1287 11.9434C23.0611 10.9771 24.2696 10.4888 24.8923 11.2309L25.0155 11.3778C25.294 11.7097 25.7545 11.8245 26.1562 11.6622L26.334 11.5904C27.2322 11.2275 28.07 12.2259 27.5566 13.0475L27.455 13.2101C27.2254 13.5775 27.2585 14.0509 27.537 14.3828L27.6603 14.5297C28.283 15.2718 27.5923 16.3771 26.6523 16.1428L26.4662 16.0964C26.0459 15.9916 25.6058 16.1694 25.3763 16.5368L25.2747 16.6994C24.7613 17.5209 23.4966 17.2056 23.429 16.2392L23.4157 16.0479C23.3854 15.6157 23.0804 15.2522 22.66 15.1474L22.474 15.101C21.534 14.8666 21.4431 13.5664 22.3413 13.2035L22.5191 13.1317C22.9208 12.9694 23.1722 12.5669 23.142 12.1347L23.1287 11.9434Z"
              fill="#FF5F00"
            />
            <path
              d="M13.003 20.9585C12.42 20.1848 13.1676 19.1171 14.094 19.4004L14.2773 19.4564C14.6916 19.5831 15.1404 19.4286 15.3889 19.0737L15.4989 18.9166C16.0545 18.1231 17.301 18.5042 17.3179 19.4727L17.3212 19.6645C17.3288 20.0976 17.6144 20.4766 18.0287 20.6033L18.2121 20.6594C19.1385 20.9426 19.1612 22.2458 18.2453 22.5612L18.0639 22.6236C17.6543 22.7647 17.3821 23.1534 17.3897 23.5866L17.393 23.7783C17.4099 24.7469 16.1775 25.1713 15.5945 24.3976L15.4791 24.2445C15.2184 23.8985 14.7645 23.7597 14.3549 23.9008L14.1736 23.9632C13.2577 24.2786 12.4733 23.2376 13.0289 22.4441L13.1389 22.287C13.3874 21.9321 13.3791 21.4576 13.1184 21.1116L13.003 20.9585Z"
              fill="#FF5F00"
            />
          </svg>
        </AdminLogo>
        <UserInfobox>
        <div style={{ float: "left" }}>
          <ProfileImg
            src={userData?.userImage}
            alt=""
          />
        </div>
        <div style={{ float: "left", width: "133px", height: "24px", marginLeft: "5px" }}>
          <p style={{ margin: "0 0 0 0", fontSize: "20px", fontWeight: "900" }}>
            {userData?.username}
          </p>
        </div>
        <div style={{ width: "132px", height: "24px", margin: "8px 0 0 6px", textAlign: "center", display : 'inline-block'}}>
          <p style={{ margin: "0 0 0 0", fontSize: "14px", float: "left", lineHeight : '24px' }}>항해99</p>
          {/* <img src={editBtn} style={{ width: "24px", height: "24px", margin: "0 0 10px 0", cursor : 'pointer' }} onClick={() => history.push("/my")}></img> */}
        </div>
      </UserInfobox>

        <hr style={{ width: "204px", border: "0.5px solid #BCC4CF" }}></hr>

        <div
          style={{ width: "172px", height: "92px", margin: "32px 0 0 32px" }}
        >
          <Link
            to="/admin/user"
            style={{
              textDecoration: "none",
              color: "black",
              fontSize: "20px",
              fontWeight: "700",
            }}
          >
            <Adminmenu>유저관리</Adminmenu>
          </Link>

          <Link
            to="/admin/team"
            style={{
              textDecoration: "none",
              color: "black",
              fontSize: "20px",
              fontWeight: "700",
            }}
          >
            <Adminmenu>팀관리</Adminmenu>
          </Link>
        </div>

        {/* <Link to="/" style={{ textDecoration: 'none', color : "black", fontSize : "20px", fontWeight : "700" }}>
          <Adminmenu>게시판 관리</Adminmenu>
        </Link> */}
        <LogOutBtn
          onClick={() => {
            dispatch(logOut());
            history.push("/");
          }}
        >
          로그아웃
        </LogOutBtn>
      </Sidebar>
    </React.Fragment>
  );
};

const Sidebar = styled.div`
  width: 268px;
  height: 100vh;
  background-color: white;
  float: left;
`;

const AdminLogo = styled.h2`
  color: white;
  display: inline-block;
  margin-top: 31px;
  margin-left: 32px;
  cursor : pointer;
`;

const UserInfobox = styled.div`
  width: 196px;
  height: 58px;
  margin: 64px 0 8px 32px;
  // background-color : green;
`;

const ProfileImg = styled.img`
  object-fit: cover;
  object-position: center;
  width: 58px;
  height: 58px;
  overflow: hidden;
  border-radius: 100%;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  float : left;
`;

const Adminmenu = styled.p`
  font-size: 28px;
  font-family: yg-jalnan;
`;

const LogOutBtn = styled.button`
  position: absolute;
  left: 32px;
  bottom: 40px;
  width: 108px;
  height: 40px;
  border: none;
  border-radius: 100px;
  background-color: #1f3a5e;
  color: #ffffff;
  font-weight: 700;
  font-size: 16px;
  font-family: Roboto;
  font-style: normal;
  cursor: pointer;
`;

export default AdminSidebar;
