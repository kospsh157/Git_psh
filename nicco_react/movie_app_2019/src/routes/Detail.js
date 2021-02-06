import React from 'react';

// home화면에서 영화 카드 하나를 눌렀을때, link to 를 타고 정보를 담아서 여기로 온다(결국 이 화면을 보여주게 된다.)
// 만약에 link to 통해서 이화면에 온상태에서 새로고침을 누르면, 정보가 담아서 오지 않기 때문에, 
// 우리는 요 Detail 컴포넌트를 라우터 쪽으로 빼서 하나의 페이지로, 클래스 타입으로 작성해야 한다.
class Detail extends React.Component {
    // 기본적으로 딸려오는 props가 있는 이유는 이 곳은 지금 route안이기 때문이다.!!! 매우 중요하다.
    // 우리가 history객체를 쓸 수 있는 이유는 처음부터 route안에서 작동중이기 때문이다.
    // app.js으로 가면 <HashRouter></HashRouter> 안에 페이지들이 있고, 현재 그 안에서 돌고있다.

    // 기본적으로 딸려오는 props에는 여러가지 기능이 있는데, 
    // 그중에 history 객체에는 go, goBack, gofoward 등이 url변경을 하게 해준다.
    
    // 참고로 componentDidMount()안에 있는 것들은 render(), 즉 컴포넌트가 먼저 렌더링 되고 실행된다.
    // 따라서 그 점에 주의해서 코드를 짜야한다. 
    componentDidMount() {
        // 기본으로 오는 props에 어떤 것이들어 있는지 살펴보자
        console.log(this.props);
        const { location, history } = this.props;
        // 여기서 부터 만약 link to 를 타고 들어오는게 아니면 그냥 home으로 리다이렉트 시키는 코드
        if(location.state === undefined) {
            history.push("/");
        }
    }
    render() {
        // 만약 location 이 안오면 렌더링에서 부터 에러가 뜬다.
        // 여기 부분이 먼저 실행되므로, 여기서 location.state가 undefined일때, 어떻게 해야 하는지 정해줘야한다.
        const { location } = this.props; 
        if(location.state){
            return <span>{location.state.title}</span>
        }else{
            return null;
        }
    }
}

export default Detail;