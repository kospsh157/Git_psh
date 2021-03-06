char ch_a = 'a';
// char는 기본적으로 최소 8비트 이상 자료형임
// 애매모호함 따라서 컴파일러 마다 char를 몇 비트로 보는지 알 수 있는 방법이 있음

// C언어는 임베이디드 언어이다. 따라서 작은 기기에도 들어갈 수 있다. 그래서 컴퓨터에서의 그것을 생각하면 안된다. 
// 1바이트를 CHAR_BIT 만큼이라고 하는데, CHAR_BIT가 대부분 8비트이지만 16비트인 곳도 있다.  그때그때 기기마다 다르게 적용되는 것이다.
// 일반적으로 어떤 기기에서 제일 작은 단위를 CHAR 로 표현한다. 
// 즉 C언어에서 1바이트의 크기는 CHAR의 크기를 의미한다. 그리고 그 CHAR 의 크기는 기기마다 컴파일러마다 달라질 수 있다는 것이다. 

#include <limits.h>
#include <stdio.h>

int main(void){
    char char_size = CHAR_BIT;
  
    printf(char_size);


    return 0; // 그냥 0을 리턴하면 프로그램이 잘 정상작동하고 무사히 종료되었다는 뜻이고 양수를 반환하면 약속된 규칙에 따른 오류가 
    // 발생한 것임. 
}



// 또한 짜증나는 것이 컴파일러마다 char의 기본이 unsigned 인 것이 있고, signed인 것이 있다. 


// 아스키는 7비트만(0~127)  필요하고 부호비트를 사용하지 않기 때문에, 사실상 signed가 필요없다. 
// 다만! char는 숫자도 표현할 수 있는 숫자문자 등가 자료형이다. 
// 따라서 정수를 담는 자료형으로써 쓰일때에는 signed가 필요하다. 그때는 부호비트까지 사용한다. 
signed char signed_char = -1;
unsigned char unsigned_char = 255; 
// 따라서 숫자로 쓸꺼면 위처럼 unsigned / signed 를 붙여서 써주자 


// 포팅에 문제 없는 범위
// unsigned char : 0~255
// char : 0~127
// signed char : -127~127  ( 1의 보수형을 쓰는 기계는 0이 +0/-0 두 개 이므로, -128~127 이 아니라 음수/양수 똑같이 127이다.)



// 이런거 저런거 다 집어치우고 데스크탑에서 흔한 일반적인 개발을 할 때 외워야 할 점 
/*
    크기 :  8비트
    부호 : (unsigned / signed 를 생략할 경우) >> signed 가 기본
    범위 : 부호가 없는 unsigned : 0~255
           부호가 있는 signed : -128~127  
*/
 