// 스트림은 비동기 코드이다. 그리고 이벤트 리스너를 붙여서 사용한다.
// 그렇다면 리스너를 안 붙여도 작동은 한다는 의미 아닐까?

const fs = require('fs');

const readStream = fs.createReadStream('./readme2.txt');
const writeStream = fs.createWriteStream('./writeme4.txt');

const value = readStream().writeStream()

readStream.on('end', () => {
    console.log('읽기 스트림을 생성하였습니다.');
});

readStream.on('data', (chunk) => {
    console.log(chunk.toString());
    
})


readStream.on('error', (err) => {
    console.error(err);
})

// data 리스너를 안들어 주지 않으면, chunk에 접근 할 수 없다. 

