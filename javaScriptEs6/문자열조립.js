var API_KEY = "abcde"
var url = "http://someAPI.com/request&key=" + API_KEY;

//위를 동일하게 es6 문법으로 바꾸면
var API_KEY = "abcde"
var url = "http://someAPI.com/request&key=${API_KEY}";
// 변수명을 기존의 더하기 연산을 사용하지않고 바로 ${}를 사용해서 문자열에 추가 할 수 있다.



