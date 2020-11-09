// 1
// 배열의 삭제
// 다음 배열에서 400, 500를 삭제하시오
var nums = [100, 200, 300, 400, 500];

// 내 답안              
nums.remove(400,500);   // swift 나 파이선에서만 가능

// 답안
nums.pop()
nums.pop()

// 참고
arr.shift()             // 첫뻔째 요소 제거, 제거된 요소 반환됨
arr.unshif('something') // 첫번째 요소로 추가 

arr.pop()               // 마지막 요소 제거, 제거된 요소 반환됨
arr.push('something')   // 마지막 요소로 추가

arr.splice(2, 0, 'something')            // 2index에 something 추가 
arr.splice(4, 0, '1', '2')               // 4index에서 부터 순차적으로 1, 2 요소 추가
                                         // 자바스크립트 배열은 동적이므로, 인덱스가 넘으면 넘는대로 새로 추가됨 
arr.splice(2, 1)        // 2index 요소 하나 제거
arr.splice(2, 2)        // 2index 부터 요소 2개 제거, 제거된 요소들을 배열로 다시 반환한다.





// 2
// 빈 칸에 내장함수를 이용하여 코드를 입력하고 다음과 같이 출력되도록 하시오
let arr = [200, 100, 300];
// 빈 칸
console.log(arr);
// 출력
[200, 100, 1000, 300]

// 내 답안
arr[2] = 1000; 
arr.splice(2, 0, 1000);

// 답안 
arr.splice(2, 0, 1000);
