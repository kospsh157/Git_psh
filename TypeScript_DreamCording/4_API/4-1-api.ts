// 공식 문서를 적는 것 보다, 
// API 코드로 바로 가서 확인하는게 더 빠를 때가 있다. 
// 따라서 정의되어 있는 코드를 보면서 무엇을 위한 것인지 파악하는 것을 배워야한다.
// 여기서는 그런 연습을 하는 것이다.

// 커맨드를 누르고 클릭을 하면 정의되어있는 곳으로 간다. 

{
Array;          // 여기 커맨드를 누르고 들어가면 코딩이 쓰여저 있는 곳으로 갈 수 있다.
[1, 2].map      // 객체지향, 제너릭 개념을 배웠으므로, 이제 저 코드가 정의되어 있는 곳으로 가서 이해할 수 있을 것이다.


// 배열 every API 
type Student = {
    passed: boolean,
}
// every(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
// 위만 봐서는 뭔지 잘 모르겠다. 주석을 읽어야 이해가 된다.
// every함수는 주어진 배열 원소들을 하나씩 확인한다.
// 주어진 함수로,
// 그리고 처음으로 false처음으로 리턴할때, 함수가 종료된다. 
// 모든 원소가 predicate함수에 의해 모두 true가 나오면 every()함수도 true로 리턴한다.
const students: Student[] = [{passed: true}, {passed: true}, {passed: true}];
const result = students.every(student => {
    return student.passed;
});
console.log(result); // false 



// 유용한 타입 검사를 해주는 API들

// 어떤 객체 안에, 어떤 key가 있는지 없는지 확인하는 키워드 'in'
if( "swim" in pet) {
    pet.swim();
}

// 어떤 객체가 어떤 타입인지 강제하는 키워드
let fishPet = pet as Fish;  // pet은 무조건 Fish타입이다. (확실할때만 쓰는 것)
// 혹은 ! 로 할 수 있음







// 인자로 들어오는 어떤 값이 반드시 어떤 클래스를 상속해야 하는 타입이라면, 타입 검사기로서 every()함수를 쓸 수 있다.
// every<S extends T>(predicate: (value: T, index: number, array: T[]) => 
// value is S, thisArg?: any): this is S[];

// every() 함수는 
/*
    1. 인자로 콜백함수 하나를 갖는다.
    2. 그 콜백함수 인자가 총 3개로, value, index, array가 있다.
    3. 콜백함수의 리턴은 value is S의 boolean 값으로 나온다.
    4. 결국 every() 함수 리턴값은 this is S[], 즉, every함수가 붙은 앞의 배열이 S타입인지 아닌지 하나씩 검사하
    고 하나라도 false가 있으면 false를 리턴한다.
    5. 대체로 콜백함수에서 value 인자 하나만 쓴다. 다음 예제도 그렇다.

*/

// 사용자 타입 검사기 이런식으로 먼저 predicate함수를 작성해준다.
function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

// 사용예시 
class Animal {}
class Cat extends Animal {
    isCat: boolean = true;
}
class Dog extends Animal {
    isDog: boolean = true;
}
const animals: Animal[] = [new Cat(), new Cat(), new Dog()];
function isCat(animal: Animal): animal is Cat {
    return (animal as Cat).isCat !== undefined;
}

// 배열의 원소들이 어떤 객체인지 확인하고 싶다면 
// 해당 객체인지 아닌지를 parameter is Type 으로 반환하는 predicate함수를 먼저 만들고,
// 검사대상의배열.every<검사하고싶은타입>(predicate함수)를 하면 된다.
console.log(animals.every<Cat>(isCat));



}