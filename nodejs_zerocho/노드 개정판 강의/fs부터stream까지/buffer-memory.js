const fs = require('fs');

console.log('before : ', process.memoryUsage().rss);

const data1 = fs.readFileSync('./big.txt');
fs.writeFileSync('./big2.txt', data1);

console.log('after : ', process.memoryUsage().rss); // 단위 byte로 현재 메모리 사용량을 나타낸다.
// 8 000 000 이면 8메가, 18 000 000 이면 18메가 , 1 000 000 000 이면 1기가,  10 000 000 000 이면 10기가 이다.

// 설명
// 위 코드를 돌려보면 writeFileSync 를 돌리기 전에는 18메가 였다가 돌린 후에는 1기가가 넘는 메모리 사용량을 볼 수 있다.
// 그 이유는 1gb 의 파일을 복사하기 위해 메모리에 파일을 모두 올려둔 후 writeFileSync를 수행했기 때문이다.

// 이번에는 스트림을 사용하여 파일을 big3.txt로 복사해보자 
