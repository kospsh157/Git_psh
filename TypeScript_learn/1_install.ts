// 타입 스크립트 준비하기 
/* 
 
    플로젝트 폴더 안에서 일단 npm init -y

    프로젝트 폴더 만들고 그 안에 들어가서
    npx tsc --init 

    글로벌 설치 해도 된다면, 
    npm install -g typescript 
    하고 
    tsc --init
    그러면 package.json, tsconfig.json 파일이 생긴다. 

*/


// tsconfig.json 설명
/*
    1. target : 여기서 화살표함수 쓰려면 es6로 적어야 한다. 
    만약 es5로 되어 있다면, 만약에 js 소스 파일에서 화살표 함수를 쓰고 있다면, 전부다 function() 키워드 함수로 바뀐다.
    
    2. module : 모듈 시스템을 정의한다.
    commonjs >> export default Something >> export.default = "helloworld"; 로 바꿔준다.
    es2015 >> export default Something >> 그대로 변환하지 않고 export default Something

    3. strick : 모든 타입 체킹 활성화

    4. esModuleInterop: commonjs 모듈 형태로 이루어진 파일을 es2015 모듈 형태로 불러올 수 있게 해줌.
    5. outDir : 컴파일된 파일을 어디에다 저장 할 지 경로를 정한다.
*/