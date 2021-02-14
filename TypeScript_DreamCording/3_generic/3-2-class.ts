// 이제 제너릭을 클래스에 사용해 보자!

// 인터페이스에 사용할 때도 이렇게 이름끝에다가 <> 로 하면 된다.
// 이름 끝에다가 <> 안에 여러개를 할 수 있다.
interface Either<L, R> {
    left: () => L;
    right: () => R;

}

// 보통 제너릭을 정의할 때는 대문자 하나로만 쓴다.
// 제너릭을 사용한 인터페이스를 구현 할 때도, 인터페이스 이름 다음의 제너릭 타입을 같이 써줘야 한다.
class SimpleEither<L, R> implements Either<L, R> {
    constructor(private leftValue: L, private rightValue: R) {}
    left() : L {
        return this.leftValue;
    }

    right(): R {
        return this.rightValue;
    }
}

// 이제 사용할 때가 더 포인트이다.
// 실제로 사용할 때에는 타입이 구체적으로 뭔지 정해지므로, <L, R> 이따구로 쓰면 제너릭을 쓰는 의미가 없다.
// 인터페이스<원하는타입1, 원하는타입2>   이것이 타입형태가 되는 것이다.
const either: Either<number, number > = new SimpleEither(4, 5);
console.log(either.left());
console.log(either.right());


// 물론 클래스 생성자에도 제너릭을 이용하여 인스턴스를 만들 수 있다.
// 또한 어떤 타입도 들어갈 수 있으므로, 임의의 객체 타입도 들어갈 수 있다.
const best = new SimpleEither( { name: 'ellie' }, 'hello');

// 참고로 저렇게 하면 {name:string} 의 객체로 그 객체의 틀까지 정확히 맞아야 한다.
const best: SimpleEither<{name1:string}, string> // 이렇게만 해도 틀리다고 나온다.