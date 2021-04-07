const obj1 = {
    func1: function(){
        console.log('dfdf');
    },
    func2: function(){
        console.error("dfdf");
    },
}
console.log(obj1);  // { func1: [Function: func1], func2: [Function: func2] }

// es6 이후
const obj2 = {
    func1(){
        console.log('dfdf');
    },
    func2(){
        console.error("dfdf");
    },
}

console.log(obj2); //{ func1: [Function: func1], func2: [Function: func2] }

// 위 둘은 서로 같은 코드이다. 
// 객체 안에서는 함수를 만들어서 속성값으로 집어 넣을 수 있다.