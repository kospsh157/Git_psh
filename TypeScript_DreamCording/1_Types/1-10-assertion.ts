
// Type Assertions
// 타입 어쎨션은 가능한 피해야 한다.
// 타입을 강요할 때 쓰인다.
// 그러나 자바스크립트와같이 쓰일 때 어쩔 수 없이 쓰일 때가 있다.
{
    // 자바스크립트 함수에서, 컴파일에서는 any타입이나 내부적으로 보면 항상 문자열을 반환하는 함수가 있다고 치자.
    function jsStrFunc(): any {
        return 'hello';
    }
    const result = jsStrFunc();
    // result는 문자열이다. 하지만 그것은 우리만 아는 사실이고, 컴파일에서는 any타입이기 때문에 모른다.
    // 따라서 문자열과 관련된 api함수들을 사용할 수 없다.
    // 이때! 필요한 게 타입 어썰션이다!
    (result as string).length;  // 문자열 길이를 반환하는 api함수 사용가능!
    // java에서 쓰이는 캐스팅과 같은 것이다.

    // 그럼 이제 왜 타입 어쎨션을 피해야 하는지는 이거다.
    // 아팁 어썰션은 정말 100% 확신 할 때만 써야 한다. 

    // 다음 잘못된 예를 보자
    const wrong: any = 5;
    console.log((wrong as Array<number>).push(10)); // Error there no push() method
    // 위에서는 숫자5를 넣었다.
    // 하지만 타입 어쎨션으로 숫자 배열이라고 캐스팅했고, 그 결과, 에러가 발생해서 노드 프로세스가 죽는다.
    // 이 처럼 나는 확신한다고 해서 썼지만, 만약에 그게 틀리는 순간, 노드 프로세스가 죽는다는 뜻이다.
    // 따라서 타입 어쎨션은 정말 잘 알아보고 써야 한다. 될 수 있으면 쓰지 말고.

    // 한가지 더 보자
    // ! 느낌표로 타입 어쎨션을 쓰는 방식이다. 
    function findNumbers(): number[] | undefined {
        return undefined;
    }
    const numbers = findNumbers();
    // 여기서 나는 numbers가 숫자배열일 것이다라고 확신 하는 순간 밑처럼 쓸 수 있다.
    numbers!.push();    // 다만 여기서는 에러가 날 것이다...

    // 반면에 좋은 예도 있다.
    // 상황에 따라서 반드시 해당 class가 있는 경우가 확실하다면 다음과 같이 빠르게 쓸 수 있다.
    const button = document.querySelector('class')!;
    console.log(button.nodeValue);

    // 만약 제대로 쓰자면 이렇게 길게 써야 할 것이다.
    const button1 = document.querySelector('class1');
    if(button1){
        // 해당 class1이란 돔객체가 있을 경우
        console.log(button1.nodeValue);
    }else{
        // class1이란 돔객체가 없어서 null로 나올 경우
    }
}
    