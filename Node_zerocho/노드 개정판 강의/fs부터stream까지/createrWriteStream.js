// 스트림으로 파일쓰기를 해보자

const fs = require('fs');

const writeStream = fs.createWriteStream('./writeme2-1.txt');
writeStream.on('finish', () => {
    console.log('파일 쓰기 완료');
});

writeStream.write('이 글을 씁니다.\n');
writeStream.write('한 번 더 씁니다.');
writeStream.end();

// 설명
// 1. createWriteStream으로 쓰기 스트림을 만든다. 첫번째 인수는 파일명 두 번째 인수는 옵션 여기선 사용하지 않았음.
// 2. finish 이벤트 리스너 사용. 파일 쓰기가 종료되면 콜백 함수가 호출된다.
// 3. writeStream에서 제공하는 write메서드로 넣을 데이터를 문자열로 쓸 수 있다.
// 4. end메서드로 종료를 알리고, 이때 finish 이벤트가 발생된다.
// 5. createReadStream으로 파일을 읽고 그 스트림을 전달 받아 createWriteStream으로 파일을 쓸 수 있다.(파일복사와 같다.)
// 6. 스트림끼리 연결하는 것을 파이핑한다 라고 표현한다.
// 파이핑은 pipe.js 에서 자세하게 알아보자.