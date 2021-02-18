import React, {useState, useEffect, useRef} from "react";
import ReactDOM from "react-dom";
//useEffect()
/*
    1. effect()함수는 일단 마운트 되기 직전 한 번 일어나고, dependency에 의해 반복 업데이트 된다.
    2. effect()함수의 return 문에 정의된 기능은 willUnMount,즉 컴포넌트가 사라지기 직전에 한번 실행된다. 
*/

const useClick = (onClick) => {
    const element = useRef();
    if(typeof onClick !== 'function'){
        return;
    }
    
    useEffect( () => {
        if(element.current){
            element.current.addEventListener("click", onClick);
        }
        // 리턴문을 작성해주면 해당 컴포넌트가 WillUnMount될 때, 리스너를 해재할 수 있다.
        // 리스너를 해재해야 하는 이유는, 메모리상에 계속 남기 때문이다. 쓰지 않을 컴포넌트는 바로바로 해재해야 한다.
        return () => {
            if(element.current){
                element.current.removeEventListener("click", onClick );
            }
        }
        // dependency 를 없게 하자, 그러면 마운트될 때, 딱 한번만 실행된다.
    }, []) 
    return element;
}

const App = () => {
    // 아무 콜백 함수를 만들자
    const sayHello = () => console.log('say hello');

    // 콜백함수를 넣어주자.
    // 그럼 반환되는 것은 이벤트리스너가 달려서 나오는 돔요소이다.
    const title = useClick(sayHello);

    return (
        <div className = "App">
            {/* h1요소에 title돔요소를 참조하도록 한다. */}
            <h1 ref={title}> Hi </h1>
        </div>
    )
}

export default App;