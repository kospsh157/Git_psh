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
       
        constructor(beans: number, public readonly serialNumber: string){
            super(beans);
        }



        // 오버라이딩
        makeCoffee(shots: number): CoffeeCup {

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
    const machines: CoffeeMachine[] = [
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

    // 정리 
    /*
        1. 인터페이스를 구현하는 구현부 클래스를 상속받는 사용자 클래스가 여러개 존재하는 형태이다.
        2. 인터페이스로 묶어 배열을 선언하고 그 안에 사용자 인스턴스들을 넣어서 사용하면 
        사용자 클래스가 오버라이딩을 하고 있으므로, 이름이 같은 API 메소드를 이용해도 각각 다른 결과가 나온다.
        3. 

    */
}