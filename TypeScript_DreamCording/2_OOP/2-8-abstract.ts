// 추상클래스 
// 인터페이스의 인기로 인해 자주 쓰이지 않는다 이제는..
// 그러나 여전히 그 의미는 살아있기 때문에 알아볼 가치가 있다.

// 추상클래스는 인터페이스와같이, 추상클래스를 구현하는 클래스에 대해 강제하는 효과를 가진다.
// 인터페이스와 가장 큰 차이점은, 추상클래스는 추상메서드 하나 이상과, 보통의 메서드를 가질 수 있다는 점이다.
// 둘 다 자기 자신으로는 인스턴스를 만들 수 없는 공통점이 있다.

// 가장 핵심은
/*
    1. 부모 클래스의 특정 함수를 자식클래스에서 오버라이딩해서 사용하지 않고, 그대로 부모 자원을 쓸 수 있다.
    (추상 클래스에서 그렇게 구조를 짜야한다. 그냥 써도 되는 메서드에서 반드시 추상메서드를 불러다가 사용해야한다.)
    (그렇지 않으면 굳이 추상 클래스를 쓰는 이유가 없다. 추상클래스와 인터페이스의 가장 큰 차이점인, 추상클래스는
        일반 메서드와 추상메서드를 동시에 가질 수 있다라는 점을 생각한다면, 이런 구조의 추상 클래스가 아니면, 
        굳이 추상 클래스를 사용해야 하는 의미가 없어지게 된다.)

    2. 그러기 위해서는 자식에서 다르게 구현해야하는 부분을 구현하고, 기존 부모의 일반 메서드는 그대로 쓰면 된다.
    (이미 내부 클래스에서는 부모의 일반 메서드는 구현된 메서드를 사용하는 부분이 포함되어 있을 것이다.)

*/

{ 
    type CoffeeCup = {
        shots: number;
        hasMilk?: boolean;
        // 옵션널 프로퍼티로 설정해주면, hasSugar프로퍼티는 있을수도있고 없을 수도 있다.
        hasSugar?: boolean;
    };

    interface CoffeeMaker{
        makeCoffee(shots: number): CoffeeCup;
    }

    // 추상 클래스 키워드 선언
    // 추상 클래스가 되면 이 클래스로는 인스턴스를 생성할 수 없다.
    // 부모 클래스로서, 필요한 것들을 정의하는 기능이 더 크다.
    // 추상 클래스가 되면, 안에 있는 함수들이 반드시 하나 이상은 추상메서드가 있어야 한다.
    // 추상메서드 선언 역시 접근자 키워드 다음에 abstract키워드를 붙여주면 된다.
    // 자식 클래스마다 달라질 수 있는 행동이 이 추상자 메서드로 정의하게 된다.
    // 추상 메서드는 접근자를 protected로 해야 한다. 그래야 자식에서 재 구현할 수 있으니깐
    // 또한 추상메서드는 인터페이스와 마찮가지로, 구현부는 적지 않는다. 오직 매개변수와 리턴 타입만 적어준다.
    abstract class CoffeeMachine implements CoffeeMaker{
        private static BEANS_GRAMM_PER_SHOT: number = 7;    // static을 붙이면 class level의 자원이다.
        private coffeeBeans: number = 0;        // 멤버필드는 그냥 instance level의 자원이다.

        public constructor(beans: number) {
            this.coffeeBeans = beans;
        }

        private grindBeans(shots: number){
            console.log(`grinding beans for ${shots}`);
            if(this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT){
                throw new Error("Not enough coffee beans!");
            }
            this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT;

        }

        private preheat(): void {
            console.log('heating up...');
        }
        
        // 추상 메서드로 바꿔 보자
        // 이 추상 클래스 안의 추상메서드는 항상 이 클래스를 구현하는 클래스 쪽에서 구현해야하는 강제성을 가지게 된다.
        protected abstract extract(shots: number): CoffeeCup;

        makeCoffee(shots: number): CoffeeCup{
            this.grindBeans(shots);
            this.preheat();
            return this.extract(shots);
        }
    
        fillCoffeeBeans(beans: number){
            if(beans < 0) {
                throw new Error('value for beans should be greater than 0');
            }
            this.coffeeBeans += beans;
        }

        clean() {
            console.log('cleaning the machine...');
        }
    }

    class CaffeLatteMachine extends CoffeeMachine{  
        constructor(beans: number, public readonly serialNumber: string){
            super(beans);
        }

        // 더 이상 makeCoffee()를 오버라이딩 하지 않는다.
        // 자식에서는 구현만 할 뿐 오버라이딩 하지 않는다.
        protected extract(shots: number): CoffeeCup {
            this.steamMilk();
            return {
                shots,
                hasMilk:true,
            };
        }
        private steamMilk(): void {
            console.log('Steaming some milk...');
        }
    }

    class SweetCoffeeMaker extends CoffeeMachine{
        // 더 이상 makeCoffee메서드를 오버라이딩 하지 않고
        // super키워드로 부모 클래스에 접근하지 않아도 된다.
        // 아래 makeCoffee() 함수는 모두 주석처리하자
        // makeCoffee(shots: number): CoffeeCup{
        //     const coffee = super.makeCoffee(shots);
        //     return {
        //         ...coffee,
        //         hasSugar: true,
        //     }
        // }

        // extract()를 구현하자
        protected extract(shots: number): CoffeeCup {
            return {
                shots,
                hasSugar: true,
            }
        }
    }

    // 기존에는 makeCoffee()함수를 오버라이딩 하고, 그 안에서 부모 extract()함수를 불러 쓰므로서, 
    // 자식 클래스 내부에서 새로운 makeCoffee()함수로 오버라이딩 했는데, 
    // 추상클래스와 추상메서들를 이용하면 기존에 달라져야 하는 부분을 추상메서드로 빼고 그 부분만 자식클래스에서
    // 구현만 해주면 된다.
    // 여기에서는 makeCoffee() 내부안에서 extract()함수만을 부품교체하듯이 재구현해주면, makeCoffee()
    // 함수는 부모꺼를 그냥 써도 된다.
    // 따라서 기존에 자식 클래스에서 makeCoffee()를 새로 오버라이딩해서 쓰던걸 지우고 
    // 그냥 extract()함수만 구현해주고 makeCoffee()는 부모꺼를 써주면 똑같이 원하는 커피가 나온다.
    const machines: CoffeeMaker[] = [
        new CaffeLatteMachine(16, '1'),
        new SweetCoffeeMaker(16),
        new CaffeLatteMachine(16, '1'),
        new SweetCoffeeMaker(16),
    ];

    machines.forEach(machine => {
        console.log('-----------------------');
        machine.makeCoffee(1);
    });
}