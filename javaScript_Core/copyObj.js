// 얕은 복사와 깊은 복사의 차이점 
'use strict'
const lodash = require('./node_modules/lodash')


const obj = {
    a : 1,
    b : 2,
    c : [1,2,3,4,5]
}

const copyObj = function(obj){
    let newObj = {}
    for(let prop in obj){
        newObj[prop] = obj[prop]
    }
    return newObj;
}

let newObj1 = copyObj(obj)

console.log(newObj1)  // 얕은 복사 실행 

newObj1.a = 10;  // 얕은 복사로 복사한 프로퍼티 수정 

console.log(newObj1)
console.log(obj) // 원본과 비교  // 얕은 복사도 단순 변수 프로퍼티 수정은 원본에 영향을 미치지 않음

newObj1.c[0] = 99

console.log(newObj1)
console.log(obj)   // 객체의 프로퍼티가 객체(배열, 리스트, 객체) 라면, 복사본의 프로퍼티를 수정해도 원본의 프로퍼티가 같이 수정됨.
// 참조 복사가 되었기 때문 



// 객체의 배열이나 이중 객체까지 온전히 복사 하려면 깊은 복사를 해야함
let deepCopyObj  = function(obj){
    let newObj = {}
    if(typeof obj === "object" && obj !== null){
        for(let prop in obj){
            newObj[prop] = deepCopyObj(obj[prop])
        }
    }else{
        newObj = obj
    }
    return newObj
}

let newObj2 = deepCopyObj(obj)
newObj2.c[0] = 110

console.log(newObj2)
console.log(obj)

// JSON 객체 이용하여 객체 복사하기 
let copyViaJson = function(obj){
    return JSON.parse(JSON.stringify(obj))
}


let newObj3 = copyViaJson(obj)

newObj3.c[0] = 1000; 

console.log(newObj3)
console.log(obj)


//  나머지 연산자 사용하기
let newObj4 = {...obj}

newObj4.c[0] = 1000121 

console.log(newObj4)
console.log(obj)   // 나머지 연산자를 이용하여 복사하는 것은 깊은 복사가 되지 않는다.


// 깊은 복사는 내부라이브러리를 쓰거나 
// JSON 라이브러리를 사용하거나 이다. 




// 라이브러리 함수 lodash 사용



let newObj5 = lodash.cloneDeep(obj) 

newObj5.c[0] = 9999999

console.log(newObj5)
console.log(obj)

//  결론 : lodash 라이브러리를 설치하여서 불러서  cloneDeep 함수를 이용하자 ! 