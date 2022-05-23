// const redirect_uri = "http://localhost:3000/api/user/kakao/callback";
const redirect_uri = "https://achool.shop/api/user/kakao/callback";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${redirect_uri}&response_type=code`;
