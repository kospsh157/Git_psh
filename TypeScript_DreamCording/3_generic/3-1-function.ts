// 함수 제네릭
/*
    제네릭은 가장 재사용성이 뛰어난 개념이다. 
    제네릭을 이용하면 어떤 타입의 데이터도 자료구조에 제너릭으로 타입을 재정의하여 재활용할 수 있다. 
    예를 들어 문자열만 저장할 수 있던 자료구조를 제네릭을 이용하면 마음대로 원하는 타입으로 저장할 수 있다.
*/

// 처음에는 함수 제네릭 부터 알아볼 것이다. 
{

    // 이 함수는 어떤 인자값이 널인지지 아닌지 확인해주는 함수이다.
    // 근데 문제가 있다. 지금 여기서는 number인지 널인지지만 확인할수 있다.
    // 우리는 넘버가 아니라 다른 타입에 대해서도 널체크를 하고 싶다. 그러기 위해서 제너릭을 사용한다.
    function checkNotNull(arg: number | null): number {
        if(arg == null) {
            throw new Error('not vaild number!');
        }
        return arg; 
    }

    // 이렇게 해도 타입 보장이 안되므로, 정말 나쁜 예제이다.
    function checkNotNullwithAny(arg: any | null): any{
        if(arg == null) {
            throw new Error('not vaild number!');
        }
        return arg; 
    }

    // 제네릭을 이용해서 만들자!
    // 제너릭 함수
    function checkNotNullwithGeneric<GENERIC>(arg: GENERIC | null): GENERIC {
        if(arg == null) {
            throw new Error('not vaild number!');
        }
        return arg; 
    }

    // 인자를 제너릭으로 정했기 때문에, 사용시에, 타입을 확인한다. 인자로 숫자 타입을 받으면 제너릭은 숫자 타입이 된다.
    const result: number = checkNotNullwithGeneric(123);
    // 그러면 자연스럽게 임의의 타입도 보장을 받을 수 있고, 널값 확인도 가능하다.
    
    // 주의할 점은 함수의 리턴 타입이 number가 되어야 맞는다 123타입으로 나온다. 
    // 물론 타입스크립트는 넘버로 자동 인식하지만, 임의의 123타입이 되는 게 싫다면, 
    // 함수의 결과값을 받는 변수쪽에서 타입을 고정으로 number로 지정해주면, 넘버로 바뀌는 걸 볼 수 있다.

    // 컴파일 과정에서 타입을 보장 받을 수 있다는 것. 그것이 가장 큰 메리트이다.

    

}

