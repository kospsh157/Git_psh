httpRequest.open("GET", "https://www.ted.com/talks/susan_david_the_gift_and_power_of_emotional_courage/transcript?language=ko", true);

httpRequest.send();

if (httpRequest.readyState == XMLHttpRequest.DONE && httpRequest.status == 200 ) {

    alert("요청 성공");
    alert(httpRequest.responseText);

}else{
    alert("요청 실패");
}

