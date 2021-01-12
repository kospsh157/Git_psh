// 사실 es6 추가된 클래스문법은 편의를 의해 제공된 것이며, 프로토타입의 기능을 빌려서 한다. 
/*
    1. 때문에 클래스 문법을 사용한다는 것은 프로토타입의 기능을 사용한다는 것이다. 
    2. 다만 클래스 문법을 사용하면 굉장히 편하기 때문에 둘 다 알아야 한다 결국.
*/




// 기존에 프로토타입으로 객체를 정의
const Human = function(type){           // 생성자 함수 
    this.type = type || 'Human';
}

Human.isHuman = function(human){        // 스태틱 메서드
    return human instanceof Human;
}

Human.prototype.anyFunc = function(){   // 인스턴스 메서드
    alert("아무 함수 기능");
}
// 만약에 새로운 객체 Zero를 만들고 Human을 상속받는다고 치면 기존에는 이렇게 코드를 작성해야 한다.
var Zero = function(type, firstName, lastName){
    Human.apply(this, arguments);
    this.firstName = firstName;
    this.lastName = lastName;
}

Zero.prototype = Object.create(Human.prototype);        // 프로토타입을 상속받기 위해 human의 프로토타입을 객체로 만들어서 그대로 
                                                        // Zero의 프로토타입으로 추가
Zero.prototype.constructor = Zero;                      // Zero 생성자 함수에 Zero 생성자를 추가
Zero.prototype.sayName = function(){                    // sayName() 메서드 만들어서 추가 
    console.log(this.firstName, this.lastName);      
}

const oldZero = new Zero('Human', 'sungho', 'park');    // 새로운 객체를 zero를 이용하여 생성
Human.isHuman(oldZero);                                 // true




// class 문법을 사용해서 human을 정의하고 zero도 만들어서 human을 상속받아보자
class Human {
    constructor(type = 'human'){
        this.type = 'human';
    }

    static isHuman(type){
        return type instanceof Human;
    }

    anyFunc(){
        alert('아무 함수');
    }
}

class Zero extends Human {
    constructor(type, firstName, lastName){
        super(type);                                    // 이거 한 순간 human의 constructor 실행
        this.firstName = firstName;
        this.lastName = lastName;
    }

    sayName(){
        super.anyFunc();                                // 이거 한 순간 human의 anyFunc() 실행
        console.log(`fitstName : ${this.firstName} , lastName : ${this.lastName}`);
    }
}