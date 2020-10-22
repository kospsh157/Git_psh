// 자바스크립트의 코드에서 비동기함수를 만나면 백그라운드로 보내고 
// 스택 호출에서는 다음 코드를 바로 실행한다. 
// 이와 같은 문제를 피하고자 콜백함수방식의 코딩이 나왔다.

const { getPackedSettings } = require("http2");

// 함수를 다음과 같이 정의한다.
function getData(callBackFunc){
    $.get("https//:요청주소",function(response){
        callBackFunc(response);
    });
};
/*
    1. 우선 getData()함수는 $.get()함수를 무조건 호출한다. 
    2. 그리고 그에 대한 response를 자신이 파라미터로 받은 함수의 파라미터로 다시 넣어서 호출한다. 
    3. 이 함수는 죽어도 위의 두 가지를 실행한다. 
    4. 따라서 getData() 함수의 파라미터로 익명함수(=콜백함수)를 넣어서 사용하면 
    5. 우선 $.get()함수를 무조건 실행하고 그 결과값을 받는다.
    6. 받은 결과값은 익명함수의 파라미터로 넣어서 그 익명함수를 호출한다.
*/

// 위에서 정의된 함수를 다음과 같이 호출해서 사용
getData(function(tableData){
    console.log(tableData);
});
// 위의 예시를 잘 보고 숙달해야한다. 콜백함수를 어떻게 정의하고 콜백함수가 왜 이런 방식으로 쓰이는지 
// 구조를 잘 파악하자. 
/*  
    1. 위의 함수 실행 순서는 다음과 같다.
    2. 우선 $.get() 함수로 요청을 하고 그 결과값을 받는다.
    3. 그 결과값을 다시 익명함수에 넣어서 호출한다.
    4. 위에서는 익명함수를 정의를 보면 익명함수에 들어오는 파라미터를 console.log() 함수로 출력한다.
    5. 따라서 3번에서 결과값을 익명함수의 파라미터로 넣어서 호출했으므로, 여기서는 그 결과값이 console.log() 함수로 출력된다.
*/


// 콜백 지옥을 경험해보자
$.get('url', function(response){
    parseValue(response, function(id){
        // parseValue함수가 할 일을 다하고 콜백함수를 호출한다.
        auth(id, function(result){
            // 여기에서도 auth가 할 일을 다하고 다시 콜백함수 호출
            display(result, function(text){
                // display함수가 할 일을 다하고 최종적으로 text를 리턴한다.
                console.log(text);
            });
        });
    });
});





// 위를 promise를 사용하지 않고 코딩적으로 콜백지옥을 풀면 다음과 같다.
// auth(), display(), parseValue() 함수는 이미 정의되어 있으며, 각각 역할은
// parseValue()는 요청해서 받은 그 결과값을 파싱해서 id를 구해오고
// auth()는 id를 받아서 인증을 하고 
// diplay()는 인증이 끝난 id를 그냥 출력하는 역할을 한다. 
function parseValueDone(id){
    auth(id, authDone);
}

function authDone(result){
    display(result, displayDone);
}

function displayDone(result){
    console.log(result);
}

$.get('url 주소',function(response){
    parseValue(response, parseValueDone);
})
// 콜백지옥을 푸는 요령은 콜백 때 썼던 익명함수를 ~done을 붙여서 새로운 함수로 다시 정의해주는 것이다.
// 따라서 정확히 콜백함수의 쓰인 익명함수의 수만큼 새로운 ~done 함수들이 필요하다.






myPromise( (resolve, reject, data) => {
    
    // 이번엔 getApi받아온 데이터를 다른 서버에 보내서 잘 갔나 응답도 받아봅시다.
    let result = 0;               // 우선 result 변수를 하나 잡고 여기에다 서버의 응답을 받아봅시다.
    postApi("https://어디가에요청.com/api", data).then(serverResult => {
        result = serverResult;    // 위의 result변수에다가 서버가 준 응답결과를 저장한다 칩시다.
                                  // 성공해서 서버에서 데이터를 잘 받았다 치면 1을 준다 치고, 실패하면 -1를 준다고 합시다.
    });
    // result의 내용물을 보면 1, 0, -1 에 따라 결과를 알 수 있겠죠?
    if(result) {
        resolve(result);          // 성공했으므로 resolve()함수를 호출해서 값을 저장해줍시다.
    }else{
        reject(new Error("0, -1 이든 쨋든 서버에서 데이터를 잘 받지 못했네요")); // 실패시 에러문구를 보여줍시다.
    }
    return result;
});




