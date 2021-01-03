// 포트는 서버 내에서 프로세스를 구분하는 번호이다.
// 서버는 HTTP요청을 대기하는 것 외에도 다양한 작업을 한다.
// 데이터베이스와도 통신해야하고, FTP요청을 처리하기도 한다.
// 따라서 서버는 프로세스에 포트를 다르게 할당하여 들어오는 요청을 구분한다.

// 유명한 포트로는
/*  
    1. 21(FTP)
    2. 80(HTTP)
    3. 443(HTTPS)
    4. 3306(MYSQL)
*/

// 포트번호는 ip주소 바로 뒤에 : 과 함께 붙여 사용한다.

// http 는 80번 포트를 자동으로 쓰기 때문에 생략해도 된다.
// http 는 443번 포트를 자동으로 쓰기 때문에 생략해도 된다.

// 주의할 점은 
// 리눅스와 맥에서는 1024번 이하의 포트에 연결할 때 관리자 권한이 필요하다.
// 따라서 명령어 앞에 sudo를 붙여야 한다.
// 8080이나 3000번 포트를 쓸 때는 걍 node server1.js 해도 실행되지만 
// 만약 300번 포트라면, sudo node server1.js 로 실행하고 비밀번호를 입력해야 실행된다.

// 포트 충돌
/*  
    Error:listen EADDRINUSE:::포트번호
    위의 에러는 그 서비스를 종료하거나 노드의 포트를 다른 번호로 바꿔야 한다.
*/