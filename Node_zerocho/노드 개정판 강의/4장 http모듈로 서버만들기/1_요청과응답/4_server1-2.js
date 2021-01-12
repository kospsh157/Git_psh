// 한 번에 여러 서버를 실행할 수도 있다.
// 그냥 createServer를 원하는 만큼 호출하면 된다.

const http = require('http');

http.createServer( (req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'} );
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
})
    .listen(8080, () => {
        console.log('8080번 포트에서 서버 대기중');
    });

http.createServer( (req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
})

    .listen(8081, () => {
        console.log('8081번 포트에서 서버 대기중!');
    })

// 설명
/*
    1. 각각 8080, 8081로 접속가능하다.
    2. 포트번호가 같으면 EADDRINUSE 에러가 발생한다.
    3. 단 실무에서는 이런식으로 서버를 여러 개 띄우는 일은 드믈다.
    4. res.write와 rew.end에 일일이 html 코드를 적는 것은 비효율적이다.
    따라서 미리 html파일로 만들자
    그 html파일을 fs모듈로 읽어서 전송할 수 있다.
    다음 예제 server2.html , server2.js 을 통해서 살펴보자.
*/