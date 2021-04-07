// 그냥 글로벌로 선언하면 나중에 이름명이 중복된다.

{
    // 따라서 지역 변수로 사용하자 
    /*
        1. Primitive: number, string, boolean, bigint, symbol, null, undefined
        2. Object: function, array...
        3. 

    */

    // number
    const num:number = 0.1 

    // string
    const str:string = 'hello';

    // boolean
    const boal:boolean = false; 

    
    // undefined
    // undefined는 안에 값이 있는지 없는지 알 수 없는 상태이다. (결정되지 않은)
    // 다음과 같은 선언은 볼 수 없다.
    let name: undefined; 
    // 다음과 같은 선언은 있을 수 있다. 데이터 타입이 있거나, 결정되지 않았다 라는 의미
    let age: number | undefined;
    age = undefined;
    age = 1;



    // null 
    // 아예 값이 없는 상태
    // 다음과 같은 선언은 할 수 있으나, 보통은 위를 더 잘 쓴다.
    // 만약 쓰게되면 다음과 같이 쓸 수는 있다. 값이 있거나, 없거나를 의미한다.
    let person: string | null;



    // unknown
    // 자바스크립트에서의 동적타입 기능때문에 어쩔 수 없이 생긴 기능.
    // 대체로 쓰지 않는다.
    // 옜날 자바스크립트 모듈을 쓸 때, 리턴값이 일정하지 않을 때 쓴다.
    let notSure: unknown = 0;
    notSure = 'he';
    notSure = true;



    // any
    // 위와 같다. 역시 잘 쓰지 않는다.
    // 가능하면 쓰지 않는 것이 좋다.
    let anything: any = 0;
    anything = 'hello';



    // void
    // 함수에서 아무것도 리턴하지 않을 때 적어줘야 하는 타입
    // 다만 void리턴일 경우 생략 할 수 있으나, 프로젝트를 시작할 때 팀끼리 구체적으로 정한다.
    function print(): void{
        console.log('hello');
        return;
    }



    // never
    // 나는 리턴을 절대 하지 않을 것이다. 라는 의미
    // 흔히 에러 핸들링을 할 때 사용한다. 
    
    // 다음 과정을 따른다. 
    // 에러가 발생하면, 로그 뿌려주고, 프로그램 정지하고, 아무것도 리턴하는 것 없다. 라는 뜻이다.
    // 다음과 같이 에러가 발생하면 자연스럽게 프로세스가 종료되므로, return을 하지 않아도 된다. 
    // 만약 에러구문이 아니라 다른 구문이라면, return키워드가 없어도 생략된것처럼 적용되어서 return; 를 쓰기 때문에, 에러가난다.
    function throwError(message: string): never{
        //message -> server (log)
        throw new Error(message);
        while(true){
            // 혹은 무한 와일문 돌 때, 리턴하지 않으므로, 쓸 수 있다. 
        }

        // 일단 기본적으로 함수 안에 return키워드가 없으면, return; 이 생략된 경우이다.
        // 따라서 return void이기 때문에, never를 써놓고 return; 이 생략되는 경우처럼 만들면
        // 함수에서 에러가 뜬다.
    }



    // Object
    // Object 타입은 최상위 부모 타입이다. 모든 타입을 다 넣을 수 있다.
    // 광범위한 추상적인 모든 타입을 다 넣을 수 있다.
    // 이것도 잘 쓰지 않는다. any, unknown이랑 다른바가 없기 때문이다.
    let obj: object;
    function acceptSomeObject(obj:object){}
    acceptSomeObject({ name: 'ellie'});
    acceptSomeObject({ animal: 'dog'});
    acceptSomeObject([1,2,3]);


}