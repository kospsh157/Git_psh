//p87
// 개발자들은 모든 자료구조에 대하여 삽입,삭제,접근,검색 4가지에 대해 시간복잡도,공간복잡도를 중요시한다.

// pop(), push(), arr[i](직접접근) 의 시간복잡도는 모두 O(1) 이다.




// for in 반복문은 배열의 인덱스를 표시한다. 배열의 원소를 담지 않는다.
let arr = [2,3,4,5,6]
for(let index in arr){

    console.log(index)   // 주의할 점은 여기서 반환되는 index는 무조건 문자열형태로 다 바뀌어서 반환된다. 
}
// [0,1,2,3,4]

// for of 반복문은 배열의 원소들을 반복해서 표시해준다. 
for(let value of arr){
    console.log(value)
}
// [2,3,4,5,6]





// forEach 반복문
// 배열의 각 원소마다 콜백함수의 코드를 적용시킬수있는 반복문으로, 아주 유용하게 쓰일 수있다.
// 콜백의 파라미터로 value, index가 들어간다 순서가 바뀌지 않도록 주의한다.
arr.forEach(element => {
    console.log(element)
});

arr.forEach((value,index)=>{
    console.log(value,index)
})





// .slice(begin, end) 원본배열을 수정하지 않고 새로운 배열로 리턴
// 파라미터값을 2개다 입력하지 않으면 원본배열의 새로운 복사본 배열을 리턴한다.
// 주의할 점은 end에는 항상자신인 원하는 인덱스 +1로 해서 적어야한다. 3인덱스까지 잘라내고싶다면 4를써야한다는 소리이다.
// 인덱스 끝값이 4일때, 4까지 나오게 하고싶다면 인덱스끝값을 넘어선, 5를 적어야한다. 

// 참조복사가 아닌 완전복사를 위한 .from()
let arr1 = Array.from(arr)
// arr1은 arr와 독립적인 완전복사 배열이다.

let arr2 = arr.slice();
// 위와 같이 해도 완전복사배열이 탄생된다.





// .splice(begin, size, newValue1, newValue2...)
// 슬라이스와 달리, 원본배열을 수정하고 변경한다.
// 시작 인덱스 부터 사이즈에 적힌 몇개까지 원소를 무조건 짤라내서 반환한다.  (짤라서 새로운 배열로 반환도한다.)
// 그리고 3번째 파라미터부터는 짤라진 인덱스부터 차례대로 추가한다. 잘쓰지않는 기능이다.
let arr = [1,2,3,4]
let arr1 = arr.splice()  // arr1 은 다 짤려서 [] 빈배열로 반환되고, 여기서 arr은 수정되지않는다 arr = [1,2,3,4]

let arr2 = arr.splice(1,2) // 이렇게 하면 arr도 짤린채로 수정된다. arr = [1,4] , arr2 = [2,3]

// 사실상 splice()는 잘 사용이 안될거같고, 
// 가끔씩 원본배열을 수정할때 쓰일것같다. 






