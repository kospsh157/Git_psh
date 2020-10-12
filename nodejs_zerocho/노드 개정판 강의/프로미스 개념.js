// 프로미스 개념 설명

/*
    1. 콜백을 쓰지 않고 비동기 코드를 깔끔하게 처리 할 수 있도록 도와준다.
    2. 상태
        1. pending
        2. fulfilled or rejected
        3. Producer vs Consumer
    3. 정보 제공자와  정보 소비자
    


*/

// 프로미스는 파라미터로 엑셔큐터 콜백함수를 가진다. 이를 정의해줘야한다. 
// 그리고 그 콜백 함수 안에 해야할 일을 정의한면 된다.

// 정보 생산자 개념
const promise = new Promise((resolve, reject) =>{
    // 여기다가 해비한 작업들을 한다. 해비한 일들은 동기적으로 처리하면 다음 코드를 진행할 수 없으므로 비동기적으로 처리하는게
    // 좋다. 주로 네트워크 처리들이 이렇다.

    
    // 프로미스안에 있는 것들을 바로 실행되기 때문에 주의해야한다. 
    // 이를 주의하지 않으면 불필요한 네크워크 요청을 할 수 있다.
    
    console.log('doing something');
    resolve(response);               // 일이 잘 완료되면 데이터를 받아 저장한다. 
    reject(new Error('no network')); // 일이 잘 안되면 리젝트 함수를 호출해서 실패을 만든다. 
})

// 정보 소비자 개념
promise.then((value)=>{             // 성공해서 resolve() 호출 했을때만 가능
    console.log(value);
})
.catch((error) =>{                  // 실패해서 reject() 가 호출되었을 경우에만 
    console.log(error);
})
.finally(() =>{
    console.log('실패하든 성공하든 무조건 실행됨');
})



// chaining
const fetchNumber = new Promise(() => {
    setTimeout( () => {
        resolve(1), 1000
    });

})

fetchNumber
.then(num => num * 2)           // 순서대로 일을 하고 다음 then() 함수로 넘겨서 작업을 시킴
.then(num => num * 3)           // 여기서 num은 6임
                                // 꿀팀 화살표 함수에서 {}가 없다는 뜻은 return이 생략되었다는 뜻으로, 
                                // return이 되었다는 뜻임.
                                // 예외인 경우는 있는 ({x, y})와같이 향상된 객체문법으로 생략된 객체를 리턴했을 경우임.
.then(num => {                  // then으로 새로운 프로미스 객체도 만들어서 보낼 수 있음
    return new Promise( (resolve, reject) => {
        setTimeout( ()=> resolve(num - 1), 1000) // 6 - 1 = 5 
    })
})
.then(num => console.log(num))



// Error handling
const getHen = () =>
    new Promise( (resolve, reject) => {
        setTimeout(() => resolve('닭'), 1000);
    });
const getEgg = hen =>
    new Promise( (resolve, reject) => {
        setTimeout(() => resolve(`${hen} => egg`, 1000));
    });
const cook = egg => 
    new Promise ((resolve, reject) => {
        setTimeout(()=> resolve(`${egg} => cooked`), 1000);
    });


getHen()
.then( hen => getEgg(hen))          // 이런 경우 생략 가능 .then(getEgg)
.then( egg => cook(egg))            // .then(cook)
.then( meal => console.log(meal));  // .then(console.log)

// 위를 아래와 같이 생략해서 쓸 수 있음. 
// then()의 리턴값이 있고 그 값을 다시 다른 함수의 파라미터에 넣어서 리턴 시킬 때 축약할 수 있음
getHen()  // 한줄로하면 가독성이 나쁘므로 축약으로 쓸 때 최소한 이렇게 나누어서 작성하자
.then(getEgg)
.then(cook)
.then(console.log);


// 에러 핸들링
// 만약 위에서 닭에서 egg을 받아오는 중간 단계에서 실패가 일어났다면?

const getHen = () =>
    new Promise( (resolve, reject) => {
        setTimeout(() => resolve('닭'), 1000);
    });
const getEgg = hen =>
    new Promise( (resolve, reject) => {
        setTimeout(() => reject(new Error(`${hen} => egg`), 1000));  // 에러 발생
    });
const cook = egg => 
    new Promise ((resolve, reject) => {
        setTimeout(()=> resolve(`${egg} => cooked`), 1000);
    });

// 에러 처리 핸들링하기 
// 해당 then() 함수 바로 아래 .catch() 함수 작성하면 해당 then()함수의 실패시 오류를 핸들링 할 수 있다.

// 특히 실무에서는 이렇게 사용한다.
getHen()
.then(getEgg)
.catch( (error) => {
    return "달걀 대신 오리알";
})
.then(cook)
.catch( error => "요리 대신 백종원 소환!")
.then(console.log)
.catch( error => "console.log가 에러일 경우가 있나?")




 


