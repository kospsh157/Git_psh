// ES6 에서 추가된 함수들
// Object.is()
// Object.assign()


// 참고로 얕은복사와 깊은복사의 차이점은
// 얕은복사는 그냥 기본값 프로퍼티면 완전복사가 되지만
// 프로퍼티가 객체일 경우, 참조복사가된다는 점이다.
// 깊은복사는 말 그대로 모든 프로퍼티를 완전히 복사한다. 


// Object.is()
/*
    1. === , == 를 대신해서 쓸 수 있다. 
    2. 다른 점은, 위의 ===는 NaN === NaN 를 false 를 반환하다. 하지만 Object.is()는 true를 반환한다.
    3. 또한 +0, -0를 ===는 둘다 true라고 반환하지만 Object.is()는 false를 반환한다.
    (자바스크립트는 0에도 부호가 있다.)
*/ 


// 다만 이점을 알고 가야한다. 자바스크립트에서 객체끼리 비교할 때는 단순히 이렇게 해서는 안된다. 
// 둘은 문자적(리터럴)로 보기에는 같은 객체로 볼 수 있지만, 메모리 구조상에서는 다른 것으로 인식된다.
// 따라서 객체를 비교할 때는 Object.is() , ==, === 모두 써서는 안된다. 

const obj1 = {
    name : "psh1"
}

const obj2 = {
    name : "psh1"
}

console.log(obj1 === obj2);             //false
console.log(Object.is(obj1, obj2));     //false

// Assign() 함수 
// Object.assign() 함수는 어떤 첫번째 파라미터의 객체에다가 두 번째 파라미터의 객체의 속성을 복사한다.

const obj3 = {
    name : 'psh',
}

const obj4 = {
    name : 'psh2',

}
// 또한 자기가 복사한 결과물을 리턴한다.
console.log(Object.assign(obj3, obj4));


// assign() 함수는 얕은 복사만 가능하다. 일반적으로 객체를 복사하는 함수로 쓰인다.

// 또한 assign( obj1, obj2, obj3, obj4 ... ) 이런식으로 첫번째 파라미터에 나머지 파라미터로
// 오는 모든 객체들을 병합해서 집어넣는 기능을 한다.
// 주의할 점은 속성명이 같다면 나중에 오는 것으로 계속 대체되서 저장된다. 
// 또한 주의할 점은 접근자 프로퍼티 (setter, getter함수) 가 객체에 포함되어 있다면, 
// 조심해야할 부분이 있다. assign()함수는 대입연산자를 사용해서 프로퍼티를 복사하기 때문에 
// 겟터 함수 자체가 복사되는 것이 아니라, 겟터함수가 리턴하는 데이터를 복사한다. 
// 따라서 그 부분을 유의하면서 사용해야한다. 


// Mixin 는 특정 함수가 아니라 디자인패턴이다.
// 상속을 다하기 싫고 일부의 기능만 짜집기로 이곳저곳에서 기능을 가지고 오고 싶을 때
// 이 믹스인 패턴을 이용해서 필요한 기능만 정의하고 나중에 필요한 기능만 다시 짜집기 해서 받는 것이다.
// 이 믹스인 패턴을 사용할 때 병합하는 과정에서 assign()함수를 자주 쓴다.

