import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";

// 자 이제 useEffect()를 이용해서 제목(title)를 업데이트 하는 것을 구현해보자
const useTitle = initailTitle => {
    // useState() 훅은 뭐 기본으로 쓰여야 한다. 데이터가들어간다면,
    const [title, setTitle] = useState(initailTitle);
    // 타이틀을 변경하는 effect함수를 만들고
    const updateTitle = () => {
        // dom요소를 가져와서 
        const htmlTitle = document.querySelector("title");
        // 타이틀 돔요소에 직접 값을 박아 넣는다.
        htmlTitle.innerHTML = title;
    }

    // 여기다가 넣어준다.  
    // 이 함수가 호출되면 useEffect()함수도 실행되는것이다.
    useEffect(updateTitle, [title]);

    // 그리고 여기서는 상태변화함수만 리턴해준다.
    return setTitle;
}

// 훅 함수는 반드시, 컴포넌트 함수 내부에서 작성되어야 하거나, 혹은 그냥 외부에서 컴스텀 훅함수 안애 쓰여야 한다.
// 이렇게 완전 밖에다 쓰면 에러가 일어난다.
// useEffect(updateTitle, [title]);


const App = () => {
    // 신기하게도 여기서는 setState()함수만 리턴 받고 
    // setState()로 title데이터만 바꿔도 줘도 useEffect()에 의해서 updateTitle()함수가 호출된다.
    // useEffect(), useState()훅들은 한번만 호출되어도, 그 기능을 하기 때문에, 그리고 
    // useTitme()함수가 한번 호출되기 때문에, 그 안에 위 훅들도 호출이 되기 때문에, 
    // 이런게 가능한 것이다.
    const titleUpdate = useTitle("Loading중이라고...");

    // 여기서 setState()로 초기값을 바꿔서 다시 호출하면,
    // 위 훅 2개를 다시 호출한다. 
    // 그리고 이번엔 상태값인 title이 바뀌었으므로, updateTitle() effect함수가 다시 실행되어서 
    // 결론적으로 html 돔의 title요소가 바뀌게 된다.

    setTimeout( () => titleUpdate("Home"), 3000);

    // 의문점은 훅은 한번만 호출해도 기능을 계속 할 텐데.. 꼭 커스텀 함수에 훅이 들어가면,
    // 계속해서 호출되니깐.. 이걸 다르게 작성해도되지 않을까.. 하는 생각이 든다.
    return (
        <div className = "App">
            <div>Hi</div>
        </div>
    )
}

export default App;