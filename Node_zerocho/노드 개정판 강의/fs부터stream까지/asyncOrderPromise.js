// 비동기 코드를 순서를 지키면서 써보자2
const fs = require('fs').promises;

console.log('시작');

fs.readFile('./readme2.txt')
    .then( (data) => {
        console.log('1번', data.toString());
        return fs.readFile('./readme2.txt');
    })
    .then( (data) => {
        console.log('2번', data.toString());
        return fs.readFile('./readme2.txt');
    })
    .then((data) => {
        console.log('3번', data.toString());
        console.log('끝');
    })
    .catch((err) => {        // data나 err은 미리 선언된 변수가 아니다, 그냥 첫 파라미터로 아무거나 넣으면 된다. 
        console.error(err);  // then(), catch() 메서드의 첫번째 파라미터는 무조건 받아온 데이터나 생긴 오류이다. 
    });
// 채이닝 기법을 통해 계속해서 then() 메서드로 받아서 순서를 지키고 있다. 
// return을 하지 않으면 다음 체인으로 data가 넘어가지 않기 때문에, 체인이 끊어진다. 