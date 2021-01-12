// Promise 는 콜백지옥을 탈출하기 위해 만들어졌다.

const condition = true;            // true로 나오면 resolve 호출하고
                                   // false로 나오면 reject 호출
                                   // 중요한 점은 Promise가 응답의 실패/성공을 판단하는게 아니다.
                                   // 그냥 사용자가 잘 생각해서 성공했다고 치면 resolve함수를 호출 하겠끔
                                   // 로직을 구성해줘야 한다. 
const promise = new Promise((resolve, reject) =>{
    if(condition){
        resolve('성공');            // resolve 함수가 실행되면 then으로 이어진다. 
    }else{
        reject('실패');             // reject 함수가 실행되면 catch로 이어진다.
    }
})

// 중간에 다른 로직 코드가들어가도 됨

promise
    .then((message) => {           // 여기서 첫번째 파라미터messge는 요청후 받아온 값이다. 프로미스가 바로 여기다가
                                   // 요청에 리턴된 데이터를 담는다. 
        console.log(message);
    })

    .catch((error) => {
        console.error(error);
    });




