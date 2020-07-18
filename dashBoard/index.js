let express = require('express'); // 설치한 express module을 불러와서 변수(express)에 담습니다.
let app = express(); //express를 실행하여 app object를 초기화 합니다.
let request = require('request');
let fs = require('fs');
const { EROFS } = require('constants');



// 국내 코로나감염자 통계
var urlKorea = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson';
var queryParamsKorea = '?' + encodeURIComponent('serviceKey') + '=3UW45wSqvQDEsJKi7cJHGS1WoHXYU%2FmmiSeT4B64RH30S9HS7hwUjAMpcsSCfcoSzliLCixNHC5Ji4zitO2yAg%3D%3D'; /* Service Key*/
//queryParams += '&' + encodeURIComponent('ServiceKey') + '=' + encodeURIComponent('-'); /* */
queryParamsKorea += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
queryParamsKorea += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */
queryParamsKorea += '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent('20200310'); /* */
queryParamsKorea += '&' + encodeURIComponent('endCreateDt') + '=' + encodeURIComponent('20200315'); /* */


// index화면 라우팅함수 
app.get('/', function(req, res) { // '/' 위치에 'get'요청을 받는 경우,
  //res.send('Hello World!'); // "Hello World!"를 보냅니다.
   
    request({
        url: urlKorea + queryParamsKorea,
        method: 'GET'
    }, function (error, response, body) {
        if(error){
            console.log("에러가 일어났습니다.")
            console.log(error)
        }else{
            
            console.log("다음줄 body 출력")
            console.log(body)
            // body를 받아서 그래프를 그려야하는데 
            /*
            차트1
            사망수(DEATH_CNT), 치료중수(CARE_CNT) 가로 막대그래프
            확진자수(DECIDE_CNT), 격리해제수(CLEAR_CNT) 가로 막대그래프
            기준일 (STATE_DT)

            차트2
            누적검사수 ACC_EXAM_CNT 가로막대 그래프
            확진자수 	DECIDE_CNT  가로막대 그래프
            기준일 (STATE_DT)
            */
            fs.readFile('indexView.html', function(error, data){
                if(error){
                    console.log('에러발생')
                    console.log(error)
                }else{
                    res.writeHead(200, {'Content-Type':'text/html'})
                    res.end(data)
                }
               
            })
        }
        
        //console.log('Status', response.statusCode);
        //console.log('Headers', JSON.stringify(response.headers));
        //console.log('Reponse received', body);

    });
    // 차트 3 
    /*
        세계 코로나현황 차트
    */
    



    // 차트 4
    /*
        국내 확진사 증가추새

    */





});

let port = 3000; // 사용할 포트 번호를 port 변수에 넣습니다. 
app.listen(port, function(){ // port변수를 이용하여 3000번 포트에 node.js 서버를 연결합니다.
  console.log('server on! http://localhost:'+port); //서버가 실행되면 콘솔창에 표시될 메세지입니다.
});













// api 요청 함수2

// api 요청 함수3

// api 요청 함수4

// api에 요청해서 데이터 json으로 받고 다시 json으로 index.js에 응답한다.
// index.js에서는 들어가자마자 요청이 자동으로 되고, 서버에서 api응답으로 json데이터가 응답하면 그때 뷰단을 그려준다.
// 