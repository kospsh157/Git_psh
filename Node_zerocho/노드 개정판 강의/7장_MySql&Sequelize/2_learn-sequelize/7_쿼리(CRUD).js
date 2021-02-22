// 시퀄라이즈로 CRUD를 해보자



// 쿼리는 프로미스를 반환하므로 then을 붙여 결괏값을 받을 수 있다.
// async/await문법과 같이 사용할 수 있다.

// 로우를 생성하는 쿼리(첫줄이 SQL, 그 아래가 그에 상응하는 시퀄라이즈 쿼리)
// INSERT INTO nodejs.users(name, age, married, comment) VALUES ('zero', 24, 0, '자기소개1');
const {User} = require('./models/4_user');
User.create({
    name: 'zero',
    age: 24,
    married: false,
    comment: '자기소개1',
});

// models모듈에서 User모델을 볼러와 create메서드를 사용하면 된다.
// 앞으로의 설명은 모두 이 User모델로 기반으로 한다.

// 주의할 점은 시퀄라이즈 모델에 정의한 자료형대로 넣어야 한다는 점이다.
// 시퀄라이즈가 알아서 MySql의 자료형으로 바꾸므로, 반드시 써넣을때는 시퀄라이즈 방식으로 써야 한다.


// 로우를 조회하는 쿼리이다.
// findAll 메서드를 이용하면된다.
// SELECT * FROM nodejs.users;
User.findAll({});


// Users테이블의 데이터 하나만 가져오는 sql문이다. 데이터를 하나만 가져올때는 findOne()메서드를, 여러 개 가져올 때는 findAll()
// 를 사용한다.
// SELECT * FROM nodejs.users LIMIT 1;
User.findOne({});


// attributes 옵션을 사용해서 원하는 컬럼만 가져올 수도 있다.
// SELECT name, married FROM nodejs.users;
User.findAll({
    attributes: ['name', 'married'],
});



// where 옵션이 조건들을 나열하는 옵션이다.
// SELECT name, age FROM nodejs.users WHERE married = 1 AND age > 30;
const {Op} = require('sequelize');
const {User} = require('./models');
User.findAll({
    attributes: ['name', 'age'],
    where: {
        married: true,          // true 면  1
        age: {[Op.gt]: 30},     // 그냥 객체 리터럴 표현이다. 객체비구조화할당이 아니다. 즉 [Op.gt]는 키이다.
        // 조건 표현 방식 :  { [비교연산자] : 숫자 }  
    },
});
// 위를 보다싶히, 시퀄라이즈는 객체로 모든걸 작성해야하기 때문에 부등호같은 경우 약간 특이한 방법이 있다.
/*
    1. 시퀄라이저 Op내부 객체 안에 부등호들이 있다.
    2. {[Op.gt]: 30}은 ES2015문법이다. 궁금하면 찾아봐라
    자주 쓰이는 걸로는 
    Op.gt : 초과 > 
    Op.lt : 미만 < 

    Op.gte : 이상 >= 
    Op.lte : 이하 <= 
    
    Op.ne : 같지 않음 !== 
    Op.or : 또는      or 
    
    Op.in : 배열 요소 중 하나 
    Op.notIn : 배열 요소와 모두 다름 
*/



// Op.or를 한번 보자
// SELECT id, name FROM users WHERE married = 0 OR age > 30;
const { Op } = require('sequelize');
const { User } = require('./models');
const { SELECT } = require('sequelize/types/lib/query-types');
User.findAll( {
    attributes: ['id', 'name'],
    where: {
        // 비교연산자가 먼저 키로 나오고 주인공들은 밸류값인데, 여러개라 배열로 나온다.
        [Op.or]: [{married: false}, {age: { [Op.gt]: 30} }],
    },
});





// SELECT id, name FROM users ORDER BY age DESC;
// 시퀄라이즈 정렬 방식이며, order옵션으로 가능하다. 배열 안에 배열이 있다는 점에 주의한다.
User.findAll({
    attributes: ['id', 'name'],
    order: [['age', 'DESC']],   // 정렬은 컬럼 두 개 이상으로 할 수도 있기 때문에 배열로 나타내야 한다. 그래서 이중 배열 구조가 된다.
});




// SELECT id, name FROM users ORDER BY age DESC LIMIT 1 OFFSET 1;
// limit, offset 옵션도 가능하다.
User.findAll({
    attributes: ['id', 'name'], 
    order: ['age', 'DESC'],
    limit: 1,
    offset: 1,
});








// 로우를 수정하는 쿼리를 알아보자
// UPDATE nodejs.users SET comment = '바꿀내용' WHERE id = 2;
User.update({
    comment: '바꿀 내용',
}, {
    where: {id: 2},
});
// 첫 번째 인수는 수정할 내용이고, 두 번째 인수는 어떤 로우를 수정할지에 대한 조건이다.






// 로우를 삭제하는 쿼리다.
// DELETE FROM nodejs.users WHERE id = 2;
User.destory({
    where: { id: 2},
});