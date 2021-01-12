const fs = require('fs').promises;  // 프로미스화 시킨다. 

fs.readFile('./readme.txt')         
    .then( (data) => {              // then메서드와 catch메서드로 결과값을 받는다. 
        console.log(data);
        console.log(data.toString());
    })
    .catch( (err) => {              // readFile도 비동기 함수이다. 반드시 예외처리를 해주자.
        console.log(err);
    })


