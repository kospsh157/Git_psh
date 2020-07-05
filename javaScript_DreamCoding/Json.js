'use strict'

// 1. object to JSON  
// 어떤 값이나 어떤 객체를 "JSON 문자열" 형태로 바꾸기
// (JSON은 문자열로 이루어진 데이타이다. 따라서 그냥 어떤 객체를 JSON데이타로 변환하는 것이라 생각하면된다.)
let json = JSON.stringify('어떤값 ')
console.log(json)
// JSON 문자열은 반드시 더블쿼터로 출력되어서 표시되는게 관례이다.
// 그래서 되도록 일반 문자열은 싱글쿼터를 쓰자.

// 객체를 JSON 문자열로 바꿔보자
 const rabbit = {
     name: 'tori',
     cololr : 'white',
     birthDate: new Date(),
     jump: ()=> {
         console.log(`${name} can jump`)
     }
 }

 let json1 = JSON.stringify(rabbit)
 // 주의할 점은 함수는 포함되지 않는다. 위의 jump 메소드는 제외된체 바뀌게된다.
 // 또한 symbol 같은 경우도 자바스크립트에서만 지원하는 이런 것도 제외된다.
 console.log(json1)

 // 두번째 인자 사용하기
 let json2 = JSON.stringify(rabbit, ['name'])
 // 위와 같이하면 rabbit 에서 name 프로퍼티만 변환해서 리턴한다.
 console.log(json2)

 // 콜백 함수 인자 사용하기
 // 여기서는 콜백함수를 이용해 특정 키 값의 value 를 다른 것으로 수정할 수 있다.
 // 주의할 점은 콜백의 리턴 후에, stringify 가 잡아서 변환한다는 것이다. 변환이 먼저가 아니다.
 // 그래서 변환 직전 데이터를 가공할 때 쓴다.
 let json3 = JSON.stringify(rabbit, (key, value)=>{
     console.log(`key: ${key}, value : ${value}`)
     // 콜백함수안에서는 아직 변환전이므로, 당연히 객체의 메소드도 적용이 된다.
     return key === 'name' ? 'psh' : value // 키값이 name 이면 강제로 psh 를 넣고 아니면 value 값 그대로 리턴
 })

 
// 2. JSON to Object
// json 데이타를 객체 타입으로 바꾸기
// json 데이터에는 함수는 포함되어있지 않다. 따라서 당연히 그런 JSON 데이타를 객체로 바꿔도 함수는 존재하지 않는다는점 주의

const obj = JSON.parse(json3)
console.log(obj)

// 주의할 점은 JSON 형태에서 오브젝트로 변환하게되면, 아무래도 문자열형태의 것을 객체화 한것이라, 원래 JSON으로 변환 되기 전에
// 객체에는 프로퍼티로 어떤 객체를 들고있었다면, 그 객체는 문자화되어서 그 기능을 상실하게 된다.
// 따라서 이런 객체의 기능을 상실하게된 문자열형태의 것을 다시 본래의 객체형태로 온전히 다시 바꾸려면 
// 콜백함수를 써야한다. 
// 위에서는 birthDate 가 그런 예라고 할 수 있다. 
rabbit.birthDate.getDate()  // JSON으로 바뀌기 전 본래의 객체에서 birthDate프로퍼티는 date 객체이다.
// 따라서 date객체가 지원하는 함수들을 사용할 수 있었지만, 다시 JSON으로 바꾼것을 객체화 시킨 obj는 객체의 기능을 상실한
// 문자열으로만 변화되기때문에 getDate()를 사용할 수 없다.

// 다음 콜백함수를 사용해서 객체의 기능을 잃지 않도록 해보자
const obj2 = JSON.parse(json3, (key, value)=>{
    console.log(`key: ${key}, value: ${value}`)
    return key === 'birthDate' ? new Date(value) : value
})
// 이 콜백함수는 프로퍼티들을 한번씩 순차적으로 도는데  만약 key값이 birthDate라는 것을 만나면 Date를 내가 생성해주는 것
// 만약 그렇지 않으면 그냥 value 값을 넣어서 그대로 parse함수에 넣어준다.
console.log(obj2)
console.log(obj2.birthDate.getDate()) 
// 이렇게 바뀐 obj2의 birthDate는 객체상태로 다시 정의 되었기 때문에 getDate()함수를 사용할 수 있다.





