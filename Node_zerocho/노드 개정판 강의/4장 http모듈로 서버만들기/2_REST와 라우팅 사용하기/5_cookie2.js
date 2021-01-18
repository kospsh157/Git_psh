const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

// 문자열을 js객체로 바꿔주는 함수
// 화살표 함수이고, 한줄이라서(여기서 한줄은 세미콜론이 한번만 들어간다는 뜻이다.) {}를 생략한 모습이다.
// 게다가 한줄일 경우 return키워드도 생략가능해서 return과 {}가 모두 생략된 모습이다.s
const parseCookies = (cookie = '') => 
    cookie  
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});



http.createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    //주소가 /login으로 시작하는 경우
    /*
        1. 주소가 /login으로 시작할 경우에는 url과 querystring 모듈로 각각 주소와 주소에 딸려 오는 
        query를 분석한다. 
        2. 쿠키의 만료 시간도 지금으로부터 5분뒤로 설정하였고, 이제 302응답코드, 리다이렉트 주소와 함께
        쿠키를 헤더에 넣고 브라우저는 이 응답을 보고 페이지를 해당 주소로 리다이렉트 한다.
        302코드는 임시 리다이렉트 코드이다. 브라우저는 이 응답코드를 받으면 헤더에 있는 location에 따라
        리다이렉트된다. 이때 응답코드가 302이면 임시 리다이렉트이고, 301이면 완전한 리다이렉트이다.
        3. 헤더에는 한글을 설정할 수 없으므로, name변수를 encodeURIComponent메서드로 인코딩한다.
        4. Set-Cookie의 값으로는 제한된 ASCII코드만 들어가야 하므로, 줄바꿈을 넣으면 안된다.
        5. 책에서는 공간 부족으로 줄바꿈이 되었음.

    */
    if(req.url.startsWith('/login')){
        //url.parse() 메서드는 요청url을 읽고 부분 부분으로 나누어 host, query등을 쉽게 반환 받을 수 있다.
        //여기서는 query부분을 쉽게 짤라내서 받아쓸려고 썼다.
        const {query} = url.parse(req.url);
        // queryString 모듈은 string타입의 쿼리를 받아와서 js객체 형태로 바꿔준다
        const {name} = qs.parse(query);

        const expires = new Date();
        //쿠키 요휴 시간을 현재 시간 + 5분으로 설정
        expires.setMinutes(expires.getMinutes() + 5);
        // 쿠키 만드는 방법
        /*  
            1. 쿠키를 설정할 때는 쿠키값과, 각종 옵션들을 같이 넣을 수 있다. 이들 사이는 세미콜론으로 나눈다.
            2. 쿠키에는 들어가면 안되는 글자들이 있다. 대표적으로 한글과 줄바꿈이다. 따라서 한글은 
            encodeURIComponent로 감싸서 넣는다. 
            3. 옵션들은 다음이 있다.
            Expires=날짜 :  만료 기한이다. 이 기한이 지나면 쿠키가 자동 제거된다.
            기본값은 클라이언트가 종료될 때까지이다.
            Domain= 도메인명 : 쿠기가 전송될 도메인을 특정할 수 있다. 기본값은 현재 도메인이다.
            Path= URL : 쿠키가 전솔된 URL을 특정할 수 있다. 기본값은 '/'이고 이 경우 모든 URL에서
            쿠키를 전솔할 수 있다. 
            Secure : HTTPS일 경우에만 쿠키가 전송된다.
            HttpOnly : 설정 시 자바스크립트에서 쿠키에 접근할 수 없다. 쿠키 조작을 방지하기 위해 설정하는게 좋다.
        */
        res.writeHead(302, {
            Location: '/',
            'Set-Cookie':`name=${encodeURIComponent(name)}; Expries = ${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();

    //name이라는 쿠키가 있는 경우
    /*
        1. 그 외의 경우(/로 접속했을때 등), 먼저 쿠키가 있는지 없는지 확인한다.
        2. 쿠키가 없다면 로그인할 수 있는 페이지를 보낸다. 따라서
        처음 방문한 경우에는 쿠키가 없으므로, cookie2.html이 전송된다. 
        4. 쿠키가 있다면, 로그인한 상태로 간주하여 인사말을 보낸다.
    */
    }else if (cookies.name){
        res.writeHead(200, {'Content-Type':'text/plain; chaset=utf-8'});
        res.end(`${cookies.name}님 안녕하세요`);
    }else{
        try{
            const data = await fs.readFile('./5_cookie2.html');
            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
            res.end(data);
        }catch(err){
            res.writeHead(500, {'Content-Type':'text/plain; charset=utf-8'});
            console.error(err.message);
        }
    }
})
    .listen(8080, () => {
        console.log('8080번 서버에서 대기 중..');
    })