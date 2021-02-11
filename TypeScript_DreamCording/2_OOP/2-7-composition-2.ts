// 객체지향의 꽃 컴포지션!

/*
    1. composition.ts 에서의 구조는 아직 허접한 구조이다.
    2. 여기서 다시 발전된 컴포지션 형태를 보자
    3. 디커플링은 인터페이스로 이뤄진다.
    4. 여기에서 디커플링으로 구현하는 방법을 잘 배워 보자
    5. 즉 클래스들간의 관계를 '인터페이스로' 규약하고 설명하고 쓰이게 하는 것이다.
    6. 디 커플링 결과 인터페이스 하나만 만들어 놓고 구현체만 여러개 만들어서 갈아끼우는 방식으로 만들 수 있게 되었다.
    7. 또한 디 커플링한 결과, sweetLatteCoffeeMaker, sweetCoffeeMaker와 같은 클래스들은 필요가 없다.
    이제는 부품만 바꿔 끼면 바로바로 나오기 때문이다. 
    8. 상속을 전혀 사용하지 않고 인터페이스로만 이렇게 컴포지션을 구성하면 디커플링되면서 좋다!
    9. 그렇다고 무조건 상속이 나쁜 것은 아니다. 
    상속이 필요한 경우도 있다. 
    다만 너무 수식적인 관계나, 커플링관계가 너무 높다면, 
    이런식으로 디커플링을 시키는 것이 유지보수에 더 좋다. 
    10. 그렇다고 너무 코드 기술적인면에만 신경쓰지 말고, 일단은 기능을 구현을 먼저 할 줄 아는게 더 중요하다.

*/

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

    // 인터페이스로 클래스의 관계를 강제하자
    interface MilkFrother {
        makeMilk(cup: CoffeeCup): CoffeeCup;
    }
    interface SugarProvider {
        addSugar(cup: CoffeeCup): CoffeeCup;
    }

    // 부모 클래스: CoffeMachine
    class CoffeeMachine implements CoffeeMaker{
        private static BEANS_GRAMM_PER_SHOT: number = 7;    // static을 붙이면 class level의 자원이다.
        private coffeeBeans: number = 0;        // 멤버필드는 그냥 instance level의 자원이다.

        // 이제는 생성자에 인터페이스을 넣어서 강제만 시키고
        // 실제 인스턴스를 만들어 서 쓸 때에는 인터페이스만 맞는 구현 클래스를 가져다가 넣어주면 된다.
        public constructor(beans: number, 
            // 이제는 인터페이스를 생성자에 집어넣는다.
            private milk: MilkFrother,
            private sugar: SugarProvider,
         ) {
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
            const coffee = this.extract(shots);
            // 설탕 추가하고
            const sugarAdded = this.sugar.addSugar(coffee);
            // 우유 추가하고
            return this.milk.makeMilk(sugarAdded);
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

    // 자 이제 이건 구현체 클래스로서, MilkFrother를 구현하자.
    class CheapMilkSteamer implements MilkFrother{
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
    
    // 이제 싸구려 밀크거품기가 아니라, 다른 거품기도 만들어보자 MilkFrother인터페이스만 구현해주면 된다.
    class FancyMilkSteamer implements MilkFrother {
        private steamMilk(): void {
            // 내부 동작 
            console.log('Fancy !! Steaming some milk... ');
        }
        makeMilk(cup: CoffeeCup): CoffeeCup{
            this.steamMilk(); // 이 부분을 작성하는 것이 사실상 핵심이다. 
            return {
                ...cup,
                hasMilk: true,
            };
        }
    }

    // 좀 더 다양항 밀크거품기를 여러개 만들어보자
    class ColdMilkSteamer implements MilkFrother {
        private steamMilk(): void {
            // 내부 동작 
            console.log('Fancy !! Steaming some milk... ');
        }
        makeMilk(cup: CoffeeCup): CoffeeCup{
            this.steamMilk(); // 이 부분을 작성하는 것이 사실상 핵심이다. 
            return {
                ...cup,
                hasMilk: true,
            };
        }
    }

    // 노 밀크도 구현해보자
    class NoMilk implements MilkFrother {
        makeMilk(cup: CoffeeCup): CoffeeCup {
            return cup;
        }
    }
    // 이것도 마찮가지로, 구현체로서, SugarProvider를 구현한다.
    class CandySugarMixer implements SugarProvider{
        private getSugar() {
            // 굉장히 복잡한 메서드라고 가정한다.
            console.log('Getting some sugar from candy');
            return true;
        }
        addSugar(cup: CoffeeCup): CoffeeCup{
            const sugar = this.getSugar();
            return {
                ...cup,
                hasSugar: sugar,
            }
        }
    }

    // 설탕 제조기도 좀 더 여러개의 클래스를 만들어보자
    class SugarMixer implements SugarProvider{
        private getSugar() {
            // 굉장히 복잡한 메서드라고 가정한다.
            console.log('Getting some sugar from jar');
            return true;
        }
        addSugar(cup: CoffeeCup): CoffeeCup{
            const sugar = this.getSugar();
            return {
                ...cup,
                hasSugar: sugar,
            }
        }
    }

    // no sugar도 구현
    class NoSugar implements SugarProvider{
        addSugar(cup: CoffeeCup): CoffeeCup{
            return cup;
        }
    }


  

    // 인스턴스를 만들어야 한다.
    // CheapMilkSteamer, candySugarMixer 인스턴스를 만들어서 자원으로 넣어줘야 하기 때문이다.
    const cheapMilkMaker = new CheapMilkSteamer();
    const candySugar = new CandySugarMixer();

    // 자 이제 전에 만든 커플링이 강한 SweetCaffeLatteMachine으로 커피라떼를 만들어보면 
    const sweetLatteMachine = new SweetCaffeLatteMachine(
        12, 
        cheapMilkMaker,
        candySugar,
    );
    // cheapMilkMaker, candySugar를 반드시 만들어서 넣어줘야 하므로, 반드시 저 인스턴스가 필요하다.
    // 만약 진짜 커피머신이 있는데, 한가지 우류만 넣어야 한다면, 아무도 그 커피머신은 사지 않을 것이다.
    // 이처럼 커플링 강한 이 관계에서는
    // "재사용성"이 굉장히 떨어진다. 
    

    // 이제는 다양한 거품기로 우유를 만들어 놓고 (인스턴스 생성)
    const fancyMilkMaker = new FancyMilkSteamer();
    const coldMilkSteamer = new ColdMilkSteamer();
    const sugar = new SugarMixer();
    // 상황에 따라 골라서 넣어서 먹자
    const sweetLatteMachine2 = new SweetCaffeLatteMachine(
        12,
        coldMilkSteamer, // 디커플링 되기 전에는 한가지 클래스밖에 넣지 못했다.
        sugar,           // 지금은 인터페이스로규약되니, 해당 인터페이스를 구현하는 모든 클래스들을 아무거나 넣을 수 있다.
    )


    // 이제는 필요한 재료만 다 만들어 놓고 coffeeMachine하나로 모든 커피를 다 만들 수 있다.
    // sugar 
    const cheapSugar = new CandySugarMixer();
    const noSugar = new NoSugar();
    
    // milk
    const fancyMilk2 = new FancyMilkSteamer();
    const cheapMilk = new CheapMilkSteamer();
    const noMilk = new NoMilk();

    // 커피메이커 
    const noMilkNoSugarMachine = new CoffeeMachine(
        12,
        noMilk,
        noSugar,
    );

    // 이제 위에서 알맞는 커피머신을 인스턴스로 만들어서 
    // 그 커피머신으로 커피를 뽑아 마시면 된다.
    noMilkNoSugarMachine.makeCoffee(12);

}