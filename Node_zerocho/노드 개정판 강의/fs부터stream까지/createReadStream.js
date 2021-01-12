const fs = require('fs');

const readStream = fs.createReadStream('./readme3.txt', {highWaterMark:16});
const data = [];

readStream.on('data', (chunk) => {
    data.push(chunk);
    console.log('data :', chunk, chunk.length);
});

readStream.on('end', () => {
    console.log('end :', Buffer.concat(data).toString());
});

readStream.on('error', (err) => {
    console.log('error : ', err);
});

// 읽기 스트림
/*  

    1. 먼저 readStream으로 읽기 스트림을 만든다.
    2. 스트림통로가 있어야 데이터를 보낼 수 있다.
    3. {highWaterMark:16} 옵션은 버퍼의 크기를 나타낸다 16바이트로 설정되었다.
    (원래 기본값은 64KB이다.)
    
    4. readStream은 이벤트 리스너를 붙여서 사용한다.
    보통 data, end, error이벤트를 사용한다.
    data : 파일을 읽기가 시작되면 data 이벤트가 발생한다.
    error : 파일을 읽는 도중 에러가 발생하면 error이벤트가 발생한다.
    end : 파일을 다 읽으면 end이벤트가 발생한다.

    5. 예제에서는 미리 chunk데이터들을 받을 배열데이터를 하나 만들어 놓고 16kb씩 버퍼로 짤라서 보내고 있다.
    그 뒤 마지막에는 Buffer.concat()으로 모두 받은 배열을 합쳐서 다시 문자열로 만들어서 출력한다.
*/

