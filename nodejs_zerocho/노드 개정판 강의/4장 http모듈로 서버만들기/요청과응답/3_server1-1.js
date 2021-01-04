// listen 메서드에 콜백 함수를 넣는 대신, 다음과 같이 서버에 listening 이벤트 리스너를 붙여도 된다.

const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!!!</h1>');
    res.end('<p>Hello Server!</p>');
});

// 포트 달아주고 
server.listen(8080);

// server에다가 http응답 서버를 만들어놨다.
// 여기에다가 이벤트 리스너를 달아줄 수 있다. 
// 이런식으로 요청에 대한 응답을 할 수도 있다.

// 중요한 점은 응답 소스는 이미 위에 작성되어 있다는 뜻이다.
// 여기서는 listening 이벤트는 노드 서버가 실행된 직후를 말한다. 
server.on('listening', () => {
    console.log('8080번 포트에서 서버 대기 중입니다!');
});
server.on('error', () => {
    console.error(error);
});