const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = reuqire('querystring');

const parseCookies = (cookie='')=>
    cookie
        .split(';')
        .map(v => v.split('='))
        .reduce( (acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
        }, {});

const session = {}; 



// 세션 저장 방식 = (쿠키인데 시간 제한이 있는 쿠키)
// 핵심은 세션을 데이터를 노출시키지 않는다. 
// 브라우저로 전달되는 쿠키값의 내용은 서버에 저장되어 있는 세션객체의 고유 프로퍼티명일 뿐이다.
// 프로퍼티명으로 쿠키에 담아 보내고, 
// 다시 오는 쿠키를 확인 할 때는 고유 프로퍼티명으로 서버에서 세션에 해당 프로퍼티가 있는지 찾아보고 
// 있다면, 해당 세션 프로퍼티의 값을 내부적으로 사용하는 것이다.
/*
    1. 우선 session 객체를 만든다.
    2. 고유값을 만들어주는 함수를 쓰거나 만들거나 한다 여기서는 Date.now() 메서드를 사용.
    3. session 의 프로퍼티 값을 고유값으로 정하고 해당 프로퍼티에 진짜 데이터를 담는다.
    4. 세션 쿠키 데이터로는 해당 고유값을 저장한다.
    5. 이렇게 만들어진 세션 쿠키는 다음과 같이 조회한다.
        1. cookies.session 에는 고유값 즉 session의 프로퍼티값이 담겨있을 것이다.
        2. 따라서 세션에는 프로퍼티 키값만 저장되고 진짜 데이터가 담겨있는 오브젝트는 서버에 session객체에 저장되어 있다.
        3. 따라서 조회는 session[cookies.session].name 으로 하면 실데이터 name에 해당하는 값을 얻을 수 있다.
*/
http.createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);

    if(req.url.startsWith('/login')){
        const { query } = url.parse(req.url);
        console.log(query);
        const { name } = qs.parse(query);
        console.log(name);

        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);
        const uninqueInt = Date.now();
        session[uniqueInt] = {
            name,
            expires,
        };
        res.writeHead(302, {
            Location:'/',
            'Set-Cookie':`session= ${uniqueInt}; Expires= ${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();


        // 세션 쿠키가 존재하고, 만료 기간이 지나지 않았다면
    }else if(cookies.session && session[cookies.session].expires > new Date()){
        res.writeHead(200, {'Content-Type' : 'text/palin; charse=utf-8'});
        res.end(`${session[cookies.session].name} 님 안녕하세요`);

    }else{
        try {
            const data = await fs.readFile('./5_cookie2.html');
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
            res.end(data);

            
        } catch (err) {
            res.writeHead(500, {'Content-Type' : 'text/html; charset=utf-8'});
            res.end(err.message);

            
        }
    }
})
.listen(8080, () => {
    console.log('8080 포트에서 기다립니다');
})


// 설명 
/*
    1. 서버에 사용자 정보를 저장하고 클라이언트와는 세션 아이디로만 소통하는 방식이 세션 방식이다.
    2. 세션 아이디는 꼭 쿠키를 사용해서 주고 받지 않아도 된다. 하지만 많은 웹사이트가 쿠키를 이용한다.
    3. 쿠키를 사용하는 방법이 가장 간단하기 때문이다.
    4. 이런 쿠키들을 세션 쿠키라고 한다.
    5. 실제 배포용 서버에서는 세션을 위와 같이 노드 프로세서 변수에 저장하지 않는다.
    6. 서버가 멈추거나 재시작 되면 초기화 되기 때문이다.
    7. 보통은 레디스나 멤캐시드같은 데이터베이스에 넣어둔다.
    8. 서비스를 새로 만들 때마다 쿠키와 세션을 직접 구현할 수는 없다. 
    9. 이 방식은 세션 아이디 값이 공개되어 있기 때문에 위험하다. 
    10. 반드시 미리 만들어논 검증된 코드를 사용하는 것이 좋다. 

*/