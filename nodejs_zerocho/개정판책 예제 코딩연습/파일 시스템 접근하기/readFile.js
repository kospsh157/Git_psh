const fs = require('fs');

fs.readFile('./readme.txt', (err, data)=>{
    if(err){
        throw err;
    }
    console.log(data);
    console.log(data.toString());
});


// readFile의 결과물은 버퍼타입이다.
// 버퍼를 toString()를 이용해야 우리가 알 수 있는 언어로 변한다.


// 파일의 경로가 현재 코드파일이 있는 장소가 아니라, node명령어가 실행된 콘솔기준이라는 점이 중요하다. 
// 특히 폴더 내부에 들어 있는 파일을 실행할 때 경로 문제가 발생할 수 있다.

