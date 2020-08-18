<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="">
<meta name="author" content="">

<title>NPS 국민 연금 NPS-IPT 모니터링</title>
<!-- Bootstrap core JavaScript-->
<script src="/resources/vendor/jquery/jquery.min.js"></script>
<script src="/resources/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- Core plugin JavaScript-->
<script src="/resources/vendor/jquery-easing/jquery.easing.min.js"></script>
<script src="/resources/js/jquery-2.1.4.min.js"></script>
<script src="/resources/js/jquery-ui.min.js"></script>
<script src="/resources/js/common.js"></script>
<script src="/resources/js/amcharts/amcharts/amcharts.js"></script>
<script src="/resources/js/amcharts/amcharts/serial.js"></script>
<!-- Custom scripts for all pages-->
<!-- <script src="/resources/js/sb-admin-2.min.js"></script> -->
<!-- Custom fonts for this template-->
<link href="/resources/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
<link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
<!-- Custom styles for this template-->
<link href="/resources/css/sb-admin-2.css" rel="stylesheet"> 
<link href="/resources/css/nc-admin.css" rel="stylesheet">
<link rel="stylesheet" href="https://www.amcharts.com/lib/3/plugins/export/export.css" type="text/css" media="all" />
</head>
<script>



function fn_setDevice(){
	var temp = document.getElementById('IPTCNT').value;
	if(isNaN(temp) == true) {
		alert("숫자만 입력 가능합니다.");
		return;
	} else {
		console.log("입력된 값 : " + temp + " / 숫자");
	}
	var deviceInfo = new Object();
	deviceInfo["DKEY"] 			= 	$("#dkey").val();
	deviceInfo["IPTCNT"] 		= 	$("#IPTCNT").val();
	deviceInfo["MG"] 			=	$("#MG").val();
	$.ajax({
	      url : '/nc/setDevice.do',
	      type : 'POST',
	      data : JSON.stringify(deviceInfo),
	      dataType : 'json',
	      contentType : "application/json",
	      success : function ( result ) {
	    	  	// Ack/UnACk update 처리 결과 확인
	    	  	alert("수정되었습니다.");
	    	  	var theURL = "/nc/dashboard.do"; // 전송 URL
	    	    // 호출 한 부모 페이지에서 URL 호출
	    	    opener.window.location = theURL;
	    	    // 호출 한 뒤 현재 팝업 창 닫기 이벤트
	    	    close();
	      },error : function (resunt){
	    	  alert("수정 실패하였습니다.");
	      }
	 });
}
</script>
<body>
	<form action="/nc/setDevice.do" id="frm" method="post">
		<div class="row justify-content-center mt-2">
	        <span id="device">Device1</span>
	        <input type="hidden" id="dkey" name="dkey" value="${deviceDetail.DKEY }"/>
	    </div>
		<div class="row justify-content-center mt-2">
	        	등록 단말 수 : &nbsp;&nbsp;&nbsp;<input id="IPTCNT" name="IPTCNT" type="type" value="${deviceDetail.IPTCNT }" class="form-control border-primary" style="font-size:1rem; background:transparent; width:10rem;">
	    </div>
	    <div class="row justify-content-center mt-2">
	        	등록 M/G : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id="MG" name="MG" type="type" value="${deviceDetail.MG }" class="form-control border-primary" style="font-size:1rem; background:transparent; width:10rem;">
	    </div>
	    <div class="row justify-content-center mt-2">
	        <input type="button" value="등록" class="btn btn-primary px-4 py-2" onclick="fn_setDevice();"> 
	    </div>
    </form>
</body>
</html>