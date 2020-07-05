// 얕은 복사
var copyObject = function(obj){
    let newObj = {}
    for (let prop in obj){
        newObj[prop] = obj[prop]
    }
    return newObj;
}

let arr = [1,2,3,4,5]
let obj1 = {name : "psh", old : 31, arr: arr}
let obj2 = {name : "psh1", old : 32}

let newObj1 = copyObject(obj1) 

console.log(newObj1) // 얕은 복사를 하고 newObj1에다 할당 
console.log(newObj1.arr) // 객체 안에 객체(배열) 확인


// 객체는 프로퍼티를 수정할 때 가변적이다. 
// 따라서 객체를 가변적이지 않게 할려면 규칙을 정하고 그 규칙을 지키면서 코딩을 해야한다. 

// 위는 얕은 복사를 이용한 복사이므로, 이중객체에 대해서는 참조복사만 된다.  
// 이를 확인하기 위해성 복사한 사본의 객체프로퍼티에 접근해서 해당 프로퍼티를 수정하면 원본의 프로퍼티도 똑같이 수정된다.
 
newObj1.arr.push(1111)
console.log("뭔데: " + newObj1.arr)
console.log("이게 원본 객체의 배열 : " + obj1.arr)
// 확인 결과 배열은 상관없이 독립적 복사가 되었음


// 그럼 2중 객체 실험 
let obj3 = { 
    name : "psh3",
    obj_obj : {
        name : "psh of psh",
        old : 33,
    }
}
//새로운 원본객체 확인
console.log("원본객체의 모습")
console.log(obj3);

//객체 복사 
let newObj3 = copyObject(obj3)

//복사한 객체의 프로퍼티 중 객체 프로터티 수정
newObj3.obj_obj = {
    new : "new",
    old : "numebr"
}


// 원본객체의 obj_obj 프로퍼티 확인
console.log("원본 객체의 프로퍼티")
console.log(obj3.obj_obj)
// 복사한 객체의 obj_obj 프로퍼티 확인 
console.log("복사한 객체의 프로퍼티")
console.log(newObj3.obj_obj)

// 확인한 결과 배열이든 객체들 그게 중요한게 아님 일단 프로퍼티가 수정되면 원본의 프로퍼티도 수정되는게 맞음 
// 단 위의 코드에서는 수정을 할 때 수정을 한게 아니라, 새로 값을 할당하는 거였음 "=" 로 표현하니깐 
// 2중 객체의 대한 프로퍼티하나만 수정하게되면 원본의 객체의 객체의 프로퍼티도 똑같이 수정됨이 확인됨. 
// 그러니깐 결론은 얕은 복사로는 완전히 독립적인 메모리 공간 할당이 되지 않음 
// 2번째 (원본 객체의 프로퍼티로서 있는 객체) 객체의 프로퍼티는 참조복사만 됨을 확인함

// 객체는 참조형으로 봐야한다. 원래 자바스크립트는 일단 전부다 불변값 형태이지만, 객체의 프로퍼티를 수정하게될 경우 가변적인 성질을 가지게된다.
// 정확히 말해서 어떤 객체의 프로퍼티가 객체형태인데 그 프로퍼티의 프로퍼티를 수정하게되면 불변적으로 새로 방을 파서 수정하는게 아니라,

// 1. 객체 타입을 단순 복사하면 참조복사가 이뤄진다.  (단순 복사 : let obj2 = obj1)
// 2. 원시타입을 단순 복사하면 새로 그냥 방을 파서 복사가 이뤄진다. 
// 3. 따라서 객체를 단순복사하게 되면 가변적인 성질을 갖게된다. (그냥 다시 선언하게되면 물론 독립적으로 메모리방을 가지게 된다.)
// 4. 그래서 객체를 복사할때는 상황에 맞게 얕은복사 / 깊은 복사를 해야하는데 사고를 방지하기 위해서 그냥 객체를 복사할때에는 
// 무조건 깊은 복사를 사용하자

// 5. 얕은 복사는 객체가 객체를 프로퍼티로 가지고 있을때 2중 객체에 대해서는 또 참조복사를 하기 때문에 가변적인 성질이 생긴다.
// 6. 따라서 객체를 프로퍼티로 가지고 있는 객체(다중 객체) 일 경우 반드시 깊은 복사를 해야 한다.





// < 얕은 복사 함수 > 
let copyObj = function(target) {
    let result = {};
    for ( let prop in target){
        result[prop] = target[prop]
    }
    return result
}

// < 깊은 복사 함수 >
let copyDeepObj = function(target){
    let result = {}
    if (typeof target === 'object' && target !== null){
        for (let prop in target){  // 객체형태면 일루 빠져서 재귀호출된다. 그리고 그 프로퍼티가 객체면 또 일루 빠짐...반복 
            result[prop] = copyDeepObj(target[prop])
        }
    }else{
        result = target  // 객체가 아니면 일루 와서 복사되어서 반환된다.
    }                    // 객체일 경우, 재귀호출이 되므로, 이 함수의 핵심은 객체를 까고 까서 객체의 프로퍼티가 
                         // 단순한 프로퍼티로 나올 때까지 오면 else 문으로 복사해서 반환하는 형태이다. 
    return result
}


// < 핵심 요약 >
// 정리를 하자면, 깊은 복사와 얕은 복사가 생긴 이유는 다중객체의 존재 때문이고, 
// 객체의 가변성은 단순복사에서 객체의 프로퍼티를 수정할 때 나타난다. 

// 재귀 호출 형태의 함수를 만들 때 고려해야할 점
// 1. 함수의 인자값으로 계속해서 주입 시킨다는 점을 고려 (특정 기준이 아닐때까지 계속 인자로 넣어서 까고깐다.)
// 2. 재귀호출을 할 때의 조건문 기준 

// 깊은 복사 
// 1) 깊은 복사 함수 만들어서 사용하기 (위의 재귀호출함수 사용)
// 2) JSON 문자열로 만들고 다시 JSON 객체로 만들어서 사용
    let copyObjViaJSON = function(){
        return JSON.parse(JSON.stringify(target));
    }
    //(단, 이방법은 객체안의 메소드까지는 복사 하지 못하므로 주로 웹서버에서 정보가 주고 받을 때 사용한다.)
// 3) 라이브러리 사용하기






 
