import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";

// useEffect 에는 많은 사용법이 있다.
/*

** 기본적으로 컴포넌트가 처음에 마운트 될 때, 그리고 매번 업데이트 될 때 마다, 계속 실행된다.
    1. componentWillUnmount  : 컴포넌트가 해재되기 직전 한번
    2. componentDidMount     : 컴포넌트가 삽입되고 나서 한번
    3. componentDidUpdate    : 컴포넌트가 리렌더링이 되고나서 매번
    4. 위 3가지 기능을 합친거라고 할 수 있다.

    5. useEffect() 
    첫번째 인자로는 기능을 수행하는 역할로써, 함수가 들어간다. 
    두번째 인자로는, 첫번째 인자의 함수를 언제 호출할지 기준을 정해준다.
    정확히, 말하자면, 리액트에서 어떤 데이터가 변하면, 컴포넌트를 다시 리렌더링할텐데, 그때 
    특정한 데이터가 변할 때 마다 useEffect()의 첫번째 인자로 준 함수를 호출한다. 
    
    두 번째 인자를 dependency라고 하는데, 배열타입으로 넣게 되어 있다.
    이 인자에 아무 의존적인 변수를 넣지 않고, 빈배열을 넣으면, 결국 아무 데이터에도 의존하지 않게된다는 뜻이다.
    따라서 useEffect()는 처음 컴포넌트가 마운트되는 단 한번만 실행된다.

    만약 디펜던시에 어떤 데이터를 추가하면 그 데이터에 의존하여, 그 데이터만 바라보다가 그 데이터가 바뀌면
    다시 effect인자로 준 함수를 실행한다.

    추가적으로, useEffect() 에서 효과함수 콜백에 리턴문을 넣게 되면 해당 컴포넌트가 사라지기 직전에 다시 한번 리턴구분을 실행한다.
    즉, componentWillUnmount 처럼 사용 할 수 있다. 

    
*/

const App = () => {
    const sayHello = () => console.log('hello');
    const [number, setNumber] = useState(0);
    const [aNumber, setAnumber] = useState(0);
    // 주의 할 점은 변수 선언시 호이스팅이 안되므로, useEffect에서 두번째 인자로 변수데이터를 줄려면 
    // 반드시 useEffect를 변수 선언 다음에 작성해야 한다. 

    // 이렇게 하면 의존 데이터가 number가 되어서 number가 바뀔 때 마다 effect()함수를 호출한다.
    useEffect(sayHello, [number]);

    return (
        <div className = "App">
            <div>Hi</div> 
            <button onClick={() => setNumber(number + 1)}> {number}</button>
            <button onClick={() => setAnumber(aNumber + 1)}> {aNumber}</button>
        </div>
    )
}

export default App;
