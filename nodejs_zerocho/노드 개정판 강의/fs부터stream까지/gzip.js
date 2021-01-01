const zlib = require('zlib');
const fs = require('fs');

const readStream = fs.createReadStream('./readme4.txt');
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./readme4.txt.gz');
readStream.pipe(zlibStream).pipe(writeStream);
// readme4.txt가 readStream을 타고 파이프를 통해 zlibStream으로 간다.
// 그리고 또 파이프를 타고 writeStream을 통해서 readme4.txt.gz으로 압축이 되어 간다. 

// readFile 메서드는 전체 파일을 모두 버퍼에 저장하지만, 
// createReadStream 메서드는 부분으로 나눠서 저장하고 읽는다. 

// 이 두 메서드의 메모리 사용량이 얼마나 다른지 createBigFile.js 에서 알아보자.

