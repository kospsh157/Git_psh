// 쿠키 형태의 헤더가 왔을 때 처리하는 함수 만들기
// 쿠기는 쿠키이름1=쿠키내용1; 쿠키이름2=쿠키내용2; ... 이런 식으로 나열 되어 헤더에 담겨 전달된다.
// 따라서 위의 구조대로 분리시켜야 한다.

const arr = [1,2,3,4];

// arr.reduce((cumulative, current, index, element) => { return 결과 }, 초깃값);

const newArr = arr.reduce(( acc, curr, i) => {
    console.log(acc, curr, i);
    return acc + curr;
});

console.log(newArr);

// 1, 2, 1
// 3, 3, 2
// 6, 4, 3 
// 10