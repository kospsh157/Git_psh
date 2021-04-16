import {useState, useEffect} from 'react';

// &&연산자 코딩 연습
function UsingAndOperator() {
  const [isKorea, setIsKorea] = useState(false);
  const [isEvent, setIsEvent] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  console.log(isKorea, isEvent, isLogin, isAuth);
  return (
      <div>
          {isKorea == false && (
              <div>
                  <h1>한국에서만 접속해 주세요.</h1>
              </div>
          )}
          {isKorea && isEvent && (
              <div>
                  <h1>이벤트 중입니다. 이벤트 페이지입니다. 링크를 클릭해서 이벤트를 진행해주세요.</h1>
              </div>
          )}
          {isKorea && isEvent == false && isLogin == false && (
              <div>
                  <h1>로그인을 먼저 해주세요.</h1>
              </div>
          )}
          {isKorea && isEvent == false && isLogin && isAuth == false && (        
              <div>
                  <h1>인증 절차가 끝나지 않았습니다. 인증 절차를 해주세요.</h1>
              </div>
          )}
          {isKorea && isEvent == false && isLogin && isAuth && (
              <div>
                  <h1>안녕하세요. 누구 누구 님.</h1>
              </div>
          )}
      </div>
  )
}



function App() {
  
  return (
    <UsingAndOperator/>
  );
}

export default App;