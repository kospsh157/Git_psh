// 제너릭 타입에 제약을 부여 할 수 있는 법을 배우자.
// 다음은 왜 제너릭 타입에 타입제약을 걸어야 하는지를 알려주는 예시이다.

interface Employee {
    pay(): void;

}

class FullTimeEmployee implements Employee {
    pay() {
        console.log(`full time!!`);

    }
    workFullTime(){

    }
}

class PartTimeEmployee implements Employee {
    pay() {
        console.log(`pay time!!`);
    }
    workPartTime(){

    }
}

// 직원에게 월급을 주는 함수
// 사실 이런 함수는 굉장히 나쁜 함수이다. 
// 인자로 인터페이스를 받는 건 좋은데, 리턴도 다시 인터페이스로 하는 함수는 나중에 많은 문제를 야기할 수 있다.
function pay(employee: Employee): Employee {
    employee.pay();
    return employee;
}


const ellie = new FullTimeEmployee();
const bob = new PartTimeEmployee();
ellie.workFullTime();
bob.workPartTime();

const ellieAfterPay = pay(ellie);
const bobAfterPay = pay(bob);

// 여기서다시 pay() 함수를 통해 반환된,직원 인스턴스를 쓸려고하면, 인터페이스 타입이기 때문에,
// 구현 클래스에서 있는 자원을 쓸 수 없는 문제가 발생한다.
// 강제 케스팅으로 이 문제를 해결 할 순 있지만, 강제 케스팅은 업계에서 쓰면 안되는 불문율이 있다.

// 강제 케스팅으로 해결하기
const ellieAfterPay2 = pay(ellie) as FullTimeEmployee;
ellieAfterPay2.workFullTime(); // 구현 클래스로 강제 캐스팅했기 때문에 구현 클래스 자원 사용 가능

// 그렇다면 어떻게 pay()함수를 만들어야 할까?
// 위의 pay()함수를 제너릭을 이용해서 다시 만들어보자.

function pay2<T extends Employee>(employee: T): T {
    // 그냥 제너릭을 때려 박으면, employee 안에 pay()라는 함수가 없다. 
    // 제너릭 타입이기 때문에 아직 그 안에 pay()가 있는지 없는지 알 수 없기 때문이다.
    // 그럴때는 상속키워드를 이용해서 제너릭타입이긴 한데, Employee인터페이스를 상속하는 타입이다 라고 알려줘야 한다.    
    employee.pay();
    return employee;
    // 이렇게 하면, 무조건 아무 타입이나 다 들어갈 수 있는 것이 아니라, Employee를 구현하는 클래스 타입만
    // 들어갈 수 있다.

}

const newPayedEllie = pay2(ellie);
// 이제는 fullTime()함수를 사용할 수 있다!
newPayedEllie.workFullTime();


// 결론
// 첫번째로 일어난 문제는 
// 인터페이스로 받고 인터페이스로 다시 리턴하면, 그 리턴 받은 인스턴스로는 
// 구현클래스마다 각기 다른 자원을 사용할 수 없다는 문제가 있었다.

// 그에 대한 해결법으로 제너릭으로 받고, 다시 제너릭으로 리턴하면, 해당 구현 클래스가 가진 자원을 사용할 수 있을 것이다.
// 그러나 두번째 문제가 생기는데,
// 제너릭 타입으로 받으면, 해당 타입에 어떤 자원이 있는지 전혀 모르는 문제가 있다. 무엇이 올 지 모르기 때문이다. 
// 따라서 제너릭에도 제한을 걸어서 어느 인터페이스를 구현하는 타입만 올 수 있도록 한다.
// <T extends Interface> 이렇게 하면, 해당 인터페이스를 구현하는 클래스타입만 들어올 수 있다.


// 문제 1 : 다음과 같이 객체가 있고 getValue()함수를 써서 다음과 같은 결과를 얻을 수 있도록
// getValue()함수를 만들어라
const obj = {
    name: 'ellie',
    age: 20,

};

const obj2 = {
    animal: 'cat',

}

// 해당 함수는 첫번째 인자로 객체를 받고, 두 번째 인자로 프로퍼티명을 받아서 해당 객체의 해당 프로퍼티의 값을 리턴하는 
// 함수이다.
console.log(getValue(obj, 'name')); // ellie
console.log(getValue(obj, 'age'));  // 20
console.log(getValue(obj2, 'animal'));  // cat

// 나의 답 
function getValue(obj: Object, key: string):any{
    return obj[key];
}

// 제너릭을 사용한 강의에서의 답
// 여기에서는 새로운 키워드 keyof 에 대해서 알아야 한다.
// keyof [타입 or obj] 하면 어떤 타입이나 객체안의 프로퍼티(키)만 올 수 있다는 뜻이다.
// 따라서 <K extends keof T>를 하면 T타입 안에 있는 키만 K타입으로 갈 수 있다는 제약을 거는 것이다.

// 또 한가지 알아야할 점은 T[K] 형식의 키워드인데,
// 이는 T타입의 K키 들을 지칭하는 것이다. 
// 이는 반드시 K를 먼저 정의하는 부분이 선행되어야 쓸 수 있는 표현식이다.
// 제너릭을 정의할 때 K extends keyof T 라고 이미 K는 T의 프로퍼티, 즉 키임을 정의했기 때문에
// 다음과 같이 T[K]를 리턴 타입으로 표현 할 수 있는 것이다.
function getValue2<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

// 핵심 포인트는 함수 다음에 오는 <> 안에는 먼저 제너릭을 정의하고
// 그 다음에 오는 파라미터와 리턴 타입에는 앞에서 정의한 제너릭 타입을 정직하게, 
// 그냥 존재하는 타입처럼 쓰면 된다는 것이다.