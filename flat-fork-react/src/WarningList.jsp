<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>

<style>
/* dataTable의 데이터가 없을 경우 표시되는 텍스트 가운데 정렬 */
.dataTables_empty
{
	text-align: center;
}
</style>

<script type="text/javascript">
var tableData = ${IGWarningList};

$(document).ready(function()
{
	var table = $('#dataTables-example').dataTable({
		"pageLength": 20,
		"order": [[ 0, 'DESC' ]],
		language: {
			emptyTable      : '해당 기간 동안 조회된 데이터가 없습니다.',
			zeroRecords     : '해당 기간 동안 조회된 데이터가 없습니다.'
		}
	});
	
	$("#dataTables-example_filter").remove();
	$("#dataTables-example_length").remove();
	$(".dataTables_scrollBody").css("overflow", "unset" );
	$("#dataTables-example_info").remove();

});

$(function() {
	// $.datepicker.setDefaults($.datepicker.regional["ko"]);
	
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
		,maxDate : 0    // datepicker에서 현재일까지만 선택 가능하도록 설정.
		,onSelect: function(selected)
		{
			$( "#fromDate" ).datepicker( "option", "maxDate", selected );
		}
	});
	
});

// 페이징
function fn_listPaging ( num )
{
	$( "#curPage" ).val( num );
	$( "#warningForm" ).attr( "action", "/event/warningList.do" ).submit();
}


// 장비 상세 화면
function fn_devcieDetailView ( dkey )
{
	location.href = "/operation/deviceOperationView.do?dkey=" + dkey;
}


//업체 상세 화면
function fn_custDetailView ( dkey )
{
	location.href = "/cust/custView.do?dkey=" + dkey;
}

</script>


<div id="wrapper">
<form id="warningForm" name="warningForm" method="post">
	<input type="hidden" id="curPage" name="curPage" value="${searchEventVO.curPage}">
	<input type="hidden" id="dkey" name="dkey">
    <div id="page-wrapper">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">과속 경고</h1>
            </div>
            <!-- /.col-lg-12 -->
        </div>

        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-default">

                    <div class="panel-heading">
                    	<!-- 과속 경고 -->
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
                            						<label>
							                            장비:<input type="text" id="device" name="device" value="${searchEventVO.device}" class="form-control input-sm width-120" placeholder="">
						                            </label>
						                            
                            						<label>
							                            업체:<input type="text" id="customer" name="customer" value="${searchEventVO.customer}" class="form-control input-sm width-120" placeholder="">
						                            </label>
						                            
                            						<label>
							                            운전자:<input type="text" id="driverId" name="driverId" value="${searchEventVO.driverId}" class="form-control input-sm width-120" placeholder="">
						                            </label>
						                            
                            						<label>
							                            기간:<input type="text" class="form-control input-sm width-120 datePicker" placeholder="시작일" name="fromDate" id="fromDate" value="${searchEventVO.fromDate}"> -
							  							<input type="text" class="form-control input-sm width-120 datePicker" placeholder="종료일" name="toDate" id="toDate" value="${searchEventVO.toDate}">
							  						</label>
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
		                                		<col width="5%" />
		                                		<col width="10%" />
		                                		<col width="10%" />
		                                		<col width="10%" />
		                                		<col width="8%" />
		                                		<col width="10%" />
		                                		<col width="10%" />
		                                		<col width="10%" />
		                                		<%--<col width="8%" />--%>
		                                		<%--<col width="5" />--%>
		                                	</colgroup>
		                                	<thead>  
		                                    	<tr role="row">
		                                    		<th>No.</th>
		                                    		<th>경고일시</th>
		                                    		<th>장비명</th>
		                                    		<th>장비SN</th>
		                                    		<th>경고타입</th>
		                                    		<th>경고메시지</th>
		                                    		<th>업체</th>
		                                    		<th>운전자</th>
		                                    		<%--<th>코멘트</th>--%>
		                                    		<%--<th>&nbsp; </th>--%>
		                                    	</tr>
		                                	</thead>
		                                	<tbody>
	                                            <c:if test="${fn:length(WarningList) != 0}">
					                                <c:forEach items="${WarningList}" var="list" varStatus="status">
						                                <tr>
							                                <td class="center">${status.count + ((Page.currentPageNo - 1) * Page.recordCountPerPage)}</td>
							                                <td class="center">${list.REG_DATETIME}</td>
							                                
							                                <%-- 2019-11-11 phd 수정 : 장비명 클릭 시, 해당 장비의 기간별 운영효율 조회 화면으로 이동 --%>
							                                <td class="center"><a href="javascript:fn_devcieDetailView(${list.DKEY})">${list.DEVICE_NM}</a></td>
							                                
							                                <td class="center">${list.DEVICE_SN}</td>
							                                <td class="center">${list.TYPE}</td>
							                                <td class="center">${list.MESSAGE}</td>
								                               
							                                <%-- 2019-11-11 phd 주석 처리 : 업체사용자 조회 화면으로 이동하는 함수 주석처리 --%>
							                                <td class="center"><%--<a href="javascript:fn_custDetailView(${list.DKEY})">--%>${list.CUSTOMER_NM}<%--</a>--%></td>
							                                
							                                <td class="center">${list.DRIVER_NM}</td>
							                                
							                                <%-- 2019-11-11 phd 주석 처리 : 코멘트 기능 미구현으로 인한 주석 처리 --%>
							                                <%--<td class="center">${list.COMMENT}</td>--%>
							                                <%--<td><input type="button" class="btn btn-default btn-xs" style="padding: 0px 7px;" value="코멘트" /></td>--%>
						                                </tr>
					                                </c:forEach>
	                                            </c:if>
		                           			</tbody>
		                            	</table>
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