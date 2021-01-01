const fs = require('fs');

// 파일 경로를 쓸 때 주의점은 현재 경로의 시작 위치가 node프로세스를 시작하는 콘솔 위치가 시작점이 된다.
fs.readFile('./readme.txt', (err, data) => {
    if( err ){
        throw err;
    }
    console.log(data);
    console.log(data.toString());
});
 
// readFile 함수는 문자열을 버퍼 형태로 다룬다. 따라서 toString() 으로 변환하지 않는 이상 버퍼의 데이터를 보게된다.



