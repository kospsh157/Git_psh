// Comment모델도 만들어 보자
const Sequelize = require('sequelize');

// 시퀄라이즈 모델을 만들 때에는 반드시 클래스형태로, Sequelize.Model을 상속받아야한다.
// 그리고 모듈로 exports해야 한다.
module.exports = class Comment extends Sequelize.Model{
    // 스태틱으로 모델을 초기화(==생성)하는 함수를 만든다.
    static init(sequelize) {
        // 부모 자원을 이용해서 만든다.
        return super.init({
            comment: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW
            },
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Comment',
            tableName: 'comments',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    // index.js에서 'db'로 익스포트할 것이다. 여기서는 그것을 받아 모델을 넣어주면 된다. 
    // 여기서 db는 즉, 나와 연결된 maraidb그 자체를 의미한다.
    static associate(db) {
        // 외래키로 쓸 컬럼 명을 commenter 로 적었다. 
        // 첫번째 인자로, 이 테이블의 로우를 가져갈 1의 관계인 User테이블을 적는다.
        // 두번째 인자로, 임의객체를 만들어서 넣는데, {foreignKey, targetKey}
        // 이때 이 테이블에서 외래키로 쓸 컬럼명을 적고, 
        // user테이블에서 연결할 컬럼을 적는다. 
        db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id'});
    }
};

//쉽게 설명하자면,
/*
    hasMany()메서드에서는 sourceKey를 정해줘야 하고
    belongTo()메서드에서는 targetKey를 정해줘야 한다.
    그리고 이 둘은 같은 컬럼명이 되어야 한다.
    또한 foreignKey역시 같은 컬럼명이 설정되어야 할 것이다.

    foreignKey를 설정하지 않으면 자동으로 모델명+기본키인 컬럼이 모델에 생성된다.
    여기서는, user(모델명) + 기본 키(id)가 합쳐진 UserId가 foreignKey로 생성된다.

    이 상태로 npm start를 해서 실행을 하면, 시퀄라이저가 자동으로 쿼리문을 써서 테이블을 만드는 것을 볼 수 있다.

*/
