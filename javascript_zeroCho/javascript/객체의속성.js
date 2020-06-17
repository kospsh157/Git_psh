
var zeroCho = {
    name : '제로초',
    eat : function eat1(){
        console.log('냠냠');
    }
}

console.log(zeroCho); // 객체 식별자 'zeroCho'의 프로퍼티들이 출력됨
zeroCho.eat;  // 객체의 함수를 선택만하고 아무것도 하지 않음, 즉 출력으로는 아무것도 할게 없음.
zeroCho.eat(); // 객체의 함수를 호출함 

console.log(zeroCho['eat']);  // 함수를 호출한게 아니라 객체의 함수의 정보를 출력함
console.log(zeroCho.eat1);    // zeroCho의 객체안에 있는 프로퍼티 중에서 eat1은 없음. 따라서 undefined로 나옴

zeroCho.eat1(); // 객체에서 정의된 메소드는 함수이름으로 호출하는게 아니라, 객체의 프로퍼티이름으로 호출함 따라서 객체안에서 메서드이름을 중복으로부여하는것은 의미가없음.
// 따라서 메서드는 객체 안에 있으므로, 그냥 익명함수형식으로 정의하면 된다. 

//객체 안의 프로퍼티에 접근할 때 쓴느 연산자 2가지가 있다. 
/*
    1. '[]' 연산자
    2.  '.' 닷연산자

*/


// zeroCho.name 처름 닷연산자가 쓰기에 훨씬 편하지만 어쩔 수 없이 [] 연산자를 사용할 때가 있다. 
// 대괄호를 사용하면 변수로써, 프로퍼티에 접근이 가능하다. 
// 무슨 말이냐면 var something = 'name' 이렇게 변수로써 안에다가 문자열로 name을 대입하고
// 다시 zeroCho[somgthing] 을하면 zeroCho['name']과 같은 의미가 된다. 이런식으로 프로퍼티의 식별자를 변수에 담아 활용 할 수 가 있다.
// 이 밖에도 zeroCho[something-x-1] 이렇게 안에다가 연산자를 넣어서 사용 할 수도 있다. 



