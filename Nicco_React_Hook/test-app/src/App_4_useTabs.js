import React, { useState } from 'react';

// 중한 것은 useState() 를 통해 초기값을 잡을 수 있고, 
// setState()를 통해  state 값을 바꾸고 리렌더링 할 수 있다는 것이다.

// 여기 내용물이 있다고 치자
const content = [
    {
        tab: "Section 1",
        content: "I'm the content of the Section 1"
    },
    {
        tab: "Section 2",
        content: "I'm the content of the Section 2"
    }
];


const useTabs = (initialTab, allTabs) => {
    const [currentIndex, setCurrentIndex] = useState(initialTab);
    // 여기서 핵심은 
    // 초기 인덱스 값으로 지정된 컨텐츠 아이템을 일단 리턴하고,
    // 그 와 동시에, 인덱스 값을 바꿀 수 있는 setSate()함수랑 같이 리턴하는 것이다.
    // 그리고 JSX에서 리스너로 setState()를 통해 원하는 로직으로 리렌더링 할 수 있게 한다.
    return {
        currentItem: allTabs[currentIndex],
        changeItem: setCurrentIndex
    }
};

const App = () => {
    const {currentItem, changeItem} = useTabs(0, content); 

    return (
        <div className="App">           
            {content.map( (section, index) => {
                // JSX에서 반드시 리스너함수를 적을때는 호출을 하지 말고 함수정의를 해야 한다.
                return <button onClick={() => changeItem(index)}> {section.tab} </button>
            })}
            <div>
                {currentItem.content}
            </div>
        </div>
    );
};

export default App;
