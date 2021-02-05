/**
 * Let's make a calculator 🧮
 */

function calculate(operator: string, number1: number, number2: number): number{
    if(operator === 'add'){
        return number1 + number2;
    }else if(operator === 'substract') {
        return number1 - number2;
    }else if(operator === 'multiply'){
        return number1 * number2;
    }else if(operator === 'divide'){
        return number1 / number2;
    }else(operator === 'remainder'){
        return number1 % number2;
    }
    // 이렇게 짜면, 일단 다음과 같은 문제가 있다.
    /*
        1. 우선 if else문에는 else구문이 마지막에는 꼭 있어야 한다. 스위치에 default구문이 있어야 하는 것과 같다.
        2. 이런 기능에는 switch문이 더 잘 어울린다.
        3. else문을 빠뜨리면, 리턴문이 없는 것으로 컴파일은 인식한다. 
    */
}


// 답안
type Command = 'add' | 'substract' | 'multiply' | 'divide' | 'remainder';
function calculate2(command:Command, a: number, b: number): number{
    switch(command){
        case 'add' : 
            return a + b;
        case 'substract' : 
            return a - b;
        case 'multiply':
            return a * b;
        case 'divide':
            return a / b;
        case 'remainder':
            return a % b;
        default:
            // 반드시 기본값을 설정해주도록 하자, 함수는 반드시 정해진 인수만 들어온다는 보장은 없으니깐
            throw new Error('unkown command');
    }
}


console.log(calculate('add', 1, 3)); // 4
console.log(calculate('substract', 3, 1)); // 2
console.log(calculate('multiply', 4, 2)); // 8
console.log(calculate('divide', 4, 2)); // 2
console.log(calculate('remainder', 5, 2)); // 1
