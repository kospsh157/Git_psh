'use strict'

// << Object 를 만드는 방법 ( = 정의된 클래스로 인스턴스를 민드는 방법)>> 
// 1. 리터럴 방식  {} 안에 직접 데이터 때려박기
// 2. 생성자 방식  new 키워드 사용

// 자바스크립트의 특이점 
// 이미 만들어진 오브젝트에 한하여, 새로운 프로퍼티를 추가할 수 있음.
const test = {name : 'psh', age : 32}
print(test)  // 객체 정보 모두 출력 
test.hasJob = false // 뒤 늦게 새로운 프로퍼티 삽입

// 또 뒤 늦게 어떤 프로퍼티를 지울수도 있음.
delete test.hasJob // 프로퍼티 사라짐 

// 오브젝트는 키와 벨류의 집합체이다. 그리고 객체의 키는 무조건 다 스트링타입이다. 



// << 오브젝트의 프로퍼티 접근하는 방법 2가지 >>
// 1. test.name 
// 2. test['name']  // 이 방식은 computed properties 이라고 하는데 이 일반적으로 코딩하는 중에는 쓰지 않고 다음과 같은 경우에 사용한다.
function printTest(obj, key) { // 오브젝트와 그 키 값을 넣으면 해당 키의 벨류값을 출력하는 함수이다. 
    console.log(obj[key])      // 문제는 파라미터로 받는 key값이 뭔지 모르기 때문에 computed properties방식을 사용해야만한다.
}

printTest(test, 'name')        // 이렇게 하면 자연스럽게 key 자리에 스트링값인 'name'이 들어간다. 
printTest(test, 'age')         // 동적으로 키의 벨류값에 접근해야 할 때 사용한다.      


// << Property value shorthand >>
// 클래스는 같은데 반복해서 많은 오브젝트를 만들어야 하는 경우 
const person1 = {name : 'psh', age : 2}
const person2 = {name : 'psh1', age : 3} 
// 이런식으로 노가다 할 수 는 없으니 함수를 만들어서 오브젝트를 리턴시키자!
function makePerson(name, age){
    return {
        name : name,
        age : age
    }
}
// 근데 여기서 shorthand 란 바로 동일한 프러퍼티의 이름과 함수의 매개변수이름을 하나로 생략하는 것이다.
function makePerson(name, age){   
    return {
        name,
        age
    }
}
// 반드시 키 이름과 매개변수 이름이 같아야만 생략 가능하다.

// << 생성자 함수 >> 
// 위의 오브젝트를 만드는 함수는 사실 저렇게 쓰지 않는다. 저것의 생성자함수의 기초가되는 문법이고 실제로 코딩할 때는 생성자함수를 사용해서 오브젝트를 만든다.
function Person(name, age){  // 관례상 생성자함수의 첫글자는 대문자로 한다. 
    this.name = name,        // 그리고 프로퍼티에는 this를 붙여준다. 
    this.age = age
}


// << in operator : property existence check (key in obj)
console.log("name" in obj) // obj 객체에 name이라는 프로퍼티가 있는지 확인 있으면 true 반환


// << for ... in  vs   for ... of   >>
// for in 구문은 오브젝트의 키를 돌릴 경우 사용한다.
// for of 구문은 오브젝트가 아니라 이터러블(iterable) 즉 순서가 있는 리스트나 배열등을 반복할 때 사용한다.
for ( key in obj){
    console.log(key)
}

for (value of array){
    console.log(value)
}



//  << Cloning  오브젝트 복사>> 
// 예전 방법
const OriginObj = {a : 1, b : 2, c : 3}  // 원본 오브젝트
const CloneObj = {}                      // 복사 받을 껍데기 선언  이렇게 새로 객체를 선언하면 원본과 복사 객체가 독립적인 특성을 가진다. 
for (key in OriginObj){
    CloneObj[key] = OriginObj[key]     // 반복문으로 일일이 프로퍼티 하나하나 복사해서 생성하는 것이다. 
}

// 새로운 방법 Object.assign() 사용하기
// 자바스크립트 부모객체인 object 의 assign() 함수를 활용하면 복사가 더 쉽다.
const SourceObj1 = {a : 3, b : 2, c : 1}
const TargetObj1 = {}
Object.assign(TargetObj1, SourceObj1)   
// 이렇게 정직하게 써도 되고, 다음과 같이 써도 된다.
const TartgetObj2 = Object.assign({}, SourceObj1)

// 그리고 어싸인함수는 원본객체인 소스객체를 여러개를 파라미터에 추가할 수 있다. = 여러개의 객체를 하나의 객체에 모두 복사해버릴 수 있다.
const mixedObj = Object.assign({}, obj1, obj2)  
// 다만 주의할 점은 key 이름이 같은 프로퍼티가 겹칠 경우, 뒤에 있는 소스객체의 프로퍼티로 계속 덮어씌우기가 된다는 점이다.









 

