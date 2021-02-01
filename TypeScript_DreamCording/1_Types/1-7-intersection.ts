// 유니온은 발생하는 모든 케이스 중에 한가지만 선택하기 위한 방식이었다면, ( or 같은 성격 )
// 반면에 인터섹션 타입은 AND같은 성격을 가지는 타입이다.
{
    type Student = {
        name: string;
        score: number;
    };
    
    type Worker = {
        empolyeeId: number;
        work: () => void;
    }

    function internWork(person: Student & Worker) {
        console.log(person.name, person.empolyeeId, person.work());
    }

    // 위 함수를 호출하기 위해서는 Student, Worker 오브젝트를 다 전달해야 한다.
    // 각각의 Student, Worker객체를 전달하는게 아니라, 하나로 합쳐서
    // Student & Worker 의 하나의 오브젝트를 전달해야 한다.
    // 즉 둘의 모든 프로퍼티가 기술되어야 한다는 뜻이다.
    internWork({
        name: 'ellie',
        score:1,
        empolyeeId: 123,
        work:() => {},
    })
}
