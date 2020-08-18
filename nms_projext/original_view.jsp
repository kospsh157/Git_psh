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


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/themes/default/style.min.css" />
<script src="/resources/js/jstree.js"></script>
<script src="/resources/js/jstree.min.js"></script>
</head>
<style>


.amcharts-chart-div{
	height:80%!important;
}
.amcharts-legend-div{
	height:20%!important;
}
#trapList > .ui-selectee.ui-selected{
	background : #35528d!important;
}
#trapList > .ui-selectee.ui-selecting{
	background : #35528d!important;
}
#trapList > .ui-selectee.ui-selected > td{
	color:white;
}
#trapList > .ui-selectee.ui-selecting > td{
	color:white;
}
.custom-menu {
    z-index:1000;
    position: absolute;
    background-color:#C0C0C0;
    border: 0px solid black;
}
</style>



<script>
var sock = null;

var link = document.location.href;
var link2 = link;
var port = "";
console.log(" websocket link  : ");

console.log( link.substring( link.indexOf("//"), link.indexOf(":") ) );
console.log( link.indexOf("//") );
console.log( link.indexOf(":") );
port = link.substring( link.lastIndexOf(":"), link.length );
port = port.substr( port.indexOf(":"), port.indexOf("/"));
console.log( " port   :::   "+ port);
link = link.substring( link.indexOf("//")+2, link.lastIndexOf(":") );
console.log(link);
	
// sock = new WebSocket("ws://192.168.10.93:8079/echo/websocket"); // 로컬
// sock = new WebSocket("ws://127.0.0.1:8079/echo/websocket"); // 로컬
// sock = new WebSocket("ws://121.165.242.78:8090/echo/websocket"); // 본사
// sock = new WebSocket("ws://172.30.227.212:5001/echo/websocket"); // LGU 마곡
// sock = new WebSocket("ws://172.30.59.129:5001/echo/websocket"); // LGU 상암
sock = new WebSocket("ws://" + link + port + "/echo/websocket");
sock.onmessage = onMessage;
sock.onclose = onClose;
sock.onopen = onOpen;
var faultFlag = true;
var recoveryFlag = true;
function sendMessage() {
	console.log("Hi WebSocket");
//     sock.send("Hi WebSocket");
//     makeAlarmList();
}
function onOpen(){
	console.log("연결 됨");
}
 // 서버로부터 메시지를 받았을 때
 function onMessage(msg) {
	 	console.log(" websocket msg  : ");
	 	console.log(msg.data);
        var data = msg.data;
        console.log("websocket msg : "+data);
        fn_trapRefresh();
}

 // 서버와 연결을 끊었을 때
 function onClose(evt) {
 	console.log("세션시간이 종료되었습니다. \n다시 로그인해주세요.");
//  	location.href = "/login.do";
//      $("#data").append("연결 끊김");
}
//[서버 알람] : 행 선택 & 우클릭 이벤트
 $(document).bind("contextmenu", function(event) {
	 $("#trapTable").bind("mousedown", function( event ){
//			console.log(event);
			if( event.which == 1 ){
				$("div.custom-menu").remove();
//				alert("Left mouse button click " + $(this).text());
//			}else if( event.which == 2 ){
//				alert("Right mouse button click " + $(this).text());
			}
		});
 		event.preventDefault();
 	$("#trapList > tr").bind("contextmenu", function(e) {
 		if($(e.currentTarget).attr("class").indexOf("ui-selected") > -1){
 			$("div.custom-menu").remove();
 		    $("<div class='custom-menu' onclick='fn_ack(1)' style='text-align:center;width:50px;'>Ack</div>")
 		        .appendTo("body")
 		        .css({top: e.pageY + "px", left: e.pageX + "px"});
 		    $("<div class='custom-menu' onclick='fn_ack(2)' style='text-align:center;width:50px;'>UnAck</div>")
 		    	.appendTo("body")
 		    	.css({top: e.pageY+20 + "px", left: e.pageX + "px"});
 		}else{
 			$("div.custom-menu").remove();
 		}
 	});
 }).bind("click", function(event) {
 	$("div.custom-menu").remove();
 });
$(document).ready(function(){
	fn_trapRefresh();
	fn_jTreeMake();
	$.ajax({
	     url : "/nc/type0.do"
	     ,dataType : "json"
	     ,data : {"vqms" : "1"}
	     ,success : function ( result )
	     {
	    	 
	    	 var key1 = [];
	    	 var title1 = [];
	    	 console.log(" type 0 ");
	    	 console.log(result);
			 if(result.length > 0){
		    	 key1.push("BTOTALCALL");
		    	 key1.push("BENDCALL");
		    	 key1.push("ATOTALCALL");
		    	 key1.push("AENDCALL");
		    	 
		    	 title1.push("시도호(지난주)");
		    	 title1.push("완료호(지난주)");
		    	 title1.push("시도호");
		    	 title1.push("완료호");
		    	 fn_chart("chart1", result, key1, title1);
		    	 
		    	 var key2 = [];
		    	 var title2 = [];
		    	 
		    	 key2.push("BTOTALMEDIAALARM");
		    	 key2.push("ATOTALMEDIAALARM");
		    	 
		    	 title2.push("R값(지난주)");
		    	 title2.push("R값");
		    	 
// 		    	 fn_chart("chart3", result, key2, title2);
	    	 }
	     }
	});
	
	$.ajax({
	     url : "/nc/type1.do"
	     ,dataType : "json"
	    	 ,data : {"vqms" : "1"}
	     ,success : function ( result )
	     {
	    	 console.log("type1.do");
	    	 console.log(result);
			 if(result.length > 0){
		    	 var key1 = [];
		    	 var title1 = [];
		    	 key1.push("ATOTALBPS");
		    	 key1.push("ASIPBPS");
		    	 key1.push("ARTPBPS");
		    	 title1.push("Bps 정보");
		    	 title1.push("SIP Bps 정보");
		    	 title1.push("RTP Bps 정보");
		    	 fn_chart("chart4", result, key1, title1);
	    	 }
	    	 
	     }
	});
	
	$.ajax({
	     url : "/nc/type2.do"
	     ,dataType : "json"
    	 ,data : {"vqms" : "1"}
	     ,success : function ( result )
	     {
	    	 console.log("type2.do");
	    	 console.log(result);
	    	 if(result.length > 0){
		    	 var key1 = [];
		    	 var title1 = [];
		    	 
		    	 key1.push("BAVGR");
		    	 key1.push("AAVGR");
		    	 
		    	 title1.push("R값(지난주)");
		    	 title1.push("R값");
		    	 
// 		    	 $("#TOTALCALL1").html(result[result.length-1].ATOTALCALL);
// 		    	 $("#CRATE1").html(result[result.length-1].ACRATE);
// 		    	 $("#ENDCALL").html(result[result.length-1].AENDCALL);
// 		    	 $("#ERATE").html(result[result.length-1].AERATE);
// 		    	 $("#AVGR").html(result[result.length-1].AAVGR);
				 $("#ALL1").html( result[result.length-1].ATOTALCALL + "("+result[result.length-1].ACRATE+"%)"  );
		    	 $("#CLEAR1").html( result[result.length-1].AENDCALL + "("+result[result.length-1].AERATE+"%)"  );
		    	 $("#AVGR1").html( result[result.length-1].AAVGR  );
		    	 
		    	 fn_chart("chart2", result, key1, title1);
		    	 fn_chart("chart3", result, key1, title1);
	    	 }
	    	 
	     }
	});
	
	$.ajax({
	     url : "/nc/type3.do"
	     ,dataType : "json"
    	 ,data : {"vqms" : "1"}
	     ,success : function ( result )
	     {
	    	 console.log("type3.do");
	    	 console.log(result);
	    	 if(result.length > 0){
		    	 
		    	 $("#RVALUETHRESHOLD1").html(result[result.length-1].RVALUETHRESHOLD);
		    	 $("#CRITICAL1").html(result[result.length-1].CRITICAL);
		    	 $("#MAJOR1").html(result[result.length-1].MAJOR);
		    	 $("#WARNING1").html(result[result.length-1].WARNING);
		    	 
	    	 }
	    	 
	     }
	});
	
	
	// 서울공단
	$.ajax({
	     url : "/nc/type0.do"
	     ,dataType : "json"
	     ,data : {"vqms" : "2"}
	     ,success : function ( result )
	     {
	    	 
	    	 var key1 = [];
	    	 var title1 = [];
			 if(result.length > 0){
		    	 key1.push("BTOTALCALL");
		    	 key1.push("BENDCALL");
		    	 key1.push("ATOTALCALL");
		    	 key1.push("AENDCALL");
		    	 
		    	 title1.push("시도호(지난주)");
		    	 title1.push("완료호(지난주)");
		    	 title1.push("시도호");
		    	 title1.push("완료호");
		    	 
		    	 fn_chart("chart5", result, key1, title1);
		    	 
		    	 var key2 = [];
		    	 var title2 = [];
		    	 
		    	 key2.push("BTOTALMEDIAALARM");
		    	 key2.push("ATOTALMEDIAALARM");
		    	 
		    	 title2.push("R값(지난주)");
		    	 title2.push("R값");
		    	 
// 		    	 fn_chart("chart7", result, key2, title2);
	    	 }
	     }
	});
	
	$.ajax({
	     url : "/nc/type1.do"
	     ,dataType : "json"
	    	 ,data : {"vqms" : "2"}
	     ,success : function ( result )
	     {
	    	 console.log("type1.do");
	    	 console.log(result);
			 if(result.length > 0){
		    	 var key1 = [];
		    	 var title1 = [];
		    	 
		    	 key1.push("ATOTALBPS");
		    	 key1.push("ASIPBPS");
		    	 key1.push("ARTPBPS");
		    	 
		    	 title1.push("Bps 정보");
		    	 title1.push("SIP Bps 정보");
		    	 title1.push("RTP Bps 정보");
		    	 
		    	 fn_chart("chart8", result, key1, title1);
	    	 }
	    	 
	     }
	});
	
	$.ajax({
	     url : "/nc/type2.do"
	     ,dataType : "json"
   	 	 ,data : {"vqms" : "2"}
	     ,success : function ( result )
	     {
	    	 console.log("type2.do");
	    	 console.log(result);
	    	 if(result.length > 0){
		    	 var key1 = [];
		    	 var title1 = [];
		    	 
		    	 key1.push("BAVGR");
		    	 key1.push("AAVGR");
		    	 
		    	 title1.push("R값(지난주)");
		    	 title1.push("R값");
		    	 
// 		    	 $("#INMCC2").html(result[result.length-1].AINMCC);
// 		    	 $("#OUTMCC2").html(result[result.length-1].AOUTMCC);
// 		    	 $("#INTOTALCALL2").html(result[result.length-1].AINTOTALCALL);
// 		    	 $("#OUTTOTALCALL2").html(result[result.length-1].AOUTTOTALCALL);
		    	 
		    	 $("#ALL2").html( result[result.length-1].ATOTALCALL + "("+result[result.length-1].ACRATE+"%)"  );
		    	 $("#CLEAR2").html( result[result.length-1].AENDCALL + "("+result[result.length-1].AERATE+"%)"  );
		    	 $("#AVGR2").html( result[result.length-1].AAVGR  );
		    	 
		    	 
		    	 fn_chart("chart6", result, key1, title1);
		    	 fn_chart("chart7", result, key1, title1);
		    	 
	    	 }
	    	 
	     }
	});
	
	$.ajax({
	     url : "/nc/type3.do"
	     ,dataType : "json"
   	 	 ,data : {"vqms" : "2"}
	     ,success : function ( result )
	     {
	    	 console.log("type3.do");
	    	 console.log(result);
	    	 if(result.length > 0){
		    	 
		    	 $("#RVALUETHRESHOLD2").html(result[result.length-1].RVALUETHRESHOLD);
		    	 $("#CRITICAL2").html(result[result.length-1].CRITICAL);
		    	 $("#MAJOR2").html(result[result.length-1].MAJOR);
		    	 $("#WARNING2").html(result[result.length-1].WARNING);
		    	 
	    	 }
	    	 
	     }
	});
	
	$.ajax({
	     url : "/nc/getDevice.do"
	     ,dataType : "json"
  	 	 ,data : {"dkey" : "1"}
	     ,success : function ( result )
	     {
	    	 console.log("getDevice 1 ");
	    	 console.log(result);
	    	 if(result.length > 0){
		    	 
		    	 $("#CPU1").html(result[0].CPUUTIL+ "%");
		    	 $("#MEM1").html(result[0].MEMUTIL+ "%");
		    	 $("#FS1").html(result[0].SIZEUTIL+ "%");
		    	 $("#IPTCNT1").html(result[0].IPTCNT);
		    	 $("#MG1").html(result[0].MG);
	    	 }
	    	 
	     }
	});
	
	$.ajax({
	     url : "/nc/getDevice.do"
	     ,dataType : "json"
 	 	 ,data : {"dkey" : "2"}
	     ,success : function ( result )
	     {
	    	 console.log("getDevice 2 ");
	    	 console.log(result);
	    	 if(result.length > 0){
	    		 $("#CPU2").html(result[0].CPUUTIL+ "%");
		    	 $("#MEM2").html(result[0].MEMUTIL+ "%");
		    	 $("#FS2").html(result[0].SIZEUTIL+ "%");
		    	 $("#IPTCNT2").html(result[0].IPTCNT);
		    	 $("#MG2").html(result[0].MG);
	    	 }
	     }
	});
	setInterval( fn_graphRefresh, (10 * 60000) );
// 	fn_chartL4("chart1");
// 	fn_chartL2("chart2");
// 	fn_chartL2("chart3");
// 	fn_chartL4("chart4");
	
// 	fn_chartL4("chart5");
// 	fn_chartL2("chart6");
// 	fn_chartL2("chart7");
// 	fn_chartL4("chart8");
	
});
function fn_deviceIPT(dkey){
	var popup_yn = window.open("/nc/device/update.do?dkey="+dkey, "popup" ,"width=500,height=200, scrollbars=no, resizable=no, toolbar=no, location=no, directories=no, menubar=no, status=no");
	window.focus();
}

function fn_deviceRefresh(){
	$.ajax({
	     url : "/nc/getDevice.do"
	     ,dataType : "json"
 	 	 ,data : {"dkey" : "1"}
	     ,success : function ( result )
	     {
	    	 console.log("getDevice 1 ");
	    	 console.log(result);
	    	 if(result.length > 0){
		    	 
		    	 $("#CPU1").html(result[0].CPUUTIL+ "%");
		    	 $("#MEM1").html(result[0].MEMUTIL+ "%");
		    	 $("#FS1").html(result[0].SIZEUTIL+ "%");
		    	 $("#IPT1").html(result[0].IPTCNT);
		    	 $("#MG1").html(result[0].MG);
	    	 }
	    	 
	     }
	});
	
	$.ajax({
	     url : "/nc/getDevice.do"
	     ,dataType : "json"
	 	 ,data : {"dkey" : "2"}
	     ,success : function ( result )
	     {
	    	 console.log("getDevice 2 ");
	    	 console.log(result);
	    	 if(result.length > 0){
	    		 $("#CPU2").html(result[0].CPUUTIL+ "%");
		    	 $("#MEM2").html(result[0].MEMUTIL+ "%");
		    	 $("#FS2").html(result[0].SIZEUTIL+ "%");
		    	 $("#IPT2").html(result[0].IPTCNT);
		    	 $("#MG2").html(result[0].MG);
	    	 }
	     }
	});
}
function fn_trapRefresh(){
	$.ajax({
	     url : "/nc/trapList.do"
	     ,dataType : "json"
//    	 ,data : {"vqms" : "1"}
	     ,success : function ( result )
	     {
	    	 
	    	 console.log("trapList.do");
	    	 console.log(result);
	    	 if(result.length > 0){
		    	 fn_trapList(result);
		    	 
	    	 }
	    	 
	     }
	});
}
function fn_graphRefresh(){
	$.ajax({
	     url : "/nc/type0.do"
	     ,dataType : "json"
	     ,data : {"vqms" : "1"}
	     ,success : function ( result )
	     {
	    	 
	    	 var key1 = [];
	    	 var title1 = [];
			 if(result.length > 0){
		    	 key1.push("BTOTALCALL");
		    	 key1.push("BENDCALL");
		    	 key1.push("ATOTALCALL");
		    	 key1.push("AENDCALL");
		    	 
		    	 title1.push("시도호(지난주)");
		    	 title1.push("완료호(지난주)");
		    	 title1.push("시도호");
		    	 title1.push("완료호");
		    	 
		    	 fn_chart("chart1", result, key1, title1);
		    	 
		    	 var key2 = [];
		    	 var title2 = [];
		    	 
		    	 key2.push("BTOTALMEDIAALARM");
		    	 key2.push("ATOTALMEDIAALARM");
		    	 
		    	 title2.push("R값(지난주)");
		    	 title2.push("R값");
		    	 
// 		    	 fn_chart("chart3", result, key2, title2);
	    	 }
	     }
	});
	
	$.ajax({
	     url : "/nc/type1.do"
	     ,dataType : "json"
	    	 ,data : {"vqms" : "1"}
	     ,success : function ( result )
	     {
	    	 console.log("type1.do");
	    	 console.log(result);
			 if(result.length > 0){
		    	 var key1 = [];
		    	 var title1 = [];
		    	 
		    	 key1.push("ATOTALBPS");
		    	 key1.push("ASIPBPS");
		    	 key1.push("ARTPBPS");
		    	 
		    	 title1.push("Bps 정보");
		    	 title1.push("SIP Bps 정보");
		    	 title1.push("RTP Bps 정보");
		    	 
		    	 fn_chart("chart4", result, key1, title1);
	    	 }
	    	 
	     }
	});
	
	$.ajax({
	     url : "/nc/type2.do"
	     ,dataType : "json"
   	 	 ,data : {"vqms" : "1"}
	     ,success : function ( result )
	     {
	    	 console.log("type2.do");
	    	 console.log(result);
	    	 if(result.length > 0){
		    	 var key1 = [];
		    	 var title1 = [];
		    	 
		    	 key1.push("BAVGR");
		    	 key1.push("AAVGR");
		    	 
		    	 title1.push("R값(지난주)");
		    	 title1.push("R값");
		    	 
// 		    	 $("#TOTALCALL1").html(result[result.length-1].ATOTALCALL);
// 		    	 $("#CRATE1").html(result[result.length-1].ACRATE);
// 		    	 $("#ENDCALL").html(result[result.length-1].AENDCALL);
// 		    	 $("#ERATE").html(result[result.length-1].AERATE);
// 		    	 $("#AVGR").html(result[result.length-1].AAVGR);
// 				 $("#AVGR").html(result[result.length-1].AAVGR);
				 $("#ALL1").html( result[result.length-1].ATOTALCALL + "("+result[result.length-1].ACRATE+"%)"  );
		    	 $("#CLEAR1").html( result[result.length-1].AENDCALL + "("+result[result.length-1].AERATE+"%)"  );
		    	 $("#AVGR1").html( result[result.length-1].AAVGR  );
		    	 
		    	 fn_chart("chart2", result, key1, title1);
		    	 fn_chart("chart3", result, key1, title1);
	    	 }
	    	 
	     }
	});
	
	$.ajax({
	     url : "/nc/type3.do"
	     ,dataType : "json"
   	 	 ,data : {"vqms" : "1"}
	     ,success : function ( result )
	     {
	    	 console.log("type3.do");
	    	 console.log(result);
	    	 if(result.length > 0){
		    	 
		    	 $("#RVALUETHRESHOLD1").html(result[result.length-1].RVALUETHRESHOLD);
		    	 $("#CRITICAL1").html(result[result.length-1].CRITICAL);
		    	 $("#MAJOR1").html(result[result.length-1].MAJOR);
		    	 $("#WARNING1").html(result[result.length-1].WARNING);
		    	 
	    	 }
	    	 
	     }
	});
	
	
	// 서울공단
	$.ajax({
	     url : "/nc/type0.do"
	     ,dataType : "json"
	     ,data : {"vqms" : "2"}
	     ,success : function ( result )
	     {
	    	 
	    	 var key1 = [];
	    	 var title1 = [];
			 if(result.length > 0){
		    	 key1.push("BTOTALCALL");
		    	 key1.push("BENDCALL");
		    	 key1.push("ATOTALCALL");
		    	 key1.push("AENDCALL");
		    	 
		    	 title1.push("시도호(지난주)");
		    	 title1.push("완료호(지난주)");
		    	 title1.push("시도호");
		    	 title1.push("완료호");
		    	 
		    	 fn_chart("chart5", result, key1, title1);
		    	 
		    	 var key2 = [];
		    	 var title2 = [];
		    	 
		    	 key2.push("BTOTALMEDIAALARM");
		    	 key2.push("ATOTALMEDIAALARM");
		    	 
		    	 title2.push("R값(지난주)");
		    	 title2.push("R값");
		    	 
// 		    	 fn_chart("chart7", result, key2, title2);
	    	 }
	     }
	});
	
	$.ajax({
	     url : "/nc/type1.do"
	     ,dataType : "json"
	    	 ,data : {"vqms" : "2"}
	     ,success : function ( result )
	     {
	    	 console.log("type1.do");
	    	 console.log(result);
			 if(result.length > 0){
		    	 var key1 = [];
		    	 var title1 = [];
		    	 
		    	 key1.push("ATOTALBPS");
		    	 key1.push("ASIPBPS");
		    	 key1.push("ARTPBPS");
		    	 
		    	 title1.push("Bps 정보");
		    	 title1.push("SIP Bps 정보");
		    	 title1.push("RTP Bps 정보");
		    	 
		    	 fn_chart("chart8", result, key1, title1);
	    	 }
	    	 
	     }
	});
	
	$.ajax({
	     url : "/nc/type2.do"
	     ,dataType : "json"
  	 	 ,data : {"vqms" : "2"}
	     ,success : function ( result )
	     {
	    	 console.log("type2.do");
	    	 console.log(result);
	    	 if(result.length > 0){
		    	 var key1 = [];
		    	 var title1 = [];
		    	 
		    	 key1.push("BAVGR");
		    	 key1.push("AAVGR");
		    	 
		    	 title1.push("R값(지난주)");
		    	 title1.push("R값");
		    	 
// 		    	 $("#INMCC2").html(result[result.length-1].AINMCC);
// 		    	 $("#OUTMCC2").html(result[result.length-1].AOUTMCC);
// 		    	 $("#INTOTALCALL2").html(result[result.length-1].AINTOTALCALL);
// 		    	 $("#OUTTOTALCALL2").html(result[result.length-1].AOUTTOTALCALL);
// 				 $("#AVGR2").html(result[result.length-1].AAVGR);
				 $("#ALL2").html( result[result.length-1].ATOTALCALL + "("+result[result.length-1].ACRATE+"%)"  );
		    	 $("#CLEAR2").html( result[result.length-1].AENDCALL + "("+result[result.length-1].AERATE+"%)"  );
		    	 $("#AVGR2").html( result[result.length-1].AAVGR  );
		    	 
		    	 fn_chart("chart6", result, key1, title1);
		    	 fn_chart("chart7", result, key1, title1);
		    	 
	    	 }
	    	 
	     }
	});
	
	$.ajax({
	     url : "/nc/type3.do"
	     ,dataType : "json"
  	 	 ,data : {"vqms" : "2"}
	     ,success : function ( result )
	     {
	    	 console.log("type3.do");
	    	 console.log(result);
	    	 if(result.length > 0){
		    	 
		    	 $("#RVALUETHRESHOLD2").html(result[result.length-1].RVALUETHRESHOLD);
		    	 $("#CRITICAL2").html(result[result.length-1].CRITICAL);
		    	 $("#MAJOR2").html(result[result.length-1].MAJOR);
		    	 $("#WARNING2").html(result[result.length-1].WARNING);
		    	 
	    	 }
	    	 
	     }
	});
}
function fn_trapList(result){
	$("#trapList").empty();
	$("#trapTable").selectable();
	for(var i=0; i<result.length; i++){
// 		<tr>
// 	        <td style="width:20%; text-align:left;"><i class="fa fa-circle text-sucess pr-2"></i>상주상담센터</td>
// 	        <td style="width:50%; text-align:left;">Notify that FXO port is connected...</td>
// 	        <td style="width:30%; text-align:center;">2019-04-11 11:13</td>
// 	    </tr>
		var tr = document.createElement("tr");
		tr.setAttribute("name", "trapTr");
		
		var td1 = document.createElement("td");
		td1.setAttribute("style", "text-overflow: ellipsis; overflow: hidden; white-space: nowrap; width:20%; text-align:left;");
		
		var icon = "<i class='fa fa-circle text-sucess'></i>";
		td1.innerHTML = icon+"정보"
		if(result[i].FALEVEL == "1"){
			icon = "<i class='fa fa-circle text-danger'></i>";
// 			td1.innerHTML = icon+"치명";
		}else if(result[i].FALEVEL == "2"){
			icon = "<i class='fa fa-circle text-warning'></i>";
// 			td1.innerHTML = icon+"긴급";
			
		}else if(result[i].FALEVEL == "3"){
			icon = "<i class='fa fa-circle text-info'></i>";
// 			td1.innerHTML = icon+"위험";
			
		}else if(result[i].FALEVEL == "4"){
			icon = "<i class='fa fa-circle text-primary'></i>";
// 			td1.innerHTML = icon+"주의";
			
		}else if(result[i].FALEVEL == "5"){
			icon = "<i class='fa fa-circle text-sucess'></i>";
// 			td1.innerHTML = icon+"정보";
		}
		td1.innerHTML = icon+result[i].NETNM;
		
		var td2 = document.createElement("td");
		td2.setAttribute("style", "text-overflow: ellipsis; overflow: hidden; white-space: nowrap;width:50%; text-align:left;");
		td2.setAttribute("title", result[i].TRAPMSG);
		td2.innerHTML = result[i].TRAPMSG;
		
		var td3 = document.createElement("td");
		td3.setAttribute("style", "width:30%; text-align:center;");
		td3.innerHTML = result[i].OCDATE;
		
		var input = document.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("value", result[i].DKEY);
// 		td3.setAttribute("type", "hidden");
		
		
		tr.appendChild(input);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		
		trapList.appendChild(tr);
	}
}


function fn_chart(div, result, key, title){
	var chartData = generateChartData();
	var graphs = [];
	for( var i = 0; i < key.length; i++ )
	{
		console.log(key[i]);
		var graph = {};
		graph = {
		        "useNegativeColorIfDown" : true,
				"balloonText" : "[[title]]: [[value]]</b>",
				"bulletBorderAlpha" : 0,
				"bulletColor" : "#FFFFFF",
// 				"hideBulletsCount" : 50,
// 				"lineThickness" : 2,
				"legendValueText": " ",
				"title": title[i],
				"valueField" : key[i]
		}
		
		graphs.push(graph);
		console.log(graph);
	}
	
	
	
	var chart = AmCharts.makeChart(div, {
	    "type": "serial",
	    "theme": "none",
	    "marginRight": 0,
	    "marginTop": 7,
	    "marginBottom" : 0,
	    "dataProvider": result,
	    "dataDateFormat" : "YYYY-MM-DD JJ:NN",
	    "valueAxes": [{
	        "axisAlpha": 0.2,
	        "dashLength": 1,
	        "position": "left"
	    }],
	    "mouseWheelZoomEnabled": true,
	    "legend": {
			"align" : "center",
	        "maxColumns": 4,
			"fontSize" : 10,
			"autoMargins": false,
			"spacing" : -30,
			"marginTop" : -10,
			"position": "bottom"
	    },
	    "graphs": graphs,
	    "chartCursor": {
	    	"valueLineEnabled" : false,
			"valueLineBalloonEnabled" : false,
			"categoryBalloonDateFormat" : "MMM DD JJ:NN"
	    },
	    "categoryField": "COLDATES",
	    "categoryAxis" : {
			"parseDates" : true,
			"minorGridEnabled" : true,
			"fontSize" : 10,
			"minPeriod" : "mm",
			"dateFormats" : [ {
				period : 'fff',
				format : 'JJ:NN:SS'
			}, {
				period : 'ss',
				format : 'JJ:NN:SS'
			}, {
				period : 'mm',
				format : 'JJ:NN'
			}, {
				period : 'hh',
				format : 'JJ:NN'
			}, {
				period : 'DD',
				format : 'MMM DD'
			}, {
				period : 'WW',
				format : 'MMM DD'
			}, {
				period : 'MM',
				format : 'MMM'
			}, {
				period : 'YYYY',
				format : 'YYYY'
			} ]
// 		},
// 		"export" : {
// 			"enabled" : true,
// 			"position" : "top-left"
		},
	    "export": {
	        "enabled": true
	    }
	});

}
function fn_chartL2(div){
	var chartData = generateChartData();
	console.log(chartData);
	var chart = AmCharts.makeChart(div, {
	    "type": "serial",
	    "theme": "none",
	    "marginRight": 0,
	    "marginTop": 7,
	    "marginBottom" : 0,
	    "dataProvider": chartData,
	    "valueAxes": [{
	        "axisAlpha": 0.2,
	        "dashLength": 1,
	        "position": "left"
	    }],
	    "mouseWheelZoomEnabled": true,
	    "legend": {
			"align" : "center",
	        "maxColumns": 4,
			"fontSize" : 10,
			"autoMargins": false,
			"marginTop" : -10,
			"position": "bottom"
	    },
	    "graphs": [{
	        "id": "g1",
	        "balloonText": "[[title]] : [[value]]",
	        "bulletBorderAlpha": 1,
	        "bulletColor": "#FFFFFF",
	        "hideBulletsCount": 50,
	        "title": "line",
	        "valueField": "visits",
	        "useLineColorForBulletBorder": true,
	    },{
	        "id": "g2",
	        "balloonText": "[[title]] : [[value]]",
	        "bulletBorderAlpha": 1,
	        "bulletColor": "#FFFFFF",
	        "hideBulletsCount": 50,
	        "title": "line",
	        "valueField": "visits",
	        "useLineColorForBulletBorder": true,
	    }],
	    "chartCursor": {
	    	"categoryBalloonEnabled": true,
	   	    "cursorAlpha": 0,
	   	    "zoomable": true
	    },
	    "categoryField": "date",
	    "categoryAxis": {
	        "parseDates": true,
	        "axisColor": "#DADADA",
	        "dashLength": 1,
	        "minorGridEnabled": true
	    },
	    "export": {
	        "enabled": true
	    }
	});

}

function generateChartData() {
    var chartData = [];
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 5);
    var visits = 1200;
    for (var i = 0; i < 1000; i++) {
        // we create date objects here. In your data, you can have date strings
        // and then set format of your dates using chart.dataDateFormat property,
        // however when possible, use date objects, as this will speed up chart rendering.
        var newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);
        
        visits += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);

        chartData.push({
            date: newDate,
            visits: visits
        });
    }
    return chartData;
}


function fn_ack(val) // Dashboard 하단 [알람] 테이블의 row들을 선택 후 우클릭 시, ACK 변경 이벤트
{
	// val 값이 없는 경우 함수 종료
	if ( val == 0 || val == null )
	{
// 		console.log("val is 0 OR val is null");
		return;
	}
	
	// ajax 요청 시 controller에 전달할 데이터를 담을 Array
	var faultArray = new Array();
	
	// ajax 요청 완료 후, 새로고침할 fault 종류를 저장할 변수
	var f_type = "";
	
	// [서버 알람] 테이블에서 실행 시 >> 현재 전체로 변경
	if (val == 1 || val == 2)
	{
// 		var f_type = "server";
		console.log(" ack ");
		$("tr[name='trapTr']").each(function(idx)
		{
			if ( $(this).attr("class").indexOf(" ui-selected") > -1 )
		    {
				var faultInfo = new Object();
				console.log($(this));
		    	faultInfo["DKEY"] 			= 	$(this).children().eq(0).val();
		    	faultInfo["TRAPMSG"] 		= 	$(this).children().eq(2).text();
		    	faultInfo["OCDATE"] 		= 	$(this).children().eq(3).text();
		    	
		    	faultArray.push(faultInfo);
		    }
		});
	}
	console.log(faultArray);
	// 설정된 인자들로 ajax 요청
	$.ajax({
	      url : '/nc/updateFaultAck.do',
	      type : 'POST',
	      data : JSON.stringify(faultArray),
	      dataType : 'json',
	      contentType : "application/json",
	      success : function ( result ) {
	    	  console.log();
	    	  $("#trapList").empty();
	    		// 알람 목록을 새로고침한다.
// 				fn_getDashboardFaultList(  );
// 				fn_getDashboardFaultCount();
	      }
 	 });
	
}

function fn_jTreeMake()
{
	$('#jstree_demo_div1').jstree();
	
// 	$('button').on('click', function () 
// 	{
// 		  $('#jstree').jstree(true).select_node('te');
// 		  $('#jstree').jstree('select_node', 'child_node_1');
// 		  $.jstree.reference('#jstree').select_node('child_node_1');
		  
// 		  fn_jTreeIcon();
// 	});
}

</script>


<body id="page-top" class="sidebar-toggled">

    <!-- Page Wrapper -->
    <div id="wrapper">
 
        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column" style="height:100vh;">

            <!-- Main Content -->
            <div id="content">

                <!-- Topbar -->
                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-3 static-top shadow" style="height:3rem">

                    <!-- Sidebar Toggle (Topbar) -->
                    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                        <i class="fa fa-bars"></i>
                    </button>
                    <div class="text-primary h5 border-left-primary p-0 m-0 pl-4">NPS-IPT 모니터링</div>

                    <!-- Topbar Search
          <form class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div class="input-group h-100">
              <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2">
              <div class="input-group-append">
                <button class="btn btn-primary" type="button">
                  <i class="fa fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form>
          -->

                    <!-- Topbar Navbar -->
                    <ul class="navbar-nav ml-auto">

                        <!-- Nav Item - Search Dropdown (Visible Only XS) -->
                        <li class="nav-item dropdown no-arrow d-sm-none">
                            <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-search fa-fw"></i>
                            </a>
                            <!-- Dropdown - Messages -->
                            <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                                <form class="form-inline mr-auto w-100 navbar-search">
                                    <div class="input-group">
                                        <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2">
                                        <div class="input-group-append">
                                            <button class="btn btn-primary" type="button">
                                                <i class="fa fa-search fa-sm"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </li>

                        <!-- Nav Item - Alerts -->
                        <li class="nav-item dropdown no-arrow mx-1">
                            <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-redo"></i>
                                <!-- Counter - Alerts -->
                                <!--                <span class="badge badge-danger badge-counter">3+</span>-->
                            </a>
                            <!-- Dropdown - Alerts -->
                            <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                                <label class="dropdown-header">
                                    Alerts Center
                                </label>
                                <a class="dropdown-item d-flex align-items-center" href="#">
                                    <div class="mr-3">
                                        <div class="icon-circle bg-primary">
                                            <i class="fa fa-file-alt text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="small text-gray-500">December 12, 2019</div>
                                        <span class="font-weight-bold">A new monthly report is ready to download!</span>
                                    </div>
                                </a>
                                <a class="dropdown-item d-flex align-items-center" href="#">
                                    <div class="mr-3">
                                        <div class="icon-circle bg-success">
                                            <i class="fa fa-donate text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="small text-gray-500">December 7, 2019</div>
                                        $290.29 has been deposited into your account!
                                    </div>
                                </a>
                                <a class="dropdown-item d-flex align-items-center" href="#">
                                    <div class="mr-3">
                                        <div class="icon-circle bg-warning">
                                            <i class="fa fa-exclamation-triangle text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="small text-gray-500">December 2, 2019</div>
                                        Spending Alert: We've noticed unusually high spending for your account.
                                    </div>
                                </a>
                                <a class="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                            </div>
                        </li>

                        <!-- Nav Item - Messages -->
                        <li class="nav-item dropdown no-arrow mx-1">
                            <a class="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-cog"></i> <!-- Counter - Messages -->
                                <!--                <span class="badge badge-danger badge-counter">7</span>-->
                            </a>
                            <!-- Dropdown - Messages -->
                            <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                                <label class="dropdown-header">
                                    Message Center
                                </label>
                                <a class="dropdown-item d-flex align-items-center" href="#">
                                    <div class="dropdown-list-image mr-3">
                                        <img class="rounded-circle" src="https://source.unsplash.com/fn_BT9fwg_E/60x60" alt="">
                                        <div class="status-indicator bg-success"></div>
                                    </div>
                                    <div class="font-weight-bold">
                                        <div class="text-truncate">Hi there! I am wondering if you can help me with a problem I've been having.</div>
                                        <div class="small text-gray-500">Emily Fowler · 58m</div>
                                    </div>
                                </a>
                                <a class="dropdown-item d-flex align-items-center" href="#">
                                    <div class="dropdown-list-image mr-3">
                                        <img class="rounded-circle" src="https://source.unsplash.com/AU4VPcFN4LE/60x60" alt="">
                                        <div class="status-indicator"></div>
                                    </div>
                                    <div>
                                        <div class="text-truncate">I have the photos that you ordered last month, how would you like them sent to you?</div>
                                        <div class="small text-gray-500">Jae Chun · 1d</div>
                                    </div>
                                </a>
                                <a class="dropdown-item d-flex align-items-center" href="#">
                                    <div class="dropdown-list-image mr-3">
                                        <img class="rounded-circle" src="https://source.unsplash.com/CS2uCrpNzJY/60x60" alt="">
                                        <div class="status-indicator bg-warning"></div>
                                    </div>
                                    <div>
                                        <div class="text-truncate">Last month's report looks great, I am very happy with the progress so far, keep up the good work!</div>
                                        <div class="small text-gray-500">Morgan Alvarez · 2d</div>
                                    </div>
                                </a>
                                <a class="dropdown-item d-flex align-items-center" href="#">
                                    <div class="dropdown-list-image mr-3">
                                        <img class="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60" alt="">
                                        <div class="status-indicator bg-success"></div>
                                    </div>
                                    <div>
                                        <div class="text-truncate">Am I a good boy? The reason I ask is because someone told me that people say this to all dogs, even if they aren't good...</div>
                                        <div class="small text-gray-500">Chicken the Dog · 2w</div>
                                    </div>
                                </a>
                                <a class="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                            </div>
                        </li>

                        <div class="topbar-divider d-none d-sm-block"></div>

                        <!-- Nav Item - User Information -->
                        <li class="nav-item dropdown no-arrow">
                            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="mr-2 d-none d-lg-inline text-gray-600 small">관리자님</span>
                                <i class="fa fa-user-circle"></i> </a>
                            <!-- Dropdown - User Information -->
                            <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                                <a class="dropdown-item" href="#">
                                    <i class="fa fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Profile
                                </a>
                                <a class="dropdown-item" href="#">
                                    <i class="fa fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Settings
                                </a>
                                <a class="dropdown-item" href="#">
                                    <i class="fa fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Activity Log
                                </a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                    <i class="fa fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Logout
                                </a>
                            </div>
                        </li>

                    </ul>

                </nav>
                <!-- End of Topbar -->

                <!-- Begin Page Content -->
                <div class="container-fluid" style="height:calc(100vh - 4rem);">
                    <!--

           Page Heading 
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
            <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fa fa-download fa-sm text-white-50"></i> Generate Report</a>
          </div>
-->

                    <!-- Content Row -->
                    <div class="row">
                    	
                    </div>
						
                        <!-- Area Chart -->
                        <div class="col-xl-4 col-lg-7" style="">  
                            <div class="card bg-primary shadow py-2 pl-3 mb-2 text-white" style="height:2.2rem">
                                <div class="font-weight-bold">
                                    <i class="fa fa-circle"></i> 공단본부
                                </div>
                            </div> 
                            <div class="card shadow mb-3" style="height: calc(28% - 2rem);">
                                <!-- Card Header - Dropdown -->
                                <div class="card-header d-flex flex-row align-items-center justify-content-between">
                                    <label class="m-0 font-weight-bold text-primary">통화량 현황</label>
                                    <div class="dropdown no-arrow">
                                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fa fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                        </a>
<!--
                                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                            <div class="dropdown-header">Dropdown Header:</div>
                                            <a class="dropdown-item" href="#">Action</a>
                                            <a class="dropdown-item" href="#">Another action</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#">Something else here</a>
                                        </div>
-->
                                    </div>
                                </div>
                                <!-- Card Body -->
<!--                                 <div class="card-body p-0"> -->
<!--                                    <table class="table table-striped mb-0"> -->
<!--                                         <tr> -->
<!--                                             <th>인입 call</th> -->
<!--                                             <th>발신 call</th> -->
<!--                                             <th>인입량(누적치)</th> -->
<!--                                             <th>발신량(누적치)</th> -->
<!--                                         </tr> -->
<!--                                         <tr> -->
<!--                                             <td>14</td> -->
<!--                                             <td>44</td> -->
<!--                                             <td>30681</td> -->
<!--                                             <td>16306</td> -->
<!--                                         </tr> -->
<!--                                     </table> -->
<!--                                     <div class=""  style="height: calc(100% - 1.5rem);"> -->
<!--                                         <div class="bg-light h-100" style="" id="chart1"> -->
<!--                                         </div> -->
<!--                                     </div> -->
<!--                                 </div> -->
                                <div class="card-body p-0">
                                	<table class="table table-striped mb-0">
                                        <tr>
                                            <th>전체호수(소통율)</th>
                                            <th>완료호수(소통율)</th>
                                            <th>평균 R</th>
                                            <th></th>
                                        </tr>
                                        <tr>
                                            <td id="ALL1" style="text-align:right;"></td>
                                            <td id="CLEAR1" style="text-align:right;"></td>
                                            <td id="AVGR1" style="text-align:right;"></td>
                                        </tr>
                                    </table>
                                    <div class="bg-light w-100" style="width:100%;height: calc(100% - 3.5rem);" id="chart1">
                                    </div>
<!--                                     <ul class="d-flex m-auto justify-content-around"> -->
<!--                                         <li class="w-25 list-group"><span class="bg-danger" style="display:inline;width:10px;height:3px;"></span>Bps 정보</li> -->
<!--                                         <li class="w-25 list-group"><span class="bg-success" style="display:inline;width:10px;height:3px;"></span>Sip Bps 정보</li> -->
<!--                                         <li class="w-25 list-group"><span class="bg-warning" style="display:inline;width:10px;height:3px;"></span>RTP Bps정보</li> -->
<!--                                     </ul> -->
                                </div>
                            </div>


                            <div class="card shadow mb-3" style="    height: calc(27% - 2rem);">
                                <!-- Card Header - Dropdown -->
                                <div class="card-header d-flex flex-row align-items-center justify-content-between">
                                    <label class="m-0 font-weight-bold text-primary">통화품질현황</label>
                                    <div class="dropdown no-arrow">
                                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fa fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                            <div class="dropdown-header">Dropdown Header:</div>
                                            <a class="dropdown-item" href="#">Action</a>
                                            <a class="dropdown-item" href="#">Another action</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </div>
                                </div>
                                <!-- Card Body -->
                                <div class="card-body p-0" style="display:flex;">
                                    <div class="" style="width:70%;">
                                        <div class="bg-light" style="height: calc(100%);" id="chart2">
                                        </div>
                                    </div>
                                    <div class="" style="width:30%;">
                                        <table class=" w-100 table-striped text-center">
                                            <tr>
                                                <th colspan="2">품질기준</th>
                                            </tr>
                                            <tr>
                                                <th>Best</th>
                                                <td>90~100</td>
                                            </tr>
                                            <tr>
                                                <th>High</th>
                                                <td>80~89</td>
                                            </tr>
                                            <tr>
                                                <th>Medium</th>
                                                <td>70~79</td>
                                            </tr>
                                            <tr>
                                                <th>Low</th>
                                                <td>60~69</td>
                                            </tr>
                                            <tr>
                                                <th>Poor</th>
                                                <td>50~59</td>
                                            </tr>
                                        </table>
                                    </div>
                                    
                                </div>
                            </div>

                            <div class="card shadow mb-3" style=" height: calc(22.5% - 1.5rem);">
                                <!-- Card Header - Dropdown -->
                                <div class="card-header d-flex flex-row align-items-center justify-content-between">
                                    <label class="m-0 font-weight-bold text-primary">통화장애건수</label>
                                    <div class="dropdown no-arrow">
                                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fa fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                            <div class="dropdown-header">Dropdown Header:</div>
                                            <a class="dropdown-item" href="#">Action</a>
                                            <a class="dropdown-item" href="#">Another action</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </div>
                                </div>
                                <!-- Card Body -->
                                <div class="card-body p-0" style="display:flex;">
                                    <div class="" style=" width:70%;">
                                        
                                        <div class="bg-light" style="height: calc(100%);" id="chart3">
                                        </div>
                                    </div>
                                    <div class="" style="width:30%;">
                                        <table class=" w-100 table-striped text-center">
                                            <tr>
                                                <th colspan="2">에러판정기준</th>
                                            </tr>
                                            <tr>
                                                <th style="letter-spacing: -.1rem;">R값 임계치</th>
                                                <td id="RVALUETHRESHOLD1"></td>
                                            </tr>
                                            <tr>
                                                <th>Critical</th>
                                                <td id="CRITICAL1"></td>
                                            </tr>
                                            <tr>
                                                <th>Major</th>
                                                <td id="MAJOR1"></td>
                                            </tr>
                                            <tr>
                                                <th>Warning</th>
                                                <td id="WARNING1"></td>
                                            </tr> 
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div class="card shadow mb-3"  style=" height: calc(22.5% - 1rem);">
                                <!-- Card Header - Dropdown -->
                                <div class="card-header d-flex flex-row align-items-center justify-content-between">
                                    <label class="m-0 font-weight-bold text-primary">회선 사용현황(본부->통신사업자)</label>
                                    <div class="dropdown no-arrow">
                                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fa fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                            <div class="dropdown-header">Dropdown Header:</div>
                                            <a class="dropdown-item" href="#">Action</a>
                                            <a class="dropdown-item" href="#">Another action</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </div>
                                </div>
                                <!-- Card Body -->
                                <div class="card-body p-0">
                                    <div class=""  style="height: calc(100%);">
                                        <div class="bg-light h-100" style="" id="chart4">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Pie Chart -->
                        <div class="col-xl-4 col-lg-5"> 
                            <div class="card bg-info shadow py-2 pl-3 mb-2 text-white" style="height:2.2rem" >
                                <div class="font-weight-bold">
                                    <i class="fa fa-circle"></i> IP-PBX 모니터링
                                </div>
                            </div> 
                            <div class="card shadow mb-3" style="height: calc(33.33% - 2rem);">
                                <!-- Card Header - Dropdown -->
                                <div class="card-header d-flex flex-row align-items-center justify-content-between">
                                    <label class="m-0 font-weight-bold text-info">본부 IP-PBX System</label>
                                    <div class="dropdown no-arrow">
                                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fa fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                            <div class="dropdown-header">Dropdown Header:</div>
                                            <a class="dropdown-item" href="#">Action</a>
                                            <a class="dropdown-item" href="#">Another action</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </div>
                                </div>
                                <!-- Card Body -->
                                <div class="card-body p-0">
                                    <div class="" style="display:flex;justify-content: space-around; height:75%;'">
                                        <img class="mb-2"  height="120" src="/images/device1.gif" alt="">
<!--                                    <i class="fa fa-memory" style="font-size:4rem"></i><i class="fa fa-exchange-alt" style="font-size:4rem"></i><i class="fa fa-memory" style="font-size:4rem"></i>-->
                                    </div>
                                    <table class="table table-striped">
                                        <tr>
                                            <th>CPU</th>
                                            <th>메모리</th>
                                            <th>파일시스템</th>
                                            <th>등록단말수</th>
                                            <th>등록 M/G</th>
                                        </tr>
                                        <tr>
                                            <td style="text-align:center;" id="CPU1"></td>
                                            <td style="text-align:center;" id="MEM1"></td>
                                            <td style="text-align:center;" id="FS1"></td>
                                            <td style="text-align:center;" id="IPTCNT1" onclick="fn_deviceIPT(1)"></td>
                                            <td style="text-align:center;" id="MG1" onclick="fn_deviceIPT(1)"></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div class="card shadow mb-3" style="height: calc(33.33% - 2rem);">
                                <!-- Card Header - Dropdown -->
                                <div class="card-header d-flex flex-row align-items-center justify-content-between">
                                    <label class="m-0 font-weight-bold text-info">서울 콜센터 IP-PBX System</label>
                                    <div class="dropdown no-arrow">
                                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fa fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                            <div class="dropdown-header">Dropdown Header:</div>
                                            <a class="dropdown-item" href="#">Action</a>
                                            <a class="dropdown-item" href="#">Another action</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </div>
                                </div>
                                <!-- Card Body -->
                                <div class="card-body p-0">
                                    <div class="mb-2" style="display:flex;justify-content: space-around;height:70%;">
                                        <img class="" height="120" src="/images/device1.gif" alt=""> 
                                    </div>
                                    <table class="table table-striped">
                                        <tr>
                                            <th>CPU</th>
                                            <th>메모리</th>
                                            <th>파일시스템</th>
                                            <th>등록단말수</th>
                                            <th>등록 M/G</th>
                                        </tr>
                                        <tr>
                                            <td style="text-align:center;" id="CPU2"></td>
                                            <td style="text-align:center;" id="MEM2"></td>
                                            <td style="text-align:center;" id="FS2"></td>
                                            <td style="text-align:center;" id="IPTCNT2" onclick="fn_deviceIPT(2)"></td>
                                            <td style="text-align:center;" id="MG2" onclick="fn_deviceIPT(2)">\</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div class="card shadow mb-3" style="height: calc(33.33% - 1.5rem);"> 
                                <!-- Card Header - Dropdown -->
                                <div class="card-header d-flex flex-row align-items-center justify-content-between">
                                    <label class="m-0 font-weight-bold text-info">이벤트 뷰어</label> 
                                    <span class="float-right">
	                                    <span style="margin-right : 10px;"><i class="fa fa-circle text-sucess"></i>정보</span>
	                                    <span style="margin-right : 10px;"><i class="fa fa-circle text-primary"></i>주의 </span>
	                                    <span style="margin-right : 10px;"><i class="fa fa-circle text-info"></i>위험 </span>
	                                    <span style="margin-right : 10px;"><i class="fa fa-circle text-warning"></i>긴급 </span>
	                                    <span style="margin-right : 10px;"><i class="fa fa-circle text-danger"></i>치명</span>
                                    </span>
                                    <div class="dropdown no-arrow">
                                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fa fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                            <div class="dropdown-header">Dropdown Header:</div>
                                            <a class="dropdown-item" href="#">Action</a>
                                            <a class="dropdown-item" href="#">Another action</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Card Body -->
                                <div class="card-body p-0" style="height:2rem;">
                                    <table class="table table-striped" >
                                    	<thead>
                                        <tr>
                                            <td style="width:20%; text-align:center;">센터명</td>
                                            <td style="width:50%; text-align:center;">이벤트내용</td>
                                            <td style="width:30%; text-align:center;">날짜</td>
                                        </tr>
                                    	</thead>
                                    </table>
                                </div>
                                <div class="card-body p-0" style="height:15rem; overflow-y: scroll">
                                    <table class="table table-striped" style="table-layout:fixed;" id="trapTable" >
<!--                                         <tr> -->
<!--                                             <th>센터명</th> -->
<!--                                             <th>이벤트내용</th> -->
<!--                                             <th>날짜</th> -->
<!--                                         </tr> -->
                                        <tbody id="trapList">
<!--                                         <tr> -->
<!--                                             <td style="width:20%; text-align:left;"><i class="fa fa-circle text-sucess pr-2"></i>상주상담센터</td> -->
<!--                                             <td style="width:50%; text-align:left;">Notify that FXO port is connected...</td> -->
<!--                                             <td style="width:30%; text-align:center;">2019-04-11 11:13</td> -->
<!--                                         </tr> -->
<!--                                         <tr> -->
<!--                                             <td><i class="fa fa-circle text-primary pr-2"></i>상주상담센터</td> -->
<!--                                             <td>Notify that FXO port is connected...</td> -->
<!--                                             <td>2019-04-11 11:13</td> -->
<!--                                         </tr> -->
<!--                                         <tr> -->
<!--                                             <td><i class="fa fa-circle text-warning pr-2"></i>상주상담센터</td> -->
<!--                                             <td>Notify that FXO port is connected...</td> -->
<!--                                             <td>2019-04-11 11:13</td> -->
<!--                                         </tr> -->
<!--                                         <tr> -->
<!--                                             <td><i class="fa fa-circle text-warning pr-2"></i>상주상담센터</td> -->
<!--                                             <td>Notify that FXO port is connected...</td> -->
<!--                                             <td>2019-04-11 11:13</td> -->
<!--                                             </tr> -->
                                            
<!--                                         <tr> -->
<!--                                             <td><i class="fa fa-circle text-sucess pr-2"></i>상주상담센터</td> -->
<!--                                             <td>Notify that FXO port is connected...</td> -->
<!--                                             <td>2019-04-11 11:13</td> -->
<!--                                         </tr> -->
<!--                                         <tr> -->
<!--                                             <td><i class="fa fa-circle text-primary pr-2"></i>상주상담센터</td> -->
<!--                                             <td>Notify that FXO port is connected...</td> -->
<!--                                             <td>2019-04-11 11:13</td> -->
<!--                                         </tr> -->
<!--                                         <tr> -->
<!--                                             <td><i class="fa fa-circle text-warning pr-2"></i>상주상담센터</td> -->
<!--                                             <td>Notify that FXO port is connected...</td> -->
<!--                                             <td>2019-04-11 11:13</td> -->
<!--                                         </tr> -->
<!--                                         <tr> -->
<!--                                             <td><i class="fa fa-circle text-warning pr-2"></i>상주상담센터</td> -->
<!--                                             <td>Notify that FXO port is connected...</td> -->
<!--                                             <td>2019-04-11 11:13</td> -->
<!--                                         </tr> -->
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>

                        <!-- Pie Chart -->
                        <!-- Area Chart -->
                        <div class="col-xl-4 col-lg-7"> 
                            <div class="card bg-success shadow py-2 pl-3 mb-2 text-white" style="height:2.2rem">
                                <div class="font-weight-bold">
                                    <i class="fa fa-circle"></i> 서울 콜센터
                                </div> 
                            </div>
                            <div class="card shadow mb-3" style="    height: calc(28% - 2rem);">
                                <!-- Card Header - Dropdown -->
                                <div class="card-header d-flex flex-row align-items-center justify-content-between">
                                    <label class="m-0 font-weight-bold text-success">통화량 현황</label>
                                    <div class="dropdown no-arrow">
                                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fa fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                            <div class="dropdown-header">Dropdown Header:</div>
                                            <a class="dropdown-item" href="#">Action</a>
                                            <a class="dropdown-item" href="#">Another action</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </div>
                                </div>
                                <!-- Card Body -->
                                <div class="card-body p-0">
                                   <table class="table table-striped mb-0">
                                        <tr>
                                            <th>전체호수(소통율)</th>
                                            <th>완료호수(소통율)</th>
                                            <th>평균 R</th>
                                            <th></th>
                                        </tr>
                                        <tr>
                                            <td id="ALL2" style="text-align:right;"></td>
                                            <td id="CLEAR2" style="text-align:right;"></td>
                                            <td id="AVGR2" style="text-align:right;"></td>
                                        </tr>
                                    </table>
                                    
                                    <div class="bg-light" style="height:calc(100% - 3.5rem)" id="chart5">
                                    </div>
                                </div>
                            </div>


                            <div class="card shadow mb-3" style="    height: calc(27% - 2rem);">
                                <!-- Card Header - Dropdown -->
                                <div class="card-header d-flex flex-row align-items-center justify-content-between">
                                    <label class="m-0 font-weight-bold text-success">통화품질현황</label>
                                    <div class="dropdown no-arrow">
                                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fa fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                            <div class="dropdown-header">Dropdown Header:</div>
                                            <a class="dropdown-item" href="#">Action</a>
                                            <a class="dropdown-item" href="#">Another action</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </div>
                                </div>
                                <!-- Card Body -->

                                <div class="card-body p-0" style="display:flex;">
                                    <div class="" style="width:70%;">
                                        <div class="bg-light" style="height: calc(100%);" id="chart6">
                                        </div>
                                    </div>
                                    <div style="width:30%">
                                        <table class=" w-100 table-striped text-center">
                                            <tr>
                                                <th colspan="2">품질기준</th>
                                            </tr>
                                            <tr>
                                                <th>Best</th>
                                                <td>90~100</td>
                                            </tr>
                                            <tr>
                                                <th>High</th>
                                                <td>80~89</td>
                                            </tr>
                                            <tr>
                                                <th>Medium</th>
                                                <td>70~79</td>
                                            </tr>
                                            <tr>
                                                <th>Low</th>
                                                <td>60~69</td>
                                            </tr>
                                            <tr>
                                                <th>Poor</th>
                                                <td>50~59</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                
                            </div>

                            <div class="card shadow mb-3" style="    height: calc(22.5% - 1.5rem);">
                                <!-- Card Header - Dropdown -->
                                <div class="card-header d-flex flex-row align-items-center justify-content-between" >
                                    <label class="m-0 font-weight-bold text-success">통화장애건수</label>
                                    <div class="dropdown no-arrow">
                                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fa fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                            <div class="dropdown-header">Dropdown Header:</div>
                                            <a class="dropdown-item" href="#">Action</a>
                                            <a class="dropdown-item" href="#">Another action</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </div>
                                </div>
                                <!-- Card Body -->

                                <div class="card-body p-0" style="display:flex;">
                                    <div class="" style="width:70%;">
                                        <div class="bg-light" style="height: calc(100%);" id="chart7">
                                        </div>
                                    </div>
                                    <div class="" style="width:30%;">
                                        <table class=" w-100 table-striped text-center">
                                            <tr>
                                                <th colspan="2">에러판정기준</th>
                                            </tr>
                                            <tr>
                                                <th>R값 임계치</th>
                                                <td>80.00</td>
                                            </tr>
                                            <tr>
                                                <th>Critical</th>
                                                <td>21%~100%</td>
                                            </tr>
                                            <tr>
                                                <th>Major</th>
                                                <td>16%~20%</td>
                                            </tr>
                                            <tr>
                                                <th>Warning</th>
                                                <td>10%~15%</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>

							<div class="card shadow mb-3"  style=" height: calc(22.5% - 1rem);">
                                <div class="card-header d-flex flex-row align-items-center justify-content-between">
                                    <label class="m-0 font-weight-bold text-success">회선 사용현황(서울콜센터->통신사업자)</label>
                                    <div class="dropdown no-arrow">
                                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fa fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                            <div class="dropdown-header">Dropdown Header:</div>
                                            <a class="dropdown-item" href="#">Action</a>
                                            <a class="dropdown-item" href="#">Another action</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body p-0">
                                    <div class=""  style="height: calc(100%);">
                                        <div class="bg-light h-100" style="" id="chart8">
                                        </div>
                                    </div>
                                </div>
                            </div>
							
<!--                             <div class="card shadow mb-3"  style=" height: calc(22.5% - 1rem);"> -->
<!--                                 <div class="card-header d-flex flex-row align-items-center justify-content-between" > -->
<!--                                     <label class="m-0 font-weight-bold text-success">회선 사용현황(서울콜센터->통신사업자)</label> -->
<!--                                     <div class="dropdown no-arrow"> -->
<!--                                         <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> -->
<!--                                             <i class="fa fa-ellipsis-v fa-sm fa-fw text-gray-400"></i> -->
<!--                                         </a> -->
<!--                                         <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink"> -->
<!--                                             <div class="dropdown-header">Dropdown Header:</div> -->
<!--                                             <a class="dropdown-item" href="#">Action</a> -->
<!--                                             <a class="dropdown-item" href="#">Another action</a> -->
<!--                                             <div class="dropdown-divider"></div> -->
<!--                                             <a class="dropdown-item" href="#">Something else here</a> -->
<!--                                         </div> -->
<!--                                     </div> -->
<!--                                 </div> -->
<!--                                 <div class="card-body p-0"> -->
<!--                                 	<div class=""  style="height: calc(100%);"> -->
<!--                                         <div class="" style="height: calc(100%);" id="chart8"> -->
<!--                                     </div> -->
<!--                                     </div> -->
                                    
<!--                                 </div> -->
<!--                             </div> -->
                        </div>
                    </div>

                    <!-- Content Row -->
                    

                </div>
                <!-- /.container-fluid -->

            </div>
            <!-- End of Main Content -->

            <!-- Footer -->
<!--             <footer class="sticky-footer bg-white"> -->
<!--                 <div class="container my-auto"> -->
<!--                     <div class="copyright text-center my-auto"> -->
<!--                         <span>Copyright &copy; NextcoreTechnology 2019</span> -->
<!--                     </div> -->
<!--                 </div> -->
<!--             </footer> -->
            <!-- End of Footer -->

        </div>
        <!-- End of Content Wrapper -->

    </div>
    <!-- End of Page Wrapper -->
 

    <!-- Logout Modal-->
    <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <a class="btn btn-primary" href="login.html">Logout</a>
                </div>
            </div>
        </div>
    </div>

 

</body>

</html>


