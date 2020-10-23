// 노드 워커 쓰레드 
// 노드에서 다중 쓰레드를 사용하는 경우는 극히 드물고 암호화하는 작업이나 cpu를 극도로 효율적으로 써야 할 때 사용한다.
// 노드에서 멀티 쓰레드를 사용하는 방법은 어렵다. 원래 멀티 쓰레드 코딩 자체가 어렵다.
// 노드에서는 이 워커 쓰레드로 멀티 쓰레드를 구현한다.

// 다음은 기본적인 워커쓰레드와 메인쓰레드의 사용법이다. 
// 워커쓰레드는 메인쓰레드아 같이 쓰이며 메인쓰레드로부터 일을 할당 받고 그 결과물을 다시 메인쓰레드로 전달한다.
// 물론 개발자가 코딩으로 이 모든 작업을 해줘야한다. 업무 분배 -> 결과 받고 -> 결과 모아서 종합 
const {isMainThread, Worker, parentPort, workerDate} = require('worker_threads');

// 기본은 if else 문으로 부터 시작된다. 
// 메인을 if 문에, worker가 else문에 있다.
if(isMainThread){
    const worker = new Worker(__filename);  // 현재는 worker부분인 else 문이 같은 파일에 있으므로 현재 파일 이름을적어준다.

    // 다음 함수는 워커로부터 인벤트가 발생하면 핸들링하는 함수인것 같다.
    worker.on('masagge',  (value) => console.log('워커로부터', value));
    
    // 워커로부터 결과물이 도착하고 종료를 해야 할 때
    worker.on('eixt', () => console.log("워커 끝"));

    // 워커로 메시지를 보낸다.
    worker.postMessage('ping');
}else{
    // 부모로부터 일어나는 이벤트들에 대해 받는다.
    parentPort.on('message', (value) => {
        // 부모로 부터 받은 메세지를 출력한다.
        console.log('부모로부터', value);
        
        // 부모로 메세지(결과물)를 보낸다.
        parentPort.postMessage('pong');

        // 워커가 할 일은 다 했다면, 스스로 종료한다.
        parentPort.close();
    });
}







if(isMainThread){
    // 이렇게 해서 각각의 워커를 만들 수도 있고,
    // set타입을 하나 만들어서 관리 할 수 있다.
    const worker1 = new Worker(__filename); 
    const worker2 = new Worker(__filename); 
    const worker3 = new Worker(__filename);  

    const threads = new Set();      // 참고로 set는 순서가 없지만 중복을 허용하지 안는다. (= 자동으로 중복검사)
    threads.add(new Worker('__filename', {
        workerData: {start : 1},    // 초기 데이터가 필요하다면 처음 생성할 때 부터 이렇게 초기 데이터를 집어넣어줄 수 있다.
    }));

    // 워커를 하나 더 만들어 보자 현재 지금 set 안에 만들어서 넣는거다.
    threads.add(new Worker('__filename', {
        workerData: {start : 2},    
    }));

    // set 타입은 반복문을 이렇게 돌려서 사용하면 된다.
    for(let worker of threads){
        // 여기다가 워커들의 이벤트 리스너를 달아준다.
        worker.on('masagge',  (value) => console.log('워커로부터', value));
        worker.on('eixt', () => {
            // 워커들이 할 일은 다 끝내면 set에서 워커를 삭제 시키자
            threads.delete(worker);
            if(threads.size === 0){
                console.log("모든 워커 작업 끝");
            }
            

        });


    }


    worker.on('masagge',  (value) => console.log('워커로부터', value));
    worker.on('eixt', () => console.log("워커 끝"));
    worker.postMessage('ping');
}else{
    const data = workerDate.start;
    worker.postMessage(data.start + 1);
}



// 결론 멀티쓰레드는 다른 언어로 하자. 노드로는 싱글쓰레드로만 하자.
// 다른 언어로는 어떻게 하는가? 
// child_process를 사용한다. 이걸 사용하면 노드에게 직접 os의 터미널을 사용해서 
// 파이썬이나 go에게 명령어를 내려서 그 언어들을 사용 할 수 있다. 자세한건 검색해서 따로 공부하자 