// 스타일컴포넌트의 장점인 동적 컴포넌트에 대해서 알아보자.
import React from 'react';
import styled from 'styled-componenets';

const BoxCommon = styled.div`
    width: ${props => (props.isBig ? 200 : 100)}px;
    height: 50px;
    background-color: #aaaaaa;
`;

function Box({size}){
    const isBig = size === 'big';
    const labe = isBig? '큰박스' : '작은박스';
    return <BoxCommon isBig={isBig}>{label}</BoxCommon>
}
export default Box;