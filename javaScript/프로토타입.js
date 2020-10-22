// 프로토타입 개념 

// 모든 자바스크립트 객체에는 숨겨져있는 기본 프로퍼티가 있다. 
// 그 중에 하나가 바로 [[Prototype]] 프로퍼티이다.
// 실제로는 숨김 프로퍼티로 있는데 찾을려고 하면 __proto__ 밖에 안보일 것
// 던더프로토는 이 [[Prototype]]을 그대로 상속받은 프로퍼티임

// 일반적으로 이 [[Prototype]]에 접근 할 수 있으나 그냥은 못하고 따로 내장 함수들을 이용해야하는데
// 지금 그거 까지 꺼내서 하자면 설명이 너무 길어지므로 간단하게 접근할 수 있는 던더프로토를 이용하겠다. 
// 원래는 던더프로토는 사용을 지양하라는게 자바스크립트의 공식 입장이다. 



// 어디 진짜로 있나 확인해보자
const name = "이름";
const old = '나이';
const obj = {
    name,
    old,
}

// obj.[[Prototype]]   //  없음  (문법 오류가 남)
obj.__proto__       //  있음 

// Prototype 객체에는 내장함수들이 들어있거나, 추가적으로 사용자가 임의 프로퍼티나 함수를 만들어서 넣을 수 있다.

// 자바스크립트 컴파일러는 기본적으로 어떤 객체 안에 프로퍼티를 찾았는데, 없다면, 그 객체의 Prototype에서 찾는다.
// (그래서 우리가 쓰는 자바스크립트의 내장함수들은 그래서 다 Prototype에 정의되어 있다. 우리는 그것을 불러다 쓰는 것이다.)

// 프로토타입을 이용해서 객체간에 상속을 할 수 있다. 
const person = {
    name : "psh",
    old : "32",
    sayHello() {
        console.log("Hello");
    }
}

const someUser = {
    __proto__ : Person,
    name : "psh2",
    old : "30",
}

// __proto__ 은 던더 프로토라고 하며, 위에서 설명한 [[Prototype]]을 참조하므로, 똑같다고 할 수 있다. 
// 던더 프로토에 관련해서는 좀 더 공부하자면 할것이 많다. 일단 던더프로토를 활용하여 프로토타입을 조작하자.

// 위에서 보면 상속을 someUser의 프로토타입에 person 객체를 넣었다. 
// 자바스크립트는 이런 방식으로 상속을 한다. 
// 추후에 설명할 기회가 있으면 포스팅을 하겠지만 자바스크립트에서도 자바처럽 extends 구문을 써서 클래스간 상속이 가능하게 이는 문법만 그냥
// 편리하게 추가된 것일뿐, 기본 동작은 프로토타입의 상속을 통해 이루어진다.

// 이렇게 자바스크립트는 상속을 프로토타입의 상속으로 이루어지기 때문에, 함부로 프로토타입을 수정하면 안된다.
// 프로토타입은 항상 상속한다는 가능성을 두고 최소화, 경량화가 기본적으로 깔려있다. 





// obj 프로토타입 
let obj = {};
alert( obj ); // "[object Object]" ?

// 여기서 obj의 prototype 프로퍼티가 무엇인지? 






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
console.log(func1.__proto__ === func2.__proto__);   //true  왜 true 가 나오는지 모르겠다. 











