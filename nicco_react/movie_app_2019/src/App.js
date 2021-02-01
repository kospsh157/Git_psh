import React from "react";
import {HashRouter, Route} from "react-router-dom";
import About from "./routes/About";
import Detail from "./routes/Detail";
import Home from "./routes/Home";
import Navigation from "./components/Navigation";

function App(){
  return (
  // 링크를 쓰려면, 반드시 라우터안에 써야 한다.
  // 링크는 네비게이션 안에 쓰이고 있다.
  // 따라서 네비게이션은 반드시 라우터 안에 들어가야 한다.

  // 두 개이상의 컴포넌트를 동시에 렌더링하기 위해서는 프레그넌트로 감싸줘야한다.
  // 프래그넌트는 <> </> 으로 축약해서 쓸 수 있다.
  <HashRouter>
    <Navigation />
    <Route path="/"  exact={true}  component={Home}/>
    <Route path="/about" component={About}/>
    <Route path="/movie-detail" component={Detail}/>
  </HashRouter>
  );
}

export default App;