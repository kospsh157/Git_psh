// 스트림 파이프 사용 방법과 스트림 메모리 효율에 대해서 알아보자

// 리드스트림과 라이트 스트림을 파이프로 이어서 어떤 파일을 읽어서 바로 새로운 파일에 쓰기를 할 수 있다. 
const fs = require('fs');
const readStream = fs.createReadStream('./readSomething.txt', {highWaterMark:16});
const writeStream = fs.createWriteStream('./writeSomgthing.txt');
// 위에서 16비트로 쪼개서 하나씩 버퍼하나씩 라이트 스트림으로 보낸다. 
// 결국 파일 복사하는 것과 다름 없다. 
// 직관적으로 파이프 앞에 있는 것으로 부터 파이프의 파라미터쪽으로 데이터가 흐른다고 생각하면 된다.
readStream.pipe(writeStream)


// 압축하는 것도 있다. 
const zlib = require('zlib');
const fs = require('fs');

// 16비트씩 나눠서 읽고
const readStream = fs.createReadStream('./somethingRead.txt', {highWaterMark:16});
// 16비트씩 쓰기를 한다. 
const writeStream = fs.createWriteStream('./somethingWrite.txt.gz');
// 이건 압축하는 내장 라이브러리이다.
const zlibStream = zlib.createGzip();

// 사용법은 다음과 같다. 파이프도 이렇게 채인닝 형식으로 코드를 짤 수 있다.
readStream.pipe(zlibStream).pipe(writeStream);
// 이렇게 스트리밍으로 보내면 압축해서 압축형태로 보낼 수도 있다.






