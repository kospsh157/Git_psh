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
                type: Sequelize.INTEGER.UNSIGNED,
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

    // 스태틱 자원의 associations() 
    // 여기에서 외래키도 정의하고, 
    // 테이블간의 관계도 여기서 다 정의한다.
    // 그러면 알아서 시퀄라이저가 외래키 칼럼도 테이블에 추가하고 나머지는 자동으로 된다.
    // 단 관계를 잘 정의해서 줘야 한다.
    static associate(db) {
        // hasMany가 있다는 것은 이 테이블이 일대다, 일대일 관계이든 뭐든 하여튼 1인 위치에 있다는 것이다.
        // commenter라는 컬럼을 외부 테이블에서 끌어와서 조회할 것이다. 
        // 외래키랑은 sourceKey라고 정의 된, 이 테이블에서 id컬럼과 연결될 것이다.
        db.User.hasMany(db.Comment, {foreignKey: 'commenter', sourceKey: 'id'});
    }
}