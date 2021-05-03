import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Rooms from '3_1_Rooms';                       // 1번 

export default function App(){
    return(
        <BrowserRouter>                             // 2번
            <div style={{ padding: 20, border: '5px solid gray'}}>
                <Link to='/'>홈</Link>               // 3번 ~
                <br />
                <Link to='/photo'>사진</Link>
                <br />
                <Link to='/rooms'>방 소개</Link>      // ~ 3번
                <br />
                <Route exact path='/' component={Home}/>    // 4번 ~
                <Route path='/photo' component={Photo}/>
                <Route path='/rooms' component={Rooms}/>    // ~ 4번
            </div>
        </BrowserRouter>
    );
}

function Home({match}){
    return <h2>이곳은 홈페이지입니다.</h2>
}
function Photo({match}){
    return <h2>여기서 사진을 감상하세요.</h2>
}

// 설명
/*
    1번 : rooms 컴포넌트는 별도의 파일로 구현한다.
    2번 : react-router-dom을 사용하기 위해서는 전체를 BrowserRouter컴포넌트로 감싸야 한다.
    3번 : 버튼을 통해서 페이지를 전환할 때는 react-router-dom에서 제공하는 Link컴포넌트를 사용한다.
    to속성값은 이동할 주소를 나타낸다. 
    4번 : react-router-dom의 Route컴포넌트를 이용해서 각 페이지를 정의한다. 현재 주소가 path속성값으로 시작하면
    component속성값이 가리키는 컴포넌트를 렌더링한다. 
    path에 들어가는 주소값이 있으면 다 해당된다. 따라서 만약 /photo로 되어 있다면, localhost:3000/photo/123를 하면
    해당 컴포넌트인 Photo컴포넌트가 보여진다. 
    단, localhost:3000/photo123 주소로는 연결되지 않는다. / 단위로 주소를 매칭시킨다는 점을 알아두자
    반면, exact속성값을 걸어두면, 해당 주소값이 완전히 일치해야 해당 컴포넌트가 렌더링된다. 
    위에서 / 패스로 잡아 놓고 exact를 걸어두지 않았다면 아마 모든 사이트 주소 내내 home만 보일 것이다.

    덧붙여서 흥미로운 점은
    path에 같은 주소를 적어도 된다는 것이다.
    <Route path='/photo' component={PhotoTop}/>
    <Route path='/photo' component={PhotoBottom}/>
    이런식으로 작성이 가능하다는 소리이다. 모두 렌더링된다.
*/



