import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

// useInput() 훅을 응용해서 npm에 올려보자!
// 여기서는 유효성 검사를 하는 기능을 추가해보자!
// 여기서 하는 것은 훅에 관한 내용은 아니지만, 유효성검사를 쉽게 할 수 있는 팁이다.
// 알아두면 빠르게 유효성검사를 할 수 있다.



const useInput = (initialValue, vaildator) => {
    const [value, setValue] = useState(initialValue);
    const onChange = (e) => {
        const { target: {value} } = e;
        let willUpdate = true;
        // useInput() 두 번째 인자가 유효성검사함수라면,
        // 해당 함수로 value값을 검사해서 참/거짓으로 나오게 한다.
        if(typeof vaildator === "function"){
            willUpdate = vaildator(value);
        }
        // 그 값은 willUpdate에 있고 여기에 false가 나오면 더이상 글을 써지지 않는다.
        if(willUpdate) {
            // true나온다는 것은 유효성검사를 통과했다는 것이고, setValue()로 state값을 수정해준다.
            setValue(value);
        }
    };
    return {value, onChange};
}

const App = () => {
    // 강의에서 알려준 대로 useInput()를 쓰지 않고 걍 이렇게 해도 쉽고 간단히 유효성 검사를 할 수 있다.
    // ...흠.. 뭔가 useInput()은 계륵인거 같다.
    const [value, setValue] = useState("name");
    const onChange = (e) => {
        const text = e.target.value;
        if(maxLen(text)){
            setValue(text);
        }
        return 0;
    }
    


    // 10글자 이상 적으면 더이상 써지지 않는 유효성 함수를 작성하자.
    const maxLen = (value) => value.length < 10;
    // 위에서 만든 임의 유효성 검사 함수를 2번째 인자로 넣어준다.
    const name = useInput("Mr. ", maxLen);
   
    // 결론적으로 useInput() 훅은 내부에 useState() 훅을 사용한다.
    // 그리고 그것을 이용해 input태그에 들어가는 값이 바뀔 때 마다 리렌더링 할 수 있다.
    // 그리고 응용을 통해 두 번째 인자로 유효성검사를 하는 함수를 넣어주면 input태그에 넣어지는 문자열에 유효성검사를 
    // 할 수 있다.
    // 결국은 useState() 훅의 응용 이라고 할 수 있다.

    return (
        <>
            <h1>hello</h1>
            <input placeholder="name" {...name}/>
            {/* 아래는 그냥 내가 useState()훅으로만 똑같이 구현한거 */}
            <input placeholder="name" value={value} onChange={onChange} />
        </>
        
    )
}
export default App;