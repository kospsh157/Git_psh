<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>

<script type="text/javascript">
var tableData = ${IGEventHist};

$(document).ready(function(){
	
	 if(tableData.length == 0)
	 {
			
	 }
	 else
	 {
		$('#dataTables-example').DataTable( {
	        "order": [[ 0, "asc" ]],
	        "searching": false,
	        "paging":   false,       
	        "info": false
	    } );
	 }
});

// 페이징
function fn_listPaging(num){
	$("#curPage").val(num);
	$("#eventForm").attr("action","/event/eventHist.do").submit();
}

// 장비 상세 화면
function fn_devcieDetailView(dkey){
	location.href="/device/deviceView.do?dkey="+dkey;
}

//에러 상세 화면
function fn_eventDetailView(dkey, fcId, ocDatetime){
	location.href="/event/eventView.do?dkey="+dkey+"&fcId="+fcId+"&ocDatetime="+ocDatetime;
}

//에러코드 정보 화면
function fn_eventCodeView(fcId){
	location.href="/event/eventCodeView.do?fcId="+fcId;
}

//고객 상세 화면
function fn_custDetailView(custId){
	$("#custId").val(custId);
	location.href="/cust/custView.do?custId="+custId;
}

//운전자 상세 화면
function fn_driverDetailView(driverId){
	location.href="/driver/driverView.do?driverId="+driverId;
}

/* 2020-03-30 검색일자 추가 */
$(function() {
	
	$("#fromDate").datepicker({
		dateFormat: 'yy-mm-dd',
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		weekHeader: 'Wk',
		changeMonth: true, //월변경가능
		changeYear: true, //년변경가능
		yearRange:'1988:+0', // 연도 셀렉트 박스 범위(현재와 같으면 1988~현재년)
		showMonthAfterYear: true, //년 뒤에 월 표시
		buttonImageOnly: true, //이미지표시
		buttonText: '날짜를 선택하세요',
		autoSize: false, //오토리사이즈(body등 상위태그의 설정에 따른다)
		buttonImage: '/images/common/icon_calendar.png', //이미지주소
		showOn: "both" //엘리먼트와 이미지 동시 사용
		,maxDate: 0 // datepicker에서 현재일까지만 선택 가능하도록 설정.
		,onSelect: function(selected)
		{
			$( "#toDate" ).datepicker( "option", "minDate", selected );
		}
	});
	
	$("#toDate").datepicker({
		dateFormat: 'yy-mm-dd',
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		weekHeader: 'Wk',
		changeMonth: true, //월변경가능
		changeYear: true, //년변경가능
		yearRange:'1988:+0', // 연도 셀렉트 박스 범위(현재와 같으면 1988~현재년)
		showMonthAfterYear: true, //년 뒤에 월 표시
		buttonImageOnly: true, //이미지표시
		buttonText: '날짜를 선택하세요',
		autoSize: false, //오토리사이즈(body등 상위태그의 설정에 따른다)
		buttonImage: '/images/common/icon_calendar.png', //이미지주소
		showOn: "both" //엘리먼트와 이미지 동시 사용
		,maxDate: 0 // datepicker에서 현재일까지만 선택 가능하도록 설정.
		,onSelect: function(selected)
		{
			$( "#fromDate" ).datepicker( "option", "maxDate", selected );
		}
	});
	
});


</script>

<div id="wrapper">
<form id="eventForm" name="eventForm" method="post">
	<input type="hidden" id="curPage" name="curPage" value="${searchEventVO.curPage}">
	<input type="hidden" id="dkey" name="dkey" value="${Dkey}">
    <div id="page-wrapper">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">에러 이력</h1>
            </div>
            <!-- /.col-lg-12 -->
        </div>

        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-heading" style ="height : 30px;">
                    	<!-- 에러 이력 -->
                    </div>
                    <!-- /.panel-heading -->
                    <div class="panel-body">
                        <div class="dataTable_wrapper">
                            <div id="dataTables-example_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">
                            	<div class="row">
                            		<div class="col-sm-12">
                            			<div class="panel panel-default" style="margin-bottom: 5px;">
                            				<div class="panel-body">
                            					<div class="col-sm-11">
						                            <label>기간:
							                            <input type="text" class="form-control input-sm width-120 datePicker" placeholder="시작일" name="fromDate" id="fromDate" value="${searchEventVO.fromDate}">
							                            &nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;
							                            <input type="text" class="form-control input-sm width-120 datePicker" placeholder="종료일" name="toDate" id="toDate" value="${searchEventVO.toDate}">
						                            </label>
						                            
                            						<label>장비:<input type="text" id="device" name="device" value="${searchEventVO.device}" class="form-control input-sm width-120" placeholder=""></label>
                            						<label>업체:<input type="text" id="customer" name="customer" value="${searchEventVO.customer}" class="form-control input-sm width-120" placeholder=""></label>
						                            
                            					</div>
                            					<div class="col-sm-1 right">
                            						<button type="button" class="btn btn-primary" onclick="javascript:fn_listPaging(1);">검색</button>
                            					</div>
                            				</div>
                            			</div>
                            		</div>
                            	</div>
                            	
                            	<div class="row">
                            		<div class="col-sm-12">
		                            	<table class="table table-striped table-bordered table-hover dataTable no-footer" id="dataTables-example" role="grid" aria-describedby="dataTables-example_info">
		                                	<colgroup>
		                                		<col width="5%">
		                                		<col width="150px">
		                                		<col width="150px">
		                                		<col width="*">
		                                		<col width="*">
		                                		<col width="*">
		                                		<col width="*">
		                                	</colgroup>
		                                	<thead>
		                                    	<tr role="row">
		                                    		
		                                    		<th><span class="hint--top" aria-label="번호">No.</span></th>
		                                    		<th><span class="hint--top" aria-label="에러가 발생한 시간">발생일시</span></th>
		                                    		<th><span class="hint--top" aria-label="에러가 복구된 시간">복구일시</span></th>
		                                    		<th><span class="hint--top" aria-label="에러가 발생한 장비">장비</span></th>
		                                    		<th><span class="hint--top" aria-label="발생한 에러 내용">에러</span></th>
		                                    		<th><span class="hint--top" aria-label="에러가 발생한 장비가 속한 업체">업체</span></th>
		                                    		<th><span class="hint--top" aria-label="에러가 발생한 장비의 담당 운전자">운전자</span></th>
		                                    		
		                                    	</tr>
		                                	</thead>
		                                	<tbody>
		                                		<c:choose>
		                                			<c:when test="${fn:length(EventHist) == 0}">
		                                				<tr>
					                                		<td colspan="10" style="text-align: center;">데이터가 없습니다</td>
					                                	</tr>
		                                			</c:when>
		                                			<c:otherwise>
		                                				<c:forEach items="${EventHist}" var="list" varStatus="status">
				                                			<tr>
				                                				<td style="text-align: center;">
			                                						${status.count + ((Page.currentPageNo - 1) * Page.recordCountPerPage)}
			                                				    </td>
				                                				<td style="text-align: center;">
				                                					<fmt:parseDate var="ocDatetime" value="${list.OC_DATETIME}" pattern="yyyyMMddHHmmss" />
																	<fmt:formatDate value="${ocDatetime}" pattern="yyyy-MM-dd HH:mm" />
						                                		</td>
						                                		<td style="text-align: center;">
				                                					<fmt:parseDate var="recDatetime" value="${list.REC_DATETIME}" pattern="yyyyMMddHHmmss" />
																	<fmt:formatDate value="${recDatetime}" pattern="yyyy-MM-dd HH:mm" />
						                                		</td>
						                                		<td>
						                                			<a title="장비 정보" href="javascript:fn_devcieDetailView('${list.DKEY}')">${list.DEVICE_SN}</a>&nbsp;${list.DEVICE_NM}
						                                		</td>
						                                        <td>
						                                        	<a title="에러 상세 정보" href="javascript:fn_eventDetailView('${list.DKEY}', '${list.FC_ID}', '${list.OC_DATETIME}')" >${list.FC_NAME}</a>
						                                        	<a title="에러 코드 정보" href="javascript:fn_eventCodeView('${list.FC_ID}')" ><i class="fa fa-external-link fa-fw"></i></a>
						                                        </td>
						                                        <td><a title="업체 정보" href="javascript:fn_custDetailView(${list.CUSTOMER_ID});">${list.CUSTOMER_ID}</a>&nbsp;${list.CUSTOMER_NM}</td>
						                                        <td><a title="운전자 정보" href="javascript:fn_driverDetailView('${list.DRIVER_ID}')" >${list.DRIVER_ID}</a>${list.DRIVER_NM}</td>
						                                	</tr>
				                                		</c:forEach>
		                                			</c:otherwise>
		                                		</c:choose>
		                           			</tbody>
		                            	</table>
                       				</div>
                 				</div>
	                 			<div class="row">
	                 			<div class="col-sm-4">
	                 				</div>
	                 				<div class="col-sm-8">
	                 					<div class="dataTables_paginate paging_simple_numbers">
	                 						<c:if test="${fn:length(EventHist) > 0}">
		                 						<ul class="pagination">
													<ui:pagination paginationInfo = "${Page}" type="image" jsFunction="fn_listPaging"/>
												</ul>
											</c:if>
	                 					</div>
	                 				</div>
	                 			</div>
	                		</div>
	                  	</div>
	                </div>
	           	</div>
			</div>
		</div>
        
	</div>
</form>
</div>
<!-- /#wrapper -->
</body>
</html>