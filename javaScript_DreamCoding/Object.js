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




