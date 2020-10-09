// 에이씽크 & 어웨잇은 프로미스를 좀 더 간단하게 쓰기 위해서 생겨난 문법이다.

// 예전에는 await 을 쓰려면 항상 async가 붙어있는 함수 안에만 써야 했다.
// 하지만 이제는 단독으로 await을 사용 할 수 있다. 

// 다음과 같이 async 함수에서 return 한 결과물들은 반드시 then() 함수로 받아야 한다. 
// (async await 은 프로미스 기반이므로, 당연한 결과이다.)

const promise = new Promise(...);
promise.then((result) => {...});
// 위의 코드에서 then 구문을 이렇게 쓸 수 있다.
const result = await promise();

// 어씽크 함수에서 리턴되는 값은 그냥 사용할 수 없고 then으로 받아서 써야한다. 
async function main(){ 
    const result2 = await promise();
    return result2;
}

main().then((result2) => {
    console.log(result2);
})

// 또한 주의점으로 await을 쓰면 reject()가 없어서 try catch문으로 감싸서 요청에 실패했을 경우도 대비하는게 좋다.

// for await 구문을 사용하면 then()을 알아서 붙여서 반복문으로 돌려서 사용한다. 






