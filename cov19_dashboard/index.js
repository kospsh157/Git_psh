const express = require('express'); // 설치한 express module을 불러와서 변수(express)에 담습니다.
const app = express(); //express를 실행하여 app object를 초기화 합니다.
const request = require('request');
const fs = require('fs');
const convert = require('xml-js');
const path = require('path');
// 뷰엔진 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);




// 1. 국내 코로나감염자 통계 요청값 변수 정리

var urlKorea = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson';
var queryParamsKorea = '?' + encodeURIComponent('serviceKey') + '=3UW45wSqvQDEsJKi7cJHGS1WoHXYU%2FmmiSeT4B64RH30S9HS7hwUjAMpcsSCfcoSzliLCixNHC5Ji4zitO2yAg%3D%3D'; /* Service Key*/
//queryParams += '&' + encodeURIComponent('ServiceKey') + '=' + encodeURIComponent('-'); /* */
queryParamsKorea += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
queryParamsKorea += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */
queryParamsKorea += '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent('20200205'); /* */
queryParamsKorea += '&' + encodeURIComponent('endCreateDt') + '=' + encodeURIComponent('20200719'); /* */


// 2. 국내 코로나 연령별/성별 통계 요청값 변수 정리
var urlKoreaOldSex = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19GenAgeCaseInfJson';
var queryParamsKoreaOldSex = '?' + encodeURIComponent('serviceKey') + '=3UW45wSqvQDEsJKi7cJHGS1WoHXYU%2FmmiSeT4B64RH30S9HS7hwUjAMpcsSCfcoSzliLCixNHC5Ji4zitO2yAg%3D%3D'; /* Service Key*/
//queryParams += '&' + encodeURIComponent('ServiceKey') + '=' + encodeURIComponent('-'); /* */
queryParamsKoreaOldSex += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
queryParamsKoreaOldSex += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */



// 3. 해외 발생 코로나 현황
// 3UW45wSqvQDEsJKi7cJHGS1WoHXYU%2FmmiSeT4B64RH30S9HS7hwUjAMpcsSCfcoSzliLCixNHC5Ji4zitO2yAg%3D%3D
// http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19NatInfStateJson
// 파라미터
/*
    지역명 : AREA_NM
    국가별 확진자 수 : NAT_DEF_CNT
    국가별 사망자 수 : NAT_DEATH_CNT
    기준 날짜 : STD_DAY
*/
// 해외 발생 코로나 요청값 변수 정리
var urlWorldStatus = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19NatInfStateJson';
var queryParamsWorldStatus = '?' + encodeURIComponent('serviceKey') + '=3UW45wSqvQDEsJKi7cJHGS1WoHXYU%2FmmiSeT4B64RH30S9HS7hwUjAMpcsSCfcoSzliLCixNHC5Ji4zitO2yAg%3D%3D'; /* Service Key*/
//queryParams += '&' + encodeURIComponent('ServiceKey') + '=' + encodeURIComponent('-'); /* */
queryParamsWorldStatus += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
queryParamsWorldStatus += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */



// 4. 한국 도시별 확진자 증가수 
/*
    차트4 우리나라 도시별 전날대비증가수
    CREATE_DT : 등록일시분초 2020-03-02 11:13:23.098
    GUBUN : 시도명(한글)
    INC_DEC : 전날대비 증가수
*/ 
// 파라미터 변수 정리
var urlKorCity = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson';
var queryParamsKorCity = '?' + encodeURIComponent('ServiceKey') + '=3UW45wSqvQDEsJKi7cJHGS1WoHXYU%2FmmiSeT4B64RH30S9HS7hwUjAMpcsSCfcoSzliLCixNHC5Ji4zitO2yAg%3D%3D'; /* Service Key*/
queryParamsKorCity += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
queryParamsKorCity += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */
queryParamsKorCity += '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent('20200220'); /* */
queryParamsKorCity += '&' + encodeURIComponent('endCreateDt') + '=' + encodeURIComponent('20200719'); /* */


// html 로 보낼 데이터 전역변수 설정
var xmlToJson1
var xmlToJson2
var xmlToJson3
var xmlToJson4
// indexView.html  / 요청 
app.get('/', function(req,res,next){
    console.log('첫 번째 요청');
    request({
        url: urlKorea + queryParamsKorea,
        method: 'GET'
    }, function (error, response, body) {
        if(error){
            console.log("에러가 일어났습니다.")
            console.log(error)
        }else{
            // xml to Json
            xmlToJson1 = convert.xml2json(body, {compact: true, spaces: 4});
            
        }
    })
    next();
}, function(req,res,next){
    console.log('두 번째 요청');
    request({
        url: urlKoreaOldSex + queryParamsKoreaOldSex,
        method: 'GET'
    }, function (error, response, body) {
        if(error){
            console.log("에러가 일어났습니다.")
            console.log(error)
        }else{
          
            // xml to Json
            xmlToJson2 = convert.xml2json(body, {compact: true, spaces: 4});
           
            
        }
    })
    next()

}, function(req,res,next){
    console.log('세 번째 요청')
    request({
        url: urlWorldStatus + queryParamsWorldStatus,
        method: 'GET'
    }, function (error, response, body) {
        if(error){
            console.log("에러가 일어났습니다.")
            console.log(error)
        }else{
            // xml to Json
            xmlToJson3 = convert.xml2json(body, {compact: true, spaces: 4});
           
        }
    })
    next()

}, function(req,res,next){
    console.log('네 번째 요청')
    request({
        url: urlKorCity + queryParamsKorCity,
        method: 'GET'
    }, function (error, response, body) {
        if(error){
            console.log("에러가 일어났습니다.")
            console.log(error)
        }else{
            // xml to Json
            xmlToJson4 = convert.xml2json(body, {compact: true, spaces: 4});
            // json 변환 확인
            // console.log(`xml to json33 => ${xmlToJson4}`)
            res.render('indexView.html', 
                {
                    jasonData1:xmlToJson1, 
                    jasonData2:xmlToJson2, 
                    jasonData3:xmlToJson3,
                    jasonData4:xmlToJson4
                }
            );
            res.end()
        }
    })
});

let port = 3000; // 사용할 포트 번호를 port 변수에 넣습니다. 
app.listen(port, function(){ // port변수를 이용하여 3000번 포트에 node.js 서버를 연결합니다.
  console.log('server on! http://localhost:'+port); //서버가 실행되면 콘솔창에 표시될 메세지입니다.
});

