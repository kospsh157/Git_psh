'use strict'

const A = require('./globalA');   //여기서 globalA 파일 모듈 불러오고

global.meaasge = "연녕";          //여기서 gloabl 변수 사용 

console.log(A());                 //여기서 golbalA 가져온 모듈의 함수 사용 



