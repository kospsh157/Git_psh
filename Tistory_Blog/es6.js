'use strict'
// << 화살표 함수 >>
// 기존 익명함수 정의
var func = function(anyString){
    return anyString + '입니다.' ;
}
var anyString = 'ES5이하 방식';
console.log(func(anyString))  // "ES5이하 방식입니다."



// ES6 이후 화살표함수를 이용한 익명함수 정의
let func = (anyString)=>{
    return anyString + '입니다.'
}
let anyString = 'ES6이상 방식';
console.log(func(anyString))  // "ES6이상 방식입니다."



// 위처럼 한 줄로 표현할 수 있는 아주 간단한 함수일 경우 중괄호{}와 return 키워드 까지 생략 가능하다.
let func = (anyData) => anyString + '입니다.'  
// 주의할 점은 한줄이 넘어가면 무조건 {}, return(필요하면) 키워드는 작성해야한다.


// 기존 콜백 방식
var resultArray = anyArray.filter(function(value){
    return value > 5;
})


// es6
let resultArray = anyArray.filter((value)=>{
    return value > 5
})
// 한줄로 표현할 수 있다면 더 간단히
let resultArray = anyArray.filter(value => value > 5)  




// 이전
function SomethingDo(anyData){
    console.log("es5에서 함수 정의법");
    return anyData;
}

//