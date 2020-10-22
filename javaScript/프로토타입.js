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


// 상속 채인닝
let head = {
    glassses : 1
  }
  
  
  let table = {
    pen:3,
    __proto___ : head
  }
  
  
  let bed = {
    sheet : 1,
    pillow : 2,
    __proto__ : table
  }
  
  
  let pockets = {
    money : 2000,
    __proto__ : bed
  }
  
  console.log(pockets.glasses);
  
  // 참고로 pockets.glasses나 head.glasses나 응답속도에는 차이가 없다
  // 또한 상속 관계에서 역참조는 불가능 하다
  // porkets.pen 은 가능하지만 table.money는 불가능하다는 소리이다.\


  // this 관련 문제
  let hamster = {
    stomach: [],
    eat(food){
      //this.stomach = [food]
      this.stomach.push(food);
    }
  }
  
  let speedy = {
    __proto__ : hamster
  }
  
  let lazy = {
    __proto__ : hamster
  }
  
  lazy.eat("apple");
  speedy.eat("pear");
  
  console.log(speedy.stomach);        //apple, pear
  console.log(lazy.stomach);          //apple, pear
  // speedy 가 먹은 것을 lazy도 가지고 있다. 이 점을 수정하려면
  // 2가지 방법이 있는데
  // 1. speedy, lazy 에게 각각 stomach 프로퍼티를 줘서 자바스크립트엔진이 프로토타입까지 찾지 않게 만들게 하는 것
  // 2. 프로토타입의 eat()함수에서 위에 주석친 부분으로 수정하는 것. 
  // 2번에 대해선 나도 잘 몰랐던 사실이다.
  /*
    2번 방법이 되는 이유는 
    this.stomach.push() 를 하면 stomach가 있다는 전제하에, 찾게되지만 (결국 못 찾아서 프로토타입껄로 쓰게됨)
    this.stomach = 을 하면 아예 각각의 객체에 stomach라는 프로퍼티를 선언해주는 것과 같기 때문이다. 
  */




// new 로 만든 객체의 프로토타입 넣어주기
let animal = {
    eats : true
}

function Rabbit(name){
    this.name = name;
}

Rabbit.prototype = animal           // 이 부분이 핵심으로, 객체.prototype = 프로토타입으로 넣어줄 객체 
                                    // 이렇게 하면 앞으로 new 로 만들어지는 이 Rabbit 타입의 객체는 모두 프로토타입으로 
                                    // animal을 갖게된다.


let rabbit = new Rabbit("white Rabbit");
let rabbit1 = new Rabbit("Red Rabbit");

console.log(rabbit.eats);
console.log(rabbit1.eats);
// 이는 반드시 new 키워드랑 같이 쓸 때 적용되는 방식이다.
// Rabbit은 생성자함수라는 걸 기억하라.
// 또한 자바스크립트의 모든 함수는 프로퍼티로 prototype를 갖는다.
// F.prototype 프로퍼티는 [[Prototype]] 과는 다르다. ?
// 생성자 함수를 사용하여 new 로 객체를 만들때에만 적용된다.
let uer = {
    name : "John",
    prototype: "Bla-bla"
}
// 위처럼 그냥 일반객체에 prototype 프로퍼티를 집어넣는것은 그냥 일반 프로퍼티을 선언 한 것 뿐이다.a

// 중요
// 이렇게 생성된 프로토타입에는 기본적으로 constructor 함수도 가지고 있으며, 이 함수는 이 객체의 생성자함수였던 Rabbit을 
// 기본값으로 가지고 있다. 
// F.prototype = { constructor: Rabbit} // 기본값임
// 근데 우리가 F.prototype = 다른 객체  를 하는 순간 위의 기본값인 자기자신의 생성자함수가 사라진다. 
// 따라서 이 방법을 쓸 때 constructor를 유지하려면 prototype를 덮어쓰지말고 
// Rabbit.prototype.jump = true  이런식으로 그 안에 새로운 프로퍼티를 또 만들어서 넣어주는 것이다.

 
 

// prototype 변경하기 문제
function Rabbit(){}

Rabbit.prototype = {
    eats : true
}

let rabbit = new Rabbit();


// 1. Rabbit.prototype = {};            // true
// 2. Rabbit.prototype.eats = false;    // false
console.log(rabbit.eats)                // true or false?

// 위의 차이는? 
/* 
    1. Rabbit.prototype에 무언가를 할당하면 그 값이 새로운 객체의 [[Prototype]]이 됩니다. 
    다만 이미 만들어진 객체엔 이 규칙이 적용되지 않습니다.
    2. Rabbit.prototype.eats 라는 프로퍼티는 이미 존재한다. 따라서 새로 선언한게 아니라, 기존에 있는 프로퍼티에 false를 대입한거다.
    따라서, 1번과는 경우가 다르다 
    그리고 rabbit이 먼저 만들어지고 그 다음에 Rabbit.prototype.eats 의 값을 바꿔도, rabbit이 참조하는 곳이 Rabbit.prototype 이기
    때문에, 그리고 그 객체가 변경되었기 때문에 rabbit인스턴스도 그 값을 따라간다. (참조하기 때문이다.)
*/



// 문제 : 객체에 작용하는가? 그 객체의 프로토타입에도 작용하는가?
function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

delete rabbit.eats;
// delete Rabbit.prototype.eats;

alert( rabbit.eats ); // 무엇이 출력될까? 

// 답은 true 
// 이유는 delete 연산은 객체에 직접 적용된다. 따라서 rabbit에 프로퍼티로 eats가 없다면 delete는 아무것도 하지 않느다.
// rabbit에만 기능이 가능하고 rabbit의 프로토타입에는 기능을 하지 못하는 것이다.

// 허나 위의 주석처럼 delete Rabbit.prototype.eats; 가 있다면, 말이 달라진다.
// delete Rabbit.prototype.eats;에서는 Rabbit의 프로토타입에서 eats 프로퍼티가 삭제되기 때문에 
// 결과적으로 undefined 가 나온다.





// 문제 : 동일한 생성자 함수로 객체 찍어내기

// 생성자 함수로 obj 객체를 하나 만들고, 이 객체의 생성자함수를 사용해 새로운 객체를 만들어야 할 때
// 코드로 직접 짜보자
// 힌트 : let obj2 = new obj.constructor(); 
// 추가로, 위 힌트에서 나온 코드가 동작하지 않도록 코드를 다시 짜보자

function Obj(name){
    this.name = name;
}

let obj = new Obj("psh");

console.dir(obj);

// Obj() 생성자 함수로 또 만들어도 되지만 이렇게 해도 된다.
let obj2 = new obj.constructor('psh2');     // 주의할점 : prototype 프로퍼티는 함수에만 있다. 객체에는 없다.

console.dir(obj2);          // psh2 = { name : "psh2" }
// 잘 나온다. Obj.prototype.constructor 를 따로 건들지 않는 이상 말이다.



// 참고로 생성자 함수로 객체를 생성하면 다음과 같은 일이 일어난다.
// 자바스크립트는 함수를 생성하면 자동으로 prototype프로퍼티를 준다. 
// 생성자 함수도 예외는 아니다.
function Rabbit(){}   // 이렇게만 해도 Rabbit.prototype 은 생긴다.
// 중요한 점은 기본값으로 
Rabbit.prototype = { constructor : Rabbit};  // 이렇게 만들어 진다는 점이다. 
 

// 그럼 다시 문제로 돌아가서 만약 누군가가 Obj.prototype 를 건들면 어떨까?
Obj.prototype = {}; // 이렇게 말이다.


// 저렇게 건들면 new obj.constructor 는 어떻게될까? 
/*
obj.constructor 는 갑자기 빈객체가 된다. 그 이유는 obj.constructor는 Obj.prototype.constructor를 참조하는데 
갑자기 {} 빈 객체가 되버렸기때문이다.

자바스크립트엔진은 obj.constructor에서 constructor를 찾는데, 없다. 없어서 obj의 프로토타입으로 가서 거기서 찾는다
그런데 obj의 프로토타입은 바로 Obj.prototype 이다.
그리고 지금 그곳은 {} 이다.
그리고 {}같은 객체를 일반객체라고 하는데, 일반객체의 프로토타입은? 바로 Object.prototype이다.
그리고 Object.prototype.constructor == Object 이다. 따라서 결국 obj 의 프로토타입은 그냥 Object가 되버리는 것이다.

결국 
let obj2 = new obj.constructor("obj2") 는 
let obj2 = new Object("obj2") 가 되버린다.

그런데 이 Object객체는 인수가 뭐가 들어오든 항상 빈 객체를 생성해준다.
따라서 obj2 = {} 와 같이 생성이 되고, 당연히 obj2.name = undefined 가 된다.

*/

// 위를 다시 코드를 풀어서 쓰면 

function User(name) {
    this.name = name;
}

  User.prototype = {}; // (*)
  
  let user = new User('John');
  let user2 = new user.constructor('Pete');
  
  alert( user2.name ); // undefined

// 프로트타입간 상속관계를 보면
// user2의 프로트타입 = User.prototype 이고 여기선 빈객체 {} 이다.
// 다시 빈객체는 일반객체이고 일반객체의 프로토타입은 = Object.prototype 이다.

// 프로트타입 상속관게를 보면이렇다.
user2 -> User.prototype -> Object.prototype (Object.prototype.constructor == Object) 
// 따라서 user2의 constructor를 찾는 자바스크립트 엔진의 모험은 Object까지 올라오게 된다. 
// 해당 객체에 프로퍼티가 없으면 그 객체의 프로토타입으로 가서 찾는 특징 때문에 이렇게 되는 것이다. 




// <<정리>>

function Rabbit(){}
// 생성자 함수의 prototype의 constructor는 스스로인 Rabbit을 가리킨다.
console.log(Rabbit.prototype.constructor === Rabbit)
// 모든 함수에는 prototype 프로퍼티가 있다.
// 그런데 new 로 생성자함수를 이용해서 인스턴스를 만들면
const rabbit = new Rabbit();
// rabbit과 같은 인스턴스에서느 __proto__가 자동으로 생기며
// 이는 생성자함수의 prototype을 참조한다.
console.log(rabbit.__proto__ === Rabbit.prototype);
// 마찬가지로 rabbit은 prototype의 constructor함수도 상속받는다.
console.log(rabbit.constructor === Rabbit.prototype.constructor)
// 주의할 점은 Rabbit의 prototype를 수정하면 constructor가 사라진다.







// F.prototype = 을 수정하지 않으면 
// 기본 constructor 함수를 인스턴스들도 상속을 받으므로, 다음과 같은 코딩이 가능하다
function func1(){ 
  this.name = 'psh'
}
let a = new func1();

// func1.prototype = {}
const b = new a.constructor();
console.log(a);





// 중복 선언은 허용되지 않는다 그런데 for문안의 const t 는 따지고 보면 중복 선언이 되는 것인데 잘 돌아간다. 무슨일일까?
const inputs = [0, 1, 5,3,2,6,4,2,6,34,2,2];
let n = inputs.length
for (let i = 0; i < n; i++) {
    const t = parseInt(inputs[i]); 
    console.log(t);
}


const a = 10;
const a = 11;
