'use strict'

// 일단 배열에 다른 타입의 요소를 넣지마라. 기본중에 기본이다. 
// 자바스크립트는 미친놈이라 하나의 배열에 여러가지 타입의 데이터를 삽입 할 수 있다. 하지만 이렇게 하는 개발자는 없다. 없어야 한다.

// << 배열의 선언 >>
const arr1 = new Array(); // Array() 생성자함수를 사용하여 배열을 선언 
const arr2 = [1, 2]       // 배열 리터럴 방식 사용


// << 여러가지 배열의 함수들 >>
arr1.length //길이 반환 주의할점은 함수가 아니라는 점이다.
arr1[arr1.length-1] // arr1의 배열의 맨 마지막 인덱스의 값에 접근할 때  자주 쓰는 구문이니 그냥 외워라 

// 반복문 iterable 를 반복문을 할때 쓸 수 있는 간편한 for문인 for..of구문 사용
for( value of arr1){
    console.log(value);
}

//정직한 for문
for( let i ; i < arr1.length; i++){
    console.log(arr1[i])
}

// !!! 졸라 간단한 forEach 콜백함수 사용법 
arr1.forEach();
forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
// 이 포이치 함수는 콜백함수를 매개변수로써 가지는데, 
// 콜백의 인자로 배열의 요소값 전체랑, 배열의 인덱스, 전체배열 3가지가 올 수 있으나 흔히들 첫번째 인자인 배열의 "요소전체"만을 쓴다.
// 햇갈릴 수 있다. 첫째 인자랑 마지막 인자랑, 차이는 첫째 인자는 배열의 요소를 하나씩 넣어서 전체를 의미한다. 
// 세 번째 인자는 완전 통 배열 전체를 지칭한다. 뭔가 같으면서도 다르다. 이건 코드를 직접 써봐야 느낄 수 있다. 
// 하지만 위에서 한 번 언급했듯이 대부분 첫번째 인자만 쓴다. 가끔씩 인덱스까지 사용하는 정도이다. 

// 가장 중요한 핵심은 배열의 요소 하나마다 콜백함수의 내용을 실행한다는 것이다. 
// 즉 배열의 길이가 5개이면 총 콜백의 내용을 총 5번 반복 실행한다는 것이다. 
const arr = [1,2,3,4,5]
arr.forEach(function (elementOfArray, index, allArray){
    console.log(elementOfArray) // 1  >> 2 >> 3 >> 4  첫번째 돌 때 1 그 다음 루틴에서 2반환... 이런식으로 
    console.log(index)          // 0  >> 1 >> 2 >> 3  첫번째 돌 때 0 그 다음 루틴에서 1반환... 이런식으로 밑에도 4번 반복한다. 
    console.log(allArray)       // Array(5) [1, 2, 3, 4, 5] >> Array(5) [1, 2, 3, 4, 5] >> Array(5) [1, 2, 3, 4, 5] >> Array(5) [1, 2, 3, 4, 5]
})

// 진짜 주로 많이 쓰이는 형식 (첫번째 인자만 쓰이는 경우)
arr.forEach(function (value){
    console.log(value)
});

// 하지만 위와 같이 간단한 경우에는 화살표 함수표현을 콜백함수에써서 한줄로 표현이 가능하다.
arr.forEach( (value) => console.log(value))  // 화살표함수에서 한줄일경우에는 {}까지 생략이 가능하다.
// 출력 결과로는 
// 1
// 2
// 3
// 4
// 이 나오고 이런 화살표 함수에 익숙해져야한다.


// << 배열 조작 함수 >> 

// push() 배열에 요소를 추가하는 함수로, 주의할 점은 배열의 끝에서부터 추가한다는 점이다.
arr.push(5) // 5를 뒤에 추가하여 [1,2,3,4,5]가 된다.

// pop() 함수는 배열의 뒤 요소를 하나씩 빼서 반환하는 함수이다.
arr.pop()  // 뒤에 5를 빼서 [1,2,3,4]가 된다.

// unshift()  배열에 요소를 앞에서 부터 추가하는 함수이다.  
arr.unshift(0) // [0,1,2,3,4]가 된다.

// shift() 배열의 앞에 요소부터 하나씩 빼서 그 요소를 반환한다.
arr.shift() // // 앞에 0이 빠져 [1,2,3,4,5]가 된다.
// 쉬프트함수의 주의할 점은 선택적으로 특정 요소를 골라서 빼는게 아니라는 소리다. 
// 즉 arr.shift(1) 이런건 허용되지 않는다. 그냥 쓰면 무조건 앞에 요소부터 빠진다.

// 그리고 주의할점은 unshift()와 shift()함수는 앞에서 부터 추가하고 빼는 함수인데 햇갈린다. un이 붙으면 추가하는 거다.
// 그리고 이 둘의 함수는 앞의 pop(), push()함수에 비해 연산이 느리다. 
// 배열의 특징상 뒤에서 뭘 추가하고 빼는건 빠른데 앞에서 부터 뭔짓을 할려면 배열의 데이터들이 한 칸씩 뒤로 밀어주거나 땡기는 작업까지 해줘야 하기 때문이다.
// 특히 배열의 길이가 길수록...매우 비효울적이게된다.




// <<  인덱스로 특정 배열 요소 조작하기  >>

// splice() 함수를 이용하면 인덱스로 배열의 요소들을 범위를 정해서 지우거나 특정 하나만 지우거나 할 수 있다.
arr.splice(1) // 인덱스 1부터 모조리 다 지워진다.
arr.splice(1, 1) // 인덱스 1부터 1개만 지운다. 즉 인덱스1만 지운다는 뜻이다.
// 또한 spice() 이용하면 특정 요소를 지우고, 그 특정요소 인덱스에 다른 요소를 추가할 수 있다.
arr.splice(2, 1, 10, 11) // 배열의 인덱스2부터 하나만 지우고, 인덱스2부터 10, 11를 중간에 추가한다. 
// 만약에 배열 let arr1 = [1,2,3,4,5]가 있다면 여기다가 arr1.splice(2, 1, 10, 11) 을 한다면 [1,2,10,11,4,5] 이런 배열이 되는 것이다.

// 2가지 배열을 합해서 새로운 배열 하나 만들기
// concat() 함수를 이용하면 배열 2개를 합쳐서 새로운 배열 하나를 만들 수 있다.
const arr1 = [1,2,3]
const arr2 = [4,5,6]
const newArr = arr1.concat(arr2) 
console.log(newArr)  // [1,2,3,4,5,6]  가 된다.
// 주의할 점은 절대 데이터타입이 서로 다른 배열끼리 합치지 말라는 것과
// 배열을 합칠때 concat() 함수 가로 안에 있는 배열이 뒤로 붙어서 합쳐진다는 것이다.




// << 배열의 요소들에 대해 검색하는 함수들을 알아보자 >>
// 자주 쓰는 함수이므로 외우자
// indexOf() 함수는 배열의 요소를 통해 해당 요소의 인덱스를 반환하는 함수이다
const arr123 = [1,2,3,4,5]
console.log(indexOf(3))  // arr123 배열의 3요소에 대한 인덱스를 반환한다. 여기서는 2가 출력된다.
// 여기서 자주쓰는 방식은 이 indexOf() 함수는 배열에 없는 요소를 인자값으로 주면 -1를 반환하는데, 이점을 이용해서 -1이 반환되면 해당 요소가 배열에 없음을 알 수 있다.
console.log(indexOf(6)) // -1를 출력한다. 따라서 6은 해당 배열에 없는 요소이다.
// 또 한가지 주의할 점은 이 함수는 해당 요소를 배열의 첫번째 인덱스 부터 순서대로 찾는검색한다는 것이다. 
// 즉 만약에 배열에 [1,2,3,1] 이렇게 1이라는 요소가 중복되어 있다면 
console.log(arr123.indexOf(1)) // 1이 가장 첫번째 인덱스 0부터 나오기 때문에 바로 0을 출력해버린다. 
// 만약에 뒤에서 부터 검색을 하고 싶다면 lastIndexOf() 함수를 사용하면 된다.
console.log(arr123.lastIndexOf(1)) // 여기서는 3을 출력한다. 


// includes() 함수는 배열에 어떤 요소가 들어있는지 확인하는 함수로, 있으면 true, 없으면 false를 반환한다.
console.log(arr123.includes(2)) // 2라는 요소가 있으므로, true를 출력한다.
console.log(arr123.includes(6)) // 6라는 요소가 없으므로, false를 출력한다. 
// 앞에 indexOf()함수만을 이용해도 어떤 요소가 해당 배열에 있는지 없는지 알 수 있지만, includes() 함수를 사용하면 논리타입(true, false)으로 바로 나온다는 점이 특징이다.

