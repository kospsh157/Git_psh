'use strict'
let insertionSort = function(arr, size) {
    let i, j,key; 
    for (i = 1; i < size; i++) {
        key = arr[i];
        j = i - 1; 
        while (j >= 0&&arr[j]>key) {
            arr[j + 1] = arr[j];      // j인덱스가 i-1부터 0쪽으로 움직이며, 이때 그냥 움직이는게 아니라 while문 조건문이 
            j--;                      // 맞을때마다 한칸씩 왼쪽으로 가서 원소를 뒤로 민다. 
                                      // 따라서 조건문이 안맞는 j인덱스가 올때까지 계속 j-- 를 시킨다. 그러다가 
                                      // 조건문이 안 맞는 j인덱스까지 오게되면 그때까지 모든 j인덱스들은 한칸씩 뒤로 밀려있고,
                                      // 현재 j인덱스는 빈칸이 된다. 그리고 여기서 조건문때문에 j--가 되고,
        }
        console.log(j);
        arr[j+1] = key;               // 여기서 다시 +1를 시켜주면 다시 빈칸의 j인덱스로 돌아온다. 그리고 여기다가 기준값을 넣어주면된다.
    }
    return arr
}



// 삽입정렬 
let insertion_sort = function(arr){
    let n = arr.length
    for(let i=1; i < n; i++){
        let start = arr[i]
        let j = i-1;
        for(j; j>=0; j--){
            if(arr[i]<arr[j]){
                arr[j+1] = arr[j]
            }
        }
        console.log(j);
        arr[j+1]  = start
    }
    return arr
}



let arr = [10,9,8,7,6,5,5,10,3,4,2,1]
//console.log(insertion_sort(arr))
console.log(insertionSort(arr, arr.length));



/*

    1. 인덱스1 부터 시작한다.
    2. 선택된 인덱스 기준으로 왼쪽에있는 배열의 처음부터 선택된 배열의 직전까지 하나씩 선택된 원소값과 비교한다.
    3. 만약에 비교했을때 선택된 배열이 더 작으면 비교원소과 인덱스 위치를 바꾼다. 
    4. 그렇게 비교를 하다가 선택된 배열직전까지 다 확인했다면 선택된 배열의 인덱스를 다음 인덱스로 넘어간다.
    5. 배열에서 i,j 의 위치를 바꾸는거랑 , i에서 한칸씩 밀고 그 사이에 j를 넣는거랑 차이점 

*/
