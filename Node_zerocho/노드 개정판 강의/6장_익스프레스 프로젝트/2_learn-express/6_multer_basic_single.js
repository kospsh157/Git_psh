// 이미지, 동여상 등 비롯한 여러 가지 파일들을 멀티파트 형식으로 업로드할 때 사용하는 미들웨어

// 멀티파트 형식이란 다음과 같이 enctype이 multipart/form-data인 폼을 통해 업로드하는 데이터의 형식이다.

// 기본적으로 프론트 단에서는 이렇게 구현한다.
<form action="/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="image"/>
    <input type='text' name='title'/>
    <button type='submit'>업로드</button>
</form>

// 이런 멀티파티 형식으로 오는 데이터는 서버단에서 body-parser로는 처리할 수 없다.
// 직접 파싱하기도 어려워서 multer라는 미들웨어를 따로 사용하면 된다.

// 설치는 npm i multer

// multer패키지 안에는 여러 종류의 미들웨어가 들어 있다.
// 일단 기본적인 설정부터 알아보자
const multer = require('multer');

const uplaod = multer({
    storage: multer.diskStorage({
        destination(req, file, done){
            done(null, 'uploads/');
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Data.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024},
});

// 설명
/*
    1. storage속성에는 어디에(destination)어떤 이름으로(filename)저장할지 설정한다.
    2. 각각 destination(), filename()함수의 req인자에는 요청 정보가 담겨있다.
    3. 역시 각각의 함수의 매개변수로 있는 file객체에는 업로드한 파일의 대한 정보가 있다.
    4. done 매개변수는 함수이다. 
    첫 번째 인수에는 에러가 있다면, 에러를 넣고,
    두 번째 인수에는 실제 경로나 파일이름을 넣어준다.
    5. 결국 req, file의 데이터를 가공해서 done함수로 넘겨주는 방식이다.
    6. 위에서는 [파일명 + 현재시간.확장자] 파일명으로 업로드하고 있다. 
    7. limits속성에는 업로드에 대한 제한 사항을 설정할 수 있다. 
    fileSize 의 단위는 바이트이다.
    따라서 위에서는 
    바이트 * 1024 = KB,
    KB * 1024 = MB,
    따라서 5MB가 제한이다.

    8. 현재 destination()에서 uploads/ 위치로 잡혀있기 때문에 서버에 반드시 저 경로로 폴더가 있어야 한다.
    없다면 직접 만들어주거나, 다음과 같이 fs모듈을 사용해서 서버에 시작할 때 생성한다.
    const fs = require('fs');
    try {
        fs.readdirSync('uploads');  // 읽기에 실패하면 catch로 빠져서 폴더를 생성한다.
    }catch(error){
        console.error('uploads폴더가 없어 uploads폴더를 생성합니다.');
        fs.mkdirSync('uploads');
    }

*/



// 설정이 끝나면 upload 변수가 생긴다.
// 여기에 다양한 종류의 미들웨어가 들어 있다.
// 먼저 파일 하나만 업로드하는 경우, single 미들웨어를 사용한다.
app.post('/uploads', uplaod.single('image'), (req, res) => {
    console.log(req.file, req.body);
    res.send('ok');
});

// 위 코드 설명
/*
    1. single미들웨어를 라우터 미들웨어 앞에 넣어두면, multer 설정에 따라 파일 업로드 후 req.file객체가 생성된다. 
    2. upload싱글 미들웨어의 인수에는 input태그의name이나 폼 데이터의 키와 일치하게 넣으면 된다.
    3. 업로드 성공 시 결과는 req.file객체 안에 들어있다.
    4. req.body에는 파일이 들어있지 않다. 여기에는 title데이터가 들어있다.
*/

// file객체는 다음과 같이 생겼다.
{
    fieldname: 'img',
    originalname: 'nodejs.png',
    encoding: '7bit',
    mimetype: 'image/png',
    destination: 'uploads/',
    filename: 'nodejs3342534.png',
    path: 'upload\\nodejs3342534.png',
    size: 54444
}
