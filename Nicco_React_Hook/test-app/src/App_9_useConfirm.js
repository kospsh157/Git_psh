import React, {useState, useEffect, useRef} from "react";
import ReactDOM from "react-dom";
//useConfirm()
/*
    1. 정확히 말하면, useState, useEffect 를 응용하지 않기 때문에 훅은 아니다.
    단지 javascript에 내장된 window.confirm() 함수를 사용한다.
    2. 하지만, 유용한 훅? 처럼 쓰인다. 
    3. 무언가 진행하기 전에 확인창을 띄어주는 역할을 만들어 줄 때 자주 쓰인다.
    어떤 실행함수가 진짜로 실행되기 전에 중간에 딱 막고 일단 한번 확인/취소 를 묻는 작업을 하는 것이다.
    확인을 눌르면 비로소 함수가 계속 실행된다.
*/

const useConfirm = () => (message='', callback) => {
    if (typeof callback !== 'function') {
        console.log(typeof callback);
        // 이렇게 코드를 작성하면, callback은 undefined로 나온다. 따라서 이 함수는 항상 여기로 타게된다.
        return;
    }
    // confirmAction을 만들고 그 함수를 다시 리턴한다.
    // 외부함수 ( 내부 함수 ) 이런 구조라고 생각해보자
    // 외부함수의 파라미터로 들어오는 인자값 + 내부함수를 이용해서 새로운 내부함수를 만들어서 리턴하는 것이다.
    // 이것이 함수형 프로그래밍의 기초이다.
    const confirmAction = () => {
        console.log('어디야');
        if(window.confirm(message)) {
            // 브라우저 창에서 확인 창이 뜨고, 거기서 확인을 누르면 true값으로 바뀌면서 다음이 실행된다.
            callback(0);
        }
    }
    return confirmAction;
}


const App = () => {
    const deleteWorld = () => console.log("Deleting the world...");
    const confirmDelete = useConfirm("Are you sure?", deleteWorld);
    return (
        <div className = "App">
            <button onClick={confirmDelete}>Delete the world</button>
        </div>
    )
}



export default App;