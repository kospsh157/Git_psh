// useEffect() 훅에서 의존성 배열에서 버그가 나면 디버깅이 힘들다.
// 따라서 다음 장에서 사용방법을 잘 익혀두자.


// 의존성 배열
/*
    1. 의존성 배열은 useEffect훅에 입력하는 두 번째 매개변수다. 의존성 배열의 내용이 변경됐을 때 부수 효과 함수가 실행된다. 
    2. 가능하면 의존성 배열은 쓰지 않는게 좋다. 다행히 대부분의 경우에는 입력하지 않아도 된다.
    3. 하지만 꼭 필요한 경우가 있다.
    4. 몇 가지 예제를 통해 의존성 배열을 관리하는 방법을 알아보고 꼭 필요한 경우가 언제인지 확인하자.
*/

// 부수 효과 함수에서 API를 호출하는 경우
function Profile({userId}){
    const [user, setUser] = useState();
    useEffect(()=>{
        fetchUser(userId).then(data => setUser(data)); // 1번
    });
    // ...
}
// 설명
/*
    1번 : fetchUser함수는 렌더링을 할 때 마다 호출되므로 비효율적이다. 
    이 문제를 해결하기 위해 의존성 배열에 빈 배열을 넣을 수도 있다. 하지만 이는 userId가 변경돼도 새로운 사용자 정보를 
    가져오지 못하는 문제가 발생하기 때문에 올바른 해결책은 아니다.
    지금 당장은 userId가 변경되지 않는다는것이 보장되도, 언제 기획이나 프로그램에 수정이 올 지 모른다.

    다음 예제는 위와 같은 문제를 해결하는 코드이다.
*/
useEffect(()=>{
    fetchUser(userId).then(data => setUser(data));
}, [userId]);   // 1번
// 설명
/*
    1. userId가 변경될 때만 fetchUser함수를 호출하게된다.
    2. 그러나 다음과 같은 주의사항이 따른다.
    3. 나중에 부수 효과 함수를 수정할 때는 새로 추가된 변수를 빠짐없이 의존성 배열에 추가해야 한다.
*/
// 다음과 같이 fetchUser함수에 매개변수를 추가한다고 생각해보자
const [needDetail, setNeedDetail] = useState(false);
useEffect(()=>{
    fetchUser(userId, needDetail).then(data => setUser(data)); // 1번
},[userId]);
// 설명
/*
    1. 상탯값 needDetail을 부수 효과 함수에서 사용했다.
    2. 부수 효과 함수를 수정할 때 새로운 상탯값을 추가했다면, 의존성 배열에도 마찬가지로 추가해야 한다.
    3. 하지만 사람이 하는 일이다 보니 깜빡할 때가 있다. 
    리액트 팀에서는 이러한 문제를 해결하기 위해 eslint에서 사용할 수 있는 exhaustive-deps 규칙을 만들어서 제공한다.
    exhaustive-deps는 잘못 사용된 의존성 배열을 찾아서 알려준다. 
    의존성 배열에서 실수를 하는 경우가 많고, 의존성 배열 때문에 발생한 버그는 원인 파악도 힘들기 때문이다.
    따라서 반드시 "exhaustive-deps"를 꼭 사용할 것을 추천한다.
*/

// 의조성 배열을 잘못 관리하면 생기는 일
/*
    1. 의존성 배열에 입력해야 할 값을 입력하지 않으면 오래된 값을 참조하는 문제가 발생한다.
    2. 다음코드에서 value1 증가버튼을 누르면 증가된 value1값이 콘솔에 출력된다.
    하지만 value2증가버튼을 누르면 오래된 value2값이 콘솔에 출력된다.
*/
function MyComponent(){
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);
    useEffect(()=>{
        const id = setInterval(()=>console.log(value1, value2), 1000);
        return ()=>clearInterval(id);
    }, [value1]);           // value1만 추가했다. 이게 문제점이다. 
    return (
        <div>
            <button onClick={()=>setValue1(value1 + 1)}>value1증가</button>
            <button onClick={()=>setValue2(value2 + 1)}>value2증가</button>
        </div>
    );
}

// 설명
/*
    1. setValue() 함수가 작동되면 상탯값이 바뀌면서 리렌더링된다.
    2. 여기서 중요한 점은 리렌더링 되면 상탯값을 다시 다른 메모리 방에다 또 설정한다.
    3. 따라서 부수효과함수도 다시 호출해서 새로운 value1, value2값에 연결시켜줘야한다.
    4. value2버튼을 눌르면, 리렌더링 된다. 하지만 부수효과함수는 또 호출되지 않는다.
    5. 따라서 현재 value2 값은 1증가된 상태이지만(새로운 매모리방에 있다.), 부수효과함수를 또 호출하지 않았기 때문에
    setInterval()에서는 기존의 value2 메모리를 참조하는 중이다. 따라서 바뀐 상탯값을 반영하지 못한다.
    6. 이렇듯 의존성 배열을 잘못 관리하면 버그를 찾기가 굉장히 힘들다.
*/