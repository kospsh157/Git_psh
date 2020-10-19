// require() 에 대해서 좀 더 자세하게.. 이부분은 넘겨도 상관없음

// 특징
/*
    1. const a = require('./var');      이렇게하면 var파일의 자원을 a로 담아 쓸 수 있다.
    2. require('/var');                       이렇게하면 그냥 var파일을 실행만하고 끝낸다.
    3. 한번 require()함수로 불러온 파일들은 처음에는 원본파일를 불러오지만 그때, require.캐시 에 저장하여 다음부터는 
    이 캐시안에 있는 것으로 불러온다. 
    4. require() 구분은 굳이 가장 위에 있지 않아도 된다. 다만 import 구문은 가장 위에 선언되어야 한다.
    5. require.main === module 


    
*/

// 순환참조
/*  
    require('./B')  // A.js
    require('./A')  // B.js
    
    위처럼 파일 두개가 서로가 서로를 불러내면 무한반복되면서 순환참조가 된다. 실제로 이렇게되면 컴퓨터가 다운되겠지만
    그것을 막기위해서 이미 장치가 된게 있다. 

    노드는 순환참조가되는 순간 대상을 빈객체로 만들어버린다. 따라서 더이상 순환참조가 되지 않는다. 

*/


