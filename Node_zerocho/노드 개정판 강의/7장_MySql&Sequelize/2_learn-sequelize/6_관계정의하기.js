// ** 4_, 5_ 학습파일은 models/ 폴더에 있다.
// users 테이블과 comments테이블 간의 관계를 정의해야 한다.
/*
    1. 사용자 한 명은 댓글을 여러개 작성할 수 있다.
    2. 댓글 하나에 사용자가 여러 명일 수는 없다.
    3. 이러한 관계를 일대다 (1:N)관계라고 한다. 1:N 관계에서는 사용자가 1이고, 댓글이 N이다. 
*/

// 일대일 관계
/*
    1. 1:1관계로는 사용자와 사용자에 대한 정보 테이블을 예로 들수 있다.
    2. 사용자한명은 자신의 정보를 담고 있는 테이블과만 관계가있다.
    3. 정보 테이블도 한 사람만을 가리켜야한다.
    4. 이러한 관계를 1:1관계라고 한다.

*/

// 다대다 관계
/*
    1. 게시글 테이블과 해시태그 테이블 관계를 예로 들 수 있다. 
    2. 한 게시글에는 해시태그가 여러개 달릴 수 있고, 한 해시태그도 여러 게시글에 달릴 수 있다.
    3. 이러한 관계를 다대다 관계라고 한다. (N:M)
*/

// RDMS는 대부분 JOIN이라는 기능으로 여러 테이블 간의 관계를 파악해 결과를 도출한다. 
// 시퀄라이즈는 JOIN기능도 알아서 구현한다. 
// 대신 시퀄라이즈가 알아서 하게 할려면 먼저, 테이블 간의 어떠한 관계가 있는지 시퀄라이즈에 알려야 한다.



// 1:N 관계
/*
    1. 시퀄라이즈에서는 1:N관계를 hasMany, belongTo 라는 메서드로 표현한다.
    2. 예시를 기준으로 설명하자면, User테이블은 hasMany 메서드로 다량의 Comment로우들을 관계지을 수 있다.
    3. 반대로, Comment테이블은 belongTo로 단 하나의 User테이블과 관계를 맺게 된다.
    4. 주의할 점은 관계를 표현할 때, hasMany(), belongTo()메서드를 햇갈리지 않게 잘 써야 한다는 점이다.
    여기서는 models/comment.js 에 belongTo()메서드를, 
    models/user.js 에는 hasMany() 메서드를 작성해야 한다. 

    5. 또한 특이한 점은 외래키를 이때, 작성한다. 
    외래키는 관계에 관련된 컬럼이다. 따라서 static assosiate(db){} 에서 정의한다. 

    db.User.hasMany(db.Comment, {foreignKey: 'commenter', sourceKey: 'id'});
    db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id'});
*/



// 1:1 관계
/*
    1. 1:1관계에서는 hasMany()대신에, hasOne()메서드를 사용한다. 사용자 정보를 담고 잇는 가장의 Info모델이 있다고치자
    그러면 다음과 같이 표현 가능하다
    
    user.js, assosiations() 에 안에는
    db.User.hasOne(db.Info, {foreignKey: "UserId", sourceKey: 'id'});

    info.js, assosiations() 에 안에는
    db.Info.belongsTo(db.User, {foreignKey: "UserId", targetKey: 'id'});


    2. 주의할 점은! 1:1관계에서도 hasOne(), belongTo()의 관계를 명확해야하며 뒤바꿔 적으면 안된다는 것이다.
    여기서는 외래키 컬럼은 user테이블에 생성되는 것이 아니라, info테이블에 생성되어야한다.
    시퀄라이저는 belongsTo()메서드가 있는 테이블에 외래키 컬럼를 생성하기 때문에, 정확히 써야 한다.

*/


// N:M
/*
    1. 게시글과 해시태그 모델을 예시로 생각해보자
    게시글에도 여러 해시태크가 달릴 수 있고,
    해시태그에도 여러 게시글이 달릴 수 있다.
    이런 관계를 다대다 관계라고 본다.

    2. 자 생각을 해보자 시퀄라이저에서 belongTo()함수가 있는 모델쪽에 외래키 컬럼이 자동으로 생성되어 진다.
    데이터베이스 개념적으로 생각해보면, 게시글에 어떤 해시태그들이 달렸는지 보려면 해시태그id들을 긁어와야 하고, 
    반대로, 해시태그를 기준으로 보면, 어디어디 글에 쓰였는지 글의 id를 가져와야 한다.
    따라서 두 테이블에는 두 개의 외래키를 서로 주고받아야 한다. 즉 외래키가 두 테이블 모두에 생성되어야 한다는 뜻이고,
    위에서 시퀄라이즈는 자동으로 belongsTo() 함수가 있는 모델쪽의 테이블에 외래키 컬럼을 생성해서 넣어준다고 했다.
    따라서 이렇게 생각해볼수 있다.
    서로가 똑같이 belongsTo() 함수가 있어야 하지 않을까?

    3. 맞다. 다만 이때는 외래키가 생성되는 것이 아니라, 아예 새로운 모델이 하나 더 생긴다.
    시퀄라이즈에서는 이런 다대다 관계를 표현하기 위해서 belongsToMany()함수를 지원한다.
    서로가 서로에게 속해있는 것이다.
    모델이 새로 생성되므로, 외래키 이름을 적는게 아니라, 이 가상의 모델 (=테이블)명을 정해줘야 한다.
    여기서는 {through: 'PostHastag'}로 했다.

    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag'});
    db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag'});

    참고로 이 모델을 통하여 조회가 이뤄지므로, 키 이름을 through 으로 하지 않았나 싶다.
    
    또한 자동으로 만들어진 이 PostHashtag 모델에도 접근 가능하다
    db.sequelize.models.PostHastag 로 접근 가능하다
    
*/