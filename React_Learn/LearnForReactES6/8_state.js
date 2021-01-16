// state에 대해서 알아보자 
// state는 동적으로 변하는 데이터를 받아 컴포넌트에 전달하기 위해 만들어진 저장소이다.
// prop은 정적인 데이터를 컴포넌트에 전달하기 위한 저장소이다.

class App extends React.Component{
    state = {
        count: 0
    };

    add = () => {
        console.log("add");
        this.setState(current => ({ count: current.count + 1}));

    };

    minus = () => {
        console.log("minus");
        this.setState(current => ({ count: current.count + 1}));
    };

    render(){
        return (
            <div>
                <h1> I'm a Class Component Number is {this.state.count} </h1>
                <button onClick={this.add}>Add</button>
                <button onClicnk={this.minus}>Minus</button>
            </div>
        ) 
    }
}
// 클릭 이벤트에 만약 this.add() 라고 등록하면, 클릭도하기 전에 즉시 실행된다. ()를 빼야지만 이벤트 발동시에만 호출된다.