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

// [1,2,3,4,5,6,7,8,9,10]
//  0,1,2,3,4,5,6,7,8,9    i
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
        sum -= arr[i-m+1]       // 끝에 인덱스는 m-1 일것이다. 이것을 0으로 만들려면 -m+1를 해야 한다. 
                                // 직관적으로 생각해보면 인덱스는 항상 몇 번째 보다 -1 작다. 
                                // 따라서 m번째 원소는 인덱스로 항상 m-1이다.
                                // 어떤 기준점 i에서 m번 뒤로 간다면 i = i+m 인덱스이다.
                                // 반대로 어떤 기준점 i인덱스에서 m번을 앞으로 간다면 i = i-m 이다. 
                                // 그러면 m번째 원소에서 첫번째 원소로 가고 싶다면 m-(m-1) 를 해야 한다. 
                                // m번째 원소에서 m번 앞으로 가면 배열을 벗어난다. 
                                // m-1-(m-1) = m-m-1+1 = 0 
                                // i-(m-1) >> i인덱스에서 i만큼 뒤로 가면 0인덱스가된다. i - i = 0 >> i-(m-1) >> i-m+1 인덱스는 
                                // i-m+1인덱스는 0에서부터 m만큼 갔을때의 인덱스에서 다시 0 인덱스로 올수있는 
                                // i 인덱스에서 m만큼 뒤로 왔을때 인덱스는? >>> i + m  인덱스
                                // i 인덱스에서 m만큼 앞으로 갔을때 인덱스는? >>> i - m 인덱스
                                // m번째 원소에서 n번 움직일 때 인덱스는? >>> 뒤로가면 m+n-1, 앞으로 가면 m-n-1 (단 0<n<m) 
                                // 어떤 기준점 i인덱스에서 뒤로 m번 이동했다면 그것은 실제로 i+1번째 원소에서 m번 이동한 i+1+m번째 원소이다.
                                // 3번째는 1번째원소에서 2번 움직인 원소이다.
                                // m번째는 1번째 원소에서 m-1번 움직인 것이다. 
    }                       
    return mArr
}

let arr = [2,2,2,2,2,2,2]
console.log(movingAverage1_myself2(arr))


// M-이동평균 구하는 함수 (원본 데이타 배열, M이 입력값)
function movingAverage2(arr, m){
    let ret = 0
    let N = arr.length
    let partialSum = 0;
    for(let i =0 ; i<m-1; i++){
        partialSum += arr[i]
    }
    for(let i=m-1; i<N; i++){
        partialSum += arr[i]
        ret.push(partialSum/m)
        partialSum -= arr[i-m+1]   
    }
    return ret
}

// 이렇게 하면 시간복잡도가 N으로, 즉 선형시간 알고리즘이 된다. 그리고 이런 선형시간 알고리즘이 거의 최적화된 좋은 알고리즘이라 할 수 있다.


// p103 << 재귀호출을 이용한 지수시간(다항시간) 알고리즘 >>
// 음직 메뉴 정하기 
// 내가 만들 수 있는 음식의 메뉴들과 이들중 어떤 음식을 만들지 정하는 입력값 이렇게 2개를 입력받아서
// 내가 친구가 왔을때 대접할 수 있는 모든 요리의 경우의수를 따져서 가장 최적화(여기서는 알러지를 피하면서 최소한 
// 초대된 친구들이 하나의 요리를 먹을 수 있는 최소한의 요리 선택 메뉴임)된 경우의수를 선택하기
// 위의 문제는 집합덮개 문제 유형이다.



// < 이동 평균 구하기, 이진 탐색, 집합 덮개 알고리즘, 소인수 분해 과정 알고리즘 > 
// 이동평균구하기 (원본 배열데이터, M)이 입력값
function movingAvg_myself(arr, m){
    let sum = 0;
    let mAvg = []
    for(let i=0; i<m-1; i++){
        sum += arr[i]
    }
    for(let i=m-1; i<arr.length; i++){
        sum += arr[i]
        mAvg.push(sum / m)
        sum -= arr[i-m+1]   // 현재 index는 m번째 원소이다. 현재 원소에서 몇 번을 가야 첫번째 원소가 나올까
                            // m-1번을 앞으로 가야 첫번째 원소가 나온다.  >>> 현재 인덱스에서 (m-1)번을 빼주면 첫번째 인덱스가 나온다.
                            // i-(m-1) = i-m+1 이 첫번째원소가 된다. 그리고 이게 0번 인덱스인다.
    }
    return mAvg
}
// 이진 탐색
// 나중에 



// 집합 덮개 알고리즘 
// 



// < p111 삽입정렬, 선택정렬 알고리즘 > 
// 삽입정렬  시간 복잡도 : N^2
// 삽입정렬의 최상의 시간 복잡도는 N이며 최악이 N^2이다. 전체 시간복잡도 역시  N^2이다.
// 선택정렬의 시간복잡도도 N^2이기 때문에 주어진 배열이 임의의 순열일때, 일반적으로 삽입정렬이 선택정렬보다 빠르다. 
// 삽입 정렬은 흔히 사용하는 N^2 정렬중 가장 빠른 알고리즘이다.
let insertionSort = function(array) {
    var i = 1, j, temp;
    for (i; i < array.length; i++) {
      temp = array[i]; // 새로운 숫자를 선택함
      for (j = i - 1; j >= 0 && temp < array[j]; j--) { // 선택한 숫자를 이미 정렬된 숫자들과 비교하며 넣을 위치를 찾는 과정, 선택한 숫자가 정렬된 숫자보다 작으면
        array[j + 1] = array[j]; // 한 칸씩 뒤로 밀어낸다
      }
      array[j + 1] = temp; // 마지막 빈 칸에 선택한 숫자를 넣어준다.
    }
    return array; 
};

let insertionSort_myself = function(arr){
    let j = 0;
    let temp = 0;
    for(let i=1; i<arr.length; i++){
        temp = arr[i]
        for(j=i-1; j>=0; j--){  
            if(temp >= arr[j]){
                break;    // 왼쪽은 항상 정렬되어있으므로, 왼쪽에서 가장 오른쪽 수와 현재 선택된 수와 비교해서 선택된수가 더 크면 선택할 수가
                          // 왼쪽 원소들보다 항상 크므로 제자리에 있어도 된다. 
            }
            else if(temp < arr[j]){
                arr[j+1] = arr[j]  // 한 칸 뒤로 자리를 미룬다. 그리고 다시 반복문을 돌려서 그 앞에것도 temp보다 작으면 다시 계속 한 칸씩 뒤로 보낸다.
            }                      // 그러다가 조건에 안맞게되고, 그럼 빈공간을 남겨두고 바로 2번재 포문을 탈출하고 
        }
        arr[j+1] = temp            // for문을 돌때 -1씩 차감되므로, 다시 +1를 해줘야 빈공간의 인덱스로 간다.
    }                                
    return arr
}
 let arr = [1,2,4,3]  
 console.log(insertionSort_myself(arr))

// 선택정렬 알고리즘







// 최악의 시간복잡도와 평균시간복잡도는 알고리즘에따라 다르게 나올수도있다.
// 시간복잡도는 빅오표기법으로 나타내며 이는 수행시간을 간단히 나타낼뿐이다. 실제 수행시간은 다르다.

// 알고리즘 마다 최악의수행시간 복잡도와 평균수행시간 복잡도는 다르다. 그리고 어떤 알고리즘의 빅오 표기법은 수행시간을 간단히 나타내는 표기법일뿐이다.
// 빅오표기법은 단순히 어떤 알고리즘의 가장 깊은 반복문의 f(x) 를 알아보는 것이다. 



// << 반복분 불변식 >>

// 어떤 알고리즘이 정당성을 가지려면 불변식 진입시에 불변식이 성립함을 보여야하고
// 반복문 내용이 불변식을 깨뜨리지 않으면서 일정한 작업을 한다.
// 반복문 종료시 불변식이 성립이 계속 유지가되면 정답을 구했음을 알 수 있다. 
// 


// << 수학적 귀납법 >> 
/*
    1. 단계 나누기 : 증명하고자 하는 어떤 사실을 반복되는 부분으로 나누어야 한다.
    2. 첫 단계 증명 : 첫 단계에서 증명하고 싶은 내용이 성립함을 보인다.
    3. 귀납 증명 : 앞서 증명한 내용이 성립하면 다음 단계에서도 성립함을 보인다. 

*/
