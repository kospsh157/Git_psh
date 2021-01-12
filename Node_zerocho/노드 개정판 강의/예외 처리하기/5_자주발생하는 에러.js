// 자주 발생하는 에러들을 모아보았다.

// node : command not found
/*
    노드를 설치해지만 이 에러가 발생하는 경우는 환경변수가 제대로 설정되지 않은 것이다.
    환경 변수에는 노드가 설치된 경로가 포함되어야 한다.
    node 외의 다른 명령어도 마찬가지이다. 그 명령어를 수행할 수 있는 파일이 환경 변수에 들어 있어야 명령어를 콘솔에서 사용할 수 있다.
*/


// ReferenceError : 모듈 is not defined 
/*
    모듈을 require했는지 확인합니다.  
*/


// Error: Can't set headers after they are sent
/*
    요청에 대한 응답을 보낼 때 응답을 두 번 이상 보냈습니다. 요청에 대한 응답은 한 번만 보내야 합니다.
    응답을 보내는 메서드를 두 번 이상 사용하지 않았는지 체크해보세요.
*/

// Error: Cannot find module 모듈명
/*
    해당 모듈을 require했지만 설치하지 않았다.
    npm i 로 설치를 먼저하고 사용하자.
*/

// FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
/*
    코드를 실행할 때 메모리가 부족하여 스크립트가 정상 작동하지 않는 경우이다.
    그러나 실제로는 코드가 잘못되었을 확률이 높으므로, 코드를 점검해봐야한다. 
    만약 진짜 코드는 정상이지만 노드가 활용할 수 있는 메모리가 부족한 경우라면 노드의 메모리를 늘릴수 있다.
    노드를 실행할 때 node --max-old-space-size=4096 파일명 으로 실행하면 된다.
    4096은 4GB를 의미한다. 원하는 용량을 적으면 된다. 
*/


// UnhandledPromiseRejectionWarning: Unhandled promise rejection 
/*
    프로미스 사용시 catch메서드를 붙이지 않으면 발생한다. 
    항상 catch를 붙여 에러가 나는 상황에 대비해야한다.
*/





// 프로세스 종료하기

// win
netstat -ano | findstr 포트
taskkill /pid 프로세스아이디 /f


// mac or lenux
lsof -i tcp:포트
kill -9 프로세스아이디


// EADDRINUSE 포트번호 
/*
    해당 포트 번호에 이미 다른 프로세스가 연결되어 있다.
    그 프로세스는 노드 프로세스일 수도 있고, 다른 프로그램일 수도 있다.
*/  


// EACCES 또는 EPERM 
/*
    노드가 작업을 수행하는데 권한이 충분하지 않다.
    파일/폴더 수정,삭제,생성권한을 확인해보는 것이 좋다. 
    맥이나 리눅스에서는 명령어 앞에 sudo를 붙이는 것도 방법이다.
*/

// EJSONPARSE
/*
    package.json 등의 JSON 파일에 문법 오류가 있을 때 발생힌다.
    자바스크립트 객체와는 형식이 조금 다르니, 쉼표 같은 게 빠지지거나 추가되지 않았는지 확인한다.
*/

// ECONNREFUSED
/*
    요청을 보냈으나 연결이 성립하지 않을 때 발생.
    요청을 받는 서버의 주소가 올바른지 확인.
*/

// ETARGET
/*
    package.json에 기록한 패키지 버전이 존재하지 않을 때 발생한다.
    해당 버전이 존재하는지 확인한다.
*/  

// ETIMEOUT
/*
    요청을 보냈으나 응답이 일정 시간 내에 오지 않을 때 발생.
    역시 요청을 받는 서버의 상태를 점검해야 한다.
*/

// ENOENT: no such file or directory
/*
    지정한 폴더나 파일이 존재하지 않는 경우.
    맥이나 리눅스 운영체제에서는 대소문자도 구별하므로 확인해야 한다.
*/


// 위의 에러들은 앞에 대문자 E 로 시작한다는 공통점이 있다. 