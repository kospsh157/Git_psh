// 알아야 할 개념 4가지 
/*
1. 단축 속성명
2. 계산된 속성명     // 요2가지 덕분에 객체/배열을 생성하고 수정하는 코드가 쉬워짐 
 
3. 전개 연산자
4. 비구조화 할당     // 요2가지 덕분에 객체/배열에서 속성값을 꺼내고 쓰는게 쉬워임
*/

// 단축 속성명
/*
    1. 간편하게 새로운 객체를 만들 수 있다.
    const name = 'mike';
    const obj = {
        age:21, 
        name,         // 여기서 변수를 그냥썼는데 이렇게 되면 name : 'mike' 이렇게 쓰는 것과 똑같이 된다. 자동으로 변수명이 속성명이된다.
        getName() {return this.name;} // 함수를 속성값으로 적을때도, function이란 키워드가 필요없고 마찬가지로 속성명이 함수명과 동일시된다
    }

   
    
*/
   
const name = 'mike'
const obj = {
    age : 21,
    name,   // 이 부분은은 name 이 이미 mike 라는 값을 가지는 변수 이므로  name : 'mike' 와 같이 동작한다.
    getName(){console.log(this.name)}
}


//2. 콘솔 로그 출력시 단축 속성명 활용
const name = 'mike';
const age = 21;
console.log('name =', name, ', age=', age); // 귀찮
console.log({name, age}) // 간편!


// 계산된 속성명
/*
    1. 객체의 속성명을 동적으로 결정하기 위해 나온 문법이다.

*/

// 계산된 속성명 사용하지 않고 동적속성명 하기
const obj1 = function(keyName, value){
    const newObj = {}
    newObj[keyName] = value
    return newObj
}


// 계산된 속성명으로 간단하게 동적속성명 정하기
const obj2 = function(keyNmae, value){
    return {[keyName] : value} 
}


