import logo from './logo.svg';
import { Component, useState } from 'react';
import './App.css';

// 기존에 클래스 형태
class App extends Component {
  state = {
    count: 0
  };
  modify = n => {
    this.setState({
      count: n
    });
  };

  render() {
    const { count } = this.state;

    return (
      <>
        <div>{count}</div>
        <button onClick={() => this.modify(count + 1)}> Increment </button>
      </>
    )
  }
}


// 위 형태를 만약 훅으로 만든다면
// 이렇게 간단해진다.
const App = () => {
  // 배열 비구조화로 받는다.
  const [count, setCount] = useState(0);
  // 변수가 또 필요하면 이렇게 또 훅으로 끌어다가 쓰면 된다.
  const [email, setEmail] = useState("");
  const updateEmail = e => {
    // 객체 비구조화로 이벤트 객체에서 target 프로퍼티안에 있는 객체의 value프로퍼티를 가져옴 
    // e.target.value; 
    // const value = e.target.value; 이걸 그냥 비구조화로 쓰면 이렇게 됨
    const {target: {value}} = e;
    setEmail(value);
  };
  return (
    <>
      {count}
      <button onClick={() => setCount(count + 1)}> Increment </button>
      <input placeholder="Email" value={email} onChange={updateEmail} />
      <input type='text'/>
    </>
  )
}
export default App;
// 설명
/*
  1. useState(); 는 초기값을 정하고, 우리에게 값과 수정할 수 있는 함수인 count, setCount()메서드를 제공한다.
  2. 즉 useState() 가 주는 배열의 0인덱스에는 값이 있고, 1인덱스에는 setCount()메서드가 있다.
  3. 클래스 형태에서는 우리가 state부터 그것을 수정하는 함수까지 다 만들어줘야 하는데, 이제는
  딱 정해져있는 방식으로 편하게 사용할 수 있는 것이다.
  4. 가장 중요한 useEffect 도 있는데,
  did mount, did update가 했던 일과 비슷하다. 
  이들은 주로 API에서 데이터를 요청할 때 사용한다.
*/