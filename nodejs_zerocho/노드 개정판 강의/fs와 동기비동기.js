// 노드의 파일 일고 쓰기

const fs = require('fs');
// 프로미스로 사용하고 싶다 라는 요청에 따라 fs는 프로미스로 사용할 수 있게 되었다.
// const fs = require('fs').promises     이렇게 뒤에 프로미스만 붙여주면 된다.


fs.readFile('./filename.txt', (error, data) => {        // 노드에서 콜백의 파라미터를 error, data 이다.
    if(error){
        throw error;
    }
    console.log(data);                // 바이너리 코드로 나온다. 
    console.log(data.toString());     // 문자열로 바뀌어서 나온다. (사람이 읽을 수 있음.)
});

// os 관련된 숨겨진 폴더에도 접근이 가능하니, 이 fs 객체를 다룰 때는 조심해야 한다. 혹은 내가 당할 수도 있으니 조심해야한다.


// 프로미스를 썼을 때 
fs.readFile('./text.txt')
    .then( (data) => {
        console.log(data);
        console.log(data.toString());
    })
    .catch( (err) => {
        throw err;
    })



// 이번엔 파일을 쓰고 생성하자 
fs.readFile('./write.txt', "파일이 없을 경우 새로 만들어버립니다. 두번째 인자로는 내용물이 들어가네요.")
    .then( () => {
       return fs.readFile('./write.txt'); // 프로미스이므로 순차적으로 위에서 만든 write.txt파일을 읽어올 수 있다.
    })
    .then( (data) => {
        console.log(data.toString());
    })
    .catch( (err) => {
        throw err;
    })


    



// 비동기/동기, 논블록킹/블록킹
// 노드에서는 거의 비동기면 논블록킹이고
// 동기면 블록킹으로 볼 수 있다. 100%는 아니지만 쉽게 이렇게 이해하자 

// 콜백을 사용하든 프로미스를 사용하든 이런 모든 비동기 작업들은 순서를 보장 할 수없다. 따라서 하나의 코드블럭을 마이크로 작업 하나
// 라고 생각한다면 이 마이크로 작업들은 모두 비동기로 작동하므로 순서를 보장 할 수 없음을 잘 기억하자. 
/*
    모든 콜백 함수들은 백그라운드로 넘어가고, 
    이 백그라운드에서 모든 콜백들은 동시에 실행된다.
    
    그리고 작업이 먼저 끝난 애들이 먼저 테스크큐로 이동되기 때문에 어떤것이 먼저 이동하는지 알 수 없다. 
*/



// 서버 시작 전에는 동기 관련 코드를 써도되고, (한번만 실행되고 다시는 실행되지 않는 함수들)
// 서버 시작 이후에는 절대로 동기관련 코드를 쓰면 안된다. 서버는 반드시 비동기로 운영되어야 한다. 
// 비동기인데 순서를 지키려면 가장 단순한 방법으로는 콜백핼 구조로 코드를 짜는 것이다.

// 그러면 비동기를 순서를 지켜서 콜백헬로코드를 짰을때와 동기식의 차이는 무엇인가?
// 둘 다 순서를 지킨다면 무슨 차이인가?
// 비동기는 모두 백드라운드에서 동시에 실행된다. 동기식 코드는 정확히 40번 실행하면 40번 돌리지만
// 비동기식은 40번 실행하면 최대 40번 이하로 실행된다. 즉 동시에 백그라운드에서 실행되므로, 시간이 더 절약된다는 것이다. 


// async를 사용해서 fs 를 짜는 법


const fs = require('fs').promises;

async function main() {
    const data = await fs.readFile('./readme.txt');
    console.log('1번', data.toString());

    data = await fs.readFile('./readme1.txt');
    console.log('2번', data.toString());

    data = await fs.readFile('./readme1.txt');
    console.log('3번', data.toString());

    data = await fs.readFile('./readme1.txt');
    console.log('4번', data.toString());
}
main();         // 위 코드는 순서대로 1번 부터 4번까지 실행된다.