// 러스트의 장점
/*
    1. C/C++와 맞먹는 속도
    2. 메모리 안전성 뛰어남
    3. 웹 어셈블리로 컴파일할 수 있음
    4. 엄청나게 잔소리 해주는 컴파일러
    5. rustup를 이용하면 설치 및 환경 구성이 빠르고 간단

*/


// 설치
/*
    curl https://sh.rustup.rs -sSf | sh -s -- --help
    위 명령어로 rust의 툴체인 인스톨러 rustup이 설치된다.

    rustup이 rustc와 패키지 매니저인 Cargo(카고)를 설치한다.
    빌드, 테스트, 문서화, 배포 모든 것을 카고로 커버할 수 있다. 
    
    그리고 
    brew install rust 로 rust를 설치한다.
    이제 끝 

    cargo new 명령으로 새 프로젝트를 생성
    프로젝트 폴더의 Cargo.toml 파일에 디펜던시를 추가하면 크레이트(Crate)라고 부르는 외부 패키지를 바로 사용할 수 있다.
    cargo build 명령으로 프로젝트를 빌드
    cargo run 명령으로 컴파일, 실행할 수 있다.

    cargo new hello_world --bin
    cd hello_world
    cargo build
    cargo run
    
    러스트에서는 파일명을 명명할 때 스네이크방식을 사용한다. 
    즉 helloWorld.rs 는 >>> hello_world.rs 이다.

    
*/