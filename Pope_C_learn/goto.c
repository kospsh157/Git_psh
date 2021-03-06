// goto문은 악마다!

/*
    goto 레이블이름 
    하면 레이블 하고 : 밑에 코드를 실행한다. 

    goto를 쓰면 이 순ㅇ서를 어기고 다음에 실행할 코드를 마음대로 지정가능
    (물론 같은 함수 내에 있에 있는 레이블로 점프함 )



*/

// 나쁜 예
void do_work(void)
{
    infinity:
        printf("worlk time!\n");
         
        goto infinity;
}


void do_work(void){
    while(1){
        printf("worlk time!\n");
    }
}

// 둘 다 동일한 코드이다.
/*
    모든 반복문은 goto기반으로 작동한다.
    goto는 나쁜게 아니다. 
    단지 반복문 형태로 쓰면 실수할 여지가 줄어들기 때문에 반복문을 쓰라는 소리이다. 


    goto 반복문이 나쁜 이유2 
    goto를 자꾸 쓰면 코드 읽기가 너무 힘들어진다. 
    하지만 유용한 예가 있다.


    
    
*/

// 3중 for문 과 같이 반복문이 여러개 겹쳐있을 경우, 이 3중포문을 완전히 벗어나려면 break을 할려면 3번이나 해야한다. 
/*  
    1. 이러면 상당히 별거도 아닌데 코드가 길어진다. 조건도 3개 더 잡아야 하고 (if문 3개를 써야한다. 3중포문에서는)
    2. 이럴때 goto를 쓰면 한번에 포문 밖으로 빠져나갈 수 있다!!!
*/


// 유지보수 차원에서 어떤 에러가 발생하면 그 에러를 해결하는 함수를 작성하는 것보다 goto를 쓰는게 더 좋을 때가 있다.
somethingDo_A();
if(error)
    goto out_a;
somethingDo_B();
if(error)
    goto out_b;
somethingDo_C();
if(error)
    goto out_c;

out_c:
    undo C
out_b:
    undo B
oud_a:
    undo A

// 위의 코드처럼 순차적인 어떤 일 A~C를 하는데 하는 도중에 중간에 오류가 생겼다면 역순으로 다시 undo시켜야 할때 
// goto가 아주 편하고 깔끔하게 해결할 수 있다. 




// 베스트 프랙티스 == goto는 이럴때만 쓰자 걍
/*
    1. 기본적으로는 goto 쓰지 않는다.
    2. 언제나 아래쪽으로만 점프할 것. 절대 위로는 점프하지 말 것
    3. 특히 3중 포문 이상 중첩된 반복문에서 한번에 빠져나가는것에 쓰는게 좋다.
    4. 한 함수 안에서, if문이 여러개 있는데, 그 중에서 계속 공통된 코드를 실행해야 할때, 그냥 goto로 쓰다\
    5. 스택 형식에서 역순으로 undo 같은거 시킬때
*/

