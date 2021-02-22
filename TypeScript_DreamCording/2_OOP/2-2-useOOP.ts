// 앞에서 작성한 커피 머신을 객체지향형태로 만들어 보자 

{
    // 타입을 정의할 때는 세미콜론으로 구분을 한다.
    type CoffeeCup = {
        shots: number;
        hasMilk: boolean;
    };

    // 클래스 생성
    class CoffeeMaker {
        // 관련된 데이터, 함수 작성
        // 샷 하나를 만드는데 필요한 커피콩 그람(상수)
        // 클라스 안에서는 필드들을 만들 때 변수선언 키워드를 쓰지 않는다.
        // 메서드를 쓸 때도 키워드를 쓰지 않는다.

        static BEANS_GRAMM_PER_SHOT: number = 7;    // static을 붙이면 class level의 자원이다.
        coffeeBeans: number = 0;        // 멤버필드는 그냥 instance level의 자원이다.

        // 생성자 함수는 클래스를 가지고 인스턴스를 만들 때 반드시 호출되는 함수이다. 
        constructor(beans: number) {
            // 머신이 만들어 질 때 커피콩을 추가 하고 싶다면
            this.coffeeBeans = beans;
        }

        // 메서드 안에서 내부 필드에 접근 할 때에는 반드시 this키워드를 써야 한다.
        makeCoffee(shots: number): CoffeeCup{
            // static자원은 this 키워드로 쓰는게 아니라, 해당 클래스명을 통해서 접근가능하다.
            // 인스턴스 단위마다 생성되지 않고 클래스 단위로 공통된 자원으로 하나만 생성되기 때문이다.
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

        // 스태틱은 변수 뿐만 아니라, 메서드에도 적용가능 하다. 
        // 이렇게 하면 인스턴스를 생성하지 않고 클래스 단위에서 바로 커피머신 인스턴스를 만들 수 있다.
        // 다만 어떤 차이인지는 정확하게 잘 모르겠다.
        static makeMachine(coffeeBeans: number): CoffeeMaker{
            return new CoffeeMaker(coffeeBeans);
        }
    }

    // 이제 클래스를 써보자
    const maker = new CoffeeMaker(32);
    // new는 인스턴스를 만들고, ()는 생성자를 호출한다.
    
    // 상수는 클래스 안에 넣어서 쓰지 않는다.
    // 여기에서 BEANS_GRAMM_PER_SHOT 은 상수라서 바뀌지도 않는데, 인스턴스가 생성될 때 마다 계속 생성될 것이다.
    // 따라서 클래스 안에 넣지 말고 static 자원으로 빼서 관리를 해야 한다.
    
    // 클래스 레벨에서 함께 공유될 자원은 스태틱으로 선언
    // 인스턴스마다 독립된 자원으로 써야한다면, 그냥 멤버필드로 작성

    // 클래스의 스태틱 함수를 통해 인스턴스를 new 키워드(= 생성자함수 호출 없이) 없이 만들었다.
    const maker2 = CoffeeMaker.makeMachine(34);
    // 이렇게 하면 굳이 인스턴스를 생성하지 않고도 클래스 레벨에서 필요한 자원들을 생성해서 바로바로 쓸 수 있다.
    // 예를 들어 Math.pi() 같은 것들 
    

    // 스태틱 추가 설명
    /*
        1. 스태틱 자원들은, 클래스가 로드 되고 링크가 완료되는 시점에 초기값이 설정된다.
        따라서 통상적으로 어플리케이션이 실행되고, 끝날때까지 유지된다.
        2. 주로, 상수값, 여러 오브젝트에서 공유되어 사용될 수 있는 자원, 또는 굳이 인스턴스를 만들어서 데이터에 
        접근할 필요가 없는 것들에 static 을 붙여 스태틱 자원으로 쓴다.
        3. 위에서 보면 상수로 const 키워드로 선언된 것이 static을 붙이면서 사라졌다.
        아니 더 정확히는 클래스의 맴버필드로 넘어오면서 키워드 const가 사라졌다. 
        이런것들은 어떻게 불변성을 주는냐? readonly를 주면 된다.
    */

}