import {useState, useEffect} from 'react';

// &&연산자 코딩



function App() {
  
  const isLogin = false;

  return (
    <div className="App">
    {isLogin && 
      <p>안녕하세요 회원님?</p>
    }
    
    {true}
    {false}

    {isLogin}
    {'안녕'} 
    {'\t하이'}
    </div>
  );
}

export default App;