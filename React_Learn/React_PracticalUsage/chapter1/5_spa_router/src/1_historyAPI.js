import React, {useEffect} from 'react';

// 싱글페이지애플리케이션 구현이 가능하려면 다음 두 가지 기능이 필요하다.
// 1. 자바스크립트에서 브라우저로 페이지 전환 요청을 보낼 수 있다. 단 브라우저는 서버로 요청을 보내지 않아야 한다.
// 2. 브라우저의 뒤로 가기와 같은 사용자의 페이지 전환 요청을 자바스크립트에서 처리할 수 있다. 
//    이때도 브라우저는 서버로 요청을 보내지 않아야 한다.

// 한마디로 스크립트 단에서 페이지 전환 요청을 보낼수 있고, 또 스크립트 단에서 그 요청을 받아 처리 할 수 있어야한다.
// 단, 브라우저는 서버로 요청을 보내지 않아야 한다.

// 이러한 조건을 만족하는 브라우저 API는 pushState, replaceState 함수와 popstate 이벤트이다.
// 브라우저는 히스토리에 state를 저장하는 스택이 존재한다.

// 브라우저 히스토리API의 동작을 확인하는 코드이다.
export default function App(){
    useEffect(()=>{
        window.onpopstate = function(event){
            console.log(`location: ${document.location}, state: ${event.state}`);
        };
    }, []);// 컴포넌트가 마운트 된 후, onpopstate 이벤트 핸들러를 등록하는 용도로 사용됨.

    return (
        <div>
            <button onClick={()=>window.history.pushState('v1', '', '/page1')}>
                page1
            </button>
            <button onClick={()=>window.history.pushState('v2', '', '/page2')}>
                page2
            </button>
        </div>
    );
}
// 설명
/*
  1. pushState() 함수가 호출되면 url이 /page1, /page2로 번갈아 변경되는 것을 볼 수 있다.
  2. 이때 서버로 요청이 가지 않고 화면도 변하지 않는다.
  3. 단지 스택에 state가 쌓일 뿐이다.
  4. onpopstate의 핸들러 함수도 호출되지 않다가, 뒤로가기 버튼을 누르면 호출된다.
  5. 계속 뒤로가기 버튼을 누르면 스택이 비워질 때까지 onpopstate함수가 호출되다가 최초에 접속했던 지점으로 돌아간다. 
  6. 이렇게 pushState함수와 popstate이벤트로 위에서 말한 두 가지 기능을 구현할 수 있다.
  7. replaceState함수는 기능이 pushState함수와 같지만, 스택을 쌓지 않고 가장 최신의 state를 계속 대체한다.
  8. 이렇게 replaceStgate, pushState, 함수와 popstate이벤트만 있으면 클라이언트에서 라우팅 처리가 되는 싱글페이지애클리케이션을
  만들 수 있다.

  다음 2_simpleSPA.js 에서 간단한 싱글페이지애플리케이션을 만들어보자.
*/