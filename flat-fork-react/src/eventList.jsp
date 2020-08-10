<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>

<script type="text/javascript">

var tableData = ${IGEventList};

$(document).ready(function()
{
	
	/* DataTable 미사용 : 주석 처리
	if (tableData.length == 0)
	 {
		alert("데이터가 없습니다.");
	 }
	 else
	{
		var table = $('#dataTables-example').dataTable({
			"pageLength": 20,
			"order": [[ 0, 'DESC' ]]
		});	

		$("#dataTables-example_filter").remove();    
		$("#dataTables-example_length").remove();
		$(".dataTables_scrollBody").css("overflow", "unset" );
		$("#dataTables-example_info").remove();
	}
	*/

});

// 페이지 이동
function fn_listPaging(num){
	
	// 클릭한 페이지 번호를 curPage 값으로 설정.
	$("#pageNo").val(num);
	
	// curPage 값을 담은 상태로 form을 submit
	$("#eventForm").attr("action","/event/eventList.do").submit();
}

// 장비 상세 화면
function fn_devcieDetailView(dkey){
	location.href="/device/deviceView.do?dkey="+dkey;
}

// 장비 에러 이력
function fn_eventHistView(dkey){
	location.href="/event/eventHist.do?dkey="+dkey;
}

//에러 상세 화면
function fn_eventDetailView(dkey, fcId, ocDatetime){
	location.href="/event/eventView.do?dkey="+dkey+"&fcId="+fcId+"&ocDatetime="+ocDatetime;
}

//에러코드 정보 화면
function fn_eventCodeView(fcId){
	location.href="/config/eventCodeView.do?fcId="+fcId;
}

//고객 상세 화면
function fn_custDetailView(custId){
	location.href="/cust/custView.do?custId="+custId;
}

//운전자 상세 화면
function fn_driverDetailView(driverId){
	location.href="/config/driverView.do?driverId="+driverId;
}

// [처리] 버튼 클릭 시 이벤트
function fn_ackEventPop(failureId)
{
	$("#FAILURE_ID").val(failureId)
	$("#event-eventAck-layer").dialog( "open" );
}

// [Excel] 버튼 클릭 시, 다운로드 이벤트
function fn_excel()
{
	$("#eventForm").attr("action","/event/eventListExcel.do").submit();
}


</script>

<div id="wrapper">
<form id="eventForm" name="eventForm" method="post">
	<input type="hidden" id="pageNo" name="pageNo" value="${EventSearchVO.pageNo}">
    <div id="page-wrapper">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">실시간 장비 에러 현황</h1>
                <!-- 에러 내역 개수 표시 -->
                <label style="float:right; font-size:15px;"><i class="fa icon-folk fa-fw"></i>&nbsp;${paginationInfo.totalRecordCount} 건</label>
            </div>
            <!-- /.col-lg-12 -->
        </div>

        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-default">
                    
                    <div class="panel-heading" style = "height : 45px;">
                    	<div class="col-sm-11">
                    	</div>
                    	
                    	<div class="col-sm-1" style="padding-left: 6px; padding-top: 5px;">
                    		<button type="button" class="btn btn-primary"  style="float:left;" onclick="fn_excel();">Excel</button>
                    	</div>
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
                            						<label>장비:<input type="text" id="device" name="device" value="${EventSearchVO.device}" class="form-control input-sm width-120" placeholder=""></label>
                            						<label>업체:<input type="text" id="customer" name="customer" value="${EventSearchVO.customer}" class="form-control input-sm width-120" placeholder=""></label>
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
		                                		<col width="*">
		                                		<col width="*">
		                                		<col width="15%">
		                                		<col width="*">
		                                		<col width="*">
		                                	</colgroup>
		                                	<thead>
		                                    	<tr role="row">
		                                    		<th><span class="hint--top" aria-label="번호">No.</span></th>
		                                    		<th><span class="hint--top" aria-label="에러가 발생한 일시">발생일시</span></th>
		                                    		<th><span class="hint--top" aria-label="에러가 발생한 장비에 대한 정보">장비</span></th>
		                                    		<th><span class="hint--top" aria-label="에러 내용">에러</span></th>
		                                    		<th><span class="hint--top" aria-label="에러가 발생한 장비가 속한 업체명">업체</span></th>
		                                    		<th><span class="hint--top" aria-label="에러가 발생한 장비의 운전자">운전자</span></th>
		                                    		<th><span class="hint--top-left" aria-label="에러에 대한 처리 결과를 업데이트">ACK</span></th>
		                                    	</tr>
		                                	</thead>
		                                	<tbody>
		                                		<c:choose>
		                                			<c:when test="${fn:length(EventList) == 0}">
		                                				<tr>
					                                		<td colspan="10" style="text-align: center;">데이터가 없습니다</td>
					                                	</tr>
		                                			</c:when>
		                                			<c:otherwise>
		                                				<c:forEach items="${EventList}" var="list" varStatus="status">
				                                			<tr>
				                                				<td style="text-align: center;">
			                                						${list.ROWNUM}
			                                				    </td>
				                                				<td style="text-align: center;">
				                                					<fmt:parseDate var="ocDatetime" value="${list.OC_DATETIME}" pattern="yyyyMMddHHmmss" />
																	<fmt:formatDate value="${ocDatetime}" pattern="yyyy-MM-dd HH:mm" />
						                                		</td>
						                                		<td>
						                                			<a title="장비 정보" href="javascript:fn_devcieDetailView('${list.DKEY}')">${list.DEVICE_SN}</a>&nbsp;${list.DEVICE_NM}
						                                			<a title="장비 에러 이력" href="javascript:fn_eventHistView('${list.DKEY}')"><i class="fa fa-list-alt fa-fw"></i></a>
						                                		</td>
						                                        <td>
						                                        	<a title="에러 상세 정보" href="javascript:fn_eventDetailView('${list.DKEY}', '${list.FC_ID}', '${list.OC_DATETIME}')" >${list.FC_NAME}</a>
						                                        	<a title="에러 코드 정보" href="javascript:fn_eventCodeView('${list.FC_ID}')" ><i class="fa fa-external-link fa-fw"></i></a>
						                                        </td>
						                                        <td><a title="업체 정보" href="javascript:fn_custDetailView(${list.CUSTOMER_ID});">${list.CUSTOMER_ID}</a>&nbsp;${list.CUSTOMER_NM}</td>
						                                        <td><a title="운전자 정보" href="javascript:fn_driverDetailView('${list.DRIVER_ID}')" >${list.DRIVER_ID}</a>${list.DRIVER_NM}</td>
			                                        			<td style="text-align: center;"><button type="button" class="btn btn-sm btn-primary" style="padding: 0px 7px;" onclick="fn_ackEventPop('${list.FAILURE_ID}')">처리</button></td>
						                                	</tr>
				                                		</c:forEach>
		                                			</c:otherwise>
		                                		</c:choose>
		                           			</tbody>
		                            	</table>
		                            	
		                            	<%-- <ul class="pagination" style="font-size: 13px;">
												<ui:pagination paginationInfo = "${paginationInfo}" type="image" jsFunction="fn_listPaging"/>
										</ul> --%>
		                            	
                       				</div>
                 				</div>
	                 			
	                 			<div class="row">
	                 				
	                 				<div class="col-sm-4">
	                 				</div>
	                 				
	                 				<div class="col-sm-8">
	                 					<div class="dataTables_paginate paging_simple_numbers">
	                 						<c:if test="${fn:length(EventList) > 0}">
		                 						<ul class="pagination">
													<ui:pagination paginationInfo = "${paginationInfo}" type="image" jsFunction="fn_listPaging"/>
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

<c:import url="/jsp/portal/event/layer/eventAck.jsp" />

</body>
</html>