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


http.createServer( (req, res) => {
    

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
            'Set-Cookie':`name=${endoceURIComponent(name)}; Expires= ${expires.toGMTString()}; HttpOnly; Path=/`,
        });
    }else if(cookies.name){
        // 쿠키가 있는 경우
    }else{
        // 쿠키가 없는 경우
    }
    
})