// exports 사용법과 this 사용법

console.log(module.exports === exports); // true  즉, 참조관계이다. 
// 다만 module.exports에 함수를 담게되면 참조 관계가 깨지게된다. 그래서 일정한 스스로 일정한 규칙을 두고 사용하는게 좋다.
// 둘이 참조 관계이기 때문에 반드시 둘 중에 하나만 써야한다.


// 그래서 module.exports 를 생략해서 쓸 수 있다. 
// 이 방식은 주로 exposts에 담음 것이 여러개 일때 한다.
exports.obj1 = obj1;
exports.obj2 = obj2;


// 원래 방식
module.exports = {
    obj1, 
    obj2
}

// 주로 하나만 넣을때는 그냥 이렇게 하자 
module.exports = function1;






// this
// 노드에서는 전역객체가 globalThis or global이다.

console.log(this);      // {} === module.exports

function test(){
    console.log(this);  // global
    // 함수안에 this는 화살표함수의 this처럼 바로 위의 부모를 가르킨다. 
}
/*
this는 그냥 전역에서 쓰일때는  this === module.exprots == exports == {} 이다 따라서 빈객체가 나오는 것이다.
함수안에서의 this는 global를 가리킨다.

*/