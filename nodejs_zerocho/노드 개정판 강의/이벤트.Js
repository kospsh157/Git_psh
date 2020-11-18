const EventEmitter = require('events');

// 이벤트 리스너 객체 생성
const myEvent = new EventEmitter();

// 이밴트 리스터에 각종 이벤트의 콜백함수를 등록
myEvent.addListener('event1', () => {
    console.log('이벤트 1');
})

myEvent.on('event2', () => {
    console.log('이벤트2 추가');
})

myEvent.on('event3', () => {
    console.log('이벤트 2');
})

myEvent.once('event3', () => {
    console.log('이벤트 3');
}); // 한번만 실행됨


myEvent.emit('event1'); // 이벤트 정상 호출
myEvent.emit('event2'); // 이벤트 정상 호출

myEvent.emit('event3'); // 이벤트 정상 호출
myEvent.emit('event3'); // 리스너가 once 이므로 실행안됨


myEvent.removeAllListeners('event4');
myEvent.emit('event4'); // 실행 안 됨
// removeAllListeners('이벤트명') 메서드는 해당 이벤트에 대한 모든 리스너들을 삭제한다. 

// 리스너 하나만 지우는 메서드도 있다. 하지만 리스너의 변수명을 2번째 인자로 줘야한다. 당연하다. 뭔지 구분을 해야 하니깐.
const listener = () => { console.log('이벤트5')};
myEvent.removeListenser('event5', listener);
myEvent.emit('event5') // 실행 안 됨


// 리스너 확인해보기
console.log(myEvent.listenerCount('event2')); // 콜백함수가 몇개가 등록되어 있는지 숫자로 알려줌. 2개로 나온다.


// 