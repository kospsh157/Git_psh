// 만약 파일을 응답하고 싶다면 res.sendFile()메서드를 사용하면 된다.
const express = require('express');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    // res.send();
    res.sendFile(path.join(__dirname, '/2_index.html'));
});

app.listen(app.get('port'), ()=>{
  console.log(app.get('port'), '번 포트에서 대기 중...');
})