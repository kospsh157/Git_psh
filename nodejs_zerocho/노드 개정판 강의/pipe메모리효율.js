const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('./readme3.txt', {highwaterMark:16}); // 16바이트씩 읽어서 
const zlibStream = zlib.createGzip();                                        // 여기다가 쓴다.
const writeStream = fs.createWriteStream('./write4.txt.gz');

// Stream을 지원하는 객체끼리는 pipe를 지원한다.
// 파이핑을 해서 계속 스트림 객체를 다른 곳으로 보낼 수 있다.
readStream.pipe(zlibStream).pipe(writeStream);
// 16바이트씩 읽기하고 압축하고 쓴다. 








