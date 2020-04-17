chrome.tabs.executeScript(
  {
    //code: "document.getElementsByClassName('m-b:7 p-l:.5').innerHTML"
    //code:"window.location.protocol + '//' + window.location.hostname + window.location.pathname + '/transcript?language=ko'",
    code:"window.location.pathname"
  },
  function(result) {
    console.log("요 밑을 보세요");
    var findVideoURL = result[0].split('/');
    console.log(findVideoURL[2]);
    //이제 요청값 주소 만들기
    var reqURL = "https://www.ted.com/talks/" + findVideoURL[2] + "/transcript?language=ko";
    console.log(reqURL);



    
    
    var xhr = new XMLHttpRequest();  // 통신객체 생성

    xhr.onload = function() {
      if (xhr.status == 200) {
        //alert(xhr.responseText)
        console.log("서버 요청 반응 했음");
        console.log(xhr.responseText);
        //팝업창을 요청받은 반응값으로 대체하기
        document.querySelector('body').innerHTML = xhr.responseText;
      }
    }
    
    xhr.open(
      "GET",
      reqURL,
      true
    )
    xhr.send()


  }
)

// https://www.ted.com/talks/발표자_비디오제목/transcript?language=ko
//"https://www.ted.com/talks/susan_david_the_gift_and_power_of_emotional_courage/transcript?language=ko",