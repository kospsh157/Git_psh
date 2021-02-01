// 노드에는 http2모듈이 있는데, 이 모듈은 http2통신을 지원하기 위한 모듈이다.
/*
    1. http2기존 http1.1프로토콜 보다 훨씬 더 효율적인 방법으로 통신을 한다. 따라서 더 빠르다.
    2. 가장 큰 차이는 2가지 정도인데, 
    http1.1은 요청을 파일마다 각각 따로따로 순서대로 요청하는데,
    http2는 서로연관된 파일에 대해서는 한꺼번에 묶어서 요청하고 한꺼번에 응답받는다.

    또 한가지는 http1.1은 페이지 렌더링이 되고 서버와의 연결이 바로 종료된다.
    http2는 페이지가 렌더링되도, 연결을 계속 지속한다.
*/

const http2 = require('http2');
const fs = require('fs');

http2.createSecureServer({
    cert: fs.readFileSync('도메인 인증서 경로'),
    key: fs.readFileSync('도메인 비밀키 경로'),
    ca: [
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인증서 경로'),
    ],
}, (req, res) => {
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
})
.listen(443, ()=> {
    console.log('443번 포트에서 대기 중...');
});

// http모듈 대신 http2모듈을 사용하고,
// createServer메서드 대신 createSecureServer메서드를 사용한다.