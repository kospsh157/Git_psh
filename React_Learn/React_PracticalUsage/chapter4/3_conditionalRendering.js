// 가독성을 높이는 조건부 렌더링 방법
// 컴포넌트 함수 내부에서 특정 값에 따라 선택적으로 렌더링하는 것을 조건부 렌더링이라 한다.
// 조건부 렌더링을 구현할 때는 삼항 연산자가 유용한 경우도 있지만, 대부분 && 연산자가 가독성이 더 좋다.
// 다음 예제를 보면서 익히자. 이는 상당히 자주 이용되는 스킬이다.

import { memo } from "react";

// if문으로 조건부렌더링
function GreetingA({isLogin, name}){
    if(isLogin){
        return <p>{`${name}님 안녕하세요.`}</p>;
    }else{
        return <p>권한이 없습니다.</p>;
    };
}
// 삼항연산자로 조건부렌더링
function GreetingB({isLogoin, name}){
    return <p>{isLogin ? `${name}님 안녕하세요.` : '권한이 없습니다.'}</p>;
}

// GreentingB 컴포넌트가 좀 더 짧기도 하고 p 태그가 한 번만 등장해서 GreetingA보다 좋은 선택인 것 같다. 
// 하지만 매번 그런것은 아니다.
// 다음의 복잡한 조건부 렌더링코드를 보자.

// if문을 이용해서 구현 
function GreetingC({isLogin, name}){
    if(isLogin){
        return(
            <p className='greeting' onClick={showMenu}>
                {`${name}님 안녕하세요.`}
            </p>
        );
    }else{
        return(
            <p className='noAuth' onClick={goToLoginPage}>
                권한이 없습니다.
            </p>
        );
    };
}
// 삼항연산자를 이용해서 구현
function GreetingB({isLogin, name}){
    return(
        <p
            className={isLogin ? 'greeting' : 'noAuth'}
            onClick={isLogin ? showMenu : goToLoginPage}
        >
            {isLogin ? `${name}님 안녕하세요.` : '권한이 없습니다.'}
        </p>
    );
}
// 설명 
// 1. 둘 중 어는 것이 좋은 것인지 확실하지 않다. 다만 상황에 따라 상대적으로 더 좋은 코드가 있다.
// 2. 조건부 렌더링을 무분별하게 사용하면 JSX코드가 금방 스파게티코드가 된다. 따라서 가급적 삼항연산자를 &&연산자로 할 수 있는 상황을 알아야한다.
// 3. 특히 JSX코드에서는 삼항연산자보다 && 연산자를 사용한 조건부 렌더링 코드가 가독성이 더 높다.

// 다음 코드를 보고 삼항연산자 코드와 && 연산자 코드를 비교해서 보자. 로그인했을 때만 개인정보를 보여주는 코드이다.
// 삼항연산자 사용한 코드
function GreetingD({isLogin, name, cash}){
    return(
        <div>
            저희 사이트에 방문해 주셔서 감사합니다.
            {isLogin ? (
                <div>
                    <p>{name}님 안녕하세요.</p>
                    <p>현재 보유하신 금액은 {cash}원 입니다.</p>
                </div>
            ) : null }
        </div>
    );
}

// && 연산자를 이용한 조건부 렌더링
// 특정 조건에서만 렌더링할 때는 위 처럼 삼항 연산자를 사용하는 것보다는 && 연산자를 사용하는 게 낫다.

// 먼저 &&, || 연산자의 특징을 배우자
/*
    && 연산자 : 첫 거짓값 또는 마지막 값을 반환한다.
    || 연산자 : 첫 참값 또는 마지막 값을 반환한다.
*/

// 다음은 && 연산자를 사용해서 조건부 렌더링을 구현한 코드다.
function Greeting({ isLogoin, name, cach }){
    return (
        <div>
            저희 사이트에 방문해 주셔서 감사합니다.
            {isLogin && (
                <div>
                    <p>{name}님 안녕하세요.</p>
                    <p>현재 보유하신 금액은 {cash}원입니다.</p>
                </div>
            )}
        </div>
    );
}

// 코드의 끝에 null을 생략해도 되기 때문에 가독성이 좋아진다. 위와 같은 간단한 코드로는 체감이 안올 수 있다.
// 다음과 같이 조금 복잡한 코드를 살펴보자 
// 예를 들어 기획서가 업데이트 됐는데, 이벤트 기간에는 개인 정보를 생략한 채 이벤트 문구만을 보여줘야 하며,
// 로그인을 했더라도, 캐시가 십만 원을 넘으면 해킹한 사람이므로 개인 정보를 보여 주면 안된다는 전제가 있다고 치고 코드를 짜보자.
function Greeting_comple({isEvent, isLogin, name, cash}){
    return (
        <div>
            저희 사이트에 방문해 주셔서 감사합니다.
            {isEvent ? (
                <div>
                    <p>오늘의 이벤트를 놓치지 마세요.</p>
                    <button onClick={onClickEvent}>이벤트 참여하기</button>
                </div>
            ) : isLogin ? (
                cash <= 1000000 ? (
                    <div>
                        <p>{name}님 안녕하세요.</p>
                        <p>현재 보유하신 금액은 {cash}원입니다.</p>
                    </div>
                ) : null
            ) : null}
        </div>
    );
}
// 위 코드를 보면 삼항 연산자가 중첩되서 사용되었다. 첫 번째 삼항 연산자는 어디에서 끝나는지 파악하기도 힘들다.

// 이 코드를 && 연산자를 사용한 버전으로 변경하면 다음과 같다.
// 한가지 중요한 점은, JSX는 논리값은 출력하지 않는다. 만약 논리값을 JSX로 출력하라고 하면 그냥 빈페이지로 나온다.
function Greeting_simple({isEvent, isLogin, name, cash}){
    return (
        <div>
            저희 사이트에 방문해 주셔서 감사합니다.
            {isEvent && (
                <div>
                    <p>오늘의 이벤트를 놓치지 마세요.</p>
                    <button onClick={onClickEvent}>이벤트 참여하기</button>
                </div>
            )}
            {!isEvent &&        // 1. 이벤트가 없고,
                isLogin &&          // 2. 로그인이 되어 있고,
                cash <= 100000 && (     // 3. 캐쉬도 십만원 이하로 있다면, 마지막 항의 JSX를 그려서 리턴해라.
                    <div>
                        <p>{name}님 안녕하세요.</p>
                        <p>현재 보유하신 금액은 {cash}원 입니다.</p>
                    </div>
                )}
        </div>
    );
}

// 위 코드를 보면 && 연산자 코딩에 익숙해지면 확실히 가독성이 더 좋아진다.
// 그러면 좀 더 && 코딩에 익숙해져보자.
// 다음을 보면서 학습해보자 &&코딩을 할 때 유의해야 할 점이다.
<div>
    {cash && <p>{cash}원 보유 중</p>}       
    {memo && <p>{200 - memo.length}자 입력 가능</p>}
</div>
// 설명
/*
    1. cash가 0이면 "0원 보유 중"으로 출력되야 하지만, 위의 코드는 덩그러니 0 하나만 출력된다.
    2. 마찬가지로 memo가 '' 빈문자열일때, 오류가 발생한다. 결과적으로 빈문자열이 출력되므로, 아무것도 보이지 않을 것이다.
    3. 위와 같은 현상을 없애려면 다음과 같이 써야한다.
        1. cash != null : 이과 같이 쓰면 cash가 null도 아니고, undefined도 아니여만 true값이 된다. 
        (null 체크만 하면 undefined는 따라서 같이 체크된다. 하지만 그 반대는 적용되지 않으므로, 빈값을 체크하려면 null을 가지고 하자.)
        2. memo != null : 이과 같이 쓰면 마찬가지로 memo가 빈문자열일때도 정상적으로 "200자 입력 가능" 으로 출력된다.
*/

















