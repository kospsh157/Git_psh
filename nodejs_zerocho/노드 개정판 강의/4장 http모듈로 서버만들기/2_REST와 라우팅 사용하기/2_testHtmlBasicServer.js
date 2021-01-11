
const http = require('http');
const fs = require('fs').promises;

// DB 대체로 빈 객체 저장소 생성
const names = {};
// 콜백 함수의 인자로 반드시 req, res가 들어가야한다. 
http.createServer( async (req, res)=>{
    if(req.method === 'POST'){
        try{
            let body ='';
            req.on('data', (data)=>{
                body += data;
            })
            
            req.on('end', async () => {
                try{
                    // 보낼때 JSON으로 굳이 안바꿔도 자동으로 바뀐다.
                    // 따라서 JS형태로 바꿔줘야 한다.
                    const name = await JSON.parse(body);

                    // BD대체 저장소인 names객체에 저장
                    names[key] = name;
                }catch(err){
                    console.error(err);
                }
            })
            

            // 키값을 구분하기 위해 고유 값 생성
            // 나중에 써도 위에 names[key]에 반영된다.
            const key = Date.now();
            

            // 일 처리 잘했다고 응답 해줘야함
            res.writeHead(201, {'Content-Type':'text/plain; chatset=utf-8'});
            return res.end('서버 응답 완료');
            
        }catch(err){
            
            res.writeHead(500);
            return res.end('POST 서버 오류');
            console.error(err);
        }

    }else if (req.method ==='GET'){
        if(req.url === '/'){
            try{
                const data = await fs.readFile('./2_testHtmlBasic.html');
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
        
                return res.end(data);    
            }catch(err){
                console.error(err);
            }        
        }else{
            // GET 방식에서 /이 아닌 요청은 getName() 함수밖에 없다. 
            try{
                // js 객체를 JSON 문자열로 바꿔서 보낸다.
                
                // JSON.parse() : JSON문자열을 >> JS객체나 값으로 변환
                // JSON.stringify() : JS객체나 값을 >>> JSON 문자열로 변환

                // 값을 보내기 전, JSON 문자열로 바꿔야 한다.
                const jsonNames = JSON.stringify(names);
                return res.end(jsonNames);
            }catch(err){
                console.error(err);
            }
        }
    }else if (req.method ==='PATCH'){

    }else if (req.method ==='DELETE'){
        
    }

    
    




})
    .listen(8080, () => {
        console.log('서버 실행 중');
    });
