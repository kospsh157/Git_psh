// 시퀄라이즈로 mariadb에 접속 성공했다면 다음은 이 차례다
// 바로 데이터베이스에서 정의한 테이블을 시퀄라이즈에서도 정의해야 한다!

// (데이터베이스의 테이블에 대응되는 시퀄라이즈의 모델을 작성해야 한다는 것이다!!!)

// mariadb테이블은 정확히 시퀄라이즈 모델과 대응된다.
// 정확하게는 시퀄라이즈는 모델과 mariadb의 테이블을 연결해주는 역할을 한다. 


// User,Comment모델을 만들어 users테이블과 comments테이블에 연결해보자!
// 시퀄라이즈의 모델이름은 단수형! 테이블이름은 복수형으로 쓰는 것이 일반적이다!

const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    // 스태틱 자원의 init()함수 작성
    static init(sequelize) {
        return super.init({ // super.init({ name: {}, age: {} ... },{ sequelize, timestamps, ...}) 형태이다.
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            age: {
                tyep: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            married: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            comment: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,

            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            medelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    // 스태틱 자원의 associations()함수 작성, 구현부는 비어있다.
    static associations(db) {}
}


//설명
/*
    1. User모델을 만들고 모듈로 exports했다.
    2. 모델은 크게 static init메서드와 static associate메서드로 나뉜다.
    init 메서드에는 테이블에 대한 설정을 한다.
    associate 메서드에는 다른 모델과의 관계를 적는다.
    
    3. init메서드부터 살펴보자
    init()의 첫번째 인수는 테이블 '컬럼'에 대한 설정이다.
    두 번째 인수가 테이블 자체에 대한 설정이다.

    시퀄라이즈는 알아서 id를 키본 키로 연결한다. 따라서 id컬럼은 적어줄 필요가 없다.
    나머지 컬럼의 스펙을 입력하면 된다. mariadb의 컬럼 내용과 정확히 일치해야 대응된다.
    
    첫번째 인수부터 보자
    단, 시퀄라이즈의 자료형은 mariadb의 자료형과는 조금 차이가 있다. 
    VARCHAR ->  STRING 으로
    INT -> INTEGER
    TINYINT -> BOOLEAN
    DATETIME -> DATE
    INT UNSIGNED -> INTEGER.UNSIGNED
    NOT NULL -> allowNull: false
    UNIQUE -> unique: true
    DEFAULT now() -> defaultValue: Sequelize.NOW
    여기에 zerofill옵션도 사용하고 싶다면, integer.unsigned.zerofill 로 적으면 된다.
    위와 같이 타입을 맞춰서 적어준다.

    두번째 인수를 보자
    테이블에 관한 옵션이다.
    
    
    



*/