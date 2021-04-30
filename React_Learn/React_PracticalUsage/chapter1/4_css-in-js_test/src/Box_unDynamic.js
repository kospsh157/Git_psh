import React from 'react';
import styled from 'styled-components';

// 1번 
const BoxCommon = styled.div`           
    height: 100px;
    background-color: #aaaaaa;
`;
// 2번
const BoxBig = styled(BoxCommon)`
    width: 200px;
`;
const BoxSmall = styled(BoxCommon)`
    width: 100px;
`;

function Box({size}){
    if(size === 'big'){
        return <BoxBig>큰 박스</BoxBig>;        // 3번
    }else{
        return <BoxSmall>작은 박스</BoxSmall>;
    }
}

export default Box;

// 설명
/*
    1. 공통으로 CSS코드를 담고 있는 styled-components 컴포넌트를 만들었다.
    2. 마치 클래스 상속처럼 이전에 만든 BoxCommon 컴포넌트를 확장해서 새로운 styled-components컴포넌트를 만들 수 있다.
    3. styled-compoenents컴포넌트는 일반적인 리액트 컴포넌트처럼 사용될 수 있다.
    styled-componenets컴포넌트를 만들때 사용돤 문법이 생소해보일 수 있다.
    이는 ES6에 추가된 태그된 템플릿리터럴 문법이다.
    이 컴포넌트를 App.js 에 추가해서 불러보자. CSS 파일 없이 위의CSS가 적용되서 나오는 것을 볼 수 있다.
    이것이 바로 styled-components 이다.

    4. 자 다음에는 styled-components의 장점인 동적 스타일을 적용해보자.


    

    // 정리해보면 
    CSS를 리액트에 적용하는 방식은 크게 두 가지가 있다. 
    1. 기존 CSS파일을 따로 두고 관리하는 방법 
        1. 그냥 CSS파일을 그대로 이용하는 방법 
            1. 클래스이름 충돌 방지를 위하여 css-module를 이용하는 방법
            (import style from './Button.module.css)
            (classnames 패키지를 이용하면 쉽게 이용할 수 있다. npm install classnames) 
        2. SCSS을 이용하는 방법
            1. SCSS도 css-module방식으로 사용할 수 있다. (npm install node-sass)
            (import style from './Button.module.scss';)
            
    2. Styled-components를 이용하는 방법 
        자바스크립트로 다 할 수 있고, js파일에 css가 같이 들어있어서 관리가 더 편할 수 있다.
        하지만 CSS팀이 따로 있다면 거의 위의 방식으로 운영될 것이다.
        (npm install styled-components)
        (import styled from 'styled-components';)
*/               

