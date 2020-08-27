// process 객체 사용하기
// 현재 실행되고 있는 노드 프로세스에 대한 정보를 담고 있음


process.version

console.log(process.version)  // 현재 노드 버전 

console.log(process.arch) // 프로세서 아키텍쳐 정보

console.log(process.platform) // 운영체제 정보

console.log(process.pid) // 현재 프로세스의 아이디  

console.log(process.execPath) // 노드의 경로입니다. // 노드 실행 파일의 경로를 말하느게 아니라 노드 설치경로를 말해주는 거임. 



// 여기서 부터 중요한 process.env 
/*
    process.env 에는 중요한 API 키를 저장하는 곳으로 사용된다. 
    서버나 데이터 베이스에 직접 서비스키를 저장한은 것은 위험하므로 여기다가 저장한다. 

    저장 방식은 나중에 9장에서 dotenv 를 배울때 배운다.

*/

const secretId = process.env.SECRET_ID; // 이런식으로 불러다가 쓰고 SECRET_ID 를 넣는 방법은 운영체제마다 다르고 통일성 있는 방법은 9장에서 배운다.



// process.nextTick(콜백)

// 이벤트 루프가 다른 콜백 함수들보다 nextTick 의 콜백함수를 우선적으로 처리한다. 

setImmediate( ()=>{
    console.log('immediate');

})

process.nextTick(()=>{
    console.log('nextTick');
})

setTimeout(()=>{
    console.log('timeout')

}, 0)

// 추가로, Promise도  다른 콜백들 보다 우선시되고, 이런 것들은 따로 마이크로태스크 큐에서 따로 돈다. 

Promise.resolve().then(()=> console.log('promise'));


// process.nextTick를 더 선호하는 개발자도 있다. 비동기 처리를 할 때, 그러나 이런 마이크로태스크를 너무 많이 재귀호출하게 되면
// 이벤트 루프는 다른 콜백함수보다 마이크로태스크 큐에 있는 콜백함수들을 더 중요시 여기어 다른 콜백함수들이 실행되지 않을 수 있다.


// process.exit(코드) // 실쟁 중인 노드 프로세스를 종료한다. 서버에서 하면 서버가 멈추므로 서버에서는 거의 사용하지 않는다.
// 독립적인 프로그램에서만 수동으로 노드를 멈추게 하기 위해서 사용된다. 

let i = 1;
setInterval(()=> {
    if(i === 5){
        console.log('종료');
        process.exit(1);   // 아무것도 없거나 인자 값이 0이면 정상종료이고 1을 넣으면 에러로 인한 비정상 종료로 종료하게 된다.
    }
    console.log(i);
    i += 1;

}, 1000)

