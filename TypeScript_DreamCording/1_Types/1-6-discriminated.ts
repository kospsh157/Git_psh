// discriminated union
// 충돌 방지를 위해 namespace사용
// 매우 자주 쓰이는 코딩 형태이므로 반드시 기억해야 한다.
// 키포인트는 여러가지 결과값을 가지는 유니온 타입을 하나 만들고
// 각각의 결과값 또한 각각 타입으로 정의한다.
// 각각의 결과값 타입에는 동일한 프로퍼티키를 넣어주므로써, 조건을 걸 수 있도록 해준다.
// 각각의 조건에 따라 여러가지 결과값을 컨트롤 할 수 있도록 한다.

namespace discrimenatedUnion {

    type SuccessState = {
        result: 'success';
        response: {
            body: string;
        };
    };
    type FailState = {
        result: 'fail';
        reason: string;
    }
    
    type LoginState = SuccessState | FailState;
    
    function login(): LoginState{
        return {
            result: 'success',
            response: {
                body: 'logged in!',
            },
        };
    }
    
    function printLoginState(state: LoginState) {
        // 위 타입을 보면 SuccessState에는 response가 들어있다. 이걸 이용해서 if문을 쓰자
        if(state.result==='success') {
            console.log(`성공 ${state.response.body}`);
        }else {
            console.log(`실패 ${state.reason}`);
        }
        // 다만 이렇게 처리하는 것은 좋은 방법은 아니다.
    }
}
