// 절차 지향적으로 커피 머신 만들기

{
    // 타입을 정의할 때는 세미콜론으로 구분을 한다.
    type CoffeeCup = {
        shots: number;
        hasMilk: boolean;
    };

    // 샷 하나를 만드는데 필요한 커피콩 그람(상수)
    const BEANS_GRAMM_PER_SHOT: number = 7;

    // 현재 커피콩 그램
    let coffeeBeans: number = 0;

    function makeCoffee(shots: number): CoffeeCup{
        // 커피 콩이 부족할 때 
        if(coffeeBeans < shots * BEANS_GRAMM_PER_SHOT){
            throw new Error("Not enough coffee beans!");
        }
        // 커피 콩이 충분 할 때 ( 커피를 만들기 시작한다 )
        coffeeBeans -= shots * BEANS_GRAMM_PER_SHOT;
        return {
            shots,
            hasMilk: false
        };
    }

    // 커피콩을 주고 나서 
    coffeeBeans = 3 * BEANS_GRAMM_PER_SHOT; // (3샷 분량의 커피콩 충전 )
    // double shots
    const coffee = makeCoffee(2);   // 더블샷 에소프레소 완성 
    console.log(coffeeBeans);       // 완성확인


}