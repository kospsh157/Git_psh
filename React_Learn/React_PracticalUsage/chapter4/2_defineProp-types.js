// 여기서는 컴포넌트를 만들 때, 속성값을 가장 먼저 하고 코드 가장 윗줄에 적으라고 배운바있다.
// 구체적으로 속성값을 정의하는 방법을 알아보자

import { useRef } from "react";
import MyComponent from "./1_createComponents";

// 1. 코드에서 타입 정보가 필요한 이유를 간단하게 알아보자.
// 2. prop-types에서 기본적으로 제공하는 타입의 종류를 알아보고, 
// 기본 타입 외에도 타입 정의 함수를 이용해서 자신만의 타입을 만드는 방법도 알아보자.
// 3. 기본적으로 정적타입의 코딩을 하는 것이 좋다. 하지만 동적 타입 방식을 사용해야만 하는 경우가 있다.
// 이를 위해 리액트에서는 속성값 타입을 정의할 수 있는 prop-types 패키지를 제공한다.
// 4. prop-types를 사용할 경우 컴포넌트 사용 시 속성값에 잘못된 타입이 입력되면 콘솔에 에러 메시지가 출력된다.
// 물론 이 타입검사 기능은 개발 모드에서만 동작한다. 타입 에러를 사전에 검사할 수 있으므로 큰 도움이 된다.
// 5. prop-types를 사용했을 때 생기는 또 다른 장점은 타입 정의 자체가 훌륭한 문서가 된다는 점이다. 

// 다음 예시를 보고 prop-types를 사용하는 방법을 배워보자
User.propTypes = {
    male: PropTypes.bool.isRequired,                    // 1
    age: PropTypes.number,                              // 2
    type: PropTypes.oneOf(['gold', 'silver', 'bronze']),// 3
    onChangeName: PropTypes.func,                       // 4
    onChangeTitle: PropTypes.func.isRequired
};
// 설명
// 1번 : male속성값은 필숫값이기 때문에 부모 컴포넌트에서 이 값을 주지 않으면 에러 메시지가 출력된다.
// 2번 : 반대로 age 속성값은 필숫값이 아니기 때문에 이 값을 주지 않아도 에러는 발생하지 않는다. 
// 만약 age속성값으로 문자열을 줬다면 타입이 잘못됐다는 에러 메시지가 출력된다.
// 3번 : type 속성값에는 gold, silver, bronze 중의 하나만 입력할 수 있다.
// 4번 : 여기서 한 가지 부족한 타입 정보는 onChangeName과 같은 함수의 타입이다. 
// prop-types에서 함수의 매개변수와 반환값에 대한 타입 정보는 정의할 수 없다. 이런 경우에는 그냥 문서화를 위해 주석으로만 작성하자.


// 다음은 여러가지 타입 정의 예시이다. 다음을 외우면 타입을 정의하는 방법에 대해서도 대충 감이 온다.
MyComponent.propTypes = {
    // 리액트 요소
    // ex) <div> hello </div>, <SomeComponent /> 
    menu: PropTypes.element,

    // 컴포넌트 함수가 반환할 수 있는 모든 것
    // ex) number, string, arry, element, <SomeComponent /> 
    description: PropTypes.node,

    // 특정 클래스로 생성된 모듣 객체 (여기선 Message 객체를 사용)
    // ex) new Messages() 
    message: PropTypes.instanceOf(Message),

    // 배열에 포함된 타입 중에서 하나를 만족 (array[] = [number, string, ...])
    // ex) 123, 'messy', 
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    // 특정 타입만 포함하는 배열
    // ex) [1, 5, 7], ['a', 'b']
    ages: PropTypes.arrayOf(PropTypes.number),

    // 객체의 속성값 타입을 정의 ( 특정 객체 안의 속성값 타입까지 지정할 수 있다. )
    // ex) {color: 'red', weight: 123}
    info: PropTypes.shape({
        color: PropTypes.string,
        weight: PropTypes.number
    }),

    // 객체에서 모든 속성값의 타입이 같은 경우
    // ex) {prop1: 123, prop2: 456}
    infos: PropTypes.objectOf(PropTypes.number)
    
}

// 또한 다음과 같은 사용자 정의 타입 함수를 작성할 수도 있다.
MyComponent.propTypes = {
    age: function(props, propName, componentName){
        const value = props[propName];
        if( value < 10 || value > 20) {
            return new Error(
                `Invalid prop ${propName} supplied to ${componentName}.
                It must be 10 <= value <= 20.`
            );
        }
    }
};