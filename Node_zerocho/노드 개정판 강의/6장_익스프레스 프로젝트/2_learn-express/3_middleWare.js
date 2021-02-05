// express는 경량 웹서버 프레임워크이다.
// 하지만 굉장히 많은 수의 미들웨어가 있기 때문에, 필요에 따라 쓰면 된다. 
// 라우터와 에러 핸들러 또한 미들웨어의 일종이라 할 수 있다.
// 미들웨어가 익스프레스의 전부라고 해도 부방하다.
// 요청과 응답을 조작하여 기능을 추가하기도 한다. 

// 미들 웨어는 app.use와 함께 사용된다. 
// app.use(미들웨어) 

const express = require('express');

const app = express();

app.set('port', process.env.PORT | 3000);

// next 라는 새번째 매개변수는 다음 미들웨어로 넘어가는 함수이다.
// next를 실행하지 않으면 다음 미들웨어로 넘어가지 않는다. 
// 주소를 첫 번째 인수로 넣어주지 않는다면, 미들웨어로 모든 요청에서 실행되고, 주소를 넣는다면, 해당 요청에서만 실행된다.

// 미들웨어는 위에서부터 아래로 순서대로 실행되면서, 요청과 응답 사이에 특별한 기능을 추가할 수 있다.

app.use((req, res, next)=>{
    console.log("모든 요청에 다 실행 됩니다.");
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
})

// 미들웨어 실행 조건
/* 
    1. app.use(미들웨어) : 모든 요청에서 미들웨어 실행
    2. app.use('/dddd', 미들웨어) : dddd로 시작하는 모든 요청에서 실행
    3. app.post('/abc', 미들웨어) : abc로 시작하는 모든 요청에서 실행
*/

