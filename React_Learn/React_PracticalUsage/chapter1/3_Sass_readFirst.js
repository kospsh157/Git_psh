// 이번에는 Sass로 작성하는 방법을 알아본다.

// CSS와 비슷하지만 별도의 문법을 이용해서 생산성이 높은 스타일 코드를 작성할 수 있게 해준다.
// Sass문법에 있는 변ㅅ후, 믹스인(mixin) 등의 개념을 이용하면 스타일 코드를 재사용할 수 있다. 
// 다음은 Sass문법으로 작성된 간단한 코드이다.
$sizeNormal: 100px;         // 1번

.box {
    width: $sizeNormal;     // 2번
    height: 80px;
}

.button {
    width: $sizeNormal;     // 3번
    height: 50px;
}
// 설명
/*
    1번 : 일반적인 프로그램밍 언어처럼 변수를 정의할 수 있다.
    2번,3번 : 이와 같이 변수개념을 사용하면 코드 중복을 없앨 수 있다.

    Sass 문법으로 작성된 파일은 별도의 빌드 단계를 거쳐서 CSS파일로 변환된다.
    따라서 관련 패키지를 설치해야한다.
    create-react-app에서 Sass를 사용하고 싶다면 다음 패키지를 설치하면 된다.
    
    npm install node-sass

    node-sass 패키지는 Sass를 CSS로 빌드할 때 사용된다.
    create-react-app에는 Sass를 위한 빌드 시스템이 구축되어 있다. 자바스크립트에서 scss확장자를 가지는 파일을 불러오면 자동으로 Sass파일이 CSS파일로 컴파일된다.
*/




// 다음 실습을 해보자
// 3_shared.scss, 3_Button.module.scss 파일을 만든 다음 실습을 한번 해보자.
