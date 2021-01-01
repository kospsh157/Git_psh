
// fs 모듈의 비동기 메서드를 살펴보았다.
// 비동기 메서드들은 백그라운드에서 실행되고, 실행된 후에는 다시 메인 스레드의 콜백 함수나 프로미스의 then부분이 실행된다.
// 이때 fs 메서드를 여러 번 실행해도 백그라운드에서 동시에 처리되는데, 바로 스레드풀이 있기 때문이다.
// fs 외에도 내부적으로 스레드풀을 사용하는 모듈로는 crypto, zlib, dns.lookup등이 있다.
// 다음 예제에서 crypto.pbkdf2 메서드로 스레드풀의 존재를 확인해보자

const crypto = require('crypto');

const pass = 'pass';
const salt = 'salt';
const start = Date.now();

crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('1:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('2:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('3:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('4:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('5:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('6:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('7:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('8:', Date.now() - start);
});


// 스레드풀이 기본값이 4개이다. 그래서 위 코드를 실행하면 걸리는 시간이 1~4, 5~8까지 4개씩 비슷한 시간에 처리된다.
// 터미널에서 UV_THREADPOOL_SIZE = 1 로 설정하고 실행하면, 작업이 하나씩 순서대로 실행될 것이다.
// 자신의 코어가 4개면 4개로 하는게 좋고, 자신의 코어가 8개면 8개로 해도 좋다. 
