fn main(){
    println!("hello, world");
}

// rustc main.rs
// ./main 
// hello world 출력



// 설명
/*
    1. main() 함수가 스타팅 함수이다.
    2. rustfmt라는 포멧팅 도구가 있는데, 아직 공식툴로서는 인정안됐지만, 거의 그렇게 될 수 있다. 
    
    3. 러스트는 탭이 아닌 네 개의 스페이스로 들여쓰기를 한다.
    4. println!은 러스트 매크로(macro)라고 불린다.
    5. !없이 하면 그게 함수이다.
    6. 표현식이 끝나면 ; 으로 마무리해준다. (표현식, 반환식? 개념이 다르게 존재한다 이후에 보면 안다...)

*/