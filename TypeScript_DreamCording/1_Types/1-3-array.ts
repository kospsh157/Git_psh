{
    // Array 배열을 정의하는 방법은 2가지가 있다.
    // 1. 일반 타입 정의
    const fruits: string[] = ['a', 'b'];
    // 2. 배열클래스와 제너릭 사용
    const scores: Array<number> = [1,3,4];
    // 어떤 것이 좋고 나쁘다는 없고, 다만 readonly를 파라미터에 사용하려면 일반타입정의로만 가능하다.
    function printArray(fruits: readonly string[]){
        // readonly 를 사용하게되면 함수 내부에서는 일단 들어온 인자값에 어떠한 수정도 불가능하고, 
        // 오직 읽기만 가능하다.
        fruits.push(2); // 에러 발생.
    }
    // readonly가 인자값에 불변성을 부여하기 때문에 매우 자주 쓰이는 것이므로, 첫번째 방식으로 주로 사용한다.


    // Tuple    : 튜플은 잘 사용하지 않는다.  차라리 오브젝트, 클래스 형태로 사용한다.
    // 튜플을 사용 할 수 있는 곳은 interface, type alias, class로 대체해서 사용하는 것이 좋다.
    // 다만, 리액트에서는 useState() API은 튜플로 구현되어 있다.
    // 리액트에서는 이런 코딩을 자주 볼 것이다. const [count, setCount] = useState(0);
    let student: [string, number, number];
    student = ['name', 123, 23];
    student[0]  // name
    student[1]  // 123

}