// 화살표 함수
/*
    1. 파라미터가 한개면 가로 생략할 수 있다.
    2. 함수의 본문이 한 줄로 구성되어 있다면, 반환 값 앞에 return 키워드를 생략할 수 있다. 
    3. 함수의 본문이 한 줄로 구성되어 있다면 {} 를 생략 할 수 있다.


*/

// 화살표 함수 컴포넌트
const HelloWorld = props => {
    return <h1>{props.hello}</h1>;
}

// 클래스 컴포넌트
class HelloWorld extends Component {
    render() {
        return (
            <h1>{props.hello}</h1>
        );
    }
}

// Hooks 가 등장하면서 이제 함수형 컴포넌트에서도 라이프사이클을 사용할 수 있고, 클래스 컴포넌트는 레거시코드를 위해
// 그냥 배워둘 뿐이다. 앞으로 사용시에는 모두 함수형 컴포넌트로 작성한다.


