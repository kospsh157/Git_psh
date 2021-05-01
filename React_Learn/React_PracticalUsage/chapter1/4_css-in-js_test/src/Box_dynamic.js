// 스타일컴포넌트의 장점인 동적 컴포넌트에 대해서 알아보자.
import React from 'react';
import styled from 'styled-components';


// width 부분이 핵심이다. 동적으로 small, big에 따라 width값이 200, 100으로 바뀐다. 
// props를 익명함수로 그냥 표현한다. 리턴부분에서 삼항연산자로, 동적인 역할이 가능하다.
const BoxCommon = styled.div`
    width: ${props => (props.isBig ? 200 : 100)}px; 
    height: 50px;
    background-color: #abbccd;
`;

function Box({size}){
    const isBig = size === 'big';
    const label = isBig? '큰박스' : '작은박스';
    return <BoxCommon isBig={isBig}>{label}</BoxCommon>
}
export default Box;
