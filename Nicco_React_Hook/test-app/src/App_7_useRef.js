import React, {useState, useEffect, useRef} from "react";
import ReactDOM from "react-dom";

//

const App = () => {
    const potato = useRef();
    
    // 리턴 위로 있는 것은 전부다 마운트 되기 전에 실행된다. 특별한 훅이 아닌이상
    // 위의 useRef()는 훅이라 상관없는데, cosole.log()는 컴포넌트가 마운트 되기 전에 실행되기 때문에 
    // 지금 여기에서는 undefiend로 나올 것이다.

    // 마운트 된 후에 실행되면 input태그가 나오게 된다.
    // 마운트만 되면, useRef()를 통해 우리는 html태그에 접근할 수 있다.
    setTimeout( ()=> potato.current.focus(), 2000);
    return (
        <div className = "App">
            <div>Hi</div>
            <input ref={potato} placeholder="la"/>
        </div>
    )
}

export default App;