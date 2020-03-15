//일반적인 예

/*
빅오의 표기법의 개념 
1. 어떤 알고리즘의 효율성을 파악하기 위함임
2. 입력값이 n이고 n이 어떤 방식으로 많아 질수록(x축) 그에 대한 알고리즘의 결과값 도출에 대한 '걸린시간'이 y축인 함수가 바로 빅오함수임
3. 따라서 n이 어떤 방식으로 많아지냐
4. 빅오의 결과값의 형태가 일정한규칙을 가지고 증가하는가?
5. 3,4번에 따라 정형화된 빅오의 함수들이 존재한다. 
    a. O(nⁿ)
    b. O(n³)
    c. O(n²)
    d. O(n)
    e. O(log n)
    f. O(1)
    이 함수들의 그래프 형태를 보아라. 그리고 이해해라 


1. O(1) :   입력 공간에 대해 변하지 않는다. 그래서 상수시간이라고 부른다.
    a. O(1)알고리즘 중 예로 배열에 있는 항목을 인덱스를 사용해 접근하는 경우가 있다. 
2. O(n) :   선형시간이고 최악의 경우에 n번의 연산을 수행해야 하는 알고리즘에 해당한다.
3. 
*/

// 다음은 O(n) 알고리즘의 예시 코드이다. 0부터 n-1까지의 숫자를 출력하는 경우이다.
function exampleLinear(n: number) {
  for (var i = 0; i < n; i++) {
    console.log(i)
  }
}

// O(n²)은 2차 시간이고, O(n³)는 3차 시간이다. 2차시간과 3차시간 복잡도의 예는 다음과 같다.
function exampleQuadratic(n: number) {
  for (var i = 0; i < n; i++) {
    console.log(i)
    for (var j = i; j < n; j++) {
      console.log(j)
    }
  }
}
// 1. 출력의 형태를 보자 : 0:0123 1:123 2:23 3:3  (n = 4 일때)  연산횟수 5,4,3,2  합 : 14회
// 2.