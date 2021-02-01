import React from "react";
import { Link } from "react-router-dom";


function Navigation(){
    return (
    <div>
        {/* 여기를 보면 링크를 걸었을때, <link> 태그 안에 있는 모든 것들은 그냥 html페이지 위에서 보여진다.
        그리고 해당 내용물을 누르면, link to = 에 할당된 path로 컴포넌트를 교체 하게 된다.  */}
        <Link to="/"> Home </Link>
        <Link to="/about"> About </Link>
    </div>
    )
}

export default Navigation;