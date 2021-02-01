{
    // Union Types: OR
    // 타입스크립트에서 굉장히 활용도가 높은 타입이 이 유니온 타입이다.
    type Direction = 'left' | 'right' | 'up' | 'down';  // 총 4가지 값을 가질 수 있음.
    function move(direction: Direction){
        console.log(direction);
    }
    move('down')    // 파라미터에서 자동완성기능을 키면 입력할 수 인자값이 나온다.
    
    // 예시를 보자면 
    // 로그인을 호출하고 성공하면 success, 실패하면 fail리턴하는 함수 만들기
    type SuccessState = {
        response: {
            body: string;
        };
    };
    
    type FailState = {
        reason: string;
    }

    type LoginState = SuccessState | FailState;

    function login(id: string, pass: string): Promise<LoginState> {
        return new Promise((resolve, reject) => {
            {
                response: {
                    body: 'logged in!';
                }
            }
        });
    }

    // 문제1) 다음 함수를 만들자 성공하면 성공 출력하고 body내용 출력해주기
    // 실패하면, 실패하고 reason 을 출력해주기

    // printLoginState(state)
    // success -> '성공' body 출력
    // fail -> '실패' reason 
    
    // 이 문제의 핵심 요지는 파라미터로 들어가는 인자가 유니온이라, 정확히 어떤 타입이 들어갈 지 모를때,
    // 어떻게 처리를 해야 하는지이다.
    function printLoginState(state: LoginState) {
        // 위 타입을 보면 SuccessState에는 response가 들어있다. 이걸 이용해서 if문을 쓰자
        if('response' in state ) {
            console.log(`성공 ${state.response.body}`);
        }else {
            console.log(`실패 ${state.reason}`);
        }
        // 다만 이렇게 처리하는 것은 좋은 방법은 아니다.
    }
}
