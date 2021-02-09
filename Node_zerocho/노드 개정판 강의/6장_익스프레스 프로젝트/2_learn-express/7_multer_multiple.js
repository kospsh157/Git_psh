// 여러 파일을 업로드하는 경우 html의 input태그에는 multiple을 쓰고 
// multer는 mutiple미들웨어를 쓴다.

<form id='form' action="/uploads" method="post" enctype="multipart/form-data">
    <input type='file' name='many' mutiple/>
    <unput type='text' name='title'/>
    <button type='submit'>업로드</button>
</form>

// 미들웨어를 매개변수로 이어 붙여 넣었다.
// upload.array() 다음으로 라우터(화살표함수) 미들웨어가 이어진다.
// 초기 세팅을 한 후 다음 코드가 와야한다.
app.post('/uploads', upload.array('many'), (req, res) => {
    console.log(req.files, req.body);
    res.send('ok');
});
// 업로드 결과도 req.file 객체가 아니라, req.files에 배열로 파일들이 담겨 온다.


// 이미지 파일이 하나씩 따로따로 여러개 업로드 하려면, input 태그도 각각 따로, 여러개를 업로드 해야 하므로 
// fields미들웨어를 사용한다.
<form id='form' action='/uploads' method='post' enctype='multipart/form-data'>
    <input type='file' name='image1'/>
    <input type='file' name='image2'/>
    <input type='text' name='title'/>
    <button type='submit'>업로드</button>
</form>
// field미들웨어의 인수로는 input 태그의 name 속성값을 각각 적으면 된다.
app.post('/uploads', 
    upload.fields([ { name: 'image1' }, { name: 'image2' } ]),
    (req, res) => {
        console.log(req.fields, req.body);
        res.send('ok');
    },
);
// 업로드 결과도 req.files.image1,  req.files.image2에 각각 들어있다. 







// 특수한 경우이지만, 가끔 파일을 업로드하지 않지만, 멀티파트 형식으로 업로드 하는 경우가 있다.
// 그럴때는 none미들웨어를 사용하면 된다.
<form id="form" action="/upload" method="post" enctype="multipart/form-data">
    <input type="text" name="title"/>
    <button type="submit">업로드</button>
</form>

app.post('/upload', upload.none(), (req, res)=>{
    console.log(req.body);
    res.send('ok');
});
// 이 경우에는 파일은 실제로 업로드 되지 않았으므로, req.body만 존재 한다. 

// 정리
/*
    1. upload.single : 이미지 하나, req.file에 있음
    2. upload.array : 이미지들은 req.files에 있고, 나머지 정보는 req.body에 있다.
    3. upload.fields : 위(array)와 동일
    4. upload.none : 이미지는 없으므로, 모든 정보는 req.body에 있다.
*/


