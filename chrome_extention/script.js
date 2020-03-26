chrome.tabs.excuteScript(
  {
    code: "document.getElementsByClassName('m-b:7 p-l:.5')"
  },
  function(result) {
    alert(result)
  }
)

var xhr = new XMLHttpRequest()
//현재 url 주소가져오기
//window.location.protocol
//window.location.hostname
//window.location.pathname
console.log("일단 이거는 뜨자")

xhr.onload = function() {
  if (xhr.status == 200) {
    //alert(xhr.responseText)
    console.log("서버 요청 반응 했음")
  }
}

var url = window.location.href
console.log(url)
alert(url)
var processURL = null

xhr.open(
  "GET",
  processURL,
  //"https://www.ted.com/talks/susan_david_the_gift_and_power_of_emotional_courage/transcript?language=ko",
  true
)
xhr.send()

//https://www.ted.com/talks/발표자_비디오제목/transcript?language=ko
