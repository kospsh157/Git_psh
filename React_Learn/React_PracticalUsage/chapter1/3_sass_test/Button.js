import React from 'react';
import style from './Button.module.scss'; 
// 자바스크립트에서 scss파일을 불러오는 순간 .CSS 파일로 변화해주는 패키지를 깔아야 사용할 수 있다.
// npm i --save node-sass 


import cn from 'classnames';

function Button({size}){
    if(size === 'big'){
        return <button className={cn(style.button, style.big)}>큰 버튼</button>
    }else{
        return <button className={cn(style.button, style.small)}>작은 버튼</button>
    };
}

// function Button({size}){
//     const isBig = size === 'big';
//     const label = isBig ? '큰 버튼' : '작은 버튼';

//     return (
//         <button
//             className={cn(style.button, {[style.big]: isBig, [style.small]: !isBig})}
//         >
//             {label}
//         </button>
//     )
// }

export default Button;
