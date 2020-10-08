'use strict' 


// 리턴하는 값을 import 하는 쪽에서 받아서 사용할 수 있다. 
module.exports = () =>  { 
  const test = "'dfdfdfdf'"
  return test
}

// exports 는 하나만 가능하며, 중복되어 있을시에는 가장 마지막에 선언된 exports 만이 모듈로 쓰일 수 있다. 
module.exports = () => {
    return global.message;  // global 은 전역 객체라서 여기다가 변수를 담아서 보내기도 한다. 그러나 추천하는 방식은 아니다.
}


