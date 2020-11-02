// 다른 파일에 있는 전역 변수 사용시 문제점들

// 다음 3개의 코드를 보자

// monster_repo.h
void add_monster(void);


// monster_repo.c
#include "monster_repo.h"

int g_mon_count = 0;

void add_monster(void){
    ++g_mob_count;
}


// main.c
#include <stdio.h>
#include "monster_repo.h"

int main(void)
{
    add_monster();
    printf("# monsters" %d\n", g_mob_count);

    return 0;
}


// 위의 3파일을 컴파일 할 경우 다음과 같은오류가 생긴다.
error: use of undeclared identifier 'g_mob_count' printf("# monster: %d\n", g_mob_count);
// g_mob_count변수를 읽을 수 없다 뭔지 모르겠다 라는 오류이다. 선언되지 않은 변수를 썼다.

 
// 이유는 : 컴파일러는 각각 .c파일을 따로따로 컴파일하기 때문이다.
// 따라서 main.c은 monster_repo.c 안에 있는 g_mob_count의 존재를 알 수 없다.

// 그럼 main.c에 g_mob_count = 0; 를 추가해주면 어떨까?
// main.c
#include <stdio.h>
#include "monster_repo.h"

int g_mob_count = 0;    // 다음 코드 추가

int main(void)
{
    add_monster();
    printf("# monsters" %d\n", g_mob_count);

    return 0;
}

// 결과 : 에러는 링커에서 나온다
/*
    1. 컴파일은 따로딸 하니깐 컴파일과정에서는 오류가 나지 않는다.
    2. 하지만 링킹 단계에서 링커가 오류를 발생한다.
    3. 둘 다 전역변수로, 똑같은 이름이 되어 있고, 그러면 링커가 실행파일을 만들 때 링크를 할 때, 햇갈리기 때문에 
    오류를 발생시킨다. 
    (씨에서는 함수 오버로딩도 지원하지 않는다.)

*/

// 그래서 해결법은?
/*
    1. 새로운 전역변수를 만드는것이 아니라, monster_repo.c 안에 있는 것을 가져다 쓸것이라 컴파일러에게 알려줘야함
    2. 그래야 컴파일러가 구멍을 비워 놓음(컴파일러가 구멍을 비워 두고 포인터로 연결해두면 링커에서 오류를 안 뱉음)
    3. 마치 함수 전방선언이 그랬던 것처럼 
    4. 그렇은 하는 키워드가 바로 extern 키워드임



*/