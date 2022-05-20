import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

// 모듈
import user from "./modules/user";
import userList from "./modules/userList";
import teamList from "./modules/teamList";
import memberList from "./modules/teamList";
import checkIn from "./modules/checkIn";
import teamBoard from "./modules/teamBoard";
import chat from "./modules/chat";
import week from "./modules/week";

// history를 페이지에서 편하게 사용할 수 있도록 준비
export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user: user,
  userList: userList,
  teamList: teamList,
  memberList: memberList,
  checkIn: checkIn,
  teamBoard: teamBoard,
  chat: chat,
  week : week,
  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history: history })];

// 지금이 어느 환경인 지 알려주는 것
const env = process.env.NODE_ENV;

// 콘솔에서 로거 확인하기
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

// 리덕스 데브툴 설정하기
const composeEnhancers = typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

// 미들웨어 묶기
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// 스토어 만들기
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
