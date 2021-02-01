{
    // Javascript 잘못된 코드
    // 함수가 긴 경우에는 어떤 값을 넣고 어떤 값을 리턴받을 수 있는지 예상하기 쉽지 않다.
    // 또한 함수가 원래 가지는 의도대로 움직이지 않게된다.
    function jsAdd(num1, num2){
        return num1 + num2;
    }


    // 타입스크립트로 수정해보자
    function add(num1:number, num2:number):number {
        return num1 + num2;
    }


    // 좀 더 복잡한 잘못된 js코드를 또 ts코드로 수정해보자
    // 잘못된 js코드
    // 무언가를 fetch하고 프로미스 타입으로 반환하는 함수이다.
    function jsFetchNum(id){
        // code ...
        // code ...
        // code ...
        return new Promise((resolve, reject)=>{
            resolve(100);
        });
    }


    // typescript
    // 다음과 같이 수정하면 
    // 문자열 id를 받아서 fetch가 끝나면 숫자로 된 Promise 타입을 리턴하는 것임을 알 수 있다.
    function fetchNum(id: string): Promise<number>{
        // code...
        // code...
        // code...
        return new Promise((resolve, reject) => {
            resolve(100);
        });
    }


    // <<JavaScript에서도 사용이 가능한 유용한 방법들>>
    // 1. Optional parameter
    function printName(firstName: string, lastName?: string){
        console.log(firstName);
        console.log(lastName);
    }
    
    printName('sungho','park');
    printName('Ellie'); // 이렇게 하면 lastName에는 undefined로 나온다.
    // 전달 받을 수도 있고, 전달 받지 않을 수도 있도록 파라미터를 설정해주면 인자의 수가 가변적으로 된다.
    // 이것이 바로 Optional parameter이다. 

    // 2. Defulat parameter
    function printMessage(message: string = 'default message'){
        console.log(message);
    }
    
    printMessage(); // dafault message
    
    // 3. Rest parameter
    // 다음과 같이하면, 파라미터로 들어오는 모든 인자값들을 numbers라는 숫자타입 배열에 넣어서 사용하게된다.
    // 다음은 파라미터의 모든 값들을 다 더해서 반환하는 함수이다.
    function addNumbers(...numbers: number[]): number{
        return numbers.reduce((a,b) => a + b);
    }
    console.log(addNumbers(1,2,3)); // 6

}