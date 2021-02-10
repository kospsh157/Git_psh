// 여기서는 외부 라우터 연결 부분에 집중해서 보자  


const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();


// 이 다음 부터 외부 라우터 가져오기 
const indexRouter = require('./routes'); // index.js는 생략 할 수 있기 때문에 이렇게 적어도된다.
const userRouter = require('./routes/user');



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
const fs = require('fs');

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
            // path.basename()메서드는 경로에서 가장 마지막 부분을 짤라서 리턴한다.
            // >>> 파일이름.ext 
            // 여기에서 두 번째 인수로 ext 까지 넣어주면 확장자 부분을 짤라서 정말 파일 이름만 리턴한다.
            // >>> 파일이름

            // path.extname() 
            // var ext = path.extname('/Users/Refsnes/demo_path.js');
            // console.log(ext);  // .js 
            // 즉 확장자만 리턴시킨다.

            // 여기서 file.originalname 은 경로를 포함한 파일의 이름을 담고있다. 
            // 여기서는 /uploads/이미지파일이름.jpg 이렇게 나올 것이다.
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

app.get('/', (req, res, next) => {
    console.log('GET / 요청에서만 실행됩니다.');
    next();
}, (req, res) => {
    throw new Error('에러는 에러처리 미들웨어로 간다.\
    여기는 그냥 라우터 역할만 하자');
});



// 외부 미들웨이 ( = 외부 라우터 ) 연결
// 여기서 요청주소가 다르다. 각각의 외부 라우터 파일로 들어가면 거기에는 / 로 똑같이 작성되어 있지만,
// 여기서 이렇게 다르게 주면 처음 요청주소는 이걸로 시작하기 때문에, 결국에는 서로 다른 요청주소가 된다.
app.use('/', indexRouter);    //     / + / + GET = GET 메소드의 / 요청 주소
app.use('/user', userRouter); //     /user + / + GET = GET메소드의 /user/ 요청주소

app.use(( req, res, next) => {
    res.status(404).send('Not Found!!!');
});





// 에러 미들웨어는 일반적으로 가장 밑에 작성하고, 4개의 기본 파라미터를 쓰지 않아도 써줘야 한다.
app.use((err, req, res, next) => {
    console.error(err);
    // 상태 코드 지정해서 보내주자 500이면 서버 내부 오류이다.
    // 여기 err.message 는 위에서 정의한 new Error에서 써준 에러문구이다.
    res.status(500).send(err.message);
});

app.listen(app.get('port'), ()=> {
    console.log(`현재 ${app.get('port')} 포트에서 서버 대기중...`);
});

