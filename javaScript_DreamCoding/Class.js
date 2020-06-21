'use strict'

// << setter getter 사용시 주의사항 >>
// 겟터와 셋터안에 쓰이는 변수들에는 언더바 하나를 추가줘야한다. 안그러면 콜스택풀 버그가 뜬다. 
// 문제의 요인은 셋터함수인데 셋터함수가 무한히 호출되는 상황이 일어난다.

class Person {
    constructor(name, age){
        this.name = name
        this.age = age
    }
    
    get info(){
        console.log(this._name + this._age)
    }

    set info(name, age){
        this._name = name
        this._age = age
    }
}



// << 스태틱 클래스 정의하기 (타입스크립트에서 활용도가 높음) >>

class Article {
    static publisher = 'Dream Coding'
    constructor(articNumber){
        this.articNumber = articNumber
    }

    static printPublisher(){
        console.log(Article.publisher)
    }
}

// 위와 같이 클래스를 정의했을 때는 스태틱 자원은 더이상 설계도의 그것이 아니라, 실제 메모리에 올라와있는 데이터다. 
// 오브젝트와 상관없이 클래스에 값을 주입하는 것이다.
// 또한 동일하게 반복적으로 사용되어 지는 메소드일 경우 스태틱자원으로 쓰면 편하다.
// 오브젝트들이 공통적으로 사용하는 자원에 대해서 스태틱으로 지정하면 편하다.

// 스태틱 자원으로 지정되면 일반적인 방법으로 쓰일 수 없다. 다음을 보자 
const article1 = new Article(1); 
console.log(article1.printPublisher) // Dream Coding이 출력되지 않고 Undefined가 출력된다.
// 스태틱으로 지정하게되면 클래스자체에 그냥 데이터가 묶이게된다. 따라서 이렇게 인스턴스로 불러내면 값을 인지할 수 없다.
// Article.printPublisher 이렇게 직접 클래스 이름을써야 접근이 가능하다. 
console.log(Aricle.printPublisher)   // Dream Coding 출력 


// << 상속과 다형성 >> 
// 상속받고 자식 클래스에서 오버라이딩하는 것만 기억하고 있으면 됨
// super키워드 사용방법  
super.anyParentFuncs(); //  자식에서 오버라이딩 했을 때, 부모의 원래함수도 호출하고 싶다면 이렇게 super키워드를 써주면된다.



// << 클래스 타입 확인하기 instanceOf >>
// 만들어진 인스턴스가 어떤 클래스타입인지 확인시켜주는 연산자이다. 
console.log(testInstance instanceof Test) // Test라는 클래스로부터 만들어진 오브젝트이면 true를 반환하고 아니면 false반환한다. 


