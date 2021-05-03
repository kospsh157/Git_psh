import React from 'react';
import {Route, Link} from 'react-router-dom';

                                    
function Rooms({match}){       // 1번     
                                     
    return (
        <div>
            <h2>여기는 방을 소개하는 페이지 입니다.</h2>
            <Link to={`${match.url}/blueRoom`}>파란 방입니다.</Link>    // 2번
            <br />
            <Link to={`${match.url}/greenRoom`}>초록 방입니다.</Link> 
            <br />
            <Route path={`${match.url}/:roomId`} component={Room}/>  // 3번
            <Route
                exact
                path={match.url}
                render={()=><h3>방을 선택해 주세요.</h3>}
            />
        </div>
    );
}
export default Rooms;

function Room({match}){
    return <h2>{`${match.params.roomId}방을 선택하셨습니다.`}</h2>;     // 4번
}

// 설명
/*
    1번 : Route를 통해서 렌더링되는 컴포넌트는 match라는 속성값을 사용할 수 있다.
    2번 : match.url은 Route 컴포넌트의 path속성값과 같다. 따라서 Rooms 컴포넌트의 match.url은 
    /rooms과 같다. 
    3번 : Route 컴포넌트의 path 속성값에서 콜론을 사용하면 파라미터를 나타낼 수 있다.
    4번 : 추출된 파라미터는 match.params.{파라미터이름} 형식으로 사용될 수 있다.
*/