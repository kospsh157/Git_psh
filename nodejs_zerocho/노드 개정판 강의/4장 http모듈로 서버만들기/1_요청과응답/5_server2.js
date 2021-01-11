const http = require('http');
const fs = require('fs').promises;
// fs 모듈에 promises 를 걸지 않으면 콜백함수에 async 를 쓸 수 없다.
// 그 말은 promises를 걸어버리면, 콜백함수에 acync를 걸고 비동기 메서드 앞에 await를 걸 수 있다는 것이다.
http.createServer(async (req, res) => {
    try{
        const data = await fs.readFile('./5_server2.html');
        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
        res.end(data);
    }catch(err){
        console.error(err);
        res.writeHead(500, {'Content-Type' : 'text/plain; charset=utf-8'});
        res.end(err.message);
    }
})
    .listen(8081, ()=>{
        console.log('8081번 포트에서 서버대기중');
    });
    
// 설명
/*
    1. 요청이 들어오면 먼저 fs 모듈로 html파일을 읽는다.
    2. data변수에 저장된 버퍼를 그대로 클라이언트에 보낸다.
    3. 이전 예제에서는 문자열을 보냈지만, 저렇게 버퍼를 보낼 수도 있다.
    4. 예기치 못한 에러가 발생한 경우에는 에러 메시지를 응답한다. 에러 메시지는 일반 문자열이므로, text/plain을 사용했다.


    5. 또한 try/catch 로 감싸서 fs 모듈에서 에러가 날 경우도 대비했다는 점
    6. fs 모듈에 promises를 걸면, fs 이하 메서드의 콜백함수에 async를 걸고 await를 사용할 수 있다는 점)
    
*/