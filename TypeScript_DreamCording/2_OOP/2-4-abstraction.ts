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
  class CoffeeMachine implements CoffeeMaker{
    // 구현부 클래스에서는 반드시 인터페이스에 명시된 함수들을 다 구현해야 한다.
    private static BEANS_GRAMM_PER_SHOT: number = 7;    // static을 붙이면 class level의 자원이다.
    private coffeeBeans: number = 0;        // 멤버필드는 그냥 instance level의 자원이다.

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
}

    const maker: CoffeeMachine = CoffeeMachine.makeMachine(34);
    maker.fillCoffeeBeans(30);
    maker.makeCoffee(2);

    // 인터페이스 형태로 선언하고 구현부 클래스의 스태틱 자원으로 인스턴스 생성
    const maker2: CoffeeMaker = CoffeeMachine.makeMachine(32);
    maker2.fillCoffeeBeans(30); // 더 이상 구현부만이 가지고 있는 자원은 사용할 수 없음.
    // 이런방식으로 사용자에게 필요없는 함수는 은닉화 할 수 있음.
    // 이렇게 인터페이스로 강제하는 방식임

    // 인터페이스에는 오직makeCoffee()함수만 약속되어 있기 때문에 이 함수만 사용할 수 있음
    maker2.makeCoffee(2);



}