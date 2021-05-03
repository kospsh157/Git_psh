import React, { useEffect, useState, } from 'react';


export default function App(){
    const [pageName, setPageName] = useState('');   // 1번
    useEffect(()=>{
        window.onpopstate = event => {
            setPageName(event.state);               // 2번
        };
    }, []); 

    function onClick1(){                            // 3번~
        const pageName = 'page1';
        window.history.pushState(pageName, '', '/page1'); 
        setPageName(pageName);
    }
    function onClick2(){
        const pageName = 'page2';
        window.history.pushState(pageName, '', '/page2');
        setPageName(pageName);
    }                                               // ~3번
    return (
        <div>
            <button onClick={onClick1}>page1</button>
            <button onClick={onClick2}>page2</button>
            {!pageName && <Home />}                 // 4번
            {pageName === 'page1' && <Page1/>}      // 5번
            {pageName === 'page2' && <Page2/>}      // 5번
        </div>
    );
}

function Home(){
    return <h2>여기는 홈페이지 원하는 페이지 버튼을 누르세요.</h2>
}
function Page1(){
    return <h2>여기는 Page1입니다.</h2>
}
function Page2(){
    return <h2>여기는 Page2입니다.</h2>
}

// 설명
/*
  1번 : 현재 페이지 정보를 pageName 상탯값으로 관리한다.
  2번 : popstate 이벤트가 발생하면 페이지를 전환한다는 의미이다.
  pageName상탯값을 수정함으로써, 페이지 전환이 일어난다.
  브라우저 히스토리 state를 페이지 이름으로 사용하고 있다.
  3번 : 페이지 버튼을 클릭했을 때 호출되는 이벤트 처리 함수이다.
  4번 : 페이지 버튼을 누르기 전에는 home컴포넌트가 렌더링되고, 
  5번 : page1를 누르면 주소가 바뀌면서 화면도 page1으로 렌더링된다.
  page2도 마찮가지.
  뒤로 가기를 눌르면 popstate이벤트가 발생된다. 그 전에 페이지로 돌아간다. 
*/


// 이와 같이 브라우저 히스ㅗ리 API를 이용해서 페이지 라우팅 처리를 직접 구현할 수도 있다.
// 허나 라우팅 처리를 직접 구현하는 것은 신경써야 할 부분이 많아서 react-router-dom 패키지를 주로이용한다.
// 리액트로 싱글페이지애플리케이션을 만들 때 많이 사용된다.
// react-router-dom패키지도 내부적으로브라우저 히스토리 API를 사용한다.
// 먼저 react-router-dom패키지를 설치해보자. npm -i react-router-dom

// 다음 학습 파일 3_react-router-dom.js를 보자 
