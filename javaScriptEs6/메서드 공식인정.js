// 원래 자바스크립트에서 메서드를 인정하지 않고 그냥 함수가 데이터로 있는 객체 프로퍼티로 정의했다.
// 그러다가 ES6부터 정식으로 메서드로 정의한다. 
// 현재로서는 이 중요성을 모르겠다. 그냥 이해만 하고 넘어가자

// 다음 코드를 보자
let person = {
    // method
    getGreeting() {
        return "Hello";
    }
};
// not a method
function shareGreeting() {
    return "Hi!";
}

// 위 예제는 getGreeting()이라는 단일 메서드로 person을 정의합니다. 
/*
getGreeting()의 [[HomeObject]]는 함수를 객체에 직접 할당함으로써 person을 정의합니다. 
반면에 shareGreeting() 함수는 생성될 때 객체에 할당되지 않았으므로 [[HomeObject]]가 지정되어 있지 않습니다. 
대부분의 경우 이 차이는 중요하지 않지만 super 참조를 사용할 때 매우 중요합니다.

super에 대한 참조는 무엇을 할 것인가를 결정하기 위해 [[HomeObject]]를 사용합니다. 
첫 번째 단계는 [[HomeObject]]에서 Object.getPrototypeOf()를 호출하여 Prototype에 대한 참조를 가져 오는 것입니다. 
그런 다음 Prototype의 이름이 같은 함수가 검색됩니다. 
마지막으로, 바인딩이 설정되고 Method가 호출됩니다. 다음은 예제를 살펴보겠습니다.
*/