const express = require('express');
const app = express();

// 라우터 불러오기
const indexRouter = require('./routes/index');
const nameRouter = require('./routes/name');

// 필요한 미들웨어 모듈 불러오기
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

dotenv.config();




// 포트설정
app.set('port', process.env.PORT || 3500);






// 필수 미들웨어 설정
app.use(morgan('dev')); // 개발자 전용 로고 보기 



// 라우터 연결하기
// 라우터가 모듈이므로 , app.use로 써야한다. app.get으로 쓰지 않도록 한다. .get은 라우터안에 작성해야 한다.
app.use('/', indexRouter);
app.use('/name', nameRouter);



// 404 빈페이지 설정
app.use((req, res) => {
    console.log('클라이언트가 빈페이지 요청을 했습니다.');
    res.send('빈페이지입니다.');
});


// 에러처리 미들웨어 설정
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});


// 마지막으로 포트 열기
app.listen(app.get('port'), () => {
    console.log('현재 복습 및 베이직 서버 가동 중입니다. 포트 : ' + app.get('port'));
});