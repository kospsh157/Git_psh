const http = require('http');
const fs = require('fs').promises;

const users = {}; // 데이터 저장용 
http.createServer(async (req, res) => {
    try{
        console.log(req.method, req.url);
        if(req.method === 'GET'){
            if(req.url === '/'){
                const data = await fs.readFile('./2_restFront.html');
                res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                return res.end(data);
            }else if(req.url === '/about'){
                const data = await fs.readFile('./2_about.html');
                res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                return res.end(data);
            }else if(req.url === '/users'){
                res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
                return res.end(JSON.stringify(users));
            }
            // 주소가 /도 /about도 /users도 아니면
            try{
                const data = await fs.readFile(`.${req.url}`);
                return res.end(data);
            }catch(err){
                // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
            }
        }else if(req.method === 'POST'){
            let body ='';
            // 요청의 body를 stream형식으로 받음
            req.on('data', (data) => {
                body += data;
            });
            // 요청의 body를 다 받은 후 실행됨
            return req.on('end', () => {
                console.log('POST 본문 (Body):', body);
                const {name} = JSON.parse(body);
                const id = Date.now();
                users[id] = name;
                res.writeHead(201);
                res.end('등록 성공');
            });
        }else if(req.method === 'DELETE'){
            if(req.url.startsWith('/user/')){
                const key = req.url.split('/')[2];
                delete users[key];
                return res.end(JSON.stringify(users));
           }
        }else if(req.method === 'PUT'){
            if(req.url.startsWith('/user/')){
                const key = req.url.split('/')[2];
                let body = '';
                req.on('data', (data) => {
                    body += data;
                });
                return req.on('end', () => {
                    console.log('PUT 본문(Body):',body);
                    users[key] = JSON.parse(body).name;
                    return res.end(JSON.stringify(users));
                });
            }
        }
        res.writeHead(404);
        return res.end('NOT FOUND');
    }catch(err){
        console.error(err);
        res.writeHead(500, {'Content-Type' : 'text/plain; charset=utf-8'});
        // 실무에서는 500전송하는 것은 별로 없다.
        res.end(err.message);
    }
})
    .listen(8082, () => {
        console.log('8082번 포트에서 서버 대기 중');
    });

// 설명
/*
    1. req.method 로 HTTP 요청 메서드를 구분하고 있다.
    2. 메서드가 GET이면 다시 req.url로 요청 주소를 구분한다.
    3. 주소가 /일 때는 restFront.html을 제공하고, 주소가 /about이면 about.html파일을 제공한다.
    4. 이외의 경우에는 주소에 적힌 파일을 제공한다.
    5. /restFront.js라면 restFront.js파일 제공할 것이다.
    6. 만약 존재하지 않는 파일을 요청했거나, GET메서드 요청이 아닌 경우라면, 404 NOT FOUND에러가 응답으로 전송된다.
    7. 응답 과정 중에 예기치 못한 에러가 발생한 겨웅에는 500에러가 응답으로 전송된다.
    (실무에서 500을 전송하는 경우는 드물다.)


    8. res.end 앞에 return을 붙인 이유
    입문자들의 착장 중 하나가 res.end() 메서드를 호출하면 함수가 종료된다는 것이다.
    노드도 자바스크립트 문법을 따르므로, return을 만나기 전까진 함수는 종료되지 않는다.
    따라서 다음에 코드가 이어지는 경우에는 return을 써서 명시적으로 함수를 종료한다.
    return을 붙이지 않으면, res.end같은 메서드가 여러 번 실행된다면, 
    Error : Can't set headers after they are sent to the client.
    에러가 발생한다.

    9. HTTP 요청 메서드 마다 분기점이 다른 것을 확인.
    10. 데이터베이스 대용으로 users라는 객체를 선언하여 사용자 정보를 저장했다.
    11. POST /user 요청에서는 사용자를 새로 저장하고 있으며, 
    12. PUT /user/아이디 요청에서는 해당 아이디의 사용자 데이터를 수정하고 있다.
    13. DELETE /user/아이디 요청에서는 해당 아이디의 사용자를 제거한다.
    
    14. POST와 PUT 요청을 처리할 때 유심히 보자
    15. req.on('data'), req.on('end')의 사용이다.
    16. 요청의 본문에 들어 있는 데이터를 꺼내기 위한 작업이다.
    17. req와 res도 내부적으로는 스트림(각각 readStream과 writeStream)으로 되어 있으므로 
    요청 /응답의 데이터가 스트림 형식으로 전달된다. 
    18. 또한 on에서 볼 수 있듯이 이벤트도 달려 있다. fs모듈 배울 때 배운 내용이다.
    19. 다만 받은 데이터는 문자열이므로, JSON으로 만드는 JSON.pase 과정이 필요하다.

*/