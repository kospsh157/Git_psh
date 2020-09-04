int num = 1; 


switch (num){
    case 0 :
        printf("Hello POCU\n");
        break;
    case 1 :
        printf("Helloo World\n")
        break;
    default :
        printf("invaild entry\n")
        break;
}


// 주의할 점은 다른 언어들과는 달리 조건변수에 (num) 정수형만 가능하다.
// 씨에서 정수형은 다음과 같다
    // int, char, enum 만 가능 하다.


// break를 빼먹으면?
/*
    switch 문을 곧바로 탈출하지 않고 계속 그 아래 코드들을 계속해서 실행
    씨의 캐이스문은 break를 만나거나 switch문의 끝에 도착하면 탈출하게된다. 

*/
// 이렇게 계속 아래에 있는 코드를 실행하는 것을 fall-through 폭포수처럼  다른 언어는 break이 없으면 컴파일 오류를 낸다.

// 그래서 협업할때는 break를 안넣게 될 경우 그 의도를 명백하게 밝히기 위하여 주석으로 
/* intertional fallthorugh */     //주석을 박아 넣는다.

// 또 주의할 점은 case 레이블에는 꼭 상수만 들어가야한다. 배열의 값을 넣거나 그런거 안된다. 
// 정리하자면 switch() 에는 정수값만 들어가고 case 레이블에는 상수값만 들어간다.

