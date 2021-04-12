// 챕터 4장 시작하는 글

// 챕터 4장은 useEffect 훅을 제대로 사용하는 방법과, 
// 가독성과 생산성을 높이는 컴포넌트 코드 작성 방법, 렌더링 속도를 올리기 위한 성능 최적화 방법을 알아본다. 

// 학습 포인트
/*
    1. 추천하는 컴포넌트 파일 작성법.
    2. 컴포넌트 속성값에 타입 정보를 추가하는 방법.
    3. 조건부 렌더링을 할 때 가독성이 높은 방식이 무엇인지.
    4. 컨테이너 컴포넌트와 프레젠테이션 컴포넌트로 구분해서 폴더를 구성하는 방법.
*/



// 1. 추천하는 컴포넌트 파일 작성법
/*
    1. 컴포넌트 파일에는 다양한 종류의 함수와 변수가 있다. 그로 인해 코드의 가독성이 떨어지고 관리가 힘들어진다.
    2. 가독성과 생산성을 높이기 위해 코드를 어떻게 배치하면 좋을지 살펴보자
*/

// <<< 컴포넌트 파일 작성 순서 >>>
MyComponent.porpTypes = {           
    // ...
}; 
// 1. 파일의 최상단에는 속성값의 타입을 정의한다. 
// 속성값 타입이 가장 먼저 오는 이유는 컴포넌트를 사용하는 입장에서 생각하면 쉽게 이해된다. 
// 어떤 컴포넌트를 사용하기 위해서는 그 컴포넌트의 속성값 타입을 알아야 한다.
// 따라서 파일을 열었을 때, 속성값 타입이 가장 먼저 보이는게 좋다.
// 단 import 구분은 당연히 이보다 더 최상위에 있어야 한다.

export default function MyComponent({prop1, prop2}) {   
    // ...
}
// 2. 컴포넌트 
// 컴포넌트 함수의 매개변수는 명명된 매개변수로 정의하는 것이 좋다.
// 속성값을 사용할 때마다 props.을 반복해서 입력하지 않아도 되므로 코드 작성이 편해진다.
// 컴포넌트 이름을 꼭 작성하자. function()처럼 이름없는 컴포넌트로 만들면, 리액트 개발자 도구에서 디버깅이 힘들다.


const COLUMNES = [                                             
    { id: 1, name: 'phoneNumber', width: 200, color: 'white' },
    { id: 1, name: 'city', width: 100, color: 'grey' },
    // ...
];
const URL_PRODUCT_LIST = '/api/products';
function getTotalPrice({price, total}) {
    // ...
}
// 3. 컴포넌트 바깥의 변수와 함수는 파일의 가장 밑에 정의한다.
// 특별한 이유가 없다면, 변수는 상수 변수로 정의한다. (const)
// 상수 변수는 대문자로 작성하는게 가독성에 좋다.
// 컴포넌트 내부에서 커다란 객체를 생성하는 코드가 있을 때, 가능하다면 컴포넌트 외부에서 상수 변수로 정의해서 사용한다.
// (그래야만 렌더링 시 불필요한 객체 생성을 피할 수 있다.)




// <<< 서로 연관된 코드를 한 곳으로 모으기 >>>
// 이번에는 여러 가지 기능이 섞여 있는 코드를 어떻게 배치하면 좋을지 알아본다.

// 여러 가지 기능이 섞여 있는 컴포넌트 코드
function Profile({ userId }) {
    const [user, setUser] = useState(null);
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        getUserApi(useId).then(data => setUser(data));
    }, [userId]);
    useEffect(() => {
        const onResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);
    // ...
}
// 1. 모든 상탯값을 컴포넌트 함수 상단에서 정의하고 있다. 그리고 모든 useEffect훅을 상탯값 코드 밑에 정의하고 있다.
// 다시 정리해보면, 위 코드에는 사용자 정보를 가져오는 기능과, 창의 너비를 가져오는 기능이 섞여있다.


// 다시 기능 별로 코드를 모아 높은 코드를 보자
function Profile({ useId }) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        getUserApi(userId).then(data => setUser(data));
    }, [userId]);

    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const onResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);
    // ...
}
// 1. 사용자 정보를 가져오는 기능을 한곳으로 모았다.
// 2. 마찬가지로 창의 너비를 가져오는 기능을 한곳으로 모았다.
// 3. 위에 있는 코드보다 한결 가독성 면에서 낫다는 걸 느껴야 한다.
// 4. 이처럼 코드를 한곳에 모을 때는 훅의 종류별로 모으는 것보다는, 같은 기능으로 연관된 코드끼리 모으는 것이 좋다.
// 5. 만약 이래도 복잡하다면, 각 기능을 커스텀 훅으로 분리하는 것도 좋다. 

// <<< 커스텀 훅으로 코드를 더욱 가독성 있게 하기 >>>
// 여기서 명심해야 할 것 : "기능 단위로 커스텀 훅으로 작성해서 컴포넌트함수 밖으로 빼자
                    // 단 단순한 기능인 경우에는 오히려 커스텀훅으로 빼는 것이 가독성을 떨어뜨릴 수 있다."
// 다음은 두 가지 기능을 각각 커스텀 훅으로 분리한 코드예제이다. 보고 배우자.
function Profile({ userId }) {
    const user = useUser(useId);
    const width = useWindowWidth();
    // ...
}


function useUser(useId) {   // 참고로 함수는 호이스팅이 자동으로 되므로, 컴포넌트 다음에 써도 상관이 없다.
    const [user, setUser] = useState(null);
    useEffect( () => {
        getUserApi(userId).then(data => setUser(data));
    }, [userId]);
    return user;
}


function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect( () => {
        const onResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);
    return width;
}