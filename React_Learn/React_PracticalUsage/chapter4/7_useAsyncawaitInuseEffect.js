// useEffect훅에서 async await 함수 사용하기
// useEffect훅에서 async await 함수를 사용하기 위해, 부수효과 함수를 async await함수로 만들면 에러가 난다.
// 이유는 부수 효과 함수의 리턴값은 항상 함수 타입이어야 하기 때문이다. 
// (async await을 사용하면 리턴값이 프로미스이기 때문이다.)


// 다음 예제를 보자 부수 효과 함수를 async await 함수로 만든 것이다.
useEffect(async ()=>{
    const data = await fetchUser(userId);
    setUser(data);
},[userId]);
// 설명
/*  
    1. 프로미스 객체를 반환하므로, 부수 효과 함수가 될 수 없다.
    2. 부수 효과 함수는 함수만 반환할 수 있으며, 반환된 함수는 부수 효과 함수가 호출되기 직전과 컴포넌트가 사라지기 직전에 호출된다.
    3. 리턴 함수는 부수 효과 함수가 호출되기 직전과, 컴포넌트가 사라지기 직전에 호출된다.
  
*/

// useEffect훅에서 async await 함수를 사용하는 한 가지 방법은 부수 효과 함수 내에서 async await함수를 만들어서 호출하는 것이다.
// 다음 예제를 다시 보자.
useEffect(()=>{
    async function fetchAndSetUser(){
        const data = await fetchUser(userId);
        setUser(data);
    }
    fetchAndSetUser();
},[userId]);
// 설명
/*
    1. 부수효과함수 내에서 async await 함수를 만들고,
    2. 그 함수를 바로 호출해서 사용한다.
*/



// 그렇다면 만약 위의 fetchAndSetUser 함수를 다른 곳에서도 재활용해야 한다면, 코드를 어떻게 변경해야 할까?
function Profile({userId}){
    const [user, setUser] = useState();
    useEffect(()=>{
        async function fetchAndSetUser(needDetail){
            const data = await fetchUser(userId, needDetail);
            setUser(data);
        }
        fetchAndSetUser(false);
    }, [userId]);
    
    if (!user){
        return <h1>로딩...</h1>
    }
    return (
        <div>
            <h1>{user.name}</h1>
            <p>{`캐시: ${user.cash}`}</p>
            <p>{`계정 생성일: ${user.createdAt}`}</p>
            <button onClick={() => fetchAndSetUser(true)}>더보기</button>
            <UserDetail user={user}/>
        </div>
    );
}
// 위의 fetchAndSetUser()함수를 훅에서 꺼내보자 
// 훅안에서 꺼내면, 재활용해서 쓸 수 있다. 하지만, 새로운 문제가 생긴다.
// 그것은 바로 컴포넌트가 렌더링될 때 마다 쓸데없이 userId가 안바뀌어도 fetchAndSetUser함수가 호출된다는 것이다.
function Profile({userId}){
    const [user, setUser] = useState();
    async function fetchAndSetUser(needDetail){
        const data = await fetchUser(userId, needDetail);
        setUser(data);
    }
    useEffect(()=>{
        fetchAndSetUser(false);
    }, [fetchAndSetUser]);  // 1번
    

    if (!user){
        return <h1>로딩...</h1>
    }
    return (
        <div>
            <h1>{user.name}</h1>
            <p>{`캐시: ${user.cash}`}</p>
            <p>{`계정 생성일: ${user.createdAt}`}</p>
            <button onClick={() => fetchAndSetUser(true)}>더보기</button>
            <UserDetail user={user}/>
        </div>
    );
}
// 설명
/*  
    1번 : 훅 내부에서 fetchAndSetUser함수를 사용하므로 해당 함수를 의존성 배열에 넣는다.
    fetchAndSetUser함수는 렌더링을 할 때마다 갱신되므로 결과적으로 fetchAndSetUser 함수는 렌더링을 할 때마다 호출된다.

    이 문제를 해결하려면 fetchAndSetUser함수가 필요할 때만 갱신되도록 만들어야 한다.
    다음 예시에서는 useCallback 훅을 이용해서 userId가 변경될 때만 fetchAndSetUser함수가 갱신된다.

    이 문제가 일어나는 근본적인 이유는 훅안에서 꺼내면(비록 필요에 의해서 꺼냈지만), 
    컴포넌트가 렌더링 될 때 마다 fetchAndSetUer함수가 갱신되기 때문이다.

    

*/
// userId가 변경될 때만 fetchAndSetUser함수 갱신
// 이 방법으로 해결하기 위해선 먼저 useCallback() 훅의 기능을 배워야 한다.
// 함수 메모제이션 기능으로, 컴포넌트가 리렌더링되도, 그 전의 함수상태를 계속 기억할 필요가 있을 때 쓰는 훅이다.
// 이 콜백훅 안에다가 기억하고 싶은 함수 fetchAndSetUser를 만들어 놓으면 된다.
// useCallback()훅의 기능은 이 훅이 리턴하는 함수는 리렌더링되도 계속 전의 상태를 유지한다. 단, 두번째 인자로 들어온 
// userId 상태가 달라지면 새로 갱신한다.
function Profile({userId}){
    const [user,setUser] = useState();
    const fetchAndSetUser = useCallback(                        // 1번 ~
        async needDetail => {
            const data = await fetchUser(userId, needDetail);
            setUser(data);
        },
        [userId]
    );                                                          // ~ 1번 
    useEffect(()=>{
        fetchAndSetUser(false);                                 
    },[fetchAndSetUser]);                                       // 2번
    // ...
}
// 설명 
/*
    1번 : useCallback 훅을 이용해서 fetchAndSetUser함수가 필요할 때만 갱신되도록 개선했다.
    2번 : 이제 fetchAndSetUser함수는 userId가 변경될 때만 호출된다.  
*/