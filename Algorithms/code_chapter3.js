// << 알고리즘 페러다임 >> 
// 여기서 부터 중요 대표적인 코드와 언제쓰는지 특성등을 모두 암기 

// 1~n까지 합 구하기를 재귀호출을 이용해서 만들기
// 일반 버전
let sum = function(){
    let ret = 0;
    for(let i = 1; i<n; i++){
        ret += i;
    }
    return ret
}
// 재귀호출 사용한 버전 
let recursiveSum = function(){
    if(n===1) return 1
    return n + recursiveSum(n-1)
}
// 1. 알고리즘의 반복되는 작업을 확인한다. 
// 2. 첫번째 작업은 내가 코드로 써서해주고 나머지를 재귀호출로 지가 알아서 하게 한다.
// 3. 단 주의점은 여기서도 n===1 일때 내가 해줘야할 처리가 있을때가 있다. 더 이상 쪼개지지 않을때 그것을 처리해줘야한다.


// 재귀함수를 사용해서 알고리즘을 편하게 하는 몇가지 사례
// 1. 중첩된 for문 방지
// 문제 : 주어진 숫자 n에 대하여 4개를 중복없이 골라서 표현하는 경우의수를 계산하시오
// 중첩된 for문 사용하기
for(let i =0; i<n; i++){
    for(let j=i+1; j<n; j++){
        for(let k=j+1; k<n; k++){
            for(let l=k+1; l<n; l++){
                console.log(`${i}, ${j}, ${k}, ${l}`)
            }
        }
    }
}


// 재귀함수로 바꿔서 표현하기
/*
    1. 원소들의 총 개수              n 
    2. 더 골라야 할 원소들의 개수      toPick
    3. 지금까지 고른 원소들의 번호      picked (배열 타입)
*/

//  n개의 원소 중 m개를 고르는 모든 조합을 찾는 알고리즘

// n : 전체 원소의 개수
// picked : 지금까지 고른 원소들의 번호
// toPick : 더 고를 원소의 수
let recursivePick = function(n, picked, toPick){
    console.log("함수들어왔다.")
// 기저사례 : 더 고를 원소의 개수가 없을 때, 고른 원소들을 출력한다.
if(toPick === 0){
    console.log(picked); return;
}
// 고를 수 있는 가장 작은 번호를 계산한다.
let smallest = picked.length ? 0 : picked.pop() + 1

// 이 단계에서 원소 하나를 고른다.
for(let next = smallest; next < n ; next++){
    picked.push(next)
    recursivePick(n, picked, toPick-1)
    picked.pop();
}
}

let picked = []
console.log(picked.length)
recursivePick(5,picked, 1)


// n개의 원소 중에서 m개의 원소를 골라내는 함수(중복 없이)
// const arr = Array.from({length: 5}, () => 0);
let recursivePick_myself = function(n, Picked, toPick){
    // 골라야한 원본 배열 생성
    //let arr = Array.from({length:n}, ()=>0)
    for(let i = 0 ; i<n; i++){
        arr.push(i)
    }
    // 원본 배열 확인
    console.log(arr)

    for(let i =0; i<n; toPick){
        let temp = arr[i]
        if(Picked.indexOf(temp)){
            
        }
        Picked.push(arr[i])
        
    }
}


