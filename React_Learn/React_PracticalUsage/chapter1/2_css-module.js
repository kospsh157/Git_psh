// create-react-app에서는 CSS파일 이름을 {이름}.module.css 로 하면 css-module이 된다.
    
// {이름}.module.css 

// 1_CSSusage.js에 있는 코드들을 css-module방식으로 작성해보자
import React from 'react';
import style from './Button2.module.css'; // 1번

function Button({size}){
    if(size === 'big'){
        return <button className={`${style.button} ${style.big}`}>큰 버튼</button>; // 2번
    }else{
        return (
            <button className={`${style.button} ${style.small}`}>작은 버튼</button>
        );
    }
}
export default Button;
console.log(style); // 3번
// 설명
/*
    1번 : css-module은 클래스명 정보를 담고 있는 객체를 내보낸다.
    2번 : CSS파일에서 정의한 클래스명이 style객체의 속성이름으로 존재한다. 
    3번 : style객체를 출력한 결과는 다음과 같다.
    {
        big: 'Button2_big__1AXxH',
        small: 'Button2_small__1G4lx',
        button: 'Button2_box__D8Lg-',
    }
    각 클래스명에 고유한 해시값이 들어있다. 사용자에게 전달된 HTML파일을 열어 보면 해시값이 어떻게 사용되는지 알 수 있다.
    이렇게한 이유는 클래스명이 같더라도, html에 적용될 때 해시값들을 이용해 중복되지 않게함이다.
    서로 다른 CSS파일을 import하고 각각의 객체에 동일한 프로퍼티(=클래스명)이 있어도 html에 적용될 때는 해시값이 붙어 결국 고유한 
    클래스명으로 붙는다. 따라서 CSS파일에서 클래스명이 중복되도, 결과적으로 html에 적용될 때는 중복되지 않는다.
*/


// css-module 방식에서 classnames패키지 사용하기
/*
    1. 위에서 JSX쪽을 보면, classNam={} 에 입력하기가 다소 번거롭다.
    2. 좀 더 쉽게하기 위해서 classnames라는 패키지를 추가로 설치해보자
    npm install classnames;
    3. 사용방법
    import cn from 'classnames';

    //JSX 부분
    <button className={cn{style.button, style.big}}>큰 버튼</button>
    <button className={cn{style.button, style.small}}>작은 버튼</button>
*/





// 박스 컴포넌트도 classnames패키지를 적용한 상태로 작성해보자
// classnames 페키지를 사용하는 이유는 클래스명을 조건부로 사용할 수 있기때문이다. 
// cn() 함수 안에 {} 객체로 만들어서 클래스명을 활성화하거나 비활성화할 수 있다.
/*
    1. cn( {
        [style.big]: isBig,
        [style.small]: !isBig,
    } )
    2. cn()함수 인자에 객체를 넣을 수 있다.
    3. 이 객체에서 프로퍼티는 배열로 표현한다.
    4. 그리고 그 값으로 boolean 값을 가지며, 
    5. true이면 해당 프로퍼티의 클래스명을 가지게된다.
    6. false면 해당 프로퍼티는 비활성화되어서 CSS가 적용되지 않게 된다.

*/
import React from 'react';
import style from './Box2.modules.css';
import cn from 'classnames';

function Box({size}){
    const isBig = size === 'big';
    const label = isBig? '큰 박스' : '작은 박스';

    return (
        <div
            className={cn(style.box, {[style.big]: isBig, [style.small]: !isBig})}
        >
            {label}
        </div>
    );
}
export default Box;