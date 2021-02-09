// 비동기 메서드를 사용하면서도 작동 순서를 지키고 싶을 때

const fs = require('fs');

console.log('시작');

fs.readFile('./readme2.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log('1번', data.toString());
    
    // 콜백 함수 안에다 다음 fs메서드를 쓴다.
    fs.readFile('./readme2.txt', (err, data) => {
        if(err){
            throw err;
        }
        console.log('2번', data.toString());
        
        // 또 콜백 함수 안에다 다음 fs 메서드를 쓴다.
        fs.readFile('./readme2.txt', (err, data) => {
            if(err){
                throw err;
            }
            console.log('3번', data.toString());

            console.log('끝');
        });
    });
});


// 단 이런식으로 순서를 유지했다간 콜백지옥이 일어난다. 
// 위는 단지 3개 뿐이다. 
// 10개를 하면? 들여쓰기 낭비 장난 아니다. 코드 읽기도 짜증나고
// 이런 콜백/지옥은 Promise나 async/await으로 어느정도는 해결 가능하다. 다음 asyncOrderPromise.js를 참고하자
