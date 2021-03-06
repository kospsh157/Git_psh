// 그냥 노드에서 제공하는 http모듈로 만들면 확장성도 떨어지고 코드도 보기 안좋다.
// npm 에서는 서버를 제작하는 과정에서의 불편함을 해소하고 편의 기능을 추가한 웹 서버 프레임워크가 있다.
// 대표적으로 익스프레스이다.

// 익스프레스
/*
    1. http모듈의 요청과 응답 객체에 추가 기능들을 부여했다.
    2. 기존 메서드들도 계속 사용할 수 있다 하지만 편리한 메서드들을 추가하여 기능을 보완했으니 더 이상 사용안해도 될 것이다.
    3. 코드를 분리하기 쉽게 만들어 놨다.    >>> 관리가 용이해진다.
    4. 더이상 if문으로 요청 메서드와 주소를 구별하지 않아도 된다.
    5. 익스프레스 말고 koa, hapi 같은 웹 서버 프레임워크가 있지만, 상대적으로 사용량이 훨씬 적다.
    
*/

