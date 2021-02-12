// 먼저 필요한 패키지를 설치 한다.
// npm i express morgan nunjucks sesquelize-cli mysql2
// npm i -D nodemon

// 시퀄라이즈는 자바스크립트 객체와 데이터베이스의 관계를 매핑해주는 ORM(object-relational Mapping) 이다.

// 설명 
/*  
    1. sequelize-cli는 시퀄라이즈 명령어를 실행하기 위한 패키지이다.
    2. mysql2는 MySQL과 시퀄라이즈를 이어주는 드라이버이다.
    3. mysql2가 데이터베이스 프로그램이 아니므로 오해하지말자.
    4. 설치 완료 후 sequelize init 명렁어로 호출한다. 전역 설치 없이 명령어로 사용하려면
    npx sequelize init 를 치면 된다.

    5. config, models, migrations, seeders폴더가 생성된다.
    6. models/index.js 파일을 조금 수정해야 한다.
    sequelize-cli가 자동으로 생성하는 코드는 그대로 사용할 때 에러가 발생하고 필요 없는 부분도 많다.
    다음과 같이 수정한다.
    const Sequelize = require('sequelize');

    const env = process.env.NODE_ENV || 'development';
    const config = require('../config/config')[env];
    const db = {};

    const sequelize = new Sequelize(config, database, config.username, config.password, config);
    db.sequelize = sequelize;

    mudule.exports = db; 

    7. 위 코드 설명
    Sequelize는 시퀄라이즈 패키지이자 생성자이다.
    config/config.json에서 데이터베이스 설정을 불러온 후 new Sequelize를 통해 MySql연결 객체를 생성한다.
    연결 객체를 나중에 재사용하기 위해 db.sequelize에 넣어둔다.

    8. config/config.json
    여기에 나의 데이터베이스 서버 정보를 입력해야하는 공간이 있다.
*/

// 자 이제 2_app.js부터 본격적으로 사용방법을 알아보자
