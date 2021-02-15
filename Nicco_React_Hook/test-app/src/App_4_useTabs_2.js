import React, { useState } from 'react';
// 뭔가 니꼬님 설명을 잘 못한다.
// 계속 내가 _2 버전을 만들어서 나만의 것으로 다시 만들게 해주네
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
// 이 useTabs 함수는 배열로 만들어진 어떤 콘텐츠를 두 번째 인자로 주고,
// 시작 인덱스를 첫번째 인수로주면, 첫번째 인덱스 부터 시작해서 차례대로 모든 콘텐츠를 버튼을 누를때 마다 보여주는
// 역할을 하게 해줄 것이다.
const useTabs = (initialIndex, content) => {
    const [currentIndex, setIndex] = useState(initialIndex);
    return {
        item: content[currentIndex], // 결국 setState()함수에 따라 이쪽 결과가 달라져야 한다.
        changeItem: setIndex
    }
}
// const useTabs = (initialTab, allTabs) => {
//     const [currentIndex, setCurrentIndex] = useState(initialTab);
//     return {
//         currentItem: allTabs[currentIndex],
//         changeItem: setCurrentIndex
//     }
// };

const App = () => {
    // 이런 useState() 훅을 볼 때 마다, changItem이 호출되면, 
    // 앞에 있는 item이 바뀐다고 생각하면 된다.
    const {item, changeItem} = useTabs(0, content); 

    return (
        <div className="App">           
            {content.map( (current, index) => {
                return <button onClick={() => changeItem(index)}> {current.tab} </button>
            })}
            <div>
                {item.content}
            </div>
        </div>
    );
};

export default App;
