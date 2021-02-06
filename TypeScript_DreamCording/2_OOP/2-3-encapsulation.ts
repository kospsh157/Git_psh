// 앞에서 작성한 커피 머신을 객체지향형태로 만들어 보자 

{
    // 타입을 정의할 때는 세미콜론으로 구분을 한다.
    type CoffeeCup = {
        shots: number;
        hasMilk: boolean;
    };

    // 클래스 생성
    class CoffeeMaker {
        // 외부에서 변동 할 수 없도록 private 키워드 추가 
        private static BEANS_GRAMM_PER_SHOT: number = 7;    // static을 붙이면 class level의 자원이다.
        private coffeeBeans: number = 0;        // 멤버필드는 그냥 instance level의 자원이다.

        // private를 붙여 외부에서는 생성자를 호출 하지 못하게 한다.
        private constructor(beans: number) {
            this.coffeeBeans = beans;
        }

        makeCoffee(shots: number): CoffeeCup{
         
            if(this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT){
                throw new Error("Not enough coffee beans!");
            }
            // 커피 콩이 충분 할 때 ( 커피를 만들기 시작한다 )
            this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT;
            return {
                shots,
                hasMilk: false
            };
        }

        // 스태틱 함수로만 객체를 만들 수 있도록 한다.
        static makeMachine(coffeeBeans: number): CoffeeMaker{
            return new CoffeeMaker(coffeeBeans);
        }

        // 핵심 멤버필드들의 직접 접근성을 private으로 다 막아버리고,
        // 이렇게 메서드를 작성해서, 캡슐화 및 은닉성을 구현할 수 있다.
        // 이런 메서드에는 인자로 주어서는 안되는 값이 들어 올 때 관리를 할 수 있어서 더욱 좋다.
        fillCoffeeBeans(beans: number){
            if(beans < 0) {
                throw new Error('value for beans should be greater than 0');
            }
            this.coffeeBeans += beans;
        }
    }

    // 이제 클래스를 써보자
    const maker = new CoffeeMaker(32);  // 더이상 이렇게 안된다.
    // 이제는 이렇게 static 내부 함수로 위의 클래스의 인스턴스를 생성해야 한다.
    const maker2 = CoffeeMaker.makeMachine(34);
    
    // 이제는 이런식으로 커피콩을 충전해야 한다.
    maker.fillCoffeeBeans(30);

    // public : 내부든 외부든 언제어디서나 같은 폴더라면, 접근 가능 
    // private : 그 누구도 접근 하지 못함, 오직 내부 에서만 사용가능
    // protected : 해당 클래스를 상속받은 자식클래스에서만 접근가능 
    
    
    // private과 static 응용법
    /*  
        1. 싱글톤 응용
            생성할 수 있는 인스턴수의 갯수 제한
        2. 인스턴스를 만드는 로직을 캡슐화
            인스턴스를 생성하는데, 복잡한 로직이 추가된다면, static함수를 통해 이런 복잡성을
            심플하게 만들 수 있다. 
    */

    // getter와 setter
    // class 키워드를 작성시, type작성하는 것 처럼 구분자가 ;(세미콜론) 이다.
    class User {
        
        // getter가 되면, 더이상 메소드가 아니라, 멤버필드 처럼 써야한다.
        // 게터를 써야 하는 이유는 인스턴스가 만들어 지고 초기화되어있는데,
        // 나중에 멤버필드가 수정이 될 때,
        // 해당 멤버필드의 값을 참조하고 있는 다른 곳에서 그것을 인지 하지 못하기 때문이다.
        // 따라서 다른 멤버필드의 값을 참조하는 맴버필드는 겟터로 바꿔서 선언해야 한다. 
        get fullName(): string{
            return `${this.firstName} ${this.lastName}`;
        }

        // getter는 이런식으로 내부의 private처리한 맴버필드의 값을 개발자가 의도한 대로만 보여줄 수 있다.
        private internalAge = 4;
        get age(): number {
            return this.internalAge;
        }
        // setter를 이용하여 같은 멤버필드인 interalAge에 접근하여 값을 수정한다.
        // 반드시 이렇게 겟터 셋터로 접근해야 개발자가 의도한 대로 값이 넣어지고, 불러 올 수 있다.
        set age(num: number){
            if( num < 0 ){
                // 유효성 검사 가능
            }
            this.internalAge = num;
        }

        // 멤버 필드 선언부를 아예 다 지우고, 생성자 함수 매개변수로 집어 넣을 수 있다.
        constructor(private firstName: string, private lastName: string) {
            
        };
    }

    const user = new User('Steve', 'Jobs');
    console.log(user);      // Steve Jobs
    // getter와 setter는 ()를 붙이지 않는다. 그냥 맴버필드 처럼 사용한다.
    console.log(user.age);  // 4
    user.age = 10;
    console.log(user.age);  // 10

}