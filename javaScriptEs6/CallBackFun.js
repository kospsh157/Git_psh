// 기존의 정통적인 콜백 사용예
function getData(callbackFunc) {
  $.get("https://domain.com/products/1", function (response) {
    callbackFunc(response) // 서버에서 받은 데이터 response를 callbackFunc() 함수에 넘겨줌
  })
}

getData(function (tableData) {
  console.log(tableData) // $.get()의 response 값이 tableData에 전달됨
})

// 위에 일단 getData 함수를 선언하고 그 다음 절에서 getData 를 쓰는 방법에 주목해라
// getData는 아작스 요청으로 받은 데이터를 불러오는 역할을 하는 함수이다 따라서 반드시 아작스 요청이 먼저 성공적으로 끝나야 한다.
// 이것을 위해 콜백 함수 구조를 통해서 getData함수를 실행하는 것이다.
// 이해가안된다면, 먼저 크게 구조를 생각해보자 콜백함수는 '순서'를 지키기위한 일종의 꼼수이다.
// 어떤 함수 인자에 함수가 있다면, 그 함수를 실행하기 위해선 그 함수 파라미터에 있는 함수를 먼저 실행해야 한다.
// 이런식으로 순서를 지키게 만드는 것이다.

// 원래 콜백함수를 쓰는 이유는 다음과 같은 문제가 발생하기 때문이다.
function getData() {
  var tableData
  $.get("https://domain.com/products/1", function (response) {
    tableData = response
  })
  return tableData //get 구문에서 시간이 걸리기 때문에 바로 리턴문으로 이어진다 그래서 tableData에는 아직 값이 들어가 있지 않다.
}
console.log(getData()) // undefined

function getdata(callbackF) {
  $.get("https://abc", function (res) {
    callbackF(res)
  })
}

// 다음은 지옥의 콜백함수 예시이다. 직접 작성하면서 이해해라.
$.get("url", function (response) {
  parseValue(response, function (id) {
    auth(id, function (result) {
      display(result, function (text) {
        console.log(text)
      })
    })
  })
})

$.get("url", function (res) {
  parseValue(res, function (id) {
    auth(id, function (result) {
      display(result, function (text) {
        console.log(text)
      })
    })
  })
})
