// 객체지향의 꽃 컴포지션!
// 상속을 존나 받으면, 족보가 꼬인다.
// 타입 스크립트에서는 단 한가지만 상속 받을 수 있다.
// 컴포지션은 유지보수의 편리성을 위해 생겼다.
// 상속대신에 컴포지션을 선호해야 한다!

// 불필요한 상속은 무엇인가? 알아야하고, 불피요한 상속을 피해 컴포지션을 구현하는 법을 알아야 한다.

// 이번에는 AutomaticSugarMixer, CheapMilkSteamer 의 메서드 작성이 핵심이다.
// 위 함수에서 어떻게 메서드를 작성하느냐에 따라 위 클래스들을 다이렉트인젝션해서 쓰는 곳에서 편안히 쓸 수 있다.
// 이렇게 작성 하려면 처음부터 컴포지션 구성과 쓰임새를 미리 알고 있어야 가능한 것이다.

// 그리고 이렇게 작성한 구조는, 서로 커플링이 강한 관계가 형성된다는 점. 
// 그러한 강한 커플링 관계에서는 유지보수에 불리하다는 점을 알아야 한다.
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

    // 싸구려 우유 거품기를 만들어 보자
    class CheapMilkSteamer {
        private steamMilk(): void {
            // 내부 동작 
            console.log('Steaming some milk... ');
            // 굉장히 복잡한 메서드라고 가정하자.
        }
        makeMilk(cup: CoffeeCup): CoffeeCup{

            this.steamMilk(); // 이 부분을 작성하는 것이 사실상 핵심이다. 
            return {
                ...cup,
                hasMilk: true,
            };
        }
    }
    
    // 설탕 제조기
    class AutomaticSugarMixer {
        private getSugar() {
            // 굉장히 복잡한 메서드라고 가정한다.
            console.log('Getting some sugar from candy');
            return true;
        }
        addSugar(cup: CoffeeCup): CoffeeCup{
            // 뭔가 복잡하지만, 이를 가져다 쓰는 사람이 알필요가 없는 작업은 private으로 처리하고
            // 다음과 같이 public함수에서 간단하게 호출해서 사용한다.
            const sugar = this.getSugar();
            return {
                ...cup,
                hasSugar: sugar,
            }
        }
    }

    // 인젝션 디펜던시, 즉 맴버필드로 걍 필요한 자원을 주입한다.
    class CaffeLatteMachine extends CoffeeMachine{  
        // 생성자의 파라미터가 너무 많으면(멤버필드가 너무 많으면) 이렇게 쓴다.
        constructor(
            beans: number, 
            public readonly serialNumber: string,
            private milkFrother: CheapMilkSteamer
        ) {
            super(beans);
        }

        // 오버라이딩
        makeCoffee(shots: number): CoffeeCup {
            const coffee = super.makeCoffee(shots)
            // 다음과 같이, makeMilk클래스를 상송받지 않고도, DI으로 makeMilk()자원을 이용할 수 있다.
            return this.milkFrother.makeMilk(coffee);

        };
    }

    // 자식 클래스: SweetCoffeeMaker
    class SweetCoffeeMaker extends CoffeeMachine{
        constructor(private beans: number, private sugar: AutomaticSugarMixer){
            super(beans);
        };

        makeCoffee(shots: number): CoffeeCup{
            // 일단 부모자원을 이용해서 만들 수 있는 데 까지 만들고
            const coffee = super.makeCoffee(shots);

            // 매번 필요한 인스턴스를 구현하는 것이 아니라, 외부에서 만들어진 가져다가 쓰는 방식이
            // 컴포지션 방식이다. (=  다이렉트 인젝션 )
            return this.sugar.addSugar(coffee);
        }
    }

    // 클래스는 오직 하나의 클래스만 상속받을 수 있다.
    // 때문에 더더욱 컴포지션을 구현하는 것이다.
    // 때문에 불필요한 상속은 무엇인가? 알아야하고, 불피요한 상속을 피해 컴포지션을 구현하는 법을 알아야 한다.

    class SweetCaffeLatteMachine extends CoffeeMachine{
        constructor(
           private beans: number,
           private milk: CheapMilkSteamer,
           private sugar: AutomaticSugarMixer,
        ){
            super(beans);
        }

        // 부모 메서드 오버라이딩
        // 상속 쓰지 않고 다이렉트 인젝션으로 필요한 자원 사용
        makeCoffee(shots: number): CoffeeCup {
            const coffee = super.makeCoffee(shots);
            // 다만 이렇게 하면 치명적인 약점이 따라오는데, 이 SweetCaffeLatteMachine은 
            // 반드시 CheapMilkSteamer, AutomaticSugarMixer가 필요하다는 점이다.
            // 강제와 동시에, 제약이되는 샘이다.
            // 이러한 커플링은 반드시 피해야하는 구조이며, 그것은 다음 장에서 배우도록 한다.
            return this.milk.makeMilk(this.sugar.addSugar(coffee));
        }
    }
}