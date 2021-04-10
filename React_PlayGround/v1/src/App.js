import {useState, useEffect} from 'react';


function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    // 이벤트에 다음 함수를 등록해놓으면, 창의 사이즈가 바뀔 때마다 이 함수가 호출된다.
    // 그리고 이 함수는 결국 setWidth() 함수를 호출하고, 
    // width를 바꾸게 된다. width 값이 바뀌면 계속 실시간으로 컴포넌트가 리렌더링되고, 결국 리사이즈를 하게되면
    // 실시간으로 변경되는 width값을 컴포너트를 통해 표시해준다.
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => {
      // 이 컴포넌트가 사라지게 된다면 그 직전에 여기에 걸려있는 이벤트 리스너는 삭제해주자.
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return width;
}


function App() {
  const width = useWindowWidth();
  console.log(width);

  return (
    <div className="App">
      <button> <h1>{`Hi, your width : ${width}`}</h1> </button>
    </div>
  );
}

export default App;