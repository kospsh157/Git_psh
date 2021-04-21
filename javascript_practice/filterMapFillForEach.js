// arrays
const arr1 = [
    {name: 'psh', phone: '0100', old: 32},
    {name: 'psh', phone: '0101', old: 32},
    {name: 'psh2', phone: '0102', old: 32},
    {name: 'psh3', phone: '0103', old: 32},
    {name: 'psh4', phone: '0104', old: 32},
    {phone: '0104', old: 32},
]
const arr2 = [
    {name: 'psh', phone: '0100', old: 33},
    {name: 'psh', phone: '0101', old: 33},
    {name: 'psh2', phone: '0102', old: 33},
    {name: 'psh3', phone: '0103', old: 33},
    {phone: '0104', old: 33},
]
const arr3 = [
    {name: 'psh', phone: '0100', old: 31},
    {name: 'psh', phone: '0101', old: 31},
    {name: 'psh2', phone: '0102', old: 31},
    {name: 'psh3', phone: '0103', old: 31},
    {name: 'psh4', phone: '0104', old: 31},
]

// 기본 설명
/*
    1. 우선 콜백 함수에 들어가는 형태에 대해서이다.
        1. map( item => item );
        2. map( (item, index) => item );
        3. map( (item) => {
            return item;
        });
        4. 위와 같이 return 키워드를 생략하려면, 한줄에 써야하며, { 중괄호도 생략해야 한다.}
        5. 반대로, return 키워드를 쓰고 싶다면, 반드시 중괄호를 쓰고, 한줄 내려서 써야한다.
*/

// filter
console.log(arr1);
const newArr1 = arr1.filter(item => item.name); // item요소가 name프로퍼티를 들고있는 것만 추려서 다시 배열을 만든다.
const newArr1_1 = arr1.filter(item => item.name = 'psh'); // item.name프로퍼티의 값을 모두 psh로 바꾼다. 없으면 추가한다.

console.log(newArr1);
console.log(arr1);
// 설명
/*
    1. 필터함수는 원본 배열을 침해할 수도, 그대로 유지할 수도 있다. 그리고 항상 배열을 리턴한다.
    2. 배열의 원소를 리턴구분으로 교체한다.
    3. 만약 리턴구분에서 어떤 새로운 요소를 추가하거나, 기존 요소의 값을 수정할 수 있다. 없는 것도 새로 추가 시킬수있다.
        1. 다만 이때는 원본배열을 침해한다.
    4. 배열의 원소 중에서 리턴구분에 있는 것이 포함 되어 있는 요소만 다시 모아서 배열을 만든다. 
        1. 단순히, 필터로 리턴구문에 있는 요소가 포함되어 있는 배열로 다시 만드는 작업은 원본배열을 침해하지 않는다.
    5. 원본 배열을 const 로 선언해도, filter의 원본배열 침해를 막을 수 없다.
        1. 이는 const가 단순히 '재할당'만을 막는 기능이기 때문이다.
        2. filter함수는 직접적으로 해당 원본 배열이 있는 메모리 공간의 값을 바꾼다.
        3. 따라서 filter함수를 쓰면 원본배열을 반드시 수정된다.
*/





// map
console.log(arr2);
const newArr2 = arr2.map((item) => {
    return item.name === 'psh' ? {...item, name :'newPsh'} : item
});
const newArr2_1 = arr2.map( item => item.name === 'psh' ? {name:'pshgogo', name1:'pshggo1'} : item);
// item 마다 확인해서 프로퍼티name값이 psh인 원소item은, 삼항연산자에 의해, true가 되는 값으로 대체된다. 여기서는 참이면
// item은 {name:'pshgogo', name1:'pshggo1'} 라는 원소로 대체되며, false일 경우에는 기존 값 item 그대로 수정된다.
console.log(newArr2);
console.log(arr2);
console.log(newArr2_1);
// 설명
/*
    1. map은 새로운 배열을 리턴한다.
    2. map은 어떤 경우에도 원본 배열을 침해하지 않는다.
    3. 리턴 구문에 있는 콜백함수로 원본 배열의 원소마다 실행한다.
    4. 만약 위와 같은 삼항연산자라면, 삼항연산자의 true값이 되는 부분으로 요소가 수정된다.
*/









// fill
// 배열을 선언할 때 주로 쓰인다. 
const array1 = [1, 2, 3, 4];

// fill with 0 from position 2 until position 4
console.log(array1.fill(0, 2, 4));  
// expected output: [1, 2, 0, 0]
// 주의할 점은  2번째 인자는 그냥 인덱스값으로 생각해도되지만, 
// 3번째 인자값은 원래배열 인덱스에서 -1한 인덱스라고 생각해야한다.
// 0, 2, 4 면 >> 2인덱스 부터 4-1인덱스까지 0으로 채워라 라는 뜻이다. 

// fill with 5 from position 1
console.log(array1.fill(5, 1));
// expected output: [1, 5, 5, 5]

console.log(array1.fill(6));
// expected output: [6, 6, 6, 6]

// 어떤 배열을 초기화할때 쓸 수 있지만, 최소 선언직후에는 쓰기가 좀 그렇다. 다음과 같은 이유에서이다.
const arr = [];
arr.fill(0, 0, 3);
console.log(arr);       // []
const arr_1 = [1,2,3];
arr_1.fill(0, 1, 3);
console.log(arr_1);     // [1, 0, 0]
                        // 또한 const로 선언해도 fill()함수에 의해 얼마든지 수정된다. 







// forEach
// 성능은 당연히 그냥 for문이 좋다. 단 배열에 있어서 다른것과 체이닝으로 메서드를 쓸 수 있기 때문에 쓰는 것이다.
console.log(arr3);
const newArr3 = arr3.forEach(item => {
    return item.name === 'psh' ? console.log('hi') : item.name = 'Oh my god';
});
console.log(arr3);
console.log(newArr3);   // undefined
// 설명
/*
    1. 새로운 배열을 반환하지 않는다. 원본배열을 이용한 반복문 기능만을 할 뿐이다.
    2. 원본배열의 원소 하나마다 콜백을 실행한다.
    3. 원본배열을 따로 건드리지 않는 이상 원본배열은 침해하지 않는다.
        1. 위의 예시같이 콜백 함수 안에, 원본배열을 건드릴게 있다면, const로 선언된 배열이든 뭐든 수정된다.
    4. forEach는 체이닝 기법을 통해 편한 체이닝 구문을 배워야 한다. 아니면 의미가 없다.
*/