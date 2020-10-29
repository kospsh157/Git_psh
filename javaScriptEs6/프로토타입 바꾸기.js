// ES5 에서는 Object.getPrototypeOf() 메서드를 추가해서 해당 객체의 프로토타입이 뭔지알아내는 메서드를 추가했으나
// 이로써는 부족해서 
// ES6 에서는 Object.setPorotypeOf() 메서드까지 추가한다.

/*  
    1. 원래 ES5때까지만 해도 주어진 객체의 프로토타입을 수정하는 일은 가정하지 않았다. 
        (일반적으로 객체의 Prototype은 객체가 생성될 때 생성자 또는 Object.create()메서드를 통해 지정됩니다. 
        인스턴스 생성후 객체의 Prototype이 변경되지 않는다는 생각은 ECMAScript 5까지 JavaScript 프로그래밍에서 
        가장 큰 가정 중 하나였습니다.)

    2. 따라서 get함수만 있었다.
    3. 하지만 이제는 그 가정이 깨지면서 set()함수로 추가시킨것이다.

    
*/


const person = {
    say(){
        console.log("I'm Human");
    }
}

const dog = {
    say(){
        console.log("Woof Woof!");
    }
}

const you = {
    name : "you"
}

// you의 프로토타입을 알아본다.
console.log(Object.getPrototypeOf(you));

// you의 프로토타입으로 person을 넣어본다.
console.log(Object.setPrototypeOf(you, person));

// you의 프로토타입으로 dog를 넣어본다. 
console.log(Object.setPrototypeOf(you, dog));

// you의 프로토타입과 dog를 비교해본다.
console.log(Object.getPrototypeOf(you) === dog); // 근데 객체 끼리 비교에서 이거는 의미가 없음
// 의미가 없다고 생각하면 안되고, 참조 관계가 맞으면 true가 나온다. 
// 따라서 여기서 true가 나온다는 의미는 you의프로토타입이 dog를 참조한다는 뜻이다. 

// 출력해보자
console.log(Object.getPrototypeOf(you));
console.log(dog);

// super 사용하기 
/*
    1. 간결한 메서드 : ES6에서 추가된 것으로,
    함수이름을 바로 쓰고 () 붙이면 그게 곧 메서드가 된느 것
    2. 명명된 함수프로퍼티 : ES5에서 쓰던 법으로 name : function() {} 과 같이 메서드를 정의하는 것
    3. suepr키워드는 일단 기본적으로 명명된 함수프로퍼티에서는 쓸 수 없다.
    오직 간결한 메서드에서만 사용한다. 

    super는 해당 객체의 프로토타입을 가르킨다. 
    따라서 Object.getPrototypeOf(this)가 너무 길어서 이를 대체하는 코드라고 생각하면된다.
*/


// 다음 코드를보자 
// 왜 Object.getPrototypeOf() 보다 super을써야하는지 설명하는 코드이다.
let person = {
    getGreeting() {
        return "Hello";
    }
};
// prototype is person
let friend = {
    getGreeting() {
        return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi!";
    }
};
Object.setPrototypeOf(friend, person);

// prototype is friend
let relative = Object.create(friend);

console.log(person.getGreeting());                  // "Hello"
console.log(friend.getGreeting());                  // "Hello, hi!"
console.log(relative.getGreeting());                // error!

// relative.getGreeing()이 에러가나는 이유는
/*
    1. 호출 순서를 생각해보자
    2. Object.getPrototypeOf(relative)가 실행되고
    3. 그는 곧 relative의프로토타입인 friend를 의미한다.
    4. friend.getGreeting().call(relative) 는 프로세스를 다시 시작하는 계기가되고 이것이 반복되어 
    스택 오버플로우가 일어날 때 까지 일어나다가 에러가 난다.
    5. friend.getGreeting().call(relative) 는 곧 relative의 getGreeting()를 호출하라는 뜻이다.
    그럼 다시 relative로 가서 그의 프로토타입인 friend로 가서 
    또 이걸 만나서 Object.getPrototypeOf(this).getGreeting.call(this) + ", hi!";
    무한 반복을 시작한다.
*/



// 이제 super() 키워드를 써보자 

let person = {
    getGreeting() {
        return "Hello";
    }
};
// prototype is person
let friend = {
    getGreeting() {
        return super.getGreeting() + ", hi!";
    }
};
Object.setPrototypeOf(friend, person);

// prototype is friend
let relative = Object.create(friend);

console.log(person.getGreeting());                  // "Hello"
console.log(friend.getGreeting());                  // "Hello, hi!"
console.log(relative.getGreeting());                // "Hello, hi!"


// super 참조는 동적이 아니기 때문에 항상 올바른 객체를 참조합니다. 
// 이 경우, super.getGreeting()은 얼마나 많은 다른 객체가 그 메서드를 상속 받았는지에 관계없이 
// 항상 person.getGreeting ()을 참조합니다.
// 쉽게 말해 프로토타입 채인닝이 일어날때, super는 항상 최초 원시격 조상인 프로토타입을 가르킨다. 
