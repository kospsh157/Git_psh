// 댄 아브라모프의 블로그로 가면 잘 알려진 컴포넌트 구분법이 있다.
// 다만 그것을 따라는 것은 너무 복잡하다.
// 따라서 다음과 같은 간략한 구분법을 소개한다.
// 비즈니스 로직과 상탯값의 유무에 따라 프레젠테이션과 컨테이너로 불리는 두 가지 컴포넌트로 구분하는 것이다.
// 프로그래밍 세계에서 관심사의 분리란, 복잡한 코드를 비슷한 기능을 하는 코드끼리 모아서 별도로 관리하는 것을 말한다.
// UI처리, API호출, DB관리 등의 코드를 분리해서 모아 놓는 것이다.

// 하나의 컴포넌트 안에서 모든 기능을 구현할 수는 없기 때문에 우리는 여러개의 컴포넌트를 만들어서 조립한다.
// 하나의 폴더 안에 모든 컴포넌트를 모아놓고 작업한다면, 점점 복잡해질 것이다. 
// 이때 기능별로 폴더를 만들어 관리하면 컴포넌트를 관리하기 쉬워진다.
// 하지만 규모가 큰 프로젝트라면, 그걸로는 부족하다.
// 비즈니스 로직과 상탯값이 컴포넌트의 여기저기에 흩어져 있다.
// 상탯값의 중복도 발생한다. 다음과 같이 부모 컴포넌트가 넘겨준 속성값으로부터 새로운 상탯값을 만드는 경우가 빈번해진다.
// 다음 코드를 보자
function MyComponent({todos}){
    const [doneList, setDoneList] = useState(todos.fileter(item => item.done)); // 1번
    // item 중에 done 프로퍼티를 들고 있는 요소만 골라서 다시 배열을 만들어서 리턴한다. 
    function onChangeName(key, name){
        setDoneList(
            doneList.map(item => (item.key === key ? {...item, name} : item))   // 2번
            // 파라미터로 넘겨 받은 key값과 원본배열의 key프로퍼티 값가 같은 것만 
            // 기존의 item 원소를 지우고 {...item, item.name : name} 으로 교체한다.
            // item.name = name 은 name으로 축약해서 쓸 수 있다.
        );
    }
}

// 설명
/*
    1번 : 부모로부터 받은 todos로부터 완료 목록 doneList를 만들었다. 
    2번 : 그러고는 이벤트 처리 함수에서 특정 목록의 이름을 수정하고 있다. 
    여기서 주목할 부분은 특정 목록의 이름을 수정하는 순간, 부모가 가진 데이터와 정합(sync)이 안 맞는다는 것이다.
    코드상으로는 오류가 없어서 이때는 버그가 없는 것처럼 보이지만, 
    코드가 계속 이어지면 결국 버그 발생을 유발시키는 원인이 된다.

    이렇게 자식 컴포넌트에서 부모의 데이터를 별도의 상탯값으로 관리하는 것은 나쁜 습관이라고 할 수 있다.
    컴포넌트가 비즈니스 로직이나 상탯값을 가지고 있으면, 재사용하기 힘들다. 컴포넌트를 재사용하면 할수록 이득인데 말이다.
    또한 재사용할 수 없어서 비슷하지만 새로운 컴포넌트를 또 만들었다면 그 자체로 개발자로서, 기술 부채이다.

    그렇다면 비즈니스 로직과 상탯값의 유무로 컴포넌트를 분리하면 어떨까?
    그 생각에서 출발해서 만들어진 것이 댄아브라모프의 "재사용성이 좋은 프레젠테이션 컴포넌트와, 그렇지 않은 컨테이너 컴포넌트로 구분"하는 것이다.
    그러나 진짜 댄아브라모프의 주장대로 하는 것은 복잡해서 여기서는 필자가 간단하게 방법을 제시한다.

    그 방법은 바로
    1. 비즈니스 로직이 없고, 상탯값이 없다면 프레젠테이션 컴포넌트(단, 간단한 UI효과를 위한 상탯값은 제외한다.)
    2. 비즈니스 로직이 있거나, 상탯값이 있다면, 컨테이너 컴포넌트 

*/

