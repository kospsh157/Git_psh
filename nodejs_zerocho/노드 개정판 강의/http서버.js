const http = require('http');


const server = http.createServer( (req, res) => {
    res.write('<h1> Hello Node!</h1>');
    res.write('<p> Hello server</p>');
    res.end('<p> Hello ZeroCho</p>');

})  // 이 노드 프로그램을 8080포트에 프로세스로 돌린다.
    .listen(8080);


 // 하나의 호스트, 도메인에 여러개의 포트를 지정해서 여러개의 노드 프로그램(서버)을 연결해서 보여줄 수 있다.
 

 // on 함수로 서버의 핸들링을 더 쉽게 할 수 있다.
 server.on('listeing', () =>{
     console.log('8080번 포트에서 서버 대기 중입니다.');
 });

 server.on('error', (error) =>{     // http 서버 메서드도 다 비동기 관련 코드이기 때문에 에러처리를 해주자
     console.error(error);
 });


// 서버는 수정 뒤 다시 껐다가 켜야만 적용이 된다.







