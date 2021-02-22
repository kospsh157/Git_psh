// findOne, findAll 메서드를 호출할 때 프로미스의 결과로 모델을 반환한다.
// (findAll은 모두를 찾는 것이므로, 모델의 배열을 반환한다.)

const db = require("./models");
const { User } = require("./models");

const user = await User.findOne({});
console.log(user.nick); // 사용자 닉네임

// User모델의 정보에도 바로 접근할 수 있지만, 더 편리한 점은 관계 쿼리를 지원한다는 점이다.
// MySql로 따지면 JOIN기능이다.
// 현재 User모델은 Comment모델과 hasMany-belongsTo 관계가 맺어져 있다.
// 만약 특정 사용자를 가져오면서 그 사람의 댓글까지 모두 가져오고 싶다면, include 속성을 사용한다.
const user = await User.findOne({
    include: [{
        model: Comment,
    }]
});
console.log(user.Comments)  // 사용자 댓글





// 어떤 모델과 관계가 있는지를 include 배열에 넣어주면 된다.
// 배열인 이유는 다양한 모델과 관계가 있을 수 있기 때문이다, 
// 댓글은 여러 개일 수 있으므로, (hasMany) user.Comments로 접근 가능하다.
// 또는 다음과 같이 댓글에 접근할 수도 있다.
const user = await User.findOne({});
const comments = await user.getComments();
console.log(comments);  // 사용자 댓글
// 관계를 설정하였다면, 그 시점 부터 자동으로
/* 
    getComments : 조회
    setComments : 수정
    addComment  : 하나 생성
    addComments : 여러개 생성
    removeComments : 삭제 
*/
// 와 같은 메서드를 지원한다. 동사 뒤에, 모델의 이름이 적혀있다. 


// 동사 뒤의 모델 이름을 바꾸고 싶다면 관계 설정 시 as 옵션을 사용할 수도 있다.
db.User.hasMany(db.Comment, {foreignKey: 'comment', sourceKey: 'id', as: 'Answers'});
// 쿼리할 때는
const user = await User.findOne({});
const comments = await user.getAnswers();
console.log(comments) // 사용자 댓글

// as를 설정하면 include시 추가되는 댓글 객체도 user.Answers로 바뀐다. 
// 또한 include나 관계 쿼리 메서드에도 where, attributes 같은 옵션을 사용할 수 있다.
const user = await User.findOne({
    include: [{
        model: Comment,
        where: {
            id: 1,
        },
        attributes: ['id'],
    }]
});
// 또는
const comments = await user.getComments({
    where: {
        id: 1,
    },
    attributes: ['id'],
});
// 관계 쿼리시, 조회는 위와 같이 하면 된다.
// 단, 관계 쿼리 수정, 생성, 삭제 때는 조금 다른 점이 있다.
// 다음 9_관계쿼리(수정,생성,삭제).js 에서 살펴보자