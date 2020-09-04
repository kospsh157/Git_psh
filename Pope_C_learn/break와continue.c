// 반복문 실행 도중 탈출하려면 break 
// for문, do-while문에서도 사용가능


size_t num = 10;

while(num>0){
    if(num == 5){
        --num;
        continue;
    }
    printf("Count donw... %d\n", num);
    --num;
}


// 컨티뉴는 자기회차를 건너뛰라는 소리와 같다. 
// 따라서 컨티뉴 다음의 코드는 실행되지 않고 다음 반복회차로 넘어간다. 

