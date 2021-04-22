// 여기서는 컨디션너링 코드를 연습해보자.

(ab && cd && ef && <div>안녕하세요.</div>)
(ab && (cd && (ef && (<div>안녕하세요.</div>)))
// 일단 &&연산자에서 가로의 유무는 연산식에 차이를 주지 않는다.
// 가로의 기능은 단지 항의 길이가 너무 길때, 가로로 묶어주는 효과가 있다.
// 따라서 가로를 가급적 쓰지 않는 것이 보기에 더 깔끔하다.


// && 연산자 렌더링
/*
// 속성값 4개를 받아서 인증이 되었는지, 로그인이 되었는지, ip주소가 한국인지, 현재 이벤트 중인지 여부에 따라서 화면을 보여주자.
// 다음 조건을 충족해야 한다.
1. 한국 ip가 아니면 사이트 이용이 불가능하다고 알려준다.
        1. 이벤트가 진행 중이면 이벤트 페이지를 보여줘야한다.
        2. 이벤트가 진행중이지 않다면, 로그인 여부를 확인하고 인증절차까지 끝난 회원인지 확인해야 한다.
        3. 로그인조차 되어 있지 않다면, 로그인을 해달라는 화면을 표시한다.
        4. 로그인이 되어있지만, 인증 확인이 되지 않은 회원은 회원 인증을 해달라고 표시한다.
        5. 로그인도 되어있고, 인증절차까지 끝난 회원에게는 회원의 개인 정보와 환영 메시지를 표시한다.
*/
function ConditionalRendering_A(isEvent, isKorea, isLogin, isAuth, info){
    // if문으로 만든 것
    if(!isKorea){
        return (
            <div>
                <h1>죄송합니다. 한국이 아닌 나라에서는 사이트 접속이 허용되지 않습니다.</h1>
            </div>
        );
    }else{
        if(isEvent){
            return (
                <div>
                    <h1>이벤트 중입니다. 많이 참여 부탁드려요.</h1>
                </div>
            );
        }else{
            if(isLogin && isAuth){
                return (
                    <div>
                        <h1>안녕하세요, {info.name}님</h1>
                    </div>
                );
            }else if(!isLogoin){
                return (
                    <div>
                        <h1>먼저 로그인을 해주세요.</h1>
                    </div>
                );
            }else{
                return (
                    <div>
                        <h1>인증 절차가 끝나지 않았습니다. 인증을 해주세요.</h1>
                    </div>
                );
            };
        };
    };
}      
    

function UsingAndOperator(isKorea, isEvent, isLogin, isAuth) {
    return (
        <div>
            {isKorea == false && (
                <div>
                    <h1>한국에서만 접속해 주세요.</h1>
                </div>
            )}
            {isEvent && (
                <div>
                    <h1>이벤트 중입니다. 이벤트 페이지입니다. 링크를 클릭해서 이벤트를 진행해주세요.</h1>
                </div>
            )}
            {isKorea && isEvent == false && isLogoin == false && (
                <div>
                    <h1>로그인을 먼저 해주세요.</h1>
                </div>
            )}
            {isKorea && isEvent == false && isLogin && isAuth == false && (        
                <div>
                    <h1>인증 절차가 끝나지 않았습니다. 인증 절차를 해주세요.</h1>
                </div>
            )}
            {isKorea && isEvent == false && isLogoin && isAuth && (
                <div>
                    <h1>안녕하세요. 누구 누구 님.</h1>
                </div>
            )}
        </div>
    )
}






// 삼항연산자 렌더링
function ConditionalRendering_B(){
    
}




// 부모컴포넌트가 자식컴포넌트 조건부 렌더링
function ConditionalRendering_C(){
   
}




// 조건부 배열 렌더링
function ConditionalRendering_D(){
   

}