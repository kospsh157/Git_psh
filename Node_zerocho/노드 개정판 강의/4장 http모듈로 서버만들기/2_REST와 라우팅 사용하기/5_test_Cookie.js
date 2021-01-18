const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = requrie('queryString');

http.createServer( (req, res) => {
    const {query} = url.parse(req.url);
    const {name} = qs.parse(query);

    if(req.url.startsWith('/login')){
        // 등록 버튼 눌렀을 때 요청
        // 쿠키를 만들어주고 보내는 과정이 필요함
        
        
    }else if(cookies.name){
        // 쿠키가 있는 경우
    }else{
        // 쿠키가 없는 경우
    }


    
})