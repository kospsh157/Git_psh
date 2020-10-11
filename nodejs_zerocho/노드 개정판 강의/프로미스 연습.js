// 프로미스 연습

// 1. new Promise() 로 정의한다.
// 2. 안에 콜백함수로 resolve, reject() 함수를 넣어준다.
// 3. 프로미스로 해야할 일을 안에 정의하거나 필요한 함수들을 호출해서 일을 시킨다.
// 4. then() 함수로 연결시켜서 결과값을 받아온다.

const promise = new Promise(function(resolve, reject){
    $.get('url주소를 적고', (response)=>{
        resolve(response);              // 결과값을 resolve()를 사용해 저장한다고 생각하자 일단.
                                        // 이것은 사용자가 로직에 맞게 성공하면 resolve()를 호출하고
                                        // 실패하면 reject()를 호출하겠끔 알아서 해줘야한다. 
                                        // promise()가 완전히 자동으로 해주는게 아니다.
    });
})

promise.then((response)=>{              // resolve()로 호출되면 then()함수로 이어진다. 그결과값도 then의 콜백으로 같이.
    console.log(response);
})
.catch(error =>{                        // 만약 reject()를 호출하면 catch()함수로 이어진다. 
    console.error(error);
})





