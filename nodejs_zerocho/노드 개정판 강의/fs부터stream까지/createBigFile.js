const fs = require('fs');

const file = fs.createWriteStream('./big.txt');

for (let i = 0; i <= 10_000_000; i++){  // 0 3개 마다 _언더바를 붙여서 알아보기 쉽게 할 수 있다.
    file.write('안녕하세요. 엄청나게 큰 파일을 만들어 볼 것입니다. 각오 단단히 하세요!\n');
}

file.end();
// 우선 큰 파일을 만들고 
// buffer-memory.js 에서 big을 big2.txt로 복사해보자.