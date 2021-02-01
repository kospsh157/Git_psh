{
    // Enum
    // 여러가지 관련된 상수값들을 모아서 관리해주는 타입
    // 다른 언어에서는 자주 쓰인다.
    // 자바스크립트에는 없으므로, 순수 타입스크립트 타입이다.

    // 자바스크립트에서는 이런식으로 사용한다.
    // 상수는 이렇게 정의하고
    const MAX_NUM = 6;
    const MIN_STUDENT_PER_CLASS = 10;
    // 관련된 상수들은 한번에 그룹으로 묶는 이넘이 없어서 아래와 같이 Object.freeze() 메서드를 사용한다.
    const MONDAY = 0;
    const TUESDAY = 1;
    const WEDNESDAY = 2;
    // 요일을 나타내는 상수로, 관련되어 있지만, 묶는 기능이 없다. 하지만 아래 처럼 하면 된다.
    // Object.freeze()로 상수 오브젝트 API를 사용하여, 객체로 사용 할 수 있다.
    const DAYS_ENUM = Object.freeze({"MONDAY": 0, "TUESDAY": 1, "WEDNESDAY":2});
    const dayOfToday = DAYS_ENUM.MONDAY;    // 0
    



    // 이제 타입스크립트에서의 Enum을 알아보자
    // 참고로 이넘에서는 첫 글자만 대문자로 쓰인다.
    // 따로 값을 정하지 않으면 자동으로 처음에 0 부터 시작해서 순서대로 숫자가 매겨진다.
    // 만약 첫번째 항목은 3으로 지정하면 다음 항목 부터는 자동으로 4,5,6... 정해진다.
    // 숫자 말고 문자열을 할당할 수도 있는데, 이럴때는 전 항목 다, 문자열을 입력해줘야 한다.
    enum Days {
        Monday,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday,
        Sunday,
    }
    console.log(Days.Tuesday);
    const day = Days.Saturday;
    
    // 다만 알아야 할 점이 있다.
    // 다른 언어에서는 이넘을 굉장히 많이 쓴다.
    // 하지만 타입스크립트에서는 이넘을....최대한 피해야한다.

    // 사실 위에서 const day = Days.Saturday; 에서 생략된 타입이 있다. 
    let test1:Days = Days.Sunday;
    test1 = Days.Saturday;
    // 문제점은 다른 언어에서는 이넘의 그룹안에 있는 숫자만 할당 할수 있도록 강제되어 있는데,
    // 타입스크립트는 아니다. 위에서는 0~6 까지 할당되어 있지만 
    // test1 = 7; 를 입력해도 컴파일에서 에러를 일으키지 않는다.
    test1 = 8;
    // 즉 이러한 문제 때문에 타입스크립트에서는 오히려 이넘을 쓰지 않는다.

    // 그럼 타입스크립트는 뭘 쓰느냐? 그냥 type키워드를 활용한 Union Type을 쓴다.
    type DaysOfWeek = "Monday" | "Tuesdata" | "Wednesday";
    let dayOfweek: DaysOfWeek = "Monday";
    dayOfweek = "Wednesday";
    // 위와 같이 하면, 상수를 쓰지 않고, 그냥 스트링 형태로 바로 쓰는 형태이며, 할당 할 수 있는 데이터를 강제할 수 있다.

    // 이넘을 쓰는 경우는 한가지가 있다. 
    // 다른 플랫폼과 연동해야 하는 경우. 그리고 상대 플렛폼 언어에서는 이넘을 쓰는 경우.
    // 모바일 폴랫폼에서 스위프트랑 코틀린과 연동될 때 원할한 진행을 위해 어쩔 수 없이 쓴다.

    // 그 외에는 유니온 타입이 자주 쓰인다. 유니온 타입은 정말 정말 자주 쓰인다.
}