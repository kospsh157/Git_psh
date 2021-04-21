// 쿠키 형태의 헤더가 왔을 때 처리하는 함수 만들기
// 쿠기는 쿠키이름1=쿠키내용1; 쿠키이름2=쿠키내용2; ... 이런 식으로 나열 되어 헤더에 담겨 전달된다.
// 따라서 위의 구조대로 분리시켜야 한다.

// reduce 함수는 응용하면 map, sort, every, some, find, findIndex, includes함수처럼 사용할 수 있다. 
// 사실상 reduce가 이들의 모체이다. 
// arr.reduce((cumulative, current, index, element) => { return 결과 }, 초깃값);
const arr = [34,3,43,2];
let count = 0;
const newArr = arr.reduce(( acc, curr, i) => {
    count++;
    console.log(acc, curr, i);
    return acc + 1;
}, 100);    // 초기값을 적어주면 인덱스는 0부터 시작하고, 해당 초기값으로 누적값이 시작된다.

// console.log(arr);
console.log(newArr);
console.log('count : ' + count);

// 출력 예상
/*
    34, 3, 1
    35, 43, 2
    36, 2, 3
    37
*/

// 설명
/*
    1. curr(두번째인자)는 원본배열의 2번째 원소 부터 시작된다. i는 현재 curr의 인덱스이다.
    2. acc(첫번째인자)는 맨 처음에는 원본배열의 1번째 원소가 된다. 그리고 그 다음 부턴 콜백함수에서 리턴되는 것을 계속 넘겨받는다.
    3. 특별히 원본배열을 건드리지 않는 이상 원본배열을 침해하지 않는다.
    4. 함수가 최종적으로 리턴하는 것은 배열이 아니다.
        1. 최종적으로 반환하는 것은 acc 인자값이다.
        2. 콜백함수는 원본배열의 길이의 -1 만큼 반복한다. ( 초기값이 있을 경우에는 원본 배열의 길이 만큼 반복한다.)
        3. 최종적으로 acc인자값도 처음에는 원본 배열의 0인덱스값이 그대로 이용되니깐, 마지막에는 한번더 적용됨을 유의한다.
            1. 위의 출력 예상물을 보면 이해가 더 쉽다.
    5. 콜백 함수 다음에, 두 번째 인자가 초기값자리이다.
        1. 초기값이 없으면 기본적으로 누적값은 원본 배열의 0인덱스 요소로 시작한다.
        2. 초기값이 없으면 인덱스는 원본 배열의 1인덱스 요소로 시작한다.
        3. 반대로 초기값이 있으면, 누적값은 해당 초기값으로 시작한다.
        4. 반대로 초기값이 있으면, 인덱스값은 원본 배열의 0인덱스 요소로 시작한다.
        (curr값도 당연히 0인덱스의 값으로 시작한다.)
*/


// <<응용 학습 편>>
// 단순 배열 덧샘
const total = [0,1,2,3,4].reduce((acc, curr) => {
    return acc + curr;
});
console.log(total);
// 설명
/*
    1. 초기값이 없다. >> curr은 인덱스 1부터 시작. 처음 acc값은 인덱스0값.
    2. 배열의 원소 값이 0부터 끝까지 더해서 리턴된다.
    3. 흔히 reduce 소개용으로 자주 쓰이는 예시이다.
    4. 위에서 const라고 선언하는 건 관계없다. 어차피 계산이 다 끝나고 리턴된 값을 total에 한번 할당 하는 것이기 때문.
*/

// 2차원 배열 1차원 배열로 낮추기
const twoDepthArr = [
    [1,32,43,53,5],
    [21,34,23,43,2],
    [31,1,3,5,21]
];
const oneArr = twoDepthArr.reduce((acc, curr)=>{
    return acc.concat(curr);    // concat() 함수는 배열을 이어붙이는 함수이다.
});
console.log(oneArr);            // [1,32,43,53,5,21,34,23,43,2,31,1,3,5,21]



// 배열의 중복값 없애기
const array_1 = ['hi', 'hello', 'nice to meet you', 'hi', 'hi1'].reduce((acc, curr)=>{
    if(acc.indexOf(curr) === -1){
        acc.push(curr);
    }
    return acc;
}, [])
console.log(array_1);




// 배열의 동일 값 카운트하기
const array_2 = ['hi', 'hi', 'hi', '안녕', '안녕', '그래', 'hello', 'hi', 'bye'].reduce((acc, curr, index)=>{
    if(!acc.hasOwnProperty(curr)){
        acc[curr] = 1;
    }else{
        acc[curr] += 1;
    }
    return acc;
}, {});
console.log(array_2);
// 설명
/*
    1. 초기값으로 빈 객체를 하나 생성한다.
    2. 빈 객체에 curr값이 프로퍼티 값으로 존재하지 않는다면, 아직 중복된게 아니라 처음 저장되는 것이므로, 
    curr이름으로 프로퍼티를 생성하고 1를 할당한다.
    3. 그리고 다시 초기값은 누적되어서 반환되고 함수는 다시 인덱스를 1올려서 반복된다.
    4. 누적된 초기값에서 다시 다음 curr값을 조사하여 있다면, 중복된 경우이므로, 이때는 curr의 이름으로 된 프로퍼티를 찾아서 그 값을 1올린다.
    5. 그리고 다시 누적된 초기값을 반환한다.
    6. 이것이 반복되면 결국 하나의 객체가 완성되고, 
    그 객체에는 원본배열의 프로퍼티가 중복없이 프로퍼티로 들어가있고,
    해당 프로퍼티 값에는 해당 원소의 중복 카운트수가 값으로 들어가 있다.
*/






// 실전예제, 처음에 받은 배열은 students배열으로,  각 학생마다 id, 이름, 평가점수가 있다.
const students = [
	{
		"id": 1,
		"name": "ryu",
		"score": "A"
	},
	{
		"id": 2,
		"name": "suzy",
		"score": "B"

	},
	{
		"id": 3,
		"name": "han",
		"score": "A"
	},
	{
		"id": 4,
		"name": "gyeong",
		"score": "C"
	},
	{
		"id": 5,
		"name": "kim",
		"score": "D"
	},
	{
		"id": 6,
		"name": "ku",
		"score": "A"
	},
	{
		"id": 7,
		"name": "soo",
		"score": "F"
	},
	{
		"id": 8,
		"name": "bark",
		"score": "A"
	},
	{
		"id": 9,
		"name": "choi",
		"score": "B"
	},
	{
		"id": 10,
		"name": "min",
		"score": "A"
	},
];
// students 배열을 이용해서 평가점수 마다 누가누가있는지 배열을 다시 만들어보자.
// 리턴되는 패턴은 다음과 같다. { A:[{ id, name, score }], B:[{ id, name, score }], C:[{ id, name, score }], D:[{ id, name, score }], F:[{ id, name, score }] }
const groupScore = students.reduce((acc, curr)=>{
    if(acc[curr.score]){
        acc[curr.score].push({...curr});
    }else{
        acc[curr.score] = [{...curr}];
    }
    return acc;
}, {});
console.log(groupScore);