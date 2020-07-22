'use strict'

// 삽입정렬 
let insertion_sort = function(arr){
    let n = arr.length
    for(let i=1; i < n; i++){
        let start = arr[i]
        let j=0;
        for(j; j<i; j++){
            console.log("전 : " + arr[i], arr[j])
            if(arr[i]<arr[j]){
                arr[j+1]= arr[j]
                
            }
            console.log("후 : " + arr[i], arr[j])
        }
        arr.pop();
        arr[j] = start
    }
    return arr
}
              
let arr = [10,9,8,7,6,5,5,10,3,4,2,1]
console.log(insertion_sort(arr))

/*
    1. 인덱스1 부터 시작한다.
    2. 선택된 인덱스 기준으로 왼쪽에있는 배열의 처음부터 선택된 배열의 직전까지 하나씩 선택된 원소값과 비교한다.
    3. 만약에 비교했을때 선택된 배열이 더 작으면 비교원소과 인덱스 위치를 바꾼다. 
    4. 그렇게 비교를 하다가 선택된 배열직전까지 다 확인했다면 선택된 배열의 인덱스를 다음 인덱스로 넘어간다.
    5. 배열에서 i,j 의 위치를 바꾸는거랑 , i에서 한칸씩 밀고 그 사이에 j를 넣는거랑 차이점 

    */
