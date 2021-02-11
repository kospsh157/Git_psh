// req, res객체에 대해서 살펴보자
/*

    1. 익스프레스의 req, res객체는 http모듈의 req, res객체를 확장한 것이다.
    2. 기존 http모듈의 메서드도 사용할 수 있고, 익스프레스가 추가한 메서드나 속성을 사용할 수도 있다.
    3. 예를 들어 res.writedHead, res.write, res.end메서드를 그대로 사용할 수도 있다. 
    res.send, res.sendFiles같은 메서드도 쓸 수 있다. 다만 익스프레스의 메서드가 워낙 편리하기에
    기존 http모듈의 메서드는 잘 쓰이지 않는다.
    
    4. 여기서는 진짜 자주 쓰이는 것만 설명한다.
    
    req.app :   req객체를 통해 app객체에 접근할 수 있다. req.app.get('port')와 같이 사용

    req.body    :   body-parser미들웨어가 만드는 요청의 본문을 해석한 객체이다.

    req.cookies :   cookie-parser미들웨어가 만드는 요청의 쿠키를 해석한 객체이다.

    req.ip  :   요청의 ip주소가 담겨있다.

    req.params  :   라우트 매개변수에 대한 정보가 담긴 객체이다.

    req.query   :   쿼리스트링에 대한 정보가 담긴 객체이다.

    req.signedCookies   :   서명된 쿠키들은 req.cookies 대신 여기에 담겨 있다.

    req.get(헤더 이름)  :   헤더의 값을 가져오고 싶을 때 사용하는 메서드이다.

    
    < res객체 >

    res.app :   req.app처럼 res객체를 통해 app객체에 접근할 수 있다.                    

    res.cookie(키, 값, 옵션)    :   쿠키를 설정하는 메서드이다.      

    res.clearCookie(키, 값, 옵션)   :   쿠키를 제거하는 메서드이다. 

    res.end()   :   데이터 없이 응답을 보낸다.                

    res.json(JSON)  :   JSON형식의 응답을 보낸다.

    res.redirect(주소)  :   리다이렉트할 주소와 함께 응답을 보낸다.

    res.render(뷰, 데이터)  :   템플릿 엔진을 렌더링해서 응답할 때 사용하는 메서드이다.

    res.send(데이터)    :   데이터와 함께 응답을 보낸다. 데이터는 문자열일 수도 있고, HTML일 수도 있고,
    버퍼일 수도 있고, 객체나 배열일 수도 있다.

    res.sendFile(경로)  :   경로에 위치한 파일을 응답한다.

    res.set(헤더, 값)   :   응답의 헤더를 설정한다.

    res.status(코드)    :   응답 시의 HTTP상태 코드를 지정한다.


*/

// 또한 req, res객체의 메서드는 메서드 체이닝을 지원하는 경우가 많다.
// 따라서 다음과 같이 작성하면 코드양을 줄일 수 있다.
res
    .status(201)
    .cookie('test', 'test')
    .redirect('/admin');
    