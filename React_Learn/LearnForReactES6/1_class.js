// 리액트를 들어가기 전에 ES6를 먼저 공부할 필요가 있다. 왜냐면 
// 리액트가 자주 쓰는 부분이 특정되어 있기 때문이다. 
/*
    ES6 classes
    The new variable declaration let/const
    Arrow functions
    Destructuring assignment
    Map and filter
    ES6 module system
*/





// 자바스크립트 클래스에 대해서 살펴보자
class Superclass {

    // 생성자 함수는 객체를 초기화 할 때 호출된다.
    constructor(name){
        this.name = name;
    }

    hello() {
        console.log("hello I am " + this.name);
    }
}

// 클래스 상속
class Subclass extends Superclass{
   hello(){
       console.log('자식 함수로 오버라이딩 됩니다.');
   }
}
// 슈퍼클래스의 생성자 함수를 포함해 모든 것을 상속 받는다. 
// 슈퍼 클래스의 메서드를 서브클래스에서 오버라이딩 할 수 있다. 

const childClass = new Subclass('psh');
childClass.hello()  // '자식 함수로 오버라이딩 됩니다.'







// 리액트에서 어떻게 쓰이는지?
import React, { Component } from 'react';
// react 페키지로부터 Component 클래스를 받아다가 상속 받는다.
// App 은 Component의 모든 자원을 사용할 수 있다. 
// Component 클래스의 주요 자원은 다음과 같다.
// render() 메서드, JSX, this.state 등이 있다. 
class App extends Component {
  // class content
  render(){
    return (
      <h1>Hello React!</h1>
    )
  }
}