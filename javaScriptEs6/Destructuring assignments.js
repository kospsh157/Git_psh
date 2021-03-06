//비구조화

// 핵심은 익명할수를 쓰는 것과 같이,
// 객체나 배열의 이름을 정하지 않고 바로 그 구성원들만 선언하거나, 선언과 동시에 값을 할당할 수 있음

// 간략한 표현으로 객체에서 데이터를 추출 할 수 있다.

// es5 문법
// var myObj = {a:1, b:2}
// var a = myObj.a;
// var b = myObj.b;

// 위와 동일한 문법을 es6문법으로 간략하게 하자
var { a, b } = { a: 1, b: 2 }
console.log(a, b)

// 주의 할 점
var { first, second } = { a: 1, b: 2 }
console.log(first, second)
// 이렇게는 되지 않는다. 객체를 만들고 동시에 변수를 선언한다고 생각하면 이렇게 해도 될 것 같지만, 되지 않는다.
// var {}로 변수는 선언되었지만, 값이 들어가지 않았다. 그렇다는것은 반드시 뒤에 올 객체의 멤머필드와 이름이 같아야 한다는 뜻이다.

// 배열에서 비구조화 할당
let [a1, a2, ...rest_a] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(a1) // 1
console.log(a2) // 2
console.log(rest_a) // [3, 4, 5, 6, 7, 8, 9]

// 객체에서의 비구조화 할당 (무명의 객체를 만들어서 그 속의  맴버필드만 빠르게 선언하고 사용할 수 있음)
let { o1, o2, ...rest } = { o1: 10, o2: 20, o3: 30, o4: 40 }
console.log(o1)
console.log(o2)
console.log(rest)

// 키의 밸류 값에 변수를 지정하고 그 변수에 키값을 이용해 값을 할당하는 방법
let { key1: z1, key2: z2, key3: z3, ...rest_b } = {
  key1: 11,
  key2: 21,
}
console.log(z1)
console.log(z2)
// console.log(key1)  이같은 출력은 에러가 난다 왜냐면 무명으로 객체를 생성하고 그 멤버필드변수가 key1 이란 뜻인데 원래는 객체의 이름이 정의되어 있다면 문제 없지만 여기서는 문제가 된다.

let { abc: a, abc2: b, abc3: c } = {
  // 여기서 키값의 벨류값은 변수로 사용된다. 그 변수에 키값에 대응되는 값을 대입한다.
  abc: 99,
  abc2: 98,
  abc3: 97,
}
console.log(a) // 중요한 점은 서로 키값을 같게 하면 객체의 멤버 필드의 값을 수정하거나 정의 할 수 있다는 뜻이다 간단하게
