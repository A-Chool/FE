export const emailCheck = (email) => {
  let regEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return regEmail.test(email);
};

//이메일 형식으로 반드시 @와. 이 들어간 완성된 이메일 형식

export const passwordCheck = (password) => {
  var regPw = /^[A-Za-z0-9]{6,12}$/;
  return regPw.test(password);
};
// 숫자와 문자포함 6~12자 비밀번호 정규식

export const phoneCheck = (phone) => {
  var regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  return regPhone.test(phone);
};

//핸드폰번호는 000-0000-0000 의 형태로 숫자를 입력해주세요

export const nickCheck = (nickname) => {
  let regNick = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/;
  return regNick.test(nickname);
};

//닉네임  한글, 영문, 숫자만 가능하며 2-10자리 가능합니다
