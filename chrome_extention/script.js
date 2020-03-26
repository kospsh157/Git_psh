var xhr = new XMLHttpRequest()


xhr.onload = function() {
  if (xhr.status == 200) {
    alert(xhr.responseText)
  }
}

var url = window.location.href;
console.log(url);


xhr.open(
  "GET",
  "https://www.ted.com/talks/susan_david_the_gift_and_power_of_emotional_courage/transcript?language=ko",
  true
)
xhr.send()

//https://www.ted.com/talks/발표자_비디오제목/transcript?language=ko 




