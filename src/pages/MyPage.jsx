import AdminSidebar from "./admin/AdminSideBar";
import styled from "styled-components";
import camera from "../assets/img/camera.svg";

const MyPage = (props) => {
  return (
    <div style={{ display: "flex" }}>
      {/* <AdminSidebar /> */}
      <BackgroundDiv>
        <PageName>팀관리</PageName>
        <Wrap>
          <figure style={{ position: "relative" }}>
            <ProfileImg
              src="https://images.pexels.com/photos/9887601/pexels-photo-9887601.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt=""
            />
            <ProfilImgIcon>
              <img src={camera} alt="camera-icon" style={{ margin: "auto" }} />
            </ProfilImgIcon>
          </figure>
          <div>
            <Label htmlFor=""></Label>
            <Input id=""></Input>
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
  padding: 1rem;
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
`;

const PageName = styled.p`
  font-weight: 700;
  font-size: 24px;
  margin: 40px 0 32px 32px;
`;

const Input = styled.input`
  font-weight: 700;
  font-size: 24px;
  margin: 40px 0 32px 32px;
`;

const Label = styled.label`
  font-weight: 700;
  font-size: 24px;
  margin: 40px 0 32px 32px;
`;

export default MyPage;
