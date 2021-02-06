// cluster 모듈 
/*
    cluster모듈은 기본적으로 싱글 프로세스로 동작하는 노드가 cpu코어를 모두 사용할 수 있게
    해주는 모듈이다.

    포트를 공유하는 노드 프로세스를 여러 개 둘 수도 있으므로, 요청이 많이 들어왔을 때 병렬로 실행된 
    서버의 개수만큼 요청이 분산되게 할 수 있다. 

    예를 들어 코어가 여덟 개인 서버가 있을때, 노드는 보통 코어를 하나만 활용한다.
    하지만 cluster모듈을 설정하면 코어 하나당 노드 프로세스 하나가 돌아가게 할 수 있다.
    성능이 꼭 여덟 배가 되는 것은 아니지만 코어를 하나만 사용할 때에 비해 성능이 개선된다. 하지만, 장점만 있는 것은 아니다.
    메모리를 공유하지 못하는 등의 단점이 있다.
    또한 세션을 메모리에 저장하는 경우에는 문제가 될 수 있다. 이 문제는 레디스 서버를 도입하면 해결할 수 있다.

    다음은 서버를 클러스터링 하는 코드이다.
*/

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

console.log(cluster.isMaster);


if(cluster.isMaster) {
    console.log(`마스터 프로세스 아이디: ${process.pid}`);
    // cpu개수 만큼 워커를 생산
    for(let i = 0; i < numCPUs; i += 1){
        cluster.fork();
        console.log('여기가 보이나요?');
    }

    // 워커가 종료 되었을 때
    cluster.on('exit', (worker, code, signal) => {
        console.log(`${worker.process.pid} 번 워커가 종료되었습니다.`);
        console.log('code', code, 'signal', signal);
    });
}else {
    // 워커들이 포트에서 대기
    http.createServer((req, res)=>{
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        res.write('<h1>Hello Node!</h1>');
        res.end('<p> Hello Cluster!</p>');
        // 워커가 존재하는지 확인하기 위해 1초마다 강제 종료
        setTimeout( () => {
            process.exit(1);
        }, 1000);
    }).listen(8086);

    console.log(`${process.pid}번 워커 실행`);
}


// 설명 
/*  
    1. cluster.for()로 8번 반복되어 만들어졌다. (= 워커들을 8개 만든다.)
    2. 그 이후에는 같은 코드가 (프로세스가) 8번 반복되어 또 실행된다.
    3. 만들어진 프로세스는 자동으로 코드를 다 한번씩 실행한다.
    4. 따라서 8개의 코드가 반복 실행된다.
    5. clust.isMaster가 처음에는 true였다가, 그 이후에는 false가된다.
    그 이유는 처음에는 처음에는 cpu 코어 8개 중 임의 하나가 마스터 클러스터가 되고, 
    true가 되지만, 
    for문에서 cluster.fork() 를 8번 다 돈 순간 모든 cpu들이 다 워커로 변한 상태이므로, 더 이상 
    마스터클러스가 존재 하지 않기 때문에, false를 반환하는 것으로 예측된다.
*/



// cluster.fork()로 만일에 서버에 오류가 생겨 종료되어도 계속 클러스터를 생성해서 서버가 죽지는 않게하기
cluster.on('exit', (worker, code, signal) => {
    console.log('어떤 이유인지 모르나, 다음 워커가 종료됨');
    console.log(code, signal);
    // 다시 클러스터 하나 생성
    cluster.fork();
})
// 이렇게 하면 근본적인 오류 해결은 안되지만, 일단 서버가 죽는 것은 막을 수 있다.
// 이런것 보고 클러스터링을 적용한다 라고 한다.

// 실무에서는 pm2등의 모듈로 클러스터 기능을 사용한다.
