// const redirect_uri = "http://localhost:3000/api/user/kakao/callback";
const kakao_redirect_uri = "https://www.a-chool.com/api/user/kakao/callback";
// const naver_redirect_uri = "https://localhost:3000/api/user/naver/callback";
const naver_redirect_uri = "https://www.a-chool.com/api/user/naver/callback";

// 배포한 주소로
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${kakao_redirect_uri}&response_type=code`;
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${naver_redirect_uri}&state=STATE_STRING&response_type=code`;
// export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/token?client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&client_secret=${process.env.REACT_APP_NAVER_CLIENT_SECRET}&redirect_uri=${naver_redirect_uri}&grant_type=authorization_code&response_type=token&`;
