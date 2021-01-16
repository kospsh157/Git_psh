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
    if(req.url.startsWith('/login')){
        const {query} = url.parse(req.url);
        const {name} = qs.parse(query);
        const expires = new Date();
        //쿠키 요휴 시간을 현재 시간 + 5분으로 설정
        expires.setMinutes(expires.getMinutes() + 5);
        res.writeHead(302, {
            Location: '/',
            'Set-Cookie':`name=${encodeURIComponent(name)}; Expries = 
            ${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();

    //name이라는 쿠키가 있는 경우
    }else if (cookies.name){
        res.writeHead(200, {'Content-Type':'text/plain; chaset=utf-8'});
        res.end(`${cookies.name}님 안녕하세요`);
    }else{
        try{
            const data = await fs.readFile('./cookie2.html');
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