import React from 'react';
import style from './3_Button.module.scss'; 
// 자바스크립트에서 scss파일을 불러오는 순간 .CSS 파일로 변화해주는 패키지를 깔아야 사용할 수 있다.
// npm i --save node-sass 


import cn from 'classnames';



function Button({size}){
    const isBig = size === 'Big';
    const label = isBig ? '큰 박스' : '작은 작스';

    return (
        <div
            className={cn(style.button, {[style.big]: isBig, [style.small]: !isBig})}
        >
            {label}
        </div>
    )
}

export default Button;