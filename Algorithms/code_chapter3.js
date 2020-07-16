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
// 여기서 picked 배열에 아무것도 없다면 그냥 아직 하나도 안뽑았다는 뜻이니깐 
// 0을 넣으면 되고,
// 뭐라도 있다면 최소 한 번 이상 뽑았다는 소리니깐 picked 의 마지막원소 + 1 부터 뽑으면 되니깐 
// picked 의 마지막원소 보다 하나 많은것 부터 시작한다.

// 이 단계에서 원소 하나를 고른다.
    for(let next = smallest; next < n ; next++){
        picked.push(next)   // 선택된 인덱스에 해당하는 원소를 picked에 넣는다.
        recursivePick(n, picked, toPick-1) // 다시 재귀호출한다.
        picked.pop(); // 재귀호출을하고 
    }
}

let picked = []
console.log(picked.length)
recursivePick(5,picked, 1)


// n개의 원소 중에서 m개의 원소를 골라내는 함수(중복 없이)
// const arr = Array.from({length: 5}, () => 0);

/*
    1. n까지의 숫자중에서 m개를 뽑는 모든 경우의수 찾기
    2. 예를 들면 n = 8 일때 [1,2,3,4,5,6,7,8] 에서 m개를 뽑는 경우의 수 찾기 
    3. 재귀함수로.
    4. 여기서 뽑은 숫자는 중복되면 안되므로, 따로 선택된 수 Picked 배열에 넣는다.
    5. 그리고 세번째 파라미터로 앞으로 몇개를 더 뽑아야 할 지 알려준다.
    한번씩 싸이클을 돌때마다 -1씩 차감된다.
*/

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
        if(Picked.indexOf(temp)){ // 여기서 picked 배열이 비었다면 >
            
        }
        Picked.push(arr[i])
        
    }
}

// 재귀호출 
/*
    1. 기저사례 확인 : m번 선택했으면 종료
    2. 반복되어야할 것 : n까지의 배열에서 인덱스 순서대로 하나씩 
    3. 
*/

// p149 미친 존나 짜증나는 조합 알고리즘 (c++이므로 그냥 코드만 이해할것)
void printPicked(vector<int>& picked) { 
    for (auto& v : picked) cout << v << ' '; cout << '\n'; 
} 
// n: 전체 원소의 수 
// picked: 지금까지 고른 원소들의 번호(인덱스) 
// toPick: 더 고를 원소의 수 
// 일 때, 앞으로 toPick개의 원소를 고르는 모든 방법을 출력 



// p 152
// n 칸 정사각형이 주어지고, 어떤 임의 좌표칸하나가 주어질 때, 그리고 임의 글자가 주어질 때, 해당 좌표에서 시작하는 
// 단어가 주어진 정사각형에 있는지 완전 탐색해서 찾는 문제

// 이 코드에서 볼 것은 일단 주변 좌표를 찾기 위해서 상대 좌표를 x 축 y축 나눠서 배열화 시켰다는 것
// 이걸로 포문을 돌려서 한칸씩이동하



let recursivePick_myself2 = function(n, arr, m){
    // n : N까지 원소 
    // 굳이 새로운 배열을 생성할 필요가 없는 이유가 n 이 주어지는 순간 배열 필요없이 원소들이 1부터 n까지임을 알 수 있기때문이다.
    // 기저 사례
    // 문제점 : 중복 선택이됨.
    if(m === 0){
        console.log(arr)  // m번을 뽑았으면 arr을 반환
        return
    }
    let smallest = arr.length === 0? 0 : arr[arr.length-1] + 1
    
    for(let i=smallest; i<n; i++){
        // i부터 시작해서 선택하고 arr에 넣는다.
        arr.push(i)
        // 그리고 다시 재귀호출해서 부른다.
        recursivePick_myself2(n, arr, m-1)
        arr.pop();
    }
}

let arr = []
recursivePick_myself2(5,arr, 2)



// for문에 재귀호출이 있다면 어떻게 돌아가나 보자
let recursiveInFor = function(arr, i){
    if(i>=arr.length){                         // 기저사례가 가장 먼저 코드에 나와야한다.
        return console.log("전체 함수 끝")
    }
    // 배열과 인덱스가 주어지면 해당 배열의 인덱스 원소를 출력하는 함수
    console.log(arr[i])
    for(let j = 0; j<2; j++){
        console.log(`for문 ${j}번 시작`)   // 재귀 호출 전에 for문 안에 코드들은 n=0 을 벗어나지 못한다.  
        recursiveInFor(arr, i+1)          // 다만 재귀호출을 만나기 직전까지의 모든 코드는 계속 반복 실행된다.
        console.log(`for문 ${j}번 끝`)     // 재귀호출 다음 코드는 재귀호출이 한번끝나고나서야 불려지고 for문 종료
    }
                                            //  재귀호출시 i++ 로 하면 무한호출이 된다. i가 늘어나지 않기 때문이다. 
                                            // ++i 로 하면된다.
}

let arr = [1,2,3]
recursiveInFor(arr, 0)


