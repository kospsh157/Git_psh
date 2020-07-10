'use strict'
// p93 
// <<주어진 배열에서 가장 많이 등장하는 원소 반환하기>>

function majority_myself (arr){
    let MaxCount = 0;
    let ele = 0;
    for(let i = 0 ; i < arr.length; i++){
        let count = 0
        for(let j = 0; j < arr.length; j++){
            if(arr[i] === arr[j]){
                count++
            }
        }
        if(count > MaxCount){
            MaxCount = count;
            ele = arr[i]
        }
    }
    return ele;
}

function majority1(arr){
    let N = arr.length
    let majority = -1, majorityCount = 0
    for ( let i = 0; i < N ; i++){
        let V = arr[i], count = 0
        for( let j = 0; j < N; j++){
            if(arr[j] === V){
                count++
            }
        }
        if(count > majorityCount){
            majorityCount = count;
            majority = V;
        }
    }
    return majority;
}

arr = [1,2,3,4,1,1,3,3,3,3,4,4,5]
console.log(majority_myself(arr))

// 만약 주어진 배열이 0~100까지 시험점수라면 이중포문을 없애고 그냥 포문 2개로 구할 수 있다.
/*
    1. 주어진 배열의 원소들의 범위가 0~100까지 이렇게 확실하다면
    2. 원소들의 범위를 인덱스로 가지고 있는 새로운 배열 하나를 더 만들어서 원본 배열의 원소에 대한 정보하나를 이 배열에 값으로 담을 수 있다.

*/
function majority2_myself(arr){
    let recordsCountArr = Array.from({length:100}, ()=>0) // 주의 : new 연산자와 같이 쓰면 에러남 그냥 Array.from()임 
    // 길이 100개로 0으로 초기화해서 배열을 만듬
    for (let i=0; i<arr.length; i++){
        recordsCountArr[arr[i]]++
    }
    
    let recordsCountArrIndex = 0
    for(let i=0; i<recordsCountArr.length; i++){
        if(recordsCountArr[i] > recordsCountArr[recordsCountArrIndex]){
            recordsCountArrIndex = i
        }
    }
    return recordsCountArrIndex;
}


// 배열에서 최소값 최대값 구하기
// 라이브러리 사용법
Math.max.apply(null, arr);
Math.min.apply(null, arr); 
// 배열의 길이가 10의7승을 넘어가면 콜스택이 꽉차 오류를 일으킨다.

// reduce() 콜백함수를 이용하기
let max = arr.reduce((pre, curr)=> {
    return pre > curr ? pre:curr
})

let min = arr.reduce((pre, curr)=> {
    return pre < curr ? pre:curr
})




// p95
// << 선형알고리즘 - 이동평균 계산하기 >>

// 실수 배열 a가 주어질 때 , 각 위치에서의 m-이동평균을 구한다.
function movingAverage1_myself(arr, m){
    let sum = 0;
    let mArr = []
    for(let i=0; i<arr.length; i++){
        sum += arr[i]
        if((i+1)%m === 0){
            mArr.push(sum / m)
            sum = 0
        }
    }
    return mArr 
}

arr = [1,1,1,2,2,2,3,3,3,4,4,4,5,5,5]

console.log(movingAverage1_myself(mArr))
// 위의 함수는 주어진 배열을 M개씩 쪼개서 각 그룹마다의 평균을 구한 값을 배열로 반환한다.

// M-이동평균은 가장 최근의 M개의 평균을 가지고 있는 배열을 구해야한다. 
function movingAverage1_myself2(arr, m){
    let sum =0
    let mArr = []
    for(let i=0; i<arr.length; i++){
        sum += arr[i]
        if(i < m-1){
           continue 
        }
        mArr.push(sum/m)  
        sum -= arr[i-m+1]
    }
    return mArr
}

let arr = [2,2,2,2,2,2,2]
console.log(movingAverage1_myself2(arr))

