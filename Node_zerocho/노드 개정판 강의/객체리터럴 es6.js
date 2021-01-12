// es5 의 객체 리터럴 문법
var sayNode = function(){
    console.log('Node');
}
var es = 'ES'

var oldObject = { 
    sayJS: function(){            // 메소드 선언
        console.log('JS');
    },
    sayNode: sayNode              // 속성명과 똑같은 이름의 변수명을 값으로 대입할 때
                            
}

oldObject[es + 6] = 'Fantastic';  // 동적 속성명 사용 할 때


// 위의 es5문법이 편의성을 위해 아래와 같이 바뀜
// es6 의 객체 리터럴 문법

const newObject = {
    sayJS() {                   // 더이상 function() 를 쓰지 않아도 됨
        console.log('JS');
    },
    sayNode,                    // 속성명과 값의 변수명이 같다면 그냥 생략해서 하나만 써도됨
    [es + 6] : 'Fantastic',     // 동적 속성명을 사용할때, 객체 선언 밖에서 하지 않고 이렇게 바로 
                                // 동적 속성명을 사용할 수 있음. 
};



// 특히나 속성명과 그 값의 변수명이 같을 경우 생략해서 하나만 써도 된다고 했는데 이것때문에 햇갈리는 경우가 생긴다.
// {x : x, y : y} 는 {x, y} 와 같다. 

// 따라서 
const obj = (x, y) => {
    return {x, y};              // {x : x, y : y} 랑 같은 의미이다.  익명 객체를 생성하고 그 속성명으로
                                // x, y가 있고, 그 값으로, 파라미터로 들어온 x, y 를 각각 할당하겠다는 뜻이다.
}






// 향상된 객체 리터럴 표현법에서 가장 유용하고 주의해야 할 점은 이거다
const obj4 = {
    name,
    old,
    location,
    habbit,
    job,
}
// 이거는 JSON 구문이라고 착각하거나, 뭐 그래서는 안된다. 
// 이런 형식을 봤을때, 아 객체구나 향상된 객체 리터럴 문법으로 인해 생략되어서 쓰였구나 라고 판단해야한다.
// 다른과 같은 리턴문도 마찮가지이다. 
const anonymous = () => ({a, b}) // 화살표함수 때문에 객체가 리턴될때에는 예외적으로 이렇게 가로를 해야 한다.
