// 타이머 관련 내장 함수 
// 이들은 모두 백그라운드로 가서 동시에 실행되는 장점이자 단점이 있다.


setTimeout();       // 지정된 시간 후에 콜백 함수 실행
setInterval();      // 지정된 주기 동안  계속해서 콜백 함수 실행
setImmediate();     // 바로 콜백함수 실행


// 사용 예시 
const timeout = setTimeout(function(){
    console.log("1.5초 후에 실행")
}, 1500);

const interval = setInterval( ()=> {
    console.log("1.5초 마다 실행")
}, 1500);

const immediate = setImmediate( () => console.log("즉시 실행"));

// 변수에 담아서 저장하는 이유는 각각 clear함수들을 사용하기 위해선 변수에 저장해야함
clearTimeout(timeout);
clearInterval(interval);
clearImmediate(immediate);


// immediate 함수도 일단은 백그라운드로 넘어가서실행되기 때문에 즉시실행이라도, 이벤트큐에 할 일들이 많이 쌓여있꺼나
// 그러면 즉시 실행이 되지 않는다. 따라서 그 전에 clear함수가 작동되면 삭제된다. 




// 타이머 관련 함수 중에서 모두 백그라운드로 넘어가는데 순서와 상관없이 먼저 실행되는 규칙이있음
const timeout = setTimeout(()=> console.log("어는것이 먼저 나올까"),0);
const immediate = setImmediate( ()=> console.log("어는것이 실행될까"));
process.nextTick( ()=>console.log("어느것이 먼저 실행될려나"));
Promise.resolve().then( () => console.log("이것이 가장 먼저 실행됨"));
// 프로미스와 nextTick()은 둘 다 마이크로 테스트큐에서 실행되므로, 코드상으로 먼저 쓰여진 것이 먼저 실행된다.
// 하지만 이 둘은 나머지 둘 보다 항상 먼저 실행된다. 

// setTimeout() 과 immediate() 함수는 둘 중에 누가 먼저 실행될지 파악하기 까다롭다.
// 그래서 만약에 즉시 실행히 필요한 거면 setTimeout()을 쓰지말고 immediate()을 쓰는 걸로 통일하자 그래야 순서파악이된다. 
