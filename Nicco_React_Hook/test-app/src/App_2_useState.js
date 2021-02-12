import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

// hooks가 생기기 전까지 state를 함수형 component에서는 사용할 수 없었다.
const App = () => {
  const [item, setItem] = useState(1);
  const decrementItem = ()=> setItem(item - 1);
  const incrementItem = ()=> setItem(item + 1);
  return (
    //   프래그먼트는 동시에 여러개의 컴포넌트를 렌더링 해야 할 때는 반드시 써야 한다.
    <>
        <h1>hello {item}</h1>
        <h2>Start editing to see some magic happne!</h2>
        <button onClick={incrementItem}>Increment</button>
        <button onClick={decrementItem}>Decrement</button>
    </>
  )
}
export default App;