// 다음은 스트리밍으로 이용해서 큰 파일을 만드는 예제이다.

// 참고로 다음의 코드를 돌리면 약 1기각 정도의 텍스트 파일이 생긴다.
const fs = require('fs');
const file = fs.createWriteStream('./bigText.txt');

for (let i =0; i <= 10_000_000; i++){
    file.write("엄청나게 큰 파일을 한 번 만들어봅시다.");   
}

file.end();



// 만들어다고 치고 버퍼형태방식과 스트리밍 방식의 파일복사 효율을 직접 따져보자 
// 우선 버퍼형태코드 
const fs = require('fs')

// 메모리 효율을 알아보기 위한 코드
console.log('before :', process.memoryUsage().rss); // 현재 메모리 사용량을 보여준다.
// 큰 파일을 읽고 
const data1 = fs.readFileSync('./BigText.txt');
// 다시 다른 파일에 쓰자 참고로 Sync가 붙는 함수들은 동기적으로 처리한다는 뜻이다.
fs.writeFileSync('./BigTexgt2.txt');

console.log('buffer:', process.memoryUsage().rss);

// 이걸 실행하면 약 19 메가 바이트 사용량이던것이  1기가 바이트 사용량으로 늘어난 것을 볼 수 있다. 
// 이러면 서버가 금방 죽어버린다. 



// 다음은 스트리밍 방식의 메모리 사용량을 알아보자
const fs = require('fs');

console.log('before:', process.memoryUsage().rss);
// 스크리밍 방식으로 읽고
const readStream = fs.createReadStream('./BigText.txt');
// 쓰자
const writeStream = fs.createWriteStream('./BigText3.txt');
// 파이핑을 통해서 버퍼단위로 보내고 쓴다. 
readStream.pipe(writeStream);
// 그리고 파이핑이 끝나면 바로 메모리 사용량을 알아보자
readStream.on('end', () => {
    console.log('stream:', process.memoryUsage().rss);
})

// 메모리 사용량을 확인해보면 약 16매가를 더 사용한 것으로보인다. 위에서 버퍼는 1기가나 더 사용했는데 훨씬 효율성이다. 
// 같은 파일을 읽고 쓰는데도 훨씬 더 적은 메모리를 사용한다.


// 추가로, fs에는 유용한 메소드들이 더 있는데 
fs.existsSync();    // 파일이나 폴더가 존재하는지 확인해주는 함수
fs.stat();          // 해당 파일이 일반 파일인지 폴더 인지 알려주는 함수








