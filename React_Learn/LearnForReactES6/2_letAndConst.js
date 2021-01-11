// let const 
/*
    1. const로 변수 선언을 주로 하고 불편하면 그때 let으로 바꾸자.
    2. const는 재할당이 불가능하게 막아놓은거지 완전히 불변은 아니다.
    

*/

import React, {Component} from 'react';

class App extends Component {
    // class content
    render(){

        // greeting은 변할 일이 없어서 const로 사용했다.
        const greeting = "Welcome to React";
        return (
            <h1>{greeting}</h1>
        )
    }
}