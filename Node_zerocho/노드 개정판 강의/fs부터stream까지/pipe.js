const fs = require('fs');

const readStream = fs.createReadStream('readme4.txt');
const writeStream = fs.createWriteStream('writeme3.txt');
readStream.pipe(writeStream);   // . 앞에 있는 것이 파이프를 타고 파라미터 쪽으로 이어진다. 


// 설명
// 위를 실행하면 readme4.txt와 똑같은 내용의 writeme3.txt.가 생성된다.
// 두 개의 스트림 사이를 pipe메서드로 연결하면 저절로 데이터가 writeStream으로 넘어간다.
// 따로 on('data')나 writeStream.write메서드를 사용하지 않아도 된다.
// 노드 8.5 버전이 나오기 전까지는 이 방식으로 파일을 복사하곤 했다.
// 또한 pipe는 스트림 사이에 여러 번 연결 할 수 있다. gzip.js 파일을 보자.
