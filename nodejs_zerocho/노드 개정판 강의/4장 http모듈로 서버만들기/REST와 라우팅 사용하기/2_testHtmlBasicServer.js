
const http = require('http');
const fs = require('fs').promises;

// 콜백 함수의 인자로 반드시 req, res가 들어가야한다. 
http.createServer( async (req, res)=>{
    try{
        const data = await fs.readFile('./2_testHtmlBasic.html');
        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});

        return res.end(data);    
    }catch(err){
        console.error(err);
    }
    
})
    .listen(8080, () => {
        console.log('서버 실행 중');
    });
