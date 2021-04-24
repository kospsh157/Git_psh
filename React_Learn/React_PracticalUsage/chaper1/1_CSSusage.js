// CSS 작성 방법 결정하기
// 웹 애플리케이션을 개발할 때 돔 요소에 스타일을 적용하기 위해서 CSS를 이용한다. 
// 리액트로 프로그래밍을 할 때는 컴포넌트를 중심으로 생각하는 게 좋다.
// UI는 컴포넌트의 조합으로 표현된다. 컴포넌트 하나를 잘 만들어서 여러 곳에 재사용하는게 좋다. 
// 그렇게 하기 위해서 컴포넌트는 서로 간의 의존성을 최소화하면서 내부적으로는 응집도를 높여햐 한다.
// 응집도를 높히기 위해서 CSS코드 역시 컴포넌트 내부에서 관리하는 것이 좋다.
// 컴포넌틑 내부에서 CSS코드를 관리하는 방법으로는
/*
    1. css-module
    2. css-in-js 
    가 있다. 
    회사에서 css코드를 담당하는 팀이 별도로 존재한다면, css-module, css-in-js는 그림의 떡이다.
    그런 경우에는 일반적인 방법인 CSS파일을 작성하는 방법과, Sass를 이용하는 방법을 알아야 한다.

*/

// Buttone1.css 파일   이런 형태의 파일은 일반적인 CSS파일이다.
/*
.big {
    width: 100px;
}
.small {
    width: 50px;
}
.button {
    height: 30px;
    background-color: #aaaaaa;
}
*/

// Button1.js 파일
import React from 'react';
import './Button1.css';     // 이런식으로 일반적인 CSS파일도 ESM문법을 이용해서 자바스크립트로 가져올 수 있다.

function Button({size}){
    if(size === 'big'){
        return <button className="button big">큰 버튼</button>; // 반드시 Button1.css파일에 정의된 css클래스명을 입력해야한다.
    }else{
        return <button className="button small">작은 버튼</button>;
    }
}

export default Button;



// 위와 같은 방식으로 Box컴포넌트도 만들어 보자 
// Box1.css파일
/*
.big {
    width: 200px;
}
.small {
    width: 100px;
}
.box {
    heigth: 50px;
    background-color: #aaaaaa;
}
*/

// Box1.js파일
import React from 'react';
import './Box1.css';

function Box({size}){
    if(size === 'big'){
        return <div className="box big">큰 박스</div>;
    }else{
        return <div className="box small">작은 박스</div>;
    }
}
export default Box;
// 위의 코드는 그 위의 코드의 내용과 크게 다른진 않다. 이제 Button, Box컴포넌트를 사용하여 App.js파일을 다음과 같이 작성해보자.

import React from 'react';
import Button from './Button1';     // 서로 다른 CSS 파일 두 개를 임포트했다.
import Box from './Box1';           // 단순히 이건 문제가 아니다. 다만 클래스명이 동일한 것이 있다면, 
                                    // Box로 덮어씌어지게 된다.

export default function App(){
    return(
        <div>
            <Button size="big"/>
            <Button size="small"/>
            <Box size="big"/>
            <Box size="small"/>
        </div>
    );
}

// 위 코드를 실행하면 오류가 터진다. 
/*
    1. 우선 같은 클래스 네임을 지정한게 잘못이다.
    위와 같이 중복되면 Button 스타일의 클래스 네임은 덮어씌워지기 때문에 결국 Box의 CSS만 남는다.
    2. 따라서 Button size는 처음 의도한대로되지 않는다.
*/

// css-module로 작성하기
/*
    1. css-module을 사용하면 일반적인 CSS파일에서 클래스명이 충돌할 수 있는 단점을 극복할 수 있다.
    2. css-module은 간결한 클래스명을 이용해서 컴포넌트 단위로 스타일을 적용할 때 좋다.
    3. create-react-app에서는 CSS파일 이름을 {이름}.module.css 로 하면 css-module이 된다.
    
    {이름}.module.css 

*/
