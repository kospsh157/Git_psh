// https모듈은 웹 서버에 SSL암호화를 추가한다.
/*
    get post요청을 할 때 오가는 데이터를 암호화해서 중간에 다른 사람이 요청을 가로채더라도, 내용을 확인할 수 없게
    한다.
    요즘은 로그인이나 결제가 필요한 창에서 https적용이 필수이다.

    암호화를 적용하려면 https 모듈을 사용해야 한다.
    그러나 https는 아무나 사용할 수 있는 것이 아니다 암호화를 적용하는 만큼, 그것을 인증해줄 수 있는 기관도 필요한데,
    인증서는 인증 기관에서 구입을 해야 하며, Let's Encrypt 같은 기관에서 무료로 발급하기도 한다.

    인증서 발급 과정은 복잡하고 도메인도 필요하므로, 인증서를 발급받는 방법은 책에서 소개하지 않는다.
*/


const http = require('http');
const { Http2ServerRequest } = require('http2');

http.createServer( (req, res) => {
    res.writeHead(500, { 'Content-Type':'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>');
    res.end('<p> Hello Server! </p>');
})
    .listen( 8080, () => {
        console.log('8080번 포트에서 서버 대기 중입니다.');
    })

// 위와 같은 서버가 있을 때 만약, 발급 받은 인증서가 있다면, 다음과 같이 하면 된다.

const fs = requrie('fs');

https.createServer({
    cert: fs.readFileSync("도메인 인증서 경로"),
    key: fs.readFileSync("도메인 비밀키 경로"),
    ca: [
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인증서 경로')
    ],
}, (req, res) => {
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    res.write("<h1> Hello Node! </h1>");
    res.end('<p> Hello Server! </p>');

})
    .listen(443, () => {
        console.log("443번 포트에서 서버 대기 중...");
    });


// 설명 
/*
    1. 인증서를 발급 받으면, pem, crt, key 확장자를 가진 파일들을 받을 것이다. 
    2. 각 옵션(cert, key, ca) 에 맞게 readFileSync로 읽어서 주면 된다. 
    3. 실제 서버에서는 80포트 대신 443 포트를 쓴다.

*/