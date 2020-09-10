// 배열 

#include <stdio.h>

void main(void){
    int nums[5];
    char name[10];
    float GPAs[3] = { 3.1f, 2.2f, -13.f};
    
    printf(GPAs[0]); // 왜 오류나징... 
}

// 대충 배열 사용법
int nums[5] = {1,2,3,4,5};
int i;
int sum;

for(i=0;i<5;++i){
    nums[i] += i*2;
}

sum = 0;
for(i=0; i<5; ++i){
    sum += nums[i];
}


// 씨는 값형으로 배열을 만들 수 있다. ( 참조형이 아닌 값형)
/*
    우선 이걸 알아야 한다. 스택메모리

    스택
    힙
    데이터
    코드

    1. 스택메모리는 함수를 쓸 때 사용한다.
        1. 각 함수에서 쓰는 지역변수등을 임시적으로 저장하는 공간
        2. 자료구조 스택이랑 구조가 같을 뿐 서로 같은 것은 아니다.
        3. 스택 메모리의 크기는 프로그램 빌드 시에 결정됨
        4. 스택 메모리의 위치는 실행 시에 결정됨 
        5. 스택 메모리의 위치는 컴퓨터 환경마다, 실행할때마다, 계속 바뀐다. 
    2. 스택 메모리 사용 개념
        1. 함수가 호출되면 필요한 공간을 스택에서 준다.
        2. 그 함수가 반환되면 할당된 공간은 쓰레기데이터로 정한다.
        3. 나중에 그 공간을 삭제해야 한다. (java는 가비지 컬렉터가 이짓을 자동으로 해준다.)
    3. 기본 자료형 변수는 스택 메모리를 차지!
        1. 모든 기본 자료형 변수 (char, int, float ..)는 new 없이(씨는 원래 new없음) 사용 할수 있엇떤이유는 스택메모리에 이미 할당되었기 때문
        2. 그래서 컴파일 될 때 스택메모리에 얼마나 많은 변수자료들을 잡아 넣줘야하는지 이미 결정된다.
        3. 매개변수 또한 필요할 때 마다 스택 메모리에 즉시 복사해서 할당해준다. ( 따라서 '값형' 이라는 것이다. 복사를 했기 때문에)
        4. 스택 구조상, 메모리 중간에 빈 구멍이 있을 수 없으며, 항상 LIFO 규칙을 지키면서 함수가 반환된다.
        5. 힙과 비교해보면 힙은 중간에 다쓴 메모리공간을 반환시키면 중간에 구멍이 생긴다. 그리고 힙은 new키워드가 할당 받는 공간이다.
        6. 따라서 힙은 공간자체도 스택보다 크기도 하지만, 중간중간에 구멍도 있기 때문에 올검색을 해야 하므로, 스택보다 느리다.
        7. 그에 비해 스택은 컴파일 과정에서 이미 어떤 함수가 어떤 용량이 필요한지 다 알고있고, 메모리 공간도 순서대로 구멍없이 쌓이고
        순서대로 반환되기 때문에 훨씬 빠르다.
        
*/

// 스택 메모리에 대해서 
/*
    1. 스택은 큰 주소에서 작은 주소로 쌓인다.
    2. EBP  (extended base pointer) 스택 프레임의 첫주소 
    3. ESP  (extended stack pointer) 현재 스택 포인터 ( = 지금 현재 최상위 스택 주소)
    4. 스택 프레임 : 각 함수가 사용하는 스택 메모리의 범위
    5. 스택은 이 EBP, ESP 의 위치 변동에 따라 계속 스택프레임이 변화하면서 프로그램이 작동된다.
    6. 플랫폼 마다 스택 메모리는 다르고, 
    7. 중요한건 개발자가 정해줄 수도 있다. 
    8. clang windows 에서는 기본값이 1MB 이다. 
    9. 쓰레드일 경우에는 각 쓰레드 마다 스택메모리도 따로 있다. 
*/

// 배열도 스택 메모리에 들어간다!
/*
    1. 배열은 heap메모리에 저장되는게 아니라, 컴파일 과정에서 스택메모리에 저장된다.
    2. 따라서 OS에 새로운 메모리를 할당해달라고 조를 필요가 없다 >> 더 빠르다.

*/

// 스택오버플로
/*
    1. 스택의 크기가 약1MB라고 하면 당연히 char buffer[1024 * 1024]; 이런식으로 잡아버리면 나중에 문제가 생긴다.
    2. 당장은 문제가 생기지 않을 수 있다. (컴파일러나 툴에 따라 미리 알려주는 경우도있다.) 
    3. 하지만 저렇게 용량을 잡고, 실제로 1MB이상의 위치에 버퍼를 써버리고, 
    4. 다음 활동에서 그 버퍼를 읽을려는 순간 위치를 몰라서 에러가 터진다. 
    5. 즉 너무 큰 데이타는 스택에 넣으면 안된다!!!!!!!!
    6. 유일한 해결법은 동적할당을 쓰는 것이다. (힙 메모리는 훨씬 크다 )
*/


// 재귀 함수를 너무 깊게 호출하면 스택오버플로가 난다. 
/*
    1. 재귀함수는 계속해서 쌓이는 형태가 나올 수 밖에 없는 구조이다.
    2. 따라서 재귀함수가 금방 끝나면 다행인데, 너무 많이 계속 호출되다가 결국 스택메모리를 넘치면 스택오버플로가 일어난다.
    3. 다시 한 번 말하지만 스택오버플로는 반드시 크래시가 터지는게 아니다. 
    4. 오버플로 된 어떤 공간에다 데이터를 썼다가 아무도 그걸 안쓰면 그냥 조용히 넘어가는 거고 누가 그걸 쓰는 순간 문제가 생기는 거다.

*/





