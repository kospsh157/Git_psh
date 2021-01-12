const crypto = require('crypto');

const pass = 'pass';
const salt = 'salt';
const start = Date.now();

// 해쉬화 100만번 계산 및 sha512는 부담스러운 작업임 
// 이것으로 백그라운드 규칙을 볼 수 있음 


// 쓰레드풀이 기본으로는 4개로 설정되어 있다.
// 그 말은, 백그라운드에서 4개씩 동시에 연산이 된다는 뜻이다.
// 이걸 알아보기 위해 8개의 다음 크립토를 실행해 보면 알 수 있다.
// 4개씩 거의 비슷하게 작업이 완료된다.
// 따라서 4개씩 동시에 연산이 된다는 것을 유추 할 수 있다.

crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('1', Date.now() - start);    
})

crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('2', Date.now() - start);    
})

crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('3', Date.now() - start);    
})

crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('4', Date.now() - start);    
})

crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('5', Date.now() - start);    
})

crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('6', Date.now() - start);    
})

crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('7', Date.now() - start);    
})

crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
    console.log('8', Date.now() - start);    
})


// set UV_THREADPOOL_SIZE = 8 으로 8개로 기본값을 바꿀 수 있다. 
// 현재 자기 코어갯수메 맞게 조절해주면 된다.

