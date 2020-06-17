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
// <향상된 객체 리터럴>

// 객체 리터럴이란? : 자바스크립트에서는 객체를 만드는데 3가지 방법이 있다. 
// 1. 생성자 함수를 사용하여 만들기 (const cucuhama = new Cucuhama())
// 2. 객체 리터럴를 사용하여 만들기 (const )
// 3. 클래스 구문(ES6에서 새롭게 추가된)을 사용하여 만들기 



