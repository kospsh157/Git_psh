// npm i morgan cookie-parser express-session dotenv
// 위를 설치하자. dotenv는 process.env를 관리하기 위한 거고 나머지는 다 미들웨어이다.

const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
// body-parser를 사용하여 JSON 타입의 데이터와 주소형식 데이터(GET)를 자동으로 받아서
// 자동으로 자바스크립트 오브젝트로 변화해서 받는다.
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}))

app.use( (req, res, next) => {
    console.log("모든 요청에 다 실행됩니다.");
    next();
});

app.get('/', (req, res,next) => {
    console.log("GET, / 요청에서만 실행됩니다.");
    next();
}, (req, res) => {
    throw new Error("에러는 에러 처리 미들웨어로 갑니다.");
});

// 에러 처리 미들웨어
// 반드시 안쓰더라도, 매개변수가 4개이어야 한다.
// 에러 처리 미들웨어는 기본적으로 맨 아래 위치시킨다.
app.use( (err, req, res, next) => {
    console.error(err);
    // 에러 발생시 http 상태코드를 지정한다.
    res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
    console.log('서버에서 대기중');
});

// .env 파일
// COOKIE_SECRET = cookiesecret

// 여러가지 자주 쓰이는 미들웨어들 설명 
/*
    1. 설치했던 패키지들을 불러온 뒤 app.use에 연결한다.
    2. req, res, next 같은 것들이 보이지 않지만, 미들웨어 내부에 들어있다.
    3. next도 내부적으로 호출하기에 다음 미들웨어로 넘어갈 수 있다.
    4. dotenv패키지는 .env 파일을 읽어서 process.env로 만든다.
        1. 키=값 형식으로 추가하면 된다.
        2. process.env를 별도의 파일로 관리하는 이유는 보안과 설정의 편의성때문이다.
        3. 비밀 키들을 소스 코드에 그대로 적어두면 소스코드가 유출되었을 때 키도 같이 유출된다.
        4. 따라서 .env같은 별도의 파일에 비밀 키를 적어두고 dotenv패키지로 비밀 키를 로딩하는 방식으로 쓴다.
    5. morgan
        1. morgan연결 후 localhost:3000에 다시 접속해보면 기존 로그 외에 추가적인 로그를 볼 수 있다.
        2. morgan은 이렇게 사용된다.
        app.use(morgan('dev'));
        여기서 인수로 dev외에 combined, common, short, tiny 등을 넣을 수 있다.
        인수를 바꾸면 로그가 달라진다. 
        주로 개발환경에서는 dev,
        배포 환경에서는 combined를 쓴다.
        3. 로그 표시는 
        GET / 500 7.409 ms -50 이렇게 나온다
        순서대로 HTTP메서드, 주소, HTTP상태코드, 응답속도, 응답바이트 를 의미한다.
        요청과 응답을 한눈에 볼 수 있어서 개발자들이 쓴다.
    6. static
        1. static미들웨어는 정적인 파일들을 제공하는 라우터 역할을 한다.
        2. 기본적으로 제공되기에 따로 설치할 필요없다. express객체 안에서 꺼내쓰면 된다.
        3. app.use('요청경로', express.static("실제경로"));
        4. app.use('/', express.static(path.join(__dirname, 'public')));
        5. 함수의 인수로 정적 파일들이 담겨 있는 폴더를 지정하면 된다.
        6. 현재 public폴더가 지정되어 있다. 
        7. 예를 들어 저렇게 하면, public/stylesheets/style.css 는 
        http://localhost:3000/stylesheets/style.css 로 접근 가능하다.
        8. public 폴더를 만들고 거기에 정적인 이미지나 css,js, 이미지 파일들을 넣고 쓰는 것이다.
        9. 실제 서버의 폴더 경로에는 public이 들어있지만, 요청 주소에는 public이 들어 있지 않다는 점이 포인트.
        10. 저렇게 하면 외부인이 서버의 구조를 쉽게 파악할 수 없다.
        11. 이는 보안에 큰 도움이 된다.
        12. 정적 파일들을 알아서 제공해주므로, fs.readFile()로 파일을 직접 읽어서 전송할 필요가 없다.
        13. 만약 요청 경로에 해당하는 파일이 없으면 알아서 내부적으로 next를 호출한다.
        14. 만약 파일을 발견했다면, 다음 미들웨어는 실행되지 않는다. 응답으로 파일을 보내고 next를 호출하지 않는다.
    
    7. body-parser
        1. 요청 본문에 있는 데이터를 해석해서 req.body 객체로 만들어주는 미들웨어이다. 
        2. 보통 form 데이터나, ajax 요청의 데이터를 처리한다.
        3. 단 멀티파티(이미지, 동영상, 파일) 데이터를 처리하지 못한다. 
        4. 그 경우에는 뒤에 나오는 multer 모듈을 사용하면 된다.
        body-parse미들에는 다음과 같이 사용한다.
        app.use(express.json());
        app.use(express.urlencoded({extended: false}));
        5. express 4.1.6부터 미들웨어의 일부 기능이 내장되어 있으므로, 따로 설치할 필요없다.
        6. 단 직접 설치해야하는 경우가 있다.
            1. body-parser는 JSON과 URL-encoded형식의 데이터 외에도 Raw, Text 형식의 데이터를 추가로 해석할
            수 있다.
            2. Raw는 버퍼 데이터일때, Text는 텍스트 데이터일때, 해석하는 미들웨어이다.
            3. 이 둘을 쓰려면 따로 설치를 해야 한다.
            npm i body-parser
            
            const bodyParser = require('body-parser');
            app.use(bodyParser.raw());
            app.use(bodyParser.text());
        7. 요청 데이터 종류
            1. JSON은 JSON형식의 데이터 전달 방식이고, 
            2. URL-encoded : 주소형식으로 데이터를 보내는 방식
            3. urlencoded 메서드를 보면 {extended: false} 라는 옵션이 들어 있다. 
            이 옵션이 false면 노드의 querystring모듈을 사용하여 쿼리스트링을 해석하고 true면
            qs모듈을 사용하여 쿼리스트링을 해석한다. 
            qs모듈은 내장모듈이 아니고 npm패키지이며, querystring모듈의 기능을 좀 더 확장한 모듈이다.
            4. express를 쓰지 않고 걍 내부 http모듈로 서버를 만들때는 POST,GET 요청의 본문을 전달
            받을려면 req.on('data')를 써야했다.
            하지만 이제는 body-parser만 쓰면 된다.
            이 패키지가 내부적으로 스트림을 처리해 req.body에 추가한다.
            5. 예를 들면 JSON형식으로 {name: 'zerocho', book: 'nodejs'}를 본문으로 보낸다면,
            req.body에 그대로 들어간다. 
            6. URL-encodeed형식으로 name=zerocho&book=nodejs를 본문으로 보내오면, 
            req.body에 {name: 'zerocho', book: 'nodejs'}가 들어있다. 

    8. cookie-parser
        1. cookie-parser는 요청에 동봉된 쿠키를 해석해 req.cookies객체로 만든다.
        2. 다음과 같이 사용한다
            1. app.use(cookieParser(비밀키));
            2. 해석된 쿠키들은 req.cookies 객체에 들어간다.
            3. 이걸로 최초 쿠키를 만들어서 주는게 아니라, 일단 만들어서 주면, 클라이언트에서 요청을
            할때, 그걸 다시 받을 때 이 패키지를 쓰는 것이다.
            4. 예를 들어 name=zerocho 쿠키를 보냈다면, req.cookies = {name: 'zerocho'}가 된다.
            5. 유효기간이 지난 쿠키는 알아서 걸러낸다.
            6. 첫 번째 인수로 비밀키를 넣어 줄 수 있다.
                1. 서명된 쿠키가 있는 경우, 제공한 비밀 키를 통해 해당 쿠키가 내 서버가 만들어서 준
                쿠키임을 검증할 수 있다.
                2. 쿠키는 클라이언트에서 위조하기 쉬워서 비밀 키를 통해 만들어낸 서명을 쿠키 값 뒤에 붙인다.
                2. 서명이 붙은 쿠키는 name=zerocho.sign과 같은 모양이 된다. 
                3. 서명된 쿠키는 req.cookies 대신 req.signedCookies 객체에 들어 있다.
            7. 쿠키는 생성할 때 쓰는 것은 그냥 res.cookie이다.
                1. res.cookie(키, 값, 옵션) 형식으로 쓴다.
                2. 옵션 : domain, expires, httpOnly, maxAge, path, secure, signed 등이 있다.
            8. 쿠키 삭제는 res.clearCookie이다. 
                1. 쿠키를 지울려면 키와 값 외에 옵션도 정확히 일치해야 지워진다.
                2. 단 expires, maxAge옵션을 일치할 필요 없다.
                3. 옵션 중에는 signed라는 옵션이 있는데, 이를 true로 설정하면 쿠키 뒤에 서명이 붙는다.
                내 서버가 쿠키를 만들었다는 것을 검증할 수 있으므로, 대부분의 경우 이 옵션을 킨다.
                서명을 받기 위한 비밀키는 cookieParser미들웨어에 인수로 넣은 process.env.COOKIE_SECRET
                이 된다.
            9. 다음과 같이 만든다.
            // 쿠키 생성 및 응답 안에 넣기
            res.cookie('name', 'zerocho', {
                expires: new Date(Date.now() + 900000),
                httpOnly: true,
                secure:true,
            });
            // 쿠키 삭제
            res.clearCookie('name', 'zerocho', {httpOnly:true, secure:true});
    
    9. express-session
        1. 세션 관리용 미들웨어이다.
        2. 로그인 등의 이유로 세션을 구현하거나, 특정 사용자를 위한 데이터를 임시적으로 저장해둘 때 매우 유용하다.
        3. 세션은 사용자별로 req.session객체 안에 유지 된다.
        4. 다음과 같이 사용한다.
        app.use(session({
            resave: false,
            saveUninitialized: false,
            secret: process.env.COOKIE_SECRET,
            cookie: {
                httpOnly: true,
                secure: false,
            },
            name: 'session-cookie',
        }));
        express-session 1.5 버전 이전에는 내부적으로 cookie-parser를 사용하고 있다
        따라서 cookie-parser미들웨어 보다 뒤에 위치해야 했다. 
        하지만 1.5 이후 부터는 사용하지 않게 되었다.
        그래도 어떤 버전을 지금 쓰고 있는건지 모른다면, cookie-parser미들웨어 뒤에 놓는것이 안전하다.

        5. 옵션 설명
        express-session은 인수로 세션에 대한 설정을 받는다. 
        resave : 요청이 올 때 세션에 수정사항이 생기지 않더라도, 세션을 다시 저장할지 설정한다.
        saveUninitialized : 세션에 저장할 내역이 없더라도, 처음부터 세션을 생성할지 설정하는 것이다.
        
        세션 관리시 어쩔 수 없이 세션 쿠키를 보낸다. 세션은 결국 이 세션 쿠키로 관리되므로 어쩔 수 없다.
        안전하게 쿠키를 전송하려면, secret옵션이 필요하다.
        secret : 이 옵션이 있으면, 쿠키에 서명을 추가한다. cookie-parser의 secret과 같게 설정하는 것이 좋다.
        
        name : 세션 쿠키의 이름을 설정하는 곳이다. 기본값 이름은 : connect.sid이다. 

        cookie : 세션 쿠키에 관한 옵션이다. maxAge, domain, path, expires, sameSite, httpOnly,
        secure등 일반적인 쿠키 옵션이 모두 제공된다.
        위에코드에서는 httpOnly를 true로 설정해 클라이언트에서 쿠키를 확인하지 못하도록 했다.
        secure는 false로 해서 https가 아닌 환경에서도 사용할 수 있게 했다.
        배포 시에는 https를 적용하고 secure를 true로 하는 것이 좋다.

        store : 주로 세션들은 서버의 메모리에 저장된다. 따라서 서버를 재시작하면 메모리가 초기화 되어 세션 데이터가
        다 사라진다. 그래서 일반적으로 실무에서는 이 store옵션을 이용해서 데이터베이스에 연결한다.
        주로 세션 데이터베이스로는 레디스가 쓰인다.

        6. 세션의 변경
        express-session으로 만들어진 req.session 객체에 값을 대입하거나 삭제해서 세션을 변경할 수 있다.
        나중에 세션을 한 번에 삭제하려면 req.session.destroy() 메서드를 호출하면 된다. 
        핸져 세션의 아이디는 req.sessionID 로 확인한다.
        세션을 강제로 저장하기 위해 req.session.save() 가 존재하지만, 일반적으로 요청이 끝날 때 자동으로
        호출되므로, 직접 사용할 일은 거의 없다.

        req.session.name = 'zerocho'; //세션등록
        req.sessionID;  // 세션 아이디 확인
        req.session.destroy(); // 세션 모두 제거 
        
        7. 브라우저에서 세션의 확인
        express-session 으로 서명한 쿠키값은 조금 다르다.
        항상 맨 앞에 s: 가 붙는다. 
        encodeURIComponent 함수가 실행되어 실제로는 s%3A 가 된다.
        즉 브라우저에서 
        connect.sid=s%3Asdfodskfj443dmsfSDFidsk.. 이렇게 보이게 된다. 
        s%3A 다음 부분이 실제 암호화된 쿠키값이다. 

*/



