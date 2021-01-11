// 비구조화 할당 
/*
    1. 구조 분해 할당을 사용하면, 객체나 배열 일부를 쉽게 변수로 해제할 수 있다.


*/


const developer = {
    firstName : 'sungho',
    lastName : 'park',
    developer: true,
    age: 31,
}

const {firstName, lastName} = developer;
// developer에 안에 있는 firstName, lastName 을 뽑아서 같은 이름으롭 변수 선언하고 같은 값을 할당한다.
// 따라서 const firstName = developer.firstname;
// const lastName = developer.lastName;  을 생략하고 간단하게 코딩 할 수 있다.


// 만약 오브젝트의 key값과 다르게 변수를 선언하고 싶다면 이렇게 하면 된다.
const {firstName:name} = developer;
// const name = developer.firstName; 와 같다.

// 배열에 적용시켜보기 
// 객체에서는 key와 대응하지만 배열에서는 배열 순서대로 대응한다는 점을 기억
const numbers = [1,2,3,4,5];
const [one, two] = numbers;             // one = 1, two = 2

// ,을 사용하면 중간 인덱스를 건너 뛰고 분해 할당한다.
const [one, two,  ,  ,five] = numbers;  // one = 1, two = 2, five = 5


// React에서 사용하기
reactFunction = () => {
    const {name, email} = this.state;
    // state가 배열인지 객체인지는 몰라도 name, email 로 선언된 변수에 해당 값이 뽑아 담기게된다.
}

// stateless 함수형 컴포넌트에서도 자주 쓰인다.
const HelloWorld = (props) => {
    return <h1>{props.hello}</h1>;
}
// 위를 아래와 같이 매개변수를 분해해서 바로 대입한다.
const HelloWorld = ({hello}) => {
    return <h1>{hello}</h1>;
}