// createReadStream() 같은 내부 메서드들은 이미 내부적으로 알아서 'data'나 'end'이벤트 등을 호출 하지만,
// 우리가 직접 이벤트를 만들어서 호출해줄 수 있다.
// 다음 예제를 통해서 이벤트를 만들고, 호출하고, 삭제해봅시다.


// 이벤트에 대한 나의 생각
/*
    0. 이벤트 === 콜백 일 수도 있다 즉 어떤 이벤트가 발생해서 콜백이 일어나는 개념으로 보는게 아니라
    어떤 이벤트가 호출이 되면, 그에 대한 이벤트로서, 콜백함수가 실행되는 것이다.
    이렇게 생각하면 왜 이벤트를 정의하는 부분이 보이지 않는지 알 수 있다. 리스너를 만드는 행위 자체가 이벤트를 만드는 행위
    이니깐.

    1. 이벤트는 리스너, 이벤트, 콜백(이벤트에 대한 반응, 핸들러), 이벤트발생, 이벤트가 일어나는 공간 이렇게 5가지로 구성되어 있다.
    2. 이벤트는 문자열의 이름으로 구분된다.
    3. 내부 메서드를 사용할때는 이벤트가 이미 정의되어 있고, 그에 대한 리스너도 등록되어 있다. 따라서 나는 이벤트의 문자열 '이름'만 알면된다.
    4. 여기서는 이벤트를 만드는 거는 없다. >> 이벤트를 정의하는 행위는 없는 것일지도 모른다.
    5. 이벤트 리스너를 만들고, 해당 이벤트를 발생시켜서 콜백을 호출시키는 과정을 보여준다.

*/
const EventEmitter = require('events');

const myEvent = new EventEmitter();
myEvent.addListener('event1', () => {
    console.log('이벤트1');
});

myEvent.on('event2', () => {
    console.log('이벤트2');
});

myEvent.on('event2', () => {
    console.log('이벤트2 추가');
});

myEvent.once('event3', () => {
    console.log('이벤트3');
});

myEvent.emit('event1');     // 이벤트 호출
myEvent.emit('event2');     // 이벤트 호출

myEvent.emit('event3');     // 이벤트 호출
myEvent.emit('event3');     // 실행 안 됨

myEvent.on('event4', () => {
    console.log('이벤트4');
});
myEvent.removeAllLiteners('event4');
myEvent.emit('event4');     // 실행 안 됨

const listener = () => {
    console.log('이벤트5');
};

myEvent.on('event5', listener);
myEvent.removeListener('event5', listener);
myEvent.emit('event5');     // 실행 안 됨

console.log(myEvent.listenerCount('event2'));

// 위 코드 부가 설명
/*
    1. .on() 과 .addListener() 메서드는 동일한 기능을 한다.
    2. .on(이벤트명, 콜백) : 이벤트이름과 이벤트발생 시의 콜백을 연결한다.
    3. emit(이벤트명) : 이벤트를 호출한다. 이벤트 이름을 인수로 넣으면 미리 등록한 이벤트 콜백이 실행된다.
    4. once(이벤트명, 콜백) :   한 번만 실행되는 이벤트이다. 한번만 실행되고 더 이상 실행되지 않는다.
    5. removeAllListener(이벤트명) : 이벤트에 연결된 모든 이벤트 리스너를 제거한다.
    6. removeListener(이벤트명, 리스너) :   이벤트에 연결된 리스너를 하나씩 제거한다.
    인수에 리스너를 꼭 넣어야 한다. 
    7. off(이벤트명, 콜백) :    노드 10버전에서 추가된 메서드로, removeListener와 기능이 같다.
    8. listenerCount(이벤트명) :    현재 리스너가 몇 개 연결되어 있는지 확인한다.
*/


// 리스너를 콜백 함수와 똑같이 봐도 될 것 같다.
// 따라서 필요한 구성 개념은 
// 1. 리스너 (콜백함수), 2. 이벤트(리스너 작성시 같이 작성됨), 3. 이벤트 발생( =이벤트 호출)