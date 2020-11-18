const fs = require('fs').promises;
const http = require('http');

// async 할 때는 항상 에러 처리!! 해야한다.
const server = http.createServer(async (req, res) => {
    try {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        const data = await fs.readFile('./server2.html');
        res.end(data);    
    } catch (err) {
        console.error(err)
        res.writeHead(200, {'Content-Type' : 'text/plain; charset=utf-8'});
        res.end(err.message);
    }
    
})
.listen(8080);

server.on('listening', () => {
    console.log('8080번 포트에서 서버 대기 중입니다');
});

// 비동기에서도 에러가 날 수 있기 때문에 항상 에러 처리를 해줘야 한다.
server.on('error', (err) => {
    console.error(err);
});

