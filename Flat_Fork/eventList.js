'use strict'


function test(){
    return (
        <div>
            <h1>잘되는지 테스트</h1>
        </div>
    )
}




const domContainer = document.querySelector('#react-root')
ReactDOM.render(React.createElement(test), domContainer)
