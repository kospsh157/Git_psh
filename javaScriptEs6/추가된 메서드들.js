// ES6 에서 추가된 함수들
// Object.is()
// Object.assign()


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









