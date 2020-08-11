import React from 'react'


// 페이지 이동
function fn_listPaging(num) {

    // 클릭한 페이지 번호를 curPage 값으로 설정.
    $("#pageNo").val(num);

    // curPage 값을 담은 상태로 form을 submit
    $("#eventForm").attr("action", "/event/eventList.do").submit();
}

// 장비 상세 화면
function fn_devcieDetailView(dkey) {
    location.href = "/device/deviceView.do?dkey=" + dkey;
}

// 장비 에러 이력
function fn_eventHistView(dkey) {
    location.href = "/event/eventHist.do?dkey=" + dkey;
}

//에러 상세 화면
function fn_eventDetailView(dkey, fcId, ocDatetime) {
    location.href = "/event/eventView.do?dkey=" + dkey + "&fcId=" + fcId + "&ocDatetime=" + ocDatetime;
}

//에러코드 정보 화면
function fn_eventCodeView(fcId) {
    location.href = "/config/eventCodeView.do?fcId=" + fcId;
}

//고객 상세 화면
function fn_custDetailView(custId) {
    location.href = "/cust/custView.do?custId=" + custId;
}

//운전자 상세 화면
function fn_driverDetailView(driverId) {
    location.href = "/config/driverView.do?driverId=" + driverId;
}

// [처리] 버튼 클릭 시 이벤트
function fn_ackEventPop(failureId) {
    $("#FAILURE_ID").val(failureId)
    $("#event-eventAck-layer").dialog("open");
}

// [Excel] 버튼 클릭 시, 다운로드 이벤트
function fn_excel() {
    $("#eventForm").attr("action", "/event/eventListExcel.do").submit();
}


function EventListHeader() {



}

function EventListBody() {


}
/*
    1. 데이타 받는 방식은 그대로 간다.
    2. 리액트로 고칠 수 있는 부분?
        1. 분해해서 조합하는 형태로

    3. 오늘 삽질한 결과
        1. jstl 구문도 return() 안에 넣어서 사용 가능하다.
        2. 스프링에서 보내는 모델객체의 데이터는 리액트에서 사용 할 수 없다.
        3. 리액트에 onClick 에는 함수 호출형태가 아닌 선언 형태로 써야 무한 깜빡임이 없다.
        4. 스프링에서 보내는 모델객체의 데이타 종류는 총2가지 테이블 데이터, 페이징객체 이다
            1. 즉 이 두가지 데이터는 그대로 때려 박아야 한다.
*/