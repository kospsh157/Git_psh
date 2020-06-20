// << let과 const >>

// 다른 언어에서 읽기 전용 변수와는 내부적으로 차이가 있음. 그러나 기능은 같음.
// 여기서는 내부적인 그 차이를 알고 가는게 포인트
// 할당된 값이 상수가 된다는 것이 아니라, 바인딩된 값이 상수가 된다.
// 여기서 보충 설명 필요함 

const x = {};
x.name = 'cucuhama';  // 오류가 발생하지 않음 당연히 되는 코드임
x = 'abc' // 오류 발생

// 실제 값이 변경되지만 변수와 객체 사이의 바인딩은 변경되지 않으므로, 이 코드는 오류를 발생하지 않는다. 
// 반대로 전체 변수를 재할당하면 변수와 값 사이의 바인딩이 변경되어 오류가 발생한다.
 
/*
 자바스크립트가 객체를 메모리에 저장하는 방식설명 여기서 보충 설며 필요함
 */

 


// << 화살표함수 >>

// 롤백함수를 정의할 때 유용하게 쓰임
// 화살표함수 사용 예시
const a = [1,2,3,4,5]
const even = a.filter(function(x){   // filter() 메서드는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환합니다.
    return x%2 === 0;
})

// 위를 화살표 함수를 사용해서 재표현
const a = [1,2,3,4,5]
const even = a.filter(x => x%2 === 0); // 콜백함수를 이렇게 간단하게 축약해서 표현할 수 있다.

// 1. function을 더이상 쓰지 않아도 된다.
// 2. 함수의 인자가 하나의 경우는 가로를 쓰지 않아도되고, 함수 인자가 여러개인 경우 (a,b,c) 이렇게 가로로 묶어준다. (a,b,c) => {}
// 3. 함수의 본문이 한줄인 경우에는 중괄호를 생략 가능하다. 단 한줄이 넘어가면 중괄호를 반드시 사용한다.
// 4. return도 한줄인 경우에는 생략가능하다. 하지만 두 줄 이상일 경우에는 반드시 사용한다. 

// 화살표함수는 어휘범위(lexical scope) 로 바인드 된다. 
// = 기존에는 this의 설계상 문제 때문에 바인딩을 이용해서 원하는 객체를 this로 가르키게 만들곤 했는데, 화살표 함수를 사용하면 그럴 필요가 없다. 

function cucuhama(name){
    this.name = name;
}

cucuhama.prototype.myname = function() {
    setTimeout(function cb() {    
        console.log('cucuhama name is' + this.name)  // 요기 요 this는 우리가 의도한 객체인 cucuhama를 가르키지않는다. 
    }, 500);   // 5초뒤에 콘솔로 문장을 출력한다.
}

const a = new cucuhama('Chul-Su')
a.myname(); // 여기서 this.name 은 Undefined가 나온다.   따라서 우리가 기대하던 cucuhama name is Chul-Su가 나오지 않는다.

//기존에는 이 문제를 bind를 사용해서 해결했다. 이 방식도 한 번 보자
cucuhama.prototype.myname = function() {
    setTimeout( (function cb() {    
        console.log('cucuhama name is' + this.name)   // 요 this는 이제 cucuhama를 가르킨다.
    }).bind(this), 500);   // bind를 써서 this를 cucuhama를 가르키게 강제했다.
}

// 이제 이것은 화살표 함수를 써서 더 간단하게 bind의 도움없이 재작성해보자 
// 화삼표 함수를 사용하면, 어휘 범위에 바인딩 되기 때문에 이제 this는 cucuhama를 가르키게된다. 
cucuhama.prototype.myname = function() {
    setTimeout( () => console.log('cucuhama name is' + this.name), 500)
}


// << 클래스 구문 >>
// 자바스크립트는 다른 객체언어들 처럼 완벽하게 고안된 언어가 아니다.(지금의 자바스크립트는 많은 문제를 해결했다.특히 ES6 이후에)
// 다른 객체언어에서는 클래스를 명확하게 다루고 있지만, 자바스크립트는 아니다. 
// 그래서 문법상으로 클래스를 선언하고 다를수 있는 구문을 추가했다.
// 하지만 내부적으로 자바스크립트가 클래스에 대해 작동하는 방식은 같다. 단지 사용하기 편하고 보기 좋게 구문이 추가되었을 뿐이다.
// 자바스크립트는 여전히 클래스를 거치지 않고 그 프로토타입을 통해 프로퍼티와 함수들을 상속한다.

// 기존에 프로토타입 기반의 클래스 형태를 보자 
// 기존의 자바스크립트는 클래스를 따로 선언하는 구문이 없었기 때문에 함수로서 그것을 대신했다. 
function Cucuhama(name, age) { // 여기서 Cucuhama라는 함수를 정의한것지만 이것은 생성자로 나중에 객체로 만들 것을 염두하고 만든 함수이다.
    this.name = name           // 따라서 이런 함수를 정의할 때는 관례적으로 맨 앞의 문자를 대문자로 한다. 
    this.age = age
}

Cucuhama.prototype.getName = function(){
    return this.name
}

// 이제 ES6에서 새롭게 추가된 클래스구문으로 사용해서 클래스를 만들어보자 
class Cucuhama {
    constructor (name, age){
        this.name = name
        this.age = age
    }

    getInfo() {
        return this.name + this.age
    }
}
// 자바를 공부했던 사람이라면 이러한 모습이 훨신 반가울 것이다.
// 클래스에 대한 생성자를 볼 수 있고, 프로토타입 안에 기술하지 않아도 된다.(하지만 내부적으로는 프로트타입안에 들어가있다. 돌아가는 구조는 기존과 같다.)
// 다시 말하지만, 단지 구문만 사용하기 쉽게 추가되었을 뿐이다. 

// 또 한가지 중요한 점은 이제 이 클래스를 자바에서 처럼 상속키워드를 사용해 상속할 수 있다는 것이다.
class Cucuhama_nextVesion extends Cucuhama {
    constructor (name, age, location){
        super (name, age)  // super 키워드를 사용하여 부모 클래스 생성자를 호출한다.
        this.location = location
    }

    getInfo() {    // 상속한 getInfo를 오버라이딩 했다.
        return this.name + this.age + this.location
    }
}


// 여기서 한템포 쉬고 가자 다음에 이어질 자바스크립트의 객체 생성에 대해서 먼저 이야기하고 그 다음에 위에 내용을 보여주는게 더 좋을 듯 하다. 
// << 향상된 객체 리터럴 >>

// 객체 리터럴이란? : 자바스크립트에서는 객체를 만드는데 3가지 방법이 있다. 
// 1. 생성자 함수를 사용하여 만들기 (const cucuhama = new Cucuhama())
// 2. 객체 리터럴를 사용하여 만들기 (const  )
// 3. 클래스 구문(ES6에서 새롭게 추가된)을 사용하여 만들기 

// 먼저 객체 리터럴 기본 사용법을 배우자 
// 객체 리터럴 방식으로 객체 생성하기
const obj2 = {
    a : 1,
    b : 2,
    'c' : 3,   // 이런식으로도 가능
    func : function() {   //메서드 프로퍼티 작성
        return this.a + this.b + this.c
    }
}

console.log(obj2.a)
console.log(obj2['c'])
console.log(obj2.func());  // obj.func 만쓰면 그냥 함수의 구조를 출력함

// 프로퍼티 삭제
delete obj1.a
console.log(obj2) // {a: 1, b: 2, c: 3, func: ƒ}

// 객체 안에 찾고자하는 프로퍼티 확인하는 방법
obj2.d = 4 // 새로운 프로퍼티 선언하고 값 할당
console.log('d' in obj2) // true 해당 프로퍼티 없으면 false 반환


// << 이어서 향상된 객체 리터럴 표현법들 >> 
// 변수 및 함수를 객체의 멤버로 지정하고, 동적인 멤버명을 정의할 수 있다.
// 또한 편리한 setter, getter 함수들을 제공한다.

// 여러가지 모듈을 export 하는 객체를 만들어보자 
module.exports = {
    square(x) { 
        return x * x
    },
    cube(x) {
        return x * x * x
    }
}
// square, cube 함수를 export하는 모듈을 만들었다.

// setter, getter 구문을 사용하는 방법 
const person = {
    name : 'chul-su',
    old : 30,

    get info() {   // getter info 정의  // 여기서 function 키워드를 사용하지 않고 함수를 정의한것에 주목, 이 점이 바뀐점이다.
        return this.name + this.old
    },
    // info 로 함수 이름은 같지만, 파라미터값의 갯수가 달라서 오버로딩으로 함수를 여러개 정의한다. 

    set info(nameANDold) { 
        let temp = nameANDold.split(and);
        this.name = temp[0],
        this.old = temp[1]
    }
}

// 위에서 주의할 점은 겟터 셋터는 함수가 아니라는 뜻이다.  따라서 이렇게 함수 호출하듯 하면 에러가 난다.
person.info() // 이렇게 하면 함수가 아니기 때문에 오류가 발생한다.
person.info // 이렇게 변수사용하듯 써야한다.

console.log(person.info) // info를 겟터로 사용 
console.log(person.info = 'psh and 40') // info를 셋터로 사용

// 또 한 가지 주의할 점은 위에서 셋터함수를 사용하면 다시 바로 겟터함수의 리턴이 출력된다. 
console.log(person.info = "psh and 40")  // 셋터가 적용되고, 겟터가 작동되어서 psh40 출력됨

// << map 과 set 컬렉션 >>
// 새롭게 map 프로토타입이 도입됨.
const cars = new Map();
cars.set('avante', 'tivoly')

// map의 기본 사용법 부터 익히자

// map 선언하고 데이터 넣고 출력하고 삭제하기 
const testMap = new Map();
testMap.set('1', 1)    // 객체의 키는 문자열밖에 안되지만, 맵의 가장 큰 특징은 키로서 다양한 타입을 가질 수 있다는 점이다. 
testMap.set(1, 123)    // 정수 타입을 키로 가진다. 

testMap.get('1')       //  1 출력
testMap.get(1)         //  123  출력

testMap.delete(1)      //  데이터 삭제

testMap.size           // 맵의 데이터 갯수 반환 ** 함수가 아니라는 점을 유의한다. **
testMap.has('1')       // 해당 키가 데이터로 있는지 물어본다 . 반환값은 true/false 로 한다. 

testMap.clear()        // 해당 맵의 모든 데이터를 삭제한다. 

testMap.keys()          // 해당 맵의 모든 키를 리스트(= 반복 가능한 이터러블)로 반환한다. iterable
testMap.values()        // 해당 맵의 모든 값을 리스트(= 반복 가능한 이터러블)로 반환한다.  
testMap.entries()       // 해당 맵의 모든 키와 값을 리스트(= 반복 가능한 이터러블)로 반환한다. 

// 맵의 체이닝
// testMap.set을 호출할 때마다 맵 자신이 반환됩니다. 이를 이용하면 testMap.set을 '체이닝(chaining)'할 수 있다.
testMap.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
// 체이닝 문법을 이용해 이렇게 한번에 여러개를 추가를 할 수도 있다. 

// ** 맵은 키의 데이터 타입으로 아무거나 올 수 있기 때문에 키로 함수를 지정할 수도 있다 ** 
const test1 = new Map();
test1.set( () => 2*2, 4) // 함수를 키로 넣고, 그에 대한 리턴값을 예측해서 값으로 넣었다.
test1.set( () => 2*2*2, 8) 

test1.entries() // map iterator [[function => 4], [function => 8]] 출력
test1.values()  // map iterator [4, 8] 출력
// 이렇게 반복문을 돌려서 사용 한다.
for (const entry of test1){
    console.log((entry[0] === entry[1] ? 'PASS' : 'FAIL'))  
    // 첫번째 entry에서 함수 결과값이랑 그 함수오 매칭된 벨류값이랑 같으면 PASS 출력
}


// << Set 프로토타입 >> 
// set과 map의 차이는 set은 순서가 없고 대신 자동 중복검사를 한다. (중복이 안된다는 뜻)
// map은 set과는 달리 순서가 있고, 데이터형식이 좀 다르다 키 : 벨류 이렇게 매칭되서 저장된다는 점  set은 순서가 없는 배열이라고 생각하면 쉽다.
// set도 요소로 객체와 함수를 가지고 있을 수 있다. 

// set 기본 사용법 
const testSet = new Set();
testSet.add(1).add("1") // 맵에서 set대신 add를 쓴다.
console.log(testSet)  // {1, "1"}

testSet.has(1); // true

// 주의 할 점은 set은 순서도 없고 맵 처럼 키값이 있는게 아니므로, 그냥 특정 값을 알고 있지 않는한 뽑지 못하고 걍 반복문을 이용하거나 has를 이용한다.
for ( let a of testSet){
    console.log(a)
} // 이렇게 반복문을 사용해 하나씩 접근 가능하고 한번에 출력할려면 걍 console.log(testSet) 하면 된다. 리스트나 배열처럼 사용하면 된다.


// << WeakMap 및 WeakSet 컬렉션 >>
// 윅맵의 특징
/*
    1. 키는 무조건 객체로만 가질 수 있다.
    2. 요소가 iterable이 아니라 , 반복문으로 해서 전체를 조회할 수 없다.
    3. 윅맵이 탄생된 이유인데, 키로 사용된 객체가 다른데서는 이제 안쓰이고 WeakMap에서만 쓰일때, GC(가비지 컬렉트)대상이 된다.

*/

let obj = {}
const map = new WeakMap();
map.set(obj, {key: "some_value"})
console.log(map.get(obj)) // {key: "some_value"} 출력
console.log(map.has(obj)) // true 출력
obj = null // 객체를 지워버림
console.log(map.has(obj)) // 해당값 존재하지 않음. false 출력 

// WeakMap은 메모리관리를 위해 사용해야할 경우가 생길때가 있음 그때 사용하면 됨.
// WeakSet도 존재하며 마찬가지로 set처럼 사용하되, 객체만 요소로 올 수 있으며, 참조하는 곳이 없으면 WeakSet에서도 사라진다.

// << Template 표기법 >> 
// 좀 더 강력한 문자열 표기법인데, 기존에 문자열은 그냥 '' "" 으로 표현햇는데 이제 ``로 감싸주면 더 강력한 템플릿 표기법으로 문자열을 표기할 수 있다.
/*
    1. `는 역따음표 백쿼드 라고 한다.
    2. `${val}는 ${val2}이다` >>> 이렇게 변수를 문자열안에 집어 넣어서 같이 표현 할 수 있는게 최대 장점이다.
        1. ${list.join(',')} 이런식으로 
    3. 맥에서는 백쿼드를 쓰려면 영어 상태여야 한다 한글상태에서는 원화가 표기된다.  
*/






















