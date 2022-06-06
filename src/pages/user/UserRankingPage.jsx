import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// 컴포넌트 import 
import UserSidebar from '../../components/UserSideBar';
import CarrotGraph from "../../components/graph/CarrotGraph";
import LineGraph from "../../components/graph/LineGraph";

// 리덕스 import 
import { loadUserStudy, loadRankList, loadCarrot } from "../../redux/modules/rank";

// SVG import
import studyavr from '../../assets/img/Studyavr.svg';
import carrot from '../../assets/img/ carrot.svg';
import dailyData from '../../assets/img/dailyData.svg';
import carrotImg from '../../assets/img/carrotImg.svg';
import number1 from '../../assets/img/1st.svg';
import number2 from '../../assets/img/2nd.svg';
import number3 from '../../assets/img/3rd.svg';
import mascotCarrot from '../../assets/img/mascotCarrot.svg';

// font import
import "../../componentsCss/Font.css";

const UserRankingPage = () => {

  const dispatch = useDispatch();

  // Sidebar 용 온라인 유저 파악을 위한 Selector
  const teamList = useSelector((state) => state.checkIn.checkInList);

  // 상단 통계 데이터 볼러오기
  const upStudyData = useSelector((state) => state.rank.rank)
  
  // 랭킹 데이터 볼러오기
  const rankingList = useSelector((state) => state.rank.rankList)
  
  // 상단 통계 데이터 볼러오기
  // 랭킹 통계 데이터 불러오기
  React.useEffect(() => {
    dispatch(loadUserStudy());
    dispatch(loadRankList());
  }, []);

  // 랜덤 숫자 불러오기
  const randomNum = Math.floor(Math.random() * 13 + 1)
  
  return (
    <React.Fragment>
      <div style={{ display: "flex" }}>
        <UserSidebar teamList={teamList}/>
        <BackgroundDiv>
          <DivWrapper>

            <HeaderLogo>
              <img src={studyavr} />
            </HeaderLogo>

            <div style={{width : '890px', float : 'left', display : 'inline-block'}}>
            <UserStudyData>
              <Mascot src={mascotCarrot} />
              <TalkWrapper>
                {
                  randomNum === 1 
                  ? "공부량이 엄청난걸요? 아주 잘하고 있어요!"
                  : randomNum === 2
                  ? "시작이 반! 꾸준히 같이 공부해봐요. 좋은 결과가 있을거에요!"
                  : randomNum === 3
                  ? "이번주 학습 랭킹 1등을 노려봐요!"
                  : randomNum === 4
                  ? "오늘도 열심히 당근을 심어봐요!!"
                  : randomNum === 5
                  ? "우리에겐 아직 꿈을 이루기 위한 충분한 시간이 있어요!"
                  : randomNum === 6
                  ? "오늘은 우리에게 행운의 날이 될 거에요!"
                  : randomNum === 7
                  ? "뭔가 제대로 하고 싶다면 스스로 해야 해요!"
                  : randomNum === 8
                  ? "넌 한다면 하는 사람이잖아 그걸 보여줘, 너를 믿어주는 사람들과 너 자신에게!"
                  : randomNum === 9
                  ? "항상 싱글벙글!"
                  : randomNum === 10
                  ? "뭐든 생각하기 나름이에요!"
                  : randomNum === 11
                  ? "모든 게 잘 될 것만 같아요!"
                  : randomNum === 12
                  ? "할 수 있어요! 올해엔 정말 멋지게 해보자구요!"
                  : "아직 시간은 충분해요! 넌 할 수 있어요!"
                }
              </TalkWrapper>
              <DataWrapper>
                <DetailDataWrapper>
                  <DataTitle>스터디를 시작한지</DataTitle>
                  <MainData>{upStudyData.startDate}</MainData>
                  <MainDataFont>일차</MainDataFont>
                </DetailDataWrapper>
                <DetailDataWrapper>
                  <DataTitle>누적 공부시간</DataTitle>
                  <MainData>{upStudyData.totalTime}</MainData>
                  <MainDataFont>시간</MainDataFont>
                </DetailDataWrapper>
                <DetailDataWrapper>
                  <DataTitle>오늘 누적 공부시간</DataTitle>
                  <MainData>{ upStudyData.todayTime === null ? "0" : upStudyData?.todayTime?.split(':')[0] }</MainData>
                  <MainDataFont>시간</MainDataFont>
                </DetailDataWrapper>
                <DetailDataWrapper>
                  <DataTitle>오늘 체크인 시간</DataTitle>
                  <MainData>{upStudyData.todayCheckIn}</MainData>
                </DetailDataWrapper>
              </DataWrapper>
            </UserStudyData>

            <GraphWrapper>
                <img src={carrot} style={{margin : '11px 0 8px 20px'}}/>
                <CarrotZone>
                  <CarrotGraph></CarrotGraph>
                  <img src={carrotImg} style={{float : 'right'}}/>
                </CarrotZone>
                <img src={dailyData} style={{margin : '11px 0 8px 24px'}}/>
                <MonthDataZone>
                  <LineGraph></LineGraph>
                </MonthDataZone>
            </GraphWrapper>
            </div>


            <RankingWrapper>
              <RankingTitle>항해99 주간 학습 랭킹</RankingTitle>
              <RankingListWrapper>
                {
                  rankingList && rankingList?.map((e, idx) => {
                    return (
                      <RankingListData idx={idx}>
                        <RankingNum>
                          {
                            idx === 0 
                            ? <RankingNumImg src={number1} />
                            : idx === 1
                            ? <RankingNumImg src={number2} />
                            : idx === 2
                            ? <RankingNumImg src={number3} />
                            : idx + 1
                          }
                        </RankingNum>
                        <RankingName>{e.value.userName}</RankingName>
                        <RankingTime idx={idx}>
                          {("0" + Math.floor((e.score / 3600))).slice(-2)}h
                          {("0" + Math.floor((e.score / 60) % 60)).slice(-2)}m
                        </RankingTime>
                      </RankingListData>
                    )
                  })
                }
              </RankingListWrapper>
            </RankingWrapper>
          </DivWrapper>

        </BackgroundDiv>
      </div>
    </React.Fragment>
  );
}

const BackgroundDiv = styled.div`
  height : 100vh;
  float : left;
  background-color : #F4F6F9;
  flex-grow : 1;

  position: relative;
  display: flex;
  flex-direction: column;

  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    width: 4px;
    background: #c4c4c4;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transition;
  }
`

const DivWrapper = styled.div`
  width : 1180px;
  height : 742px;
  margin : auto;
`

const HeaderLogo = styled.div`
  // background-color : red;
  width : 95%;
  height : 31px;
  margin : 37px 29px 28px;
`

const UserStudyData = styled.div`
  width: 825px;
  height: 218px;
  background: #FFFFFF;
  border-radius: 16px;
  margin : 0px 24px 16px 32px;
  display : inline-block;
  // flex-flow : wrap;

`

const Mascot = styled.img`
  margin : 16px;
  width: 145.85px;
  height: 185.79px;
  float : left;
  display : inline-block;
  // background-color : red;
`

const TalkWrapper = styled.div`
  margin : 24px 12px;
  min-width: 312px;
  width : auto;
  height: 52px;
  padding : 0px 15px;
  background: #FFFFFF;
  box-shadow: 0px 2px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 32px 32px 32px 0px;
  font-weight: 500;
  font-size: 16px;
  line-height: 52px;
  text-align : center;
  display : inline-block;
`

const DataWrapper = styled.div`
  margin : 16px 12px;
  min-width: 610px;
  height: 70px;
  display : inline-block;
`

const DetailDataWrapper = styled.div`
  width: 143px;
  height: 70px;
  float : left;
  margin : 0px 6px;
`

const DataTitle = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0.1px;
  color: #282828;
  margin : 0 0 16px 0;
`

const MainData = styled.span`
  font-weight: 700;
  font-size: 32px;
  text-align: center;
  letter-spacing: 0.1px;
  color: #FF5F00;
  font-family: yg-jalnan;
`

const MainDataFont = styled.span`
  font-family: yg-jalnan;
  font-weight: 700;
  font-size: 24px;
  text-align: center;
  letter-spacing: 0.1px;
  margin : 0 0 10px 12px;
  height: 38px;
`

const GraphWrapper = styled.div`
  width: 825px;
  height: 450px;
  // background-color : green;
  background: #FFFFFF;
  border-radius: 16px;
  margin : 0px 24px 16px 32px;
  display : inline-block;
`

const CarrotZone = styled.div`
  width: 782px;
  height: 134px;
  display : inline-block;
  margin : 0px 20px;
  // background-color : red;
`

const MonthDataZone = styled.div`
  width: 782px;
  height: 200px;
  display : inline-block;
  margin : 0px 20px;
  // background-color : red;
`

const RankingWrapper = styled.div`
  width: 259px;
  height: 683px;
  background: #FFFFFF;
  // background-color : red;
  border-radius: 16px;
  display : inline-block;
`

const RankingTitle = styled.div`
  width: 259px;
  height: 40px;
  font-weight: 700;
  background: #FFF9D9;
  border-radius: 16px 16px 0px 0px;
  font-size: 16px;
  text-align: center;
  color: #1F3A5E;
  line-height : 40px;
`

const RankingListWrapper = styled.div`
  // background-color : #E0E0E0;
  width: 220px;
  height: 620px;
  margin : 14px auto 0px;
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-thumb {
    width: 0px;
    background: #c4c4c4;
    border-radius: 2px;
  }
  &::-webkit-scrollbar-track {
    background: transition;
  }
`

const RankingListData = styled.div`
  width: 220px;
  height: 32px;
  border-bottom: ${({ idx }) => (idx === 0 ? '1px solid #1F3A5E' : '1px solid #E0E0E0')};
  border-radius : ${({ idx }) => (idx === 0 ? '5px' : 'none')};
  background-color : ${({ idx }) => (idx === 0 ? '#1F3A5E' : 'white')};
  color : ${({ idx }) => (idx === 0 ? 'white' : 'black')};
`

const RankingNum = styled.div`
  
  float : left;
  height: 32px;
  width: 30px;
  line-height : 32px;
  font-weight: 400;
  font-size: 14px;
  text-align: center;
`

const RankingNumImg = styled.img`
  height: 28px;
  width: 26px;
`

const RankingName = styled.div`
  // background-color : blue;
  float : left;
  height: 32px;
  width: 128px;
  line-height : 32px;
  font-weight: 700;
  font-size: 14px;
  text-align: center;
`

const RankingTime = styled.div`
  // background-color : green;
  float : right;
  height: 32px;
  width: 60px;
  font-weight: 400;
  font-size: 14px;
  line-height : 32px;
  font-weight : ${({ idx }) => (idx === 0  ? '700' : idx === 1 ? '700' : idx === 2 ? '700' : '400')};
  font-size: 14px;
`

export default UserRankingPage;