const fs = require('fs');


console.log('before : ', process.memoryUsage().rss);

const readStream = fs.createReadStream('./big.txt');
const writeStream = fs.createWriteStream('./big3.txt');

readStream.pipe(writeStream);
readStream.on('end', () => {
    console.log('stream : ' , process.memoryUsage().rss);
});

// 설명 
// 스트림을 사용하면 메모리 사용량이 62메가 밖에 되지 않는다 이는 현재 스트림 버퍼의 용량이 62메가 이기 때문이다.
// 큰 파일을 조각내어 작은 버퍼 단위로 옮겼다. 동영상같은 큰 파일들을 전송할 때 이러한 이유로 스트림을 사용한다.

// 다음 fsCreate.js 파일에서 기타 fs 메서드에 대하여도 알아보자.