// 미들웨어의 특성을 다시 총 정리해보자

const morgan = require("morgan");

app.use( (req, res, next)=> {
    console.log('모든 요청에 다 실행된다.');
    next();
});

// 미들웨어는 req, res, next를 매개변수로 가지면서 각자 기능이 있는 함수로서, app.use나 app.get, app.post
// 로 express서버에 장착한다. (단, error핸들러는 err, req, res, next 4개의 파라미터를 갖는다.)
// 특정한 주소의 요청에만 미들웨어가 실행되게 하려면 첫 번째 인수로 주소를 넣으면 된다.
app.use(
    morgan('dev'),
    express.static('/', path.join(__dirname, 'public')),
    express.json(),
    express.urlencoded({ extended: false}),
    cookieParser(process.env.COOKIE_SECRET),
)
// 위와 같이 동시에 여러개의 미들웨어를 장창할 수도 있다. (하지만 주의 사항이 있다. 끝까지 읽어봐라)
// 다음 미들웨어로 넘어가려면 next함수를 호출해야한다.
// 위 미들웨어들은 내부적으로 next를 호출하고 있기 때문에 연달아 쓸 수 있다. 
// next를 호출하지 않은 미들웨어는 어떻게든 res.send() res.sendFile() 등의 메서드로 응답을 해야 한다. 
// express.static과 같은 미들웨어는 정적 파일을 제공할 때, next대신 res.sendFile() 메서드로 응답을 보낸다.
// 따라서 정적파일을 제공하는 경우, 위의 코드에서 express.json, express.urlencoded, cookieParser 미들웨어들이
// 전부 다 실행되지 않는다. 미들웨어의 특성에 따라 동시 적으면 안되는 것이 있다.

// 만약 next도 호출하지 않고, 응답도 보내지 않으면, 클라이언트는 응답을 받지 못해 하염없이 기다리게 된다.

// next() 인수 안에는 다음 3가지 인수를 넣을 수 있다.
// next()  : 다음 미들웨어로
// next('route') : 다음 라우터로
// next(error) : 에러 핸들러로 (이는 꼭 error가 아니라 'route'외의 어떤 매개변수를 적어도 에러핸들로러 간다.)
// next(dfsdf) 에러로 갈 때 매개변수는 에러처리 미들웨어의 err매개변수가 된다. 따라서 어떤 에러인지 보려면 잘 적는게 중요하다.

// 미들웨어 간에 데이터를 전달하는 방법이 있다.
/*
    1. 세션을 사용한다면, req.session 객체에 데이터를 넣어서 사용하면 되지만, 세션이 유지되는 동안에
    데이터도 계속 유지된다는 단점이 있다.
    2. 만약 요청이 끝날 때까지만 데이터를 유지하고 싶다면, req객체에 데이터를 넣어두면 된다.
*/
// 주의 할 점은 프론트단에서 데이터를 넣어서 보내는게 아니라, 
// 내부적으로 데이터가 다음 모듈에도 넘겨서 받고 싶을 때를 말하는 것이다.
app.use((req, res, next) => {
    req.data = '데이터 넣기';  // 여기서 다음 모듈에 넘기고 싶은 데이터를 넣는다.
    next();
}, (req, res, next) => {
    console.log(req.data);  // 다음 모듈에서 이전 모듈에 있던 데이터를 받는다.
    next();
});
// 현재 요청이 처리되는 동안, req.data를 통해 미들웨어 간에 데이터를 공유할 수 있다.
// 새로운 요청이 다시 오면 req.data는 초기화 된다.
// 속성명이 꼭 data일 필요는 없지만 다른 미들웨어와 겹치기 않게 조심해야 한다.
// 예를 들어 속성명을 body로 한다면, body-parser미들웨어에서 쓰는 기능과 겹치게 된다.

// app.set으로 데이터를 넣는것과 req.data = 로 데이터를 넣는것과의 차이점
/*
    app.set으로 익스프레스에서 데이터를 저장할 수도 있다.
    저렇게 저장하면 app.get, req.app.get() 으로 어디서든지 데이터를 가져올 수 있다.
    하지만 app.set()을 사용하지 않고 req객체에 데이터를 넣어서 다음 미들웨어로 전달하는 이유가 있다.
    전역적으로 사용자 개개인의 값을 넣기에는 부적절하며, 앱 전체의 설정을 공유할 때만 사용하면 된다.
    req객체는 요청을 보낸 사용자 개개인에게 귀속되므로, req객체를 통해 개인의 데이터를 전달하는 것이 좋다.
*/



// 미들웨어를 사용할 때 유용한 패턴 
/*
    미들웨어 안에 미들웨어를 넣는 방식이다.
    다음 예제 두 방식은 같은 기능을 한다.
*/
app.use(morgan('dev')); // 이 코드는 다시 다음과 같이 쓸 수 있다.

app.use((req, res, next) => { // 익명함수 자체가 어떤 한 미들웨어이다. 따라서 미들웨어 안에 morgan()미들웨어를 넣은 것이다.
    morgan('dev')(req,res,next);
});

// 이 패턴이 유용한 이유는 기존 미들웨어의 기능을 확장할 수 있기 때문이다.
// 예를 들어 다음과 같이 분기 처리를 할 수도 있다.
// 조건문에 따라 다른 미들웨어를 적용하는 코드이다.
app.use( (req, res, next) => {
    if(process.env.NODE_ENV === 'production'){
        morgan('combined')(req, res, next);
    }else{
        morgan('dev')(req, res, next);
    }
});
// 따라서 계속 이 패턴을 몸에 익히는게 좋을 것이다.