// 연산자 우선순위와 호출 평가 순서는 전혀 상관 없다!!!

int result = add(num1, num2) + substract(num1, num2) * divide(num1, num2); 

// 곱셈이 먼저니깐 substract divide 먼저 호출되겠지 라고 생각하면 틀렸음. 
// 함수 호출은 시퀀스포인트가 있는 연산자가 아닌이상, 랜덤임.  위에 있는 = , + , * 모두 시퀀스포인트가 아니다.
// 따라서 위에 호출을 랜덤으로 되고, 연산만 순서가 지켜질 뿐임. 

// 따라서 종합해보면 함수를 같은 줄에 ( 하나의 시퀄스에) 박아넣으면 호출순서는 장담할 수 없으니, 조심해야 한다.



// 문제 
int i = 0;
int j = 0;
int k = 0;

if( ++i || ++j && ++k){
    printf("true!\n")
}

printf("%d, %d, %d\n", i, j, k)


// 위 코드의 출력을 맞춰라



// 답은 true!  \n   1, 0, 0 이다. 틀렸으면 넌 망한거다.

// 너가 틀린 이유
/*
    && 연산자가 || 연산자보다 연산자 우선순위에 위에 있으니 

    너는 ++j && ++k 를 먼저 생각했을꺼다. >>> 이거 부터 오류로 시작하는 거다. 평가순서는 연산자 순서랑 아무 상관없다!

    제대로 생각하려면 
    &&와 || 는 "시퀀스 포인트" 이다. 즉 순서대로 지켜야 한다는 것이다. 
    따라서 || 먼저 평가가 되고, 숏썰킷(앞에서 이미 참이 나오면 뒤에것는 더이상 생각할것도없이 참이면 평가를 하지 않는것)평가로 인해 
    뒤에 && 연산은 하지도 않는다. 전위증가 연산자도 하지도 않는다. 따라서 답은

    *시퀀스 포인트는 무조건 왼쪽부터, 위에서부터 순서대로 평가를 진행해야 한다. 

    true!
    1, 0, 0 
    가 나온다. 

*/


//문제2
if(i++ || ++j && ++k) // 는 평가순서는 어떻게될까?
/*  
    후위 증가 연산자의 경우, i가 먼저 평가되고 1이 증가한다. 따라서 이 경우는 i++는 0으로 평가되어 거짓이 된다.
    (일단 앞에는 거짓으로 평가된 후, i는 증가되어 1이 된다.)
    앞에께 거짓이므로 뒤에껏도 평가를 해야하므로 이번에는 &&연산자까지 평가를 한다. 

*/


// 핵심 포인트 : &&, || 는 시퀀스포인트이므로, 평가순서를 강제한다. 
/*

    1. 한 줄에 있는 피연산자들은 기본적으로 평가순서가 보장되지 않는다!
    2. &&, || 는 시퀀스포인트이므로, 한줄에 써도된다. 
    3. 삼항연산자도 평가 순서를 보장한다.  
    4. ;도 당연히 평가 순서를 보장한다.
    5. 함수(함수1, 함수2) 를 실행할때 당연히 함수1, 함수2가 먼저 실행된다. 즉 매개변수가 무조건 먼저 평가된다.

*/



//문제3 
int a = 0;
int b = 3;
int c = 1;

if(--a && c++ || --b){
    printf("it true\n");
}
printf("%d, %d, %d\n" , a, b, c);   // -1 , 3, 2

