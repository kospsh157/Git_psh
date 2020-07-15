'use strict'

//문제1 :  입력 받기
//정수 1개 입력받아 그대로 출력하기

// let v = prompt("숫자를 입력하세요")
// let v_n = Number(v)
// console.log(v_n)
// 위는 브라우저상에서만 됨. 
// node엔진은 prompt를 지원하지 않음.

// 대신 readline 를 지원함
// readline 파라미터로 입력값이 전달되는데, 이때 무조건 문자열형태로 전달됨을 주의한다.
const readline = require('readline');


const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.on('line', function(answer) {
	console.log(answer);

	// 여기서 answer가지고 문제해결을 하면된다.

	rl.close();
});


// 문제2 : 문자형으로 변수를 하나 선언하고 변수에 문자하나를 저장한 후 변수를 출력해보자

rl.on('line', function(input){
	let v = ''
	v = input
	console.log(v)
	r1.close()
})


// 문제4 : 정수 2개 입력받아 그대로 출력하기

const r1 = readline.createInterface({
	input:process.stdin,
	output:process.stdout
})
r1.on('line', (input)=>{
	let a = input.split(' ')
	console.log(a)
	var int1 = a[0]
	var int2 = a[1]
	console.log(int1)
	console.log(int2)	
	r1.close()
})

// 문제5 : 두 개의 문자를 입력 받아서 순서를 바꿔서 출력하자 

rl.on('line', (input)=>{
	let inputArr = input.split(' ')
	
	for(let i=inputArr.length-1; i>=0; i--){
		console.log(inputArr[i])
	}
})



// 문제6 : 실수 입력 받아서 둘째 자리까지 출력하기
// toFixed(n) : 소수점 n+1자리에서 반올림해서 n자리까지만 절사한다. 주의할 점은 문자열로 반환되므로, 다시 숫자로 바꿔줘야한다.

rl.on('line', (input)=>{
	let float = Number(input)
	let fixFloat = float.toFixed(3)

	fixFloat.pop()
	console.log(fixFloat)
	rl.close()
})

