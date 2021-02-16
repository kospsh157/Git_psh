const Sequelize = require('sequelize');
// 여기에 User, Comment 모델을 불러온다
const User = require('./4_user');
const Comment = require('./5_comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;

// 이 다음부터 새로 추가시킨 모델들을 db에 추가하자
// 이렇게 추가한 모델은 앞으로 db객체를 require하여 Use, Comment모델에 접근할 수 있다. 
db.User = User;
db.Comment = Comment;

// User, Comment 모델을 만든 곳에서 만들었던 init()함수를 이용해서 현재 여기서 생성한
// 시퀄라이저 객체를 전달 해서 모델을 생성 및 mariadb와 연결한다.
User.init(sequelize);
Comment.init(sequelize);

// 다른 테이블과의 관계를 연결하는 associate메서드도 미리 실행해둔다. 
User.associate(db); 
Comment.associate(db);


// 이렇게 하면 외부파일에서 const {sequelize} = require('./models'); 로 빼올 수 있다.
module.exports = db; 
