// 시퀄라이즈로 mariadb에 접속 성공했다면 다음은 이 차례다
// 바로 데이터베이스에서 정의한 테이블을 시퀄라이즈에서도 정의해야 한다!

// (데이터베이스의 테이블에 대응되는 시퀄라이즈의 모델을 작성해야 한다는 것이다!!!)

// mariadb테이블은 정확히 시퀄라이즈 모델과 대응된다.
// 정확하게는 시퀄라이즈는 모델과 mariadb의 테이블을 연결해주는 역할을 한다. 


// User,Comment모델을 만들어 users테이블과 comments테이블에 연결해보자!
// 시퀄라이즈의 모델이름은 단수형! 테이블이름은 복수형으로 쓰는 것이 일반적이다!


// 코드는 models/4_user.js 에 있다.

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
    VARCHAR      -> STRING 으로
    INT          -> INTEGER
    TINYINT      -> BOOLEAN
    DATETIME     -> DATE
    INT UNSIGNED -> INTEGER.UNSIGNED
    NOT NULL     -> allowNull: false
    UNIQUE       -> unique: true
    DEFAULT now() -> defaultValue: Sequelize.NOW
    여기에 zerofill옵션도 사용하고 싶다면, integer.unsigned.zerofill 로 적으면 된다.
    위와 같이 타입을 맞춰서 적어준다.

    두번째 인수를 보자
    테이블에 관한 옵션이다.
        1. sequelize: static init메서드의 매개변수와 연결되는 옵션으로, db.sequelize 객체를 넣어야 한다.
        2. timestamps: 현재 false로 되어 있다. 이 속성 값이 true면 시퀄라이즈는 createdAt과 updatedAt컬럼
        을 추가한다. 각각 로우가 생성될 때와 수정될 때의 시간이 자동으로 입력 된다. 
        예제에서는 created_at컬럼을 직접 만들었으므로, false로 줬다.
        3. underscored: 시퀄라이즈는 기본적으로 테이블명과 컬럼명을 캐멀 케이스로 만든다. 이를 자동으로 스네이크
        케이스로 바꾸는 옵션이다. 
        4. modelName : 모델 이름을 설정할 수 있다. 노드프로젝트에서 사용한다. 기본적으로 첫글자는 대문자, 단수형으로 쓴다.
        5. tableName : 실제 데이터베이스의 테이블 이름이 된다. 기본적으로 소문자, 복수형으로 쓴다.
        6. paranoid  : true로 설정하면 deletedAt 이라는 컬럼이 생긴다. 로우를 삭제할 때 완전히 지워지지 않고
        deletedAt에 지운 시각이 기록된다. (따라서 실제로 지워지지 않는 것이다.)
        로우를 조회하는 명령을 내렸을 때는, deletedAt의 값이 null인 로우를 조회한다. null로 있어야 지워지지 않았다는 뜻이다.
        이렇게 하는 이유는 나중에 로우를 복원하기 위해서이다. 
        로우를 복원해야 하는 상황이 생길 것 같다면 미리 true로 설정해야 한다.
        7. charset과 collate : 각각 utf8과 utf8_general_ci로 설정해야 한글이 입력된다. 
        이모티콘까지 완벽하게 입력할 수 있게 하고 싶다면, utf8mb4, utf8mb4_general_ci를 입력해야 한다.


*/

// ** 4_, 5_ 학습파일은 models/ 폴더에 있다.
