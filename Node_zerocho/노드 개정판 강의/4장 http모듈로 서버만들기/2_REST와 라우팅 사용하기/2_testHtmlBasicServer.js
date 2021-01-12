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
                    // 그리고 받은 데이터를 뽑아서 js 객체에 추가할 때, 
                    // 주의를 해야 한다. 

                    // 일단 여기서는 프론트단에서 {name} 으로 보내서 
                    /*
                        1. {"name" : "value"}
                        2. 이걸 다시 js객체화 하면 
                        3. {name : 'value'}가 된다.
                        4. 따라서 3번값 그대로 사용하면 value값을 사용하는게 아니라 통으로 그게 담겨있는 객체
                        를 사용하게되므로, 잘못하면 본의아니게 2중객체가 만들어질 수 있다.
                        5. 따라서 객체안에 있는value 값만 빼서 써야 할 때는 구조할당을 사용하자 
                    */

                    // 보낼때 JSON으로 굳이 안바꿔도 자동으로 바뀐다.
                    // 따라서 JS형태로 바꿔줘야 한다.
                    const data = await JSON.parse(body);
                    
                    // 위에 처럼 해도 되지만 한번에 구조분해할당을 이용할 수 있다.
                    // const {name} = JSON.parse(body);
                    // body안에 name으로 키값이 설정되어 value가 그안에 있을 것이므로, name키값으로 빼오면된다.
                    // js object : {name : 'value' } 

                    // 고유 키값으로 쓰게 고유값을 만들자.
                    const key = Date.now();

                    // 기존에 있던 names 객체에 row하나로 추가한다.
                    names[key] = data.name;

                }catch(err){
                    console.error(err);
                }
            })
            

         
            

            // 일 처리 잘했다고 응답 해줘야함
            res.writeHead(201, {'Content-Type':'text/plain; chatset=utf-8'});
            console.log('POST 응답 이상무');
            return res.end('서버 응답 완료');
            
        }catch(err){
            res.writeHead(500); // 실전에서 이렇게 직접 500코드를 보내지는 않음
            console.error(err);
            return res.end('POST 서버 오류');
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
                return res.end(JSON.stringify(names));
            }catch(err){
                console.error(err);
            }
        }
    }else if (req.method ==='PATCH'){
        const body = '';
        req.on('data', (data) => {
            body += data;
        });
        req.on('end', () => {
            try{
                // {row} >> {"row":{"key":"value"}} >> 이렇게 포장되어서 JSON 으로올거고 

                // 그걸 다시 row = {key:'value'} 형태로 row 에다가 저장할 것이다.
                const {row} = await JSON.parse(body);

                Object.keys(row).map( (key) => {
                    // 기존 names 객체의 값을 같은 key에 해당하는 새로 수정된 value 값으로 대체
                    names[key] = row[key];
                res.writeHead(201, {'Content-Type':'text/plain; charset=utf-8'});
                return res.end('수정 완료');
                });

            }catch(err){
                res.end(500);
                console.error(err);
            }
        });
    }else if (req.method ==='DELETE'){
        
    }
})
    .listen(8080, () => {
        console.log('서버 실행 중');
    });


// 기존 폴더 구조형식에서 어떤 하나가 폴더명이 바뀌면 잘되는 것도 순간 node 실행이 안될 수 있음
/*
    1. 실제로 내가 폴더명 바꾸니 node에서 모듈을 읽을 수 없다고 서버가 실행되지 않았음 
    2. Not found module 에러
    3. 해결방법 : 콘솔창을 껐다가 키거나, 아니면 새로고침 해주면됨

*/