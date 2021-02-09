// 멀터 미들웨어는 어려우므로 한번 사용해보자

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
}));

// multer 사용
const multer = require('multer');
const { nextTick } = require('process');
const fs = requrie('fs');

try{
    fs.readdirSync('uploads');
}catch (error){
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}
const upload = multer({
    // multer({ 지금 이 객체 안임 })
    // storage 프로퍼티에 multer안에 있는 diskStorage함수를 꺼내서 씀 
    storage: multer.diskStorage({
        // multer.diskStorage({ 지금 요 객체 안임 }) 
        // destination 프로퍼티에 destination 함수 정의 
        destination(req, file, done){
            done(null, 'uploads/');
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: {fileSize: 5 * 1024 * 1024},
});

// get요청, upload url요청에 응답해주기 
app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, './8_multer_html.html'));
});


// 미들웨어 (upload)사용, post요청에, /upload url요청에 대하 응답 구현
app.post('/upload', 
    // upload 미들웨어 추가
    upload.fields([{name: 'image1'}, {name: 'image2'}]),

    // 익명 함수(라우터) 미들웨어 추가
    (req, res) => {
        console.log(req.files, req.body);
        res.send('ok');
    }
);

app.get('/', (req, res) => {
    console.log('GET / 요청에서만 실행됩니다.');
    next();
}, (req, res) => {
    throw new Error('에러는 에러처리 미들웨어로 간다.\
    여기는 그냥 라우터 역할만 하자');
});

// 에러 미들웨어는 일반적으로 가장 밑에 작성하고, 4개의 기본 파라미터를 쓰지 않아도 써줘야 한다.
app.use((err, req, res, next) => {
    console.error(err);
    // 상태 코드 지정해서 보내주자 500이면 서버 내부 오류이다.
    res.status(500).send(err.message);
});

app.listen(app.get('port'), ()=> {
    console.log(`현재 ${app.get('port')} 포트에서 서버 대기중...`);
});