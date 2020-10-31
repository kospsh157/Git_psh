const arr = [10, 11, 12, 'foo'];
arr.pupu = "pupu";

const obj = {
    name  : 1,
    name1 : 2,
    name3 : 3,
}


// for in  : 배열의 키나 객체의 키(=속성명)에 대해서만 조회가 가능
for (let i in obj){
    console.log(i);     // arr 로 할 시 : 0,1,2,3,pupu
                        // obj 로 할 시 : name, name1, name3
    
}


console.log("구분선");

// for of   : 배열의 값에 대해서만 조회가 가능 (객체에 대해선 쓸 수 없음 )
for (let i of arr){
    console.log(i);     //10, 11, 12, foo
}


// for of는 [Symbol.iterator] 속성을 가지는 컬렉션 전용이다. 


// foreach 는 배열에만 사용할 수 있는 메서드이다. 파라미터로 콜백함수를 갖는다.
arr.forEach( (value) => {
    // 배열의 각각의 원소마다 해야할 일을 콜백함수에 적는다. 
    console.log(value);
})

// for of 주의점
/*
    1. 먼저 해당 컬랙션에 Symbol.iterator 가 존재해야한다.
    2. 인덱스를 출력하는게 아니라 인덱스에 해당되는 value값을 반복한다.
    3. 만약 Symbol.iterator 가 없는 객체나 컬랙션을 돌리면 없는 함수라고 나온다.
    4. 그냥 객체에 대해서는 in을 사용하고 배열에 대해서는 of 를 사용하자

*/


