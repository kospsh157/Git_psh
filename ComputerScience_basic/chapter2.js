

'use strict'

// << 자바스크립트 진수 변환 함수 >>
// 십진수로 바꿀려면 parseInt() 사용, 임의 진수로 바꿀려면 toString()사용 

// 10진수 >>> 2진수 
let dec = 25;
let bin = dec.toString(2) 

// 2진수 >>> 10진수 
let bin1 = 11001
let dec1 = parseInt(bin, 2) 

// 2진수 >>> 16진수 (10진수로 바꿨다가 16진수로 바꾼다.)
let bin2 = 11001;
let hex = parseInt(bin2, 2).toString(16) 


// 16진수 >>> 2진수 (10진수로 바꿨다가 2진수로 바꾼다.)
let hex1 = '7b'    // 16진수는 스트링형태로 써야한다. 
let bin3 = parseInt(hex1, 16).toString(2)
console.log(bin3)
