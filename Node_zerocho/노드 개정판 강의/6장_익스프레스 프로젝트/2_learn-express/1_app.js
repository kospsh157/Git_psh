// 우선 
// npm init 해서 package.json을 만들고
// npm i express
// npm i -D nodemon
// 위 2개를 설치한다.

// scripts 부분에 start속성은 꼭 다음과 같이 잊지말고 넣어줘야 한다. 
// "start" : "nodemon app"

// nodemon은 개발중일 때만 사용하고 배포시에는 쓰지 않는다.


const express = require('express');

const app = express();

// process.env 객체에 PORT속성이 있다면 그 값을 사용하고, 없다면 기본값으로 3000을 써라
app.set('port', process.env.PORT || 3000);
// app.set(키, 값) 으로 데이터를 저장 할 수 있다.
// app.get(키) 으로 데이터를 불러 올 수 있다.


// app.get(주소, 라우터) 는 주소에 대한 GET요청이 올 때, 어떤 동작을 할지 적는 부분이다.
// 매개변수 req는 요청에 관한 정보가 들어있는 객체이고, res는 응답에 관한 정보가 들어있는 객체이다.
// express에서는 res.write(), res.end() 대신에 그냥 res.send()를 사용하면 된다.
app.get('/', (req, res) => {
    res.send("Hello, Express");
});
// GET요청 외에도 POST, PUT, PATCH, DELETE, OPTIONS 에 관한 라우터를 위한 메서드도 각각 존재한다.
// app.post, app.put, app.patch, app.delete, app.options 


app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
