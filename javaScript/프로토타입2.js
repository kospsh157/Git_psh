// 잠깐 확인하고 넘어갈 것들 
// 모든 함수는 prototype 프로퍼티를 가지고 있다. 
// 모든 인스턴스는 __proto__ 프로퍼티를 가지고 있으며 이 프로퍼티는 생성자함수의 prototype 프로퍼티를 참조한다.

// 아무 함수 생성
function func1(){};
const func2 = function(){};

// 그 함수들의 프로퍼티 확인 
console.log(func1.__proto__);           // function(){native code}
console.log(func2.__proto__);           // function(){native code}

console.log(func1.prototype);           // {...}
console.log(func2.prototype);           // {...}

// 특이한 점
console.log(func1.prototype === func2.prototype);    //false
console.log(func1.__proto__ === func2.__proto__);    //true  왜 true 가 나오는지 모르겠다. 


// 그럼 서로 참조 관계이니깐 이건 같아야 한다.
const func1_instance = new func1();
const func2_instance = new func2(); 


// __proto__가  생성자의 prototype 를 참조하므로 둘은 서로 같다.
console.log(func1.prototype === func1_instance.__proto__);     //true
console.log(func2.prototype === func2_instance.__proto__);     //true


// 














