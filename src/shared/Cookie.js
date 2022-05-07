const getCookie = (name) => {
  let value = "; " + document.cookie;

  let parts = value.split('; userToken=');
  
  // console.log(name)
  // console.log(`; ${name}=`)
  // console.log(parts)

  if (parts.length === 2) {
		return parts.pop().split(";").shift();
	}
  // console.log(parts.pop().split(";").shift())
}

const getUserId =() =>{
  var cookieValue=null;
  if(document.cookie){
      var array=document.cookie.split((escape("userId")+'='));
      if(array.length >= 2){
          var arraySub=array[1].split(';');
          cookieValue=unescape(arraySub[0]);
      }
  }
  return cookieValue;
}

const setCookie = (Authorization, value, exp = 5) => {
  let date = new Date();
  date.setTime(date.getTime() + exp*24*60*60*1000);
  document.cookie = `${Authorization}=${value}; expires=${date.toUTCString()}`;
}

const deleteCookie = (name) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
}

export {getCookie,getUserId, setCookie, deleteCookie};