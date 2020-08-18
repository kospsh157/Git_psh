<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<jsp:include page="/WEB-INF/views/portal/common/header.jsp"></jsp:include>
<script language="javascript" type="text/javascript" src="/resources/js/serialize-json.jquery.js"></script>

<body id="page-top">
<!-- 기본 레이아웃 -->
<div id="wrapper">


    
    <!-- 기본 레이아웃 -->
    <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
            <div class="container-fluid page-body-wrapper vh-100">
                <!-- 대시보드 메인 컨텐츠 시작 -->
                <div class="platform-dashboard h-100">
                 <form id="SearchForm" class="form-horizontal" accept-charset="utf-8" method="post">
                    <div class="row">
                        <div class="col-xl-12 mb-3">
                            <div class="card p-3">
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-itemactive" aria-current="page">
                                          
                                        </li>

                                    </ol>
                                </nav>
                            </div>
                        </div>
	                    <div class="col-xl-12 mb-3">
	                            <div class="card">
	                                <div class="card-body">
	                                    <div class="row align-items-center px-2">
	                                        <div class="col-4 row align-items-center py-2">
	                                            <div class="col-auto">
	                                                <i class="fas fa-angle-right text-primary pr-1"></i>기간
	                                            </div>
	                                            <div class="col-10 d-flex align-items-center">
	                                                <div class="input-group">
	                                                    <input type="text" class="form-control" name="fromDate" id="fromDate" autocomplete="off">
	                                                    <div class="input-group-append">
	                                                        <span class="input-group-text bg-white"> <i class="fas fa-calendar-alt"></i></span>
	                                                    </div>
	                                                </div>
	                                                <div class="px-2">~</div>
	                                                <div class="input-group">
	                                                    <input type="text" class="form-control" name="toDate" id="toDate" autocomplete="off">
	                                                    <div class="input-group-append">
	                                                        <span class="input-group-text bg-white"> <i class="fas fa-calendar-alt"></i></span>
	                                                    </div>
	                                                </div>
	                                            </div>
	                                        </div>
	                                        <div class="col-auto row align-items-center py-2">
												<div class="col-auto">
													<i class="fas fa-angle-right text-primary pr-2"></i>DEVICE
												</div>
												<div class="col-auto d-flex align-items-center">
													<div class="d-flex">
														<div class="custom-control custom-checkbox custom-control-inline">
														
															<select class="form-control" id="device" name="device">
			                                                    
                                               				 </select>
														</div>
														
														
													</div>
												</div>
											</div>
										
											<div class="col-auto row align-items-center py-2">
												<div class="col-auto">
													<i class="fas fa-angle-right text-primary pr-2"></i>SLOT
												</div>
												<div class="col-auto d-flex align-items-center">
													<div class="d-flex">
														<div class="custom-control custom-checkbox custom-control-inline">
														
															<select class="form-control" id="slot" name="slot">
			                                                   
                                               				 </select>
														</div>
														
														
													</div>
												</div>
											</div>
											<div class="col-auto row align-items-center py-2">
												<div class="col-auto">
													<i class="fas fa-angle-right text-primary pr-2"></i>PORT
												</div>
												<div class="col-auto d-flex align-items-center">
													<div class="d-flex">
														<div class="custom-control custom-checkbox custom-control-inline">
															<select class="form-control" id="port" name="port">
			                                                    <option value="1">관리</option>
			                                                    <option value="0">비관리</option>
                                               				 </select>
														</div>
													</div>
												</div>
											</div>
										</div>
										 <div class="col-xl-12 mb-3">
	                                        <div class="ml-auto col-auto py-2">
	                                            <input type="button" class="btn btn-primary float-right w-sm-100" value="검색" onclick="fn_culMultiGraph();">
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
                    </div>
                </form>
					<div class="col-12">
                          <div class="card">
                              <div class="card-header">
                                  <h5 class="">샘플 그래프</h5>
                              </div>
                              <div class="card-body">
                                  <div class="h-100" id="daily_chart1"></div>
                              </div>
                          </div>
                      </div>
                      <div class="col-12">
                          <div class="card">
                              <div class="card-header">
                                  <h5 class="">샘플 그래프2</h5>
                              </div>
                              <div class="card-body">
                                  <div class="h-100" id="daily_chart2"></div>
                              </div>
                          </div>
                      </div>
                      <div class="col-12">
                          <div class="card">
                              <div class="card-header">
                                  <h5 class="">샘플 그래프3</h5>
                              </div>
                              <div class="card-body">
                                  <div class="h-100" id="daily_chart3"></div>
                              </div>
                          </div>
                      </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
<!-- Amchart JS -->
<script src="/resources/vendor/amcharts4/core.js"></script>
<script src="/resources/vendor/amcharts4/charts.js"></script>
<script src="/resources/vendor/amcharts4/themes/animated.js"></script>
<script>


$(document).ready(function () {
	var now = new Date();

	$('#fromDate').datepicker({
		autoclose: true,
		//"dateFormat": "yy-mm-dd"
		"dateFormat": "2020-01-27"
	}).datepicker('setDate', now);

	$('#toDate').datepicker({
		autoclose: true,
		//"dateFormat": "yy-mm-dd"
			"dateFormat": "2020-01-27"
	}).datepicker('setDate', now);
	
	
	
	 $('#device').click(function() {
       
		  $('#slot').empty();
	      $('#port').empty();
	      fn_getSLOT();
        
      }); 
	 $('#slot').click(function() {
	       
		 $('#port').empty();
         fn_getPort();
        
      }); 
	
	fn_searchDatePeriod('fromDate', 'toDate');
	fn_getDevice(1);
	
	
	//fn_culGraph();  //단일그래프
	fn_culMultiGraph(1);  //컬럼 다중 그래프
	
});


function fn_searchDatePeriod(date1, date2) {		
	 var nowDate = new Date();
	 var year = nowDate.getFullYear();
	 var month = nowDate.getMonth() + 1;
	 month = month < 10 ? '0'+month : month;
	 var day = nowDate.getDate();
	 day = day < 10 ? '0'+day : day;
	 nowDate = year + "-" + month + "-" + day;
	 
	 $('#'+date1).change(function () {				 
		 if (this.value > nowDate) {
			 alert("You can search only today or past date.");
        	$(this).val(nowDate);
        	return;
        }        
    });
	 
	 $('#'+date2).change(function () {			
		  if (this.value > nowDate) {
			  alert("You can search only today or past date.");
        	$(this).val(nowDate);
        	return;
        }        
    });
	 
	 $('#'+date1).change(function () {
		 if($('#'+date2).val() != '' && $('#'+date2).val() < $('#'+date1).val()) {
			 alert("The search period setting is incorrect.");
				$('#'+date1).val('');
				return;
		}			
	 });
	 
	 $('#'+date2).change(function () {
		 if($('#'+date2).val() != '' && $('#'+date2).val() < $('#'+date1).val()) {
			 alert("The search period setting is incorrect.");
				$(this).val(nowDate);
				return;
		}			
	 });
}


function fn_getDevice(first) {


	$.ajax({
		url: '/dashboard/getDevice.do',
		type: "POST",
		success: function (result) {
			

		var html ="";
		
			
		for(var i=0; i<result.length; i++){
			
			html +='<option value='+ result[i].DKEY+ '>'+result[i].SYSNAME+'</option>'
			
		}
		$("#device").html(html);
		
		 $('#slot').empty();
	      $('#port').empty();
	    
		fn_getSLOT(first);
			$(".loading-wrap").removeClass("show");
		},
		error: function (request, status, error) {
			alert("code:" + request.status + "\n" + "message:"
					+ request.responseText + "\n" + "error:" + error);
			$(".loading-wrap").removeClass("show");
		}
	});
}


function fn_getSLOT(first) {

	var dkey = $("#device").val();
	$("#slot").empty();
	$.ajax({
		url: '/dashboard/getSlot.do',
		data: {"DKEY" : dkey},
		type: "POST",
		success: function (result) {
			
			
			var html ="";
			
			
			for(var i=0; i<result.length; i++){
				html +='<option value='+ result[i].SLOT_NUM+ '>'+result[i].SLOT_NUM+'</option>'
				
			}
			$("#slot").html(html);
			
		  
			fn_getPort(first);
			
			
			
			$(".loading-wrap").removeClass("show");
		},
		error: function (request, status, error) {
			alert("code:" + request.status + "\n" + "message:"
					+ request.responseText + "\n" + "error:" + error);
			$(".loading-wrap").removeClass("show");
		}
	});
}


function fn_getPort(first) {


	
	var sendObject = $('#SearchForm').serializeJSON();


	sendObject.dkey = $("#device").val();
	sendObject.slot = $("#slot").val();
	
	var jsonData = JSON.stringify(sendObject);
	jQuery.ajaxSettings.traditional = true;
	
	
	$("#port").empty();
	$.ajax({
		url: '/dashboard/getPort.do',
		data: {"jsonData" : jsonData},
		type: "POST",
		success: function (result) {
						
			var html ="";
			
			
			for(var i=0; i<result.length; i++){
				html +='<option value='+ result[i].PORT_NUM+ '>'+result[i].PORT_NUM+'</option>'
				
			}
			$("#port").html(html);
			
			if(first ==1){
				fn_culMultiGraph(1);  //컬럼 다중 그래프
			}
		
			
			
			$(".loading-wrap").removeClass("show");
		},
		error: function (request, status, error) {
			alert("code:" + request.status + "\n" + "message:"
					+ request.responseText + "\n" + "error:" + error);
			$(".loading-wrap").removeClass("show");
		}
	});
}

/* 단일 그래프 */
function fn_culGraph(first) {
	var sendObject = $('#SearchForm').serializeJSON();


	sendObject.fromDate =  $("#fromDate").val();
	sendObject.toDate =  $("#toDate").val();
	
	if(first ==1){
		sendObject.fromDate = "2020-01-27";
		sendObject.toDate =  "2020-01-27";
		
	}
	sendObject.device = $("#device").val();
	sendObject.slot =  $("#slot").val();
	sendObject.port =  $("#port").val();

	var jsonData = JSON.stringify(sendObject);
	jQuery.ajaxSettings.traditional = true;

	

	$.ajax({
		url: '/dashboard/dataList.do',
		data: {"jsonData" : jsonData},
		type: "POST",
		success: function (result) {
			
			if (result.length > 0) {
				
				fn_lineChart1("daily_chart1", result, "CHARTTIME");
			} else {
				var html = "<div class='d-flex justify-content-center align-items-center h-100'><i class='fas fa-info-circle pr-2'></i>No Data. </div>";
				$("#div_daily_chart1").html(html);
			}
			
			$(".loading-wrap").removeClass("show");
		},
		error: function (request, status, error) {
			alert("code:" + request.status + "\n" + "message:"
					+ request.responseText + "\n" + "error:" + error);
			$(".loading-wrap").removeClass("show");
		}
	});
}

function fn_lineChart1(div, result, category){
	var chart = am4core.create(div, am4charts.XYChart);
	chart.data = result;
	chart.dateFormatter.inputDateFormat = "yyyyMMddHHmmss";

	// Create axes
	var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
	dateAxis.tooltipDateFormat = "HH:mm, d MMMM";
	var daxisTooltip = dateAxis.tooltip;
	daxisTooltip.background.fill = "#c6dfb8";
	daxisTooltip.background.strokeWidth = 0;
	daxisTooltip.background.cornerRadius = 3;
	daxisTooltip.background.pointerLength = 0;
	daxisTooltip.dy = 5;

	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
	var vaxisTooltip = valueAxis.tooltip;
	vaxisTooltip.background.fill = "#c6dfb8";
	vaxisTooltip.background.strokeWidth = 0;
	vaxisTooltip.background.cornerRadius = 3;
	vaxisTooltip.background.pointerLength = 0;
	vaxisTooltip.dx = 5;

	

	var series = chart.series.push(new am4charts.LineSeries());  //실제 값 넣어주기 
	series.name = "PBA";
	series.dataFields.dateX = category;
	series.dataFields.valueY = "PBA";
	series.tooltipText = "PBA"+" / "+"{CURRENTDATE}"+" / "+"{valueY.value}";
	series.fill = am4core.color("#767fde");
	series.stroke = am4core.color("#767fde");
	series.strokeWidth = 1.5;

			

	chart.cursor = new am4charts.XYCursor();
	chart.cursor.xAxis = dateAxis;
	chart.cursor.yAxis = valueAxis;
	chart.legend = new am4charts.Legend();
	chart.legend.parent = chart.plotContainer;
	chart.legend.zIndex = 100;
	dateAxis.renderer.grid.template.strokeOpacity = 0.07;
	valueAxis.renderer.grid.template.strokeOpacity = 0.07;
}

/* 다중 컬럼 그래프 */
function fn_culMultiGraph(first) {
	
	fn_culGraph(first);
	var sendObject = $('#SearchForm').serializeJSON();

	sendObject.fromDate =  $("#fromDate").val();
	sendObject.toDate =  $("#toDate").val();
	
	if(first ==1){
		sendObject.fromDate = "2020-01-27";
		sendObject.toDate =  "2020-01-27";
		
	}
	sendObject.device = $("#device").val();
	sendObject.slot =  $("#slot").val();
	sendObject.port =  $("#port").val();

	var jsonData = JSON.stringify(sendObject);
	jQuery.ajaxSettings.traditional = true;

	$.ajax({
		url: '/dashboard/dataList.do',
		data: {"jsonData" : jsonData},
		type: "POST",
		success: function (result) {
			
			if (result.length > 0) {
				
				fn_lineChart2("daily_chart2", result, "CHARTTIME");
				fn_lineChart3("daily_chart3", result, "CHARTTIME");
			} else {
				var html = "<div class='d-flex justify-content-center align-items-center h-100'><i class='fas fa-info-circle pr-2'></i>No Data. </div>";
				$("#div_daily_chart1").html(html);
			}
			
			$(".loading-wrap").removeClass("show");
		},
		error: function (request, status, error) {
			alert("code:" + request.status + "\n" + "message:"
					+ request.responseText + "\n" + "error:" + error);
			$(".loading-wrap").removeClass("show");
		}
	});
}

function fn_lineChart2(div, result, category){
	var chart = am4core.create(div, am4charts.XYChart);
	chart.data = result;
	chart.dateFormatter.inputDateFormat = "yyyyMMddHHmmss";

	// Create axes
	var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
	dateAxis.tooltipDateFormat = "HH:mm, d MMMM";
	var daxisTooltip = dateAxis.tooltip;
	daxisTooltip.background.fill = "#c6dfb8";
	daxisTooltip.background.strokeWidth = 0;
	daxisTooltip.background.cornerRadius = 3;
	daxisTooltip.background.pointerLength = 0;
	daxisTooltip.dy = 5;

	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
	var vaxisTooltip = valueAxis.tooltip;
	vaxisTooltip.background.fill = "#c6dfb8";
	vaxisTooltip.background.strokeWidth = 0;
	vaxisTooltip.background.cornerRadius = 3;
	vaxisTooltip.background.pointerLength = 0;
	vaxisTooltip.dx = 5;

	
	
	var series = chart.series.push(new am4charts.LineSeries());
	series.name = "PBA";
	series.dataFields.dateX = category;
	series.dataFields.valueY = "PBA";
	series.tooltipText = "PBA"+" / "+"{CURRENTDATE}"+" / "+"{valueY.value}";
	series.fill = am4core.color("#767fde");
	series.stroke = am4core.color("#767fde");
	series.strokeWidth = 1.5;

	var series2 = chart.series.push(new am4charts.LineSeries());
	series2.name = "TPBU";
	series2.dataFields.dateX = category;
	series2.dataFields.valueY = "TPBU";
	series2.tooltipText = "TPBU"+" / "+"{CURRENTDATE}"+" / "+"{valueY.value}";
	series2.fill = am4core.color("#35a98b");
	series2.stroke = am4core.color("#35a98b");
	series2.strokeWidth = 1.5;

	var series3 = chart.series.push(new am4charts.LineSeries());
	series3.name = "RPBU";
	series3.dataFields.dateX = category;
	series3.dataFields.valueY = "RPBU";
	series3.tooltipText = "RPBU"+" / "+"{CURRENTDATE}"+" / "+"{valueY.value}";
	series3.fill = am4core.color("yellow");
	series3.stroke = am4core.color("yellow");
	series3.strokeWidth = 1.5;
	
	chart.cursor = new am4charts.XYCursor();
	chart.cursor.xAxis = dateAxis;
	chart.cursor.yAxis = valueAxis;
	chart.legend = new am4charts.Legend();
	chart.legend.parent = chart.plotContainer;
	chart.legend.zIndex = 100;
	dateAxis.renderer.grid.template.strokeOpacity = 0.07;
	valueAxis.renderer.grid.template.strokeOpacity = 0.07;
}


function fn_lineChart3(div, result, category){
	var chart = am4core.create(div, am4charts.XYChart);
	chart.data = result;
	chart.dateFormatter.inputDateFormat = "yyyyMMddHHmmss";

	// Create axes
	var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
	dateAxis.tooltipDateFormat = "HH:mm, d MMMM";
	var daxisTooltip = dateAxis.tooltip;
	daxisTooltip.background.fill = "#c6dfb8";
	daxisTooltip.background.strokeWidth = 0;
	daxisTooltip.background.cornerRadius = 3;
	daxisTooltip.background.pointerLength = 0;
	daxisTooltip.dy = 5;

	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
	var vaxisTooltip = valueAxis.tooltip;
	vaxisTooltip.background.fill = "#c6dfb8";
	vaxisTooltip.background.strokeWidth = 0;
	vaxisTooltip.background.cornerRadius = 3;
	vaxisTooltip.background.pointerLength = 0;
	vaxisTooltip.dx = 5;

	
	
	var series = chart.series.push(new am4charts.LineSeries());
	series.name = "BPSOREP";
	series.dataFields.dateX = category;
	series.dataFields.valueY = "BPSOREP";
	series.tooltipText = "BPSOREP"+" / "+"{CURRENTDATE}"+" / "+"{valueY.value}";
	series.fill = am4core.color("#767fde");
	series.stroke = am4core.color("#767fde");
	series.strokeWidth = 1.5;

	var series2 = chart.series.push(new am4charts.LineSeries());
	series2.name = "BPSOTEP";
	series2.dataFields.dateX = category;
	series2.dataFields.valueY = "BPSOTEP";
	series2.tooltipText = "BPSOTEP"+" / "+"{CURRENTDATE}"+" / "+"{valueY.value}";
	series2.fill = am4core.color("#35a98b");
	series2.stroke = am4core.color("#35a98b");
	series2.strokeWidth = 1.5;

	
	
	chart.cursor = new am4charts.XYCursor();
	chart.cursor.xAxis = dateAxis;
	chart.cursor.yAxis = valueAxis;
	chart.legend = new am4charts.Legend();
	chart.legend.parent = chart.plotContainer;
	chart.legend.zIndex = 100;
	dateAxis.renderer.grid.template.strokeOpacity = 0.07;
	valueAxis.renderer.grid.template.strokeOpacity = 0.07;
}



  
</script>


</html>