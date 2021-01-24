const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = requrie('queryString');

const parseCookie = (cookie='') => {
    cookie
        .split(';')
        .map(v => v.split('='))
        .reduce( (acc, [k,v]) => {
            return acc;
        }, {});
}


http.createServer( async (req, res) => {
    // 요청 중에 쿠키가 있는지 없는지 확인해야함 
    // 만약 여기서 쿠키가 있다면, 정제되어서 cookies에 담길 것이다.
    // 만약 없다면 parseCookie() 함수의 파라미터 기본값이 '' 으로 설정되어 있기 때문에,
    // 빈값으로 cookies에 담길 것이다. 
    const cookies = parseCookie(req.headers.cookie);

    if(req.url.startsWith('/login')){
        // 등록 버튼 눌렀을 때 요청
        // 쿠키를 만들어주고 보내는 과정이 필요함
        const {query} = url.parse(req.url);
        const {name} = qs.parse(query);    
        
        //쿠키 유효시간 만들기
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);
        // 헤더에다 쿠키 만들어 넣기
        // 302는 임시 리다이렉트 응답코드
        res.writeHead(302, { 
            location: '/',
            'Set-Cookie':`name=${encodeURIComponent(name)}; Expires= ${expires.toGMTString()}; HttpOnly; Path=/`,
        });
    }else if(cookies.name){
        // 쿠키가 있는 경우
        res.writeHead(200, {'Content-Type' : 'text/plain; charset=utf-8'});
        res.end(`${encodeURIComponent(cookies.name)}`);
    }else{
        // 쿠키가 없는 경우
        try {
            const homepage = await fs.readFile('./5_test_Cookie.html');
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
            res.end(homepage);    
        } catch (err) {
            console.error(err);
        }
    }
})
    .listen(8080, () => {
        console.log("서버 작동 8080");
    })