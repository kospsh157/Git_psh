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



	 // deviceSearch
	
	
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



// <script> ~   내가 만든 ajax 바로 위까지만 놓으면 됨</script> 