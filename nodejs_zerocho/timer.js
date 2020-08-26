


// setTimeout(콜백 함수,  밀리초);  밀리초 후에 콜백함수를 실행한다. (정확한 시간이 보장되지는 않지만 최소한, 밀리초 전에 실행되지는 않는다.)

// setInterval(콜백 함수, 밀리초);  밀리초마다 콜백함수를 반복하여 실행한다.

// setImmediate(콜백 함수); 콜백 함수를 즉시 실행한다. 

// 기본적으로 set함수들은 아이디를 반환하는데 그 반환값을 이용하여 clearTimeout(아이디) 하면 setTimeout()를 취소 할 수 있다. 

console.time();
const immediateID = setImmediate(()=>console.log('과연 이것이 실행될까?')) 
console.log("과연 어떤 게 더 먼저 출력 될까?");
console.log("과연 어떤 게 더 먼저 출력 될까?");
console.log("과연 어떤 게 더 먼저 출력 될까?");
console.log("과연 어떤 게 더 먼저 출력 될까?");
console.log("과연 어떤 게 더 먼저 출력 될까?");
clearImmediate(immediateID);
console.timeEnd();

// setImmediate() 함수라 할 지라도 일단 이벤트 루프를 통해서 실행되기 때문에 console.log 보다도 느리며, 나중에 오는 clear함수때문에
// 나오지도 않는다. 
