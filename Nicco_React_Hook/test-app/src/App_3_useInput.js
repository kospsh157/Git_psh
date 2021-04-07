import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
// useInput 훅을 알아보자
// useInput 이 혁명적인 이유는 분리된, 외부 파일에서 이벤트 리스너 함수를 만들 수 있다는 점이다!
const useInput = initialValue => {
    const [value, setValue] = useState(initialValue);
    // 함수를 추가해보자
    const onChange = (event) => {
        console.log(event.target);
    }

    // 이렇게 {}로 감싸면 익명객체가 된다.
    // 그러면 value값을 받을때에는 무조건 프로퍼티이므로, useInput().value로 받아야 한다.
    // 이렇게 html태그의 프로퍼티명과 똑같이 해서 반환하면, JSX 에서 그냥 풀어서 쓰면 자동으로 먹는다.
    return {value, onChange};
}

const App = () => {
    const name = useInput("Mr. ");
   
    return (
        //   프래그먼트는 동시에 여러개의 컴포넌트를 렌더링 해야 할 때는 반드시 써야 한다.
        <>
            <h1>hello</h1>
            {/* <input placeholder="name" value={name.value}/>  */}
            {/* 위에거는 다음 것과 같다. */}
            {/* 나머지 연산자로 객체를 다 풀어서 놓는다. */}
            {/* 이렇게 하면 name이 리턴하는 객체의 모든 프로퍼티를 풀어서 자동등록한다. */}
            <input placeholder="name" {...name}/>

        </>
        
    )
}
export default App;