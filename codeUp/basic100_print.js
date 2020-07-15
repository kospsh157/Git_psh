'use strict'
// 1번 문제 
/*
C/C++언어에서 가장 기본적인 명령이 출력문이다.
printf()를 이용해 다음 단어를 출력하시오.
Hello
*/

console.log('Hello')


// 4번 문제

/*
    작은 따음표가 들어있는 문자열 출력
    'Hello' 출력해보자

*/
console.log("'Hello'")

// 5번 문제
// 큰따음표도 출력해보자 
console.log('"Hello"')   // \&quot;Hello\&quot; 자바스크립트로 "출력 불가능? >> \&quot; 로 나오면 잘 나온다는 소리임

// 6번 문제
// 특수문자를 출력하자
console.log("여기 다음 확인")
console.log(' \"!@#$%^&*()\" ')   // 더블쿼터만 빼고 다 잘 나온다 걍 


// 7번 문제
// 파일 경로를 출력해보자 
/*
    다음 경로를 출력하시오.
    "C:\Download\hello.cpp"
    (단, 큰따옴표도 함께 출력한다.)
*/

console.log('\"C:\\Download\\hello.cpp\"')   // "\&quot;C:\Download\hello.cpp\&quot;"
// "\\ 같은 경우 윈도우 경로 \ 를 표현할때 쓴다."                    
// " /t, /n, /c 같은 이스케이프 문자도 적용된다."
// 큰따음표는 역슬레쉬로 해야 출력가능하다 \"
// 16진수 이스케이프 : \x          문자열에서 \x하면 16진수 표현가능 
// 유니코드 이스케이프 : \u        문자열에서 \u 하면 유티코드 표현 가능


// 8번 문제
// 유니코드를 출력해보자

/*
    미리 알아야 할 것
    자바스크립트에서 유니코드 표현하기
    let string = 'Hello'
    string.charCodeAt(0) >>> 0번 인덱스 문자를 유니코드로 바꿈 (기본적으로 10진수 유니코드로 나타냄)

    16진수 유니코드로 표현하기
    '가'.charCodeAt(0).toString(16)

    유니코드를 다시 문자열로 반환하기
    String 객체의 fromCharCode()이용
    let string = String.fromCharCode(parseInt(unicode,16)) // 16진수 유니코드면 16를 10진수면 그냥 생략

*/
// Hello 문자열을 16진수 유니코드로 바꾸기 
let string = 'Hello'
let unicode = ''
for(let i=0;i<string.length;i++){
    unicode += string.charCodeAt(i).toString(16) //10진수 유니코드로 바꿀려면 10진수가 걍 기본값이므로 toString함수를 안쓰면됨.
    if(!(i===string.length-1))
    unicode += ' ' // 띄어쓰기를 해서 구분을 해줘야함 안그럼 구분이 안됨 다시 유니코드를 문자열로 바꿀때 전혀 다른 문자열이 나옴
}
let strArr = unicode.split(' ')
console.log(strArr) // 유니코드 잘 나왔나 확인
console.log(typeof strArr)

//다시 유티코드를 문자열로 변환해서 출력
let string1 = ''
for(let i=0; i<strArr.length; i++){
    string1 += String.fromCharCode(parseInt(strArr[i],16))  
    //if(!(i===strArr.length-1))    // 문자열 변환시에는 굳이 글자들을 구분하기 위해 띄어쓰기를 해줄 필요는 없다.
    //string1 += ' '               
}
console.log(string1)

// << if문 조건절 쉽게 쉽게 생각하기 >>
// 내가 원하는 조건이 true일때 if문 이 실행되게 할려면 그대로 if조건절에 조건문을 쓰면된다.
// 만약 내가 원하는 조건에서 if문이 실행되길원치 않다면, if조건절에 !()를 감싸주면 해당조건일때 false로 반환되어 if문을 실행하지 않게된다.



