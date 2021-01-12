const fs = require('fs');

console.log('시작');

let data = fs.readFileSync('./readme2.txt');
console.log('1번', data.toString());
let data2 = fs.readFileSync('./readme2.txt');
console.log('2번', data2.toString());
let data3 = fs.readFileSync('./readme2.txt');
console.log('3번', data3.toString());

console.log('끝');

// 위를 실행해보면 async.js 와는 다르게, 늘 일정한 순서대로 나오는 것을 알 수 있다. 
// readFile() 메서드는 일반적으로 비동기메서드이나 이렇게 Sync를 붙인 메서드도 지원하고 있다. 

// 잘 보면 동기메서드이기 때문에 콜백함수를 쓰지 않는다. 
// readFile() 메서드 함수에서는 두 번째 파라미터로 콜백함수를 쓴다. (읽어온 데이터가 완료되면 콜백으로 받아서 사용하는 방식)

// 일반적으로 이 동기 메서드를 사용할 일은 거의 없다. 효율적으로 너무 떨어지기 때문이다. 
// 백그라운드는 여러개의 fs메서드를 동시에 실행할 수 있는데, 동기적으로 사용하면 그마저도 한번에 하나씩 밖에 못 쓰고
// 메인 쓰레드 또한 백그라운드가 결과를 리턴할 때 까지 다음 단계로 넘어 가지 않으므로, 비효율적이다.
