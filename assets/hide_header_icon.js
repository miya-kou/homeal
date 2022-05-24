function getCookie(){
  let param = {};
  let keys = ["q1", "q2", "q3","q4","q5","q6","q7","q8","q9","q10","q11","q12","q13","q14","q15","q16","q17","q18","q19","q20","q22"];
  let cookiesArray = document.cookie.split('; ');
  for(var c of cookiesArray){ 
    var cArray = c.split('='); 
    if( keys.indexOf( cArray[0] ) >= 0 ){
        param[cArray[0]] = decodeURIComponent(cArray[1]);
    }
  }
  return param;
}

function getParams(params){
  const regex = /[?&]([^=#]+)=([^&#]*)/g;
  const params_obj = {};
  let match;
  while(match = regex.exec(params)){
    params_obj[match[1]] = match[2];
  }
  return params_obj;
}

function checkParam(obj){
for(let i = 1; i <= 20; i++){
  let key = 'q'+i;
  if( ! obj[key] ){
    return false;
  }
}
if( ! obj['q22'] ){
    return false;
  }
return true;
}

$(function() {
  $(document).ready( function(){
    let param = getParams( decodeURI(location.href) );
    if ( !checkParam( param ) && !checkParam( getCookie() ) && !checkParam(customer_meta) ){
      console.log('no diagnostics result');
      let target = document.getElementsByClassName("c-header__icon--kids");
      for(let i = 0; i<target.length; i++){
      	target[i].style.display = 'none';
      }
    }
  });
});