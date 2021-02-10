// 다형성

// 다형성이란 상속관계에서 만들어지며, 
// 결국 자식이 부모 자원을 오버라이딩 하므로써, 형성된다.

// 

{ 
    type CoffeeCup = {
        shots: number;
        hasMilk: boolean;
        // 옵션널 프로퍼티로 설정해주면, hasSugar프로퍼티는 있을수도있고 없을 수도 있다.
        hasSugar?: boolean;
    };

    interface CoffeeMaker{
        makeCoffee(shots: number): CoffeeCup;
    }

    // 부모 클래스: CoffeMachine
    class CoffeeMachine implements CoffeeMaker{
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

        // 정보 은익으로 추상화 구현 (외부에서는 볼 필요도 없다.)
        private preheat(): void {
            console.log('heating up...');
        }
        // 정보 은익으로 추상화 구현 (외부에서는 볼 필요도 없다.)
        private extract(shots: number): CoffeeCup {
            console.log(`Pulling ${shots} shots...`);
            return {
                shots,
                hasMilk: false,

            }
        }
        makeCoffee(shots: number): CoffeeCup{
            this.grindBeans(shots);
            this.preheat();
            return this.extract(shots);
            
        }

        // 스태틱 함수로만 객체를 만들 수 있도록 한다.
        static makeMachine(coffeeBeans: number): CoffeeMachine{
            return new CoffeeMachine(coffeeBeans);
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

    // 자식 클래스: CaffeLatteMachine
    class CaffeLatteMachine extends CoffeeMachine{  // 부모 클래스의 생성자가 private면 상속할 수 없다.
        // 따라서 부모 클래스의 생성자함수를 public으로 해주거나 protected로 해줘야한다.
        // 그리고 순서상 부모클래스가 먼저 나와야 한다. 
        // 클래스는 정의는 호이스팅 되지 않는다. 그래서 순서를 지켜야 한다.
        
        // 자식에서 생성자를 따로 구현해야 할 때,
        // 슈퍼 키워드로 일단 부모 생성자를 호출해야 하며, 
        // 이때 부모와 똑같이 필요한 자원이 있으면 매개변수로 넣어줘야 한다.
        // 따라서 자식의 매개변수에도 똑같이 부모에 필요한 매개변수를 넣어 줘야 한다.
        constructor(beans: number, public readonly serialNumber: string){
            super(beans);

            // 또한 위에 자식 생성자에는 serialNumber라는 매개변수를 추가했는데, 
            // 이는 public readonly를 설명하기 위해 그냥 만든 것이다.
            // 이렇게 생성자 매개변수 안에서 정의하는 것은 === 그냥 클래스의 맴버필드를 정의하는 것이랑 같다.
            // 따라서 접근자 키워드 public readonly가 들어갈 수 있다.
            // 이렇게 된 경우, serialNumber는 자식 생성자로 생성된 인스턴스만이 사용할 수 있다.
            // 또한 readonly가 붙어있으므로, 한번 매개변수로 넣어서 정해지면, 다시는 수정할 수 없다.
            

        }



        // 오버라이딩
        makeCoffee(shots: number): CoffeeCup {
            // super 키워드를 사용하면 한번에 부모의 자원에 접근 가능하다.
            // 참고로 this는 자신의 자원을 접근할 때 쓰는 것.
            // 클래스 내부에서 정의를 할 때에는, 이런 접근 방식이 필요하다.

            // 부모 자원을 이용해서 커피를 만들고
            const coffee = super.makeCoffee(shots)

            // 클래스 내부에서는 메서드는 호이스팅된다.
            this.steamMilk();

            // 우유만 추가 하자
            return {
                ...coffee, 
                // 나머지 키워드로 끌어온 객체 중에서 프로퍼티이름이 중복되면, 
                // 맨 마지막에 기술된 프로퍼티로 대체 된다. 다음의 hasMilk의 경우처럼
                hasMilk: true,
            };
        };
        
        private steamMilk(): void {
            console.log('Steaming some milk...');
        }
    }

    // 자식 클래스: SweetCoffeeMaker
    class SweetCoffeeMaker extends CoffeeMachine{
        //함수 정의는 그냥 함수이름() 으로 시작하면 된다.
        public func1(){};
        makeCoffee(shots: number): CoffeeCup{
            // 일단 부모자원을 이용해서 만들 수 있는 데 까지 만들고
            const coffee = super.makeCoffee(shots);
            return {
                ...coffee,
                hasSugar: true,
            }
        }
    }

    // 다형성의 장점
    const machines: CoffeeMaker[] = [
        new CoffeeMachine(16),
        new CaffeLatteMachine(16, '1'),
        new SweetCoffeeMaker(16),
        new CoffeeMachine(16),
        new CaffeLatteMachine(16, '1'),
        new SweetCoffeeMaker(16),
    ];

    machines.forEach(machine => {
        console.log('-----------------------');
        // 다형성의 가장 큰 장점은
        // 이와 같이 어떤 인터페이스나 부모클래스를 구현 및 상속한 모든 클래스들의 생성자를 배열에 넣어서
        // 공통으로 구현하거나, 가지고 있는 api(메서드)를 반복문으로 실행할 수 있다는 점이다.
        machine.makeCoffee(1);
        
        // machine은 모든 클래스가 가지고 있는 public메서드를 다 사용 할 수 있다.
        // machine. 을 하고 살펴보자
        // 부모 클래스의 퍼플릭 자원들은 다 접근가능하다. 다만, 자식의 자원은 접근 할 수 없다.

        // machines의 타입은 바로 CoffeeMachine 타입이기 때문에 모든 자원을 다 담을 수 있다.
        // 그리고 machines의 타입을 임의로 가장 큰 범위의 타입, 여기서는 CoffeeMachine이 
        // CoffeeMaker 인터페이스를 구현하고 있으므로, 가장 큰 범위의 인터페이스 타입으로 
        // machines를 강제할 수 있다.
        // 물론 그렇게 하면 인터페이스가 강제하는 자원만 사용할 수 있게 된다.
    });
}