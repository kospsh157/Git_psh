// 추상화는 기본적으로 여러가지 뜻이 있지만 여기서는 
// 굳이 사용자가 알지 않아도 되는 자원들은 숨기고 필요한 자원들만 쉽게 쓸 수 있도록 인터페이스로 빼놓는 과정을 말한다.
/*
    추상화 하는 방식 2가지
        1. 정보은닉(private)을 통한 추상화
        2. 인터페이스를 통한 추상화
            이 클래스를 사용하려면 이렇게 해야한다. 사용법을 알려줌과 동시에 강제하는 방식
            
            이름명명법
            인터페이스 이름은 클래스명과 똑같이하고, 구현하는 클래스 이름명을 조금 다르게 하는게 좋다.(여기서는 이 방식)
            혹은 인터페이스 클래스이름명은 구현클래스이름명앞에 대문자I만 붙이는 경우
            혹은 구현하는 클래스 이름 뒤에 -Imp을 붙이는 방법이 있다.
        
           

*/
{ 
    type CoffeeCup = {
        shots: number;
        hasMilk: boolean;
    };

    interface CoffeeMaker{
        makeCoffee(shots: number): CoffeeCup;
    }

    interface CommercialCoffeeMaker {
        makeCoffee(shots: number): CoffeeCup;
        fillCoffeeBeans(beans: number): void;
        clean(): void;

    }
    // 두 가지의 인터페이스 규약을 구현해야 하는 클래스
    class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker{
    // 구현부 클래스에서는 반드시 인터페이스에 명시된 함수들을 다 구현해야 한다.
        private static BEANS_GRAMM_PER_SHOT: number = 7;    // static을 붙이면 class level의 자원이다.
        private coffeeBeans: number = 0;                    // 멤버필드는 그냥 instance level의 자원이다.

        private constructor(beans: number) {
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
            
            // if(this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT){
            //     throw new Error("Not enough coffee beans!");
            // }
            // // 커피 콩이 충분 할 때 ( 커피를 만들기 시작한다 )
            // this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT;
            // return {
            //     shots,
            //     hasMilk: false
            // };
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

    const maker: CoffeeMachine = CoffeeMachine.makeMachine(34);
    maker.fillCoffeeBeans(30);
    maker.makeCoffee(2);

    // 인터페이스 형태로 선언하고 구현부 클래스의 스태틱 자원으로 인스턴스 생성
    const maker2: CoffeeMaker = CoffeeMachine.makeMachine(32);
    maker2.fillCoffeeBeans(30); // 더 이상 구현부만이 가지고 있는 자원은 사용할 수 없음.
    // 이런방식으로 사용자에게 필요없는 함수는 은닉화 할 수 있음.
    // 이렇게 인터페이스로 강제하는 방식임
    
    // 다른 말로 표현하자면, 정확히 인터페이스에 있는 자원만 쓰도록 하고 싶다면, 타입을 인터페이스로 하고 받으면 되고,
    // 더 확장된 기능을 쓰고자 한다면, 구현 클래스 타입으로 선언하고 받으면 된다.


    // 인터페이스에는 오직makeCoffee()함수만 약속되어 있기 때문에 이 함수만 사용할 수 있음
    maker2.makeCoffee(2);


    // 타입을 인터페이스로 받으면, 인터페이스에서 강제하는 자원들만 사용할 수 있다.
    const maker3: CommercialCoffeeMaker = CoffeeMachine.makeMachine(34);
    maker3.fillCoffeeBeans(32);
    maker3.makeCoffee(2);
    maker3.clean();





    // 아마추어 사용자와 프로바리스타 사용자가 있다고 치고, 
    // 위에서 만든 커피머신 인터페이스를 이용해서 맴버필드로 넣고 해당 자원을 사용한다.
    class AmateurUser {
        // 멤버필드들은 생성자 함수의 매개변수로 넣어도 된다.
        constructor(private machine: CoffeeMaker) {}
        makeCoffee(){
            const coffee = this.machine.makeCoffee(2);
            
        }
    }

    class ProBarista {
        constructor(private machine: CommercialCoffeeMaker) {}
        makeCoffee(){
            // 자원으로 받은 machine이 인터페이스가 달라서 서로 사용할 수 있는 함수가 다르다.
            // 여기서는 machine에 기능이 더 많다.
            const coffee = this.machine.makeCoffee(2);
            console.log(coffee);
            this.machine.fillCoffeeBeans(45);
            this.machine.clean();
            
        }
    }

    // 이제 이걸 사용해보자
    // CoffeeMachine은 구현부 클래스이고, makeMachine()은 자신(CoffeeMachine)을 생성해서 리턴해주는 스태틱 함수이다.
    // 일단 구현부 클래스의 인스턴스를 생성하고 사용자 클래스의 생성자에 넣어줘야 하므로, 
    // 우선 커피머신의 구현부 클래스부터 인스턴스화 시킨다.
    const maker4: CoffeeMachine = CoffeeMachine.makeMachine(32);
    const amateur = new AmateurUser(maker4);
    const pro = new ProBarista(maker4);

    // 아마추어와 프로의 차이는 같은 함수라도, 들어가 있는 자원(인터페이스)가 다르기 때문에 동작도 다르게 한다.
    amateur.makeCoffee();   
    pro.makeCoffee();
    

    // 여기서 포인트는 
    /*
        1. 종류가 다른 커피머신을 인터페이스로 나눠서 정의하고
        2. 구현부 클래스로 인터페이스를 다 구현하고
        3. 사용자 클래스에서는 커피머신이라는 자원을 쓸 때, 인터페이스 형태의 자원으로 가져와서 사용한다.
        4. 사용자에서는 커피머신이 어떻게 구현되어 있는지 알 필요도 없다. 그저 그냥 사용자에 따라 
        인터페이스를 선택해서 받아서 쓰면 된다. 
        (그래서 인터페이스를 명명할 때, 알기 쉽게 해야한다.)
        5. 같은 구현부 인스턴스를 넣어도 아마추어와 프로바리스타 클래스에서 정의된 인터페이스가 다르기때문에,
        결국 인터페이스에 강제된 자원만 사용할 수 있다.
    */


    // 정리
    /*
        1. 종류가 다르지만 관련이 있는 인터페이스들을 작성한다.
        2. 구현부 클래스 하나가 모든 인터페이스들을 구현한다.
        3. 사용자 클래스를 만들고 필요한 인터페이스를 골라서 받도록 한다.
        4. 구현부 클래스의 인스턴스를 사용자 클래스에 주입하여, 사용한다. 
        5. 이때, 사용자 클래스에서는 당연히 골라서 쓴 인터페이스의 자원만 사용가능하다.

    */

        
}


