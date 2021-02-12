// 익스프레스와 시퀄라이즈 연결코드를 작성하자
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const { sequelize } = require('./models');

const app = express();

app.set('port', process.env.PORT || 3001);
app.set('view engine', 'html');
nunjucks.configure('view', {
    express: app,
    watch: true,
});

// 시퀄라이저 사용 시작 
// force: false옵션은 서버 실행 시마다 테이블을 재생성하는 유무이다.
// 지금은 false로 되어 있으므로, 매번 서버 실행시마다 테이블을 재생성하지 않는다.
// 테이블을 잘못 만든 경우에 true로 설정하면 된다.
sequelize.sync({force: false})
    .then( () => {
        console.log("데이터베이스 연결 성공");
    })
    .catch( (err) => {
        console.log(err);
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// 가장 아래쪽에 404라우터와, 오류 라우터 만들어주기
// 여기까지 왔다는 것은 위에 어떤 라우터도 없어서 응답은 아직까지 안해준 상태라는 것이다.
app.use( (req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터는 없습니다.`);
    error.status = 404;
    
    // 바로 error 라우터로 가라
    next(error);
})
// error라우터
app.use( (err, req, res, next) => {
    res.locals.message = err.message;
    // 노드 환경 설정에서 배포용인지 아닌지 알 수 있다. 여기서 배포용이면 에러 메시지를 보여주면 보안상 문제가 있다.
    // 다라서 배포용인지 확인하고 개발용이면 에러 트랙커 메시지를 보여주자.
    // 배포용이면 그냥 빈 객체로 넣는다.
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};

    // 위의 코드에 의해 배포용이 아니면 res.locals.error = err를 담고
    // 배포용이면 res.locals.error = {} 는 빈객체가 된다.

    // err로 넘어온 에러객체에서 상태값을 확인해서 있으면 그걸로 보내고 없으면 500으로 찍어서 보낸다.
    res.status(err.status || 500);
    // error페이지를 렌더링해서 보내준다.
    res.render('error');
});

// 마지막에 서버 리스너를 달아준다.
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});

// 설명
/*
    1. require('./models') 는 ('./models/index.js') 와 같다. 폴더 내의 index.js파일은 무조건 생략가능하다.
    2. db.sequelize를 불러와서 sync메서드를 사용해 서버 실행시 mysql과 연동되도록 되어 있다.
    3. {force : false} 옵션을 설정하면, 서버 재실행시마다 테이블을 재생성하지 않는다. 테이블을 잘못 만들었을때 true로 사용한다.
    4. MySql과 연동할 때는 config폴더 안의 config.json정보가 사용된다. 다음과 같이 수정한다.
    만약 이 파일에 자동 생성된 operatorAliases 속성이 들어 있다면, 삭제한다.
    {
        "development" : {
            "username": "root",
            "password": "[root 비밀번호]",
            "database": "nodejs",
            "host": "127.0.0.1",
            "dialect": "mysql"
        },
        ...
    } 

    위를 자신의 MySql 커넥션 정보에 맞게 수정하면 된다.
    test와 production쪽은 각각 테스트 용도와 배포 용도로 접속하기 위해 사용되는 것이므로, 여기서는 설정하지 않는다.

    이 설정은 process.env.NODE_ENV가 development일 때 적용된다. 
    (기본적으로 development이다.)

    나중에 배포할 때는 process.env.NODE_ENV는 production으로 설정해야 한다.
    그에 따라서 배포 환경을 위해 데이터베이스를 설정할 때는 config/config.jso의 production속성을 수정해야 한다. 

    test상황일 때도 마찬가지다. 똑같이 맞춰서 설정해주면 된다.

    
*/