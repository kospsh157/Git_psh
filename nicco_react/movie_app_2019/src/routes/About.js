import React from "react";

// 모든 라우터들은 라우터 안에 컴포넌트에 기본적으로 보내는props 들이 있다.
// 이 about컴포넌트도 기본적으로, react-router-dom이 기본적으로 보내주는 props들이 있다.
// 총 4가지가 있는데
// history, location, match, staticContext 이다.
// 여기 이 리액트라우터가 보내주는 props들을 이용할 수 있다. 그게 포인트

function About(){
    return <span> About this page: I built it because I love movies.</span>;
}

export default About;