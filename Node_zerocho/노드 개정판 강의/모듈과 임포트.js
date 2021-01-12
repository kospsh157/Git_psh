// 노드에서 module을 먼저 사용해왔다. 
// moduel 문법을 설명하자면 
/*
    1. 먼저 다른 파일에서 공통적으로 필요한 자원을 선언이나 정의까지 한 다음에
    2. 또 다른 파일에서 1번에서 만든 파일을 불러다가 그 자원을 사용하는 것이다.
    3. 2번 파일에서 1번파일의 자원을 또 module.exports = {} 로 객체화 해서 내보낼 수 있다.

*/

// A.js 파일
const abc = 1;
const abc2 = 2;
module.exports = {
    abc,                                // 주의할 점 여기서 향상된 객체리터럴 생략문법 쓰임
    abc2
}

// B.js 파일
const {abc, abc2} = require('.A.js');   // 여기서 주의할 점은 비구조화할당으로 {abc, abc2}를 가져오면서
                                        // 동시에 변수로 선언해서 바로 abc, abc2 를 분문에서 사용할 수 있다.


const anyFunc = () => {
    return abc + abc2;
}  
module.exports = {                      // A에서 자원을 받아서 B에서 가공해서 다시 다른 파일로 보낼 수 있다.
    anyFunc                             // 여기서도 주의할 점은 향상된 객체 리터럴 표현법으로 객체형태로 보냈다는
                                        // 점이다. 다른 배열형태로 보내도되는데 대부분 그냥
                                        // 객체 형태로 보낸다.
}

// C.js 파일 
const {abc, abc2} = require('./B.js');
const {anyFunc} = require('./C.js');
// C파일에서 위의 anyFunc() 함수를 사용하려면 B.js파일이 불러온 A.js파일도 필요하다.
// 따라서 불편하지만 연결되어 있다면 그 위의 필요한 것들을 다시 또 모두 require()함수로 불러줘야한다.
// 그 다음에 자원을 마음대로 사용하면된다. 


// 자바스크립트에서는 나중에 import 구문이 생겼는데 현재 리액트나 뷰에서는 임포트 구문을 사용해야한다.
/*
    1. 대부분은 module.exports 나 import 구문이나, 1:1로 대응되는데 실제로는 같은 원리는 아니라서,
    잘써야한다. 대부분의 node 진형쪽에서는 require()를 쓴다. 이걸 함부로 import 구문으로 바꾸면 안될수도있다.
    2. 요즘 인기있는 프론트 라이브러리들은 다 import구문을 쓰기 때문에 import 구문도 알아둬야한다.
    3. module.exports와 마찮가지로 당연히 파일 하나당 하나만 써야 한다. 

*/

// 내보낼때는 이렇게 하고
export default {
    value1,
    value2,
};
// 혹은 
export default anyFunc;

// 받을 때는 이렇게 한다.
import {value1, value2} from '.A.js';




