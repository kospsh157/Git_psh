// <script>
function EventListTop() {


    return (
        <div className="row">
            <div className="col-lg-12">
                <h1 className="page-header">실시간 장비 에러 현황</h1>
                <label style={{float:"right" ,fontSize:"15px"}}><i className="fa icon-folk fa-fw"></i>&nbsp;${paginationInfo.totalRecordCount} 건</label>
            </div>
        </div>
    )
}


function EventListExcel(){

    return (

        <div className="panel-heading" style={{ height: "45px" }}>
            <div className="col-sm-11">
            </div>

            <div className="col-sm-1" style={{ paddingLeft: "6px", paddingTop: "5px" }}>
                <button type="button" className="btn btn-primary" style={{ float: "left" }} onClick={() => { $("#eventForm").attr("action", "/event/eventListExcel.do").submit() }}>Excel</button>
            </div>
        </div>


    )


}



function EventListSearch(){


    return(
        <div className="row">
        <div className="col-sm-12">
            <div className="panel panel-default" style={{ marginBottom: "5px" }}>
                <div className="panel-body">
                    <div className="col-sm-11">
                        <label>장비:<input type="text" id="device" name="device"  className="form-control input-sm width-120" placeholder="" /></label>
                        <label>업체:<input type="text" id="customer" name="customer" className="form-control input-sm width-120" placeholder="" /></label>
                    </div>
                    <div className="col-sm-1 right">
                        <button type="button" className="btn btn-primary" onClick={() => { $("#pageNo").val(1); $("#eventForm").attr("action", "/event/eventList.do").submit(); }}>검색</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    )
}




function EventListTableBody(){
    return(
        <table className="table table-striped table-bordered table-hover dataTable no-footer" id="dataTables-example" role="grid" aria-describedby="dataTables-example_info">
                                            
        <thead>
            <tr role="row">
                <th><span className="hint--top" aria-label="번호">No.</span></th>
                <th><span className="hint--top" aria-label="에러가 발생한 일시">발생일시</span></th>
                <th><span className="hint--top" aria-label="에러가 발생한 장비에 대한 정보">장비</span></th>
                <th><span className="hint--top" aria-label="에러 내용">에러</span></th>
                <th><span className="hint--top" aria-label="에러가 발생한 장비가 속한 업체명">업체</span></th>
                <th><span className="hint--top" aria-label="에러가 발생한 장비의 운전자">운전자</span></th>
                <th><span className="hint--top-left" aria-label="에러에 대한 처리 결과를 업데이트">ACK</span></th>
            </tr>
        </thead>
        <tbody>
            <c:choose>
                <c:when test="${fn:length(EventList) == 0}">
                    <tr>
                        <td colspan="10" style={{textAlign: "center"}}>데이터가 없습니다</td>
                    </tr>
                </c:when>
                <c:otherwise>
                    <c:forEach items="${EventList}" var="list" varStatus="status">
                        <tr>
                            <td style={{textAlign: "center"}}>
                                ${list.ROWNUM}
                            </td>
                            <td style={{textAlign: "center"}}>
                                <fmt:parseDate var="ocDatetime" value="${list.OC_DATETIME}" pattern="yyyyMMddHHmmss" />
                                <fmt:formatDate value="${ocDatetime}" pattern="yyyy-MM-dd HH:mm" />
                            </td>
                            <td>
                                <a title="장비 정보" href="javascript:fn_devcieDetailView('${list.DKEY}')">${list.DEVICE_SN}</a>&nbsp;${list.DEVICE_NM}
                                <a title="장비 에러 이력" href="javascript:fn_eventHistView('${list.DKEY}')"><i className="fa fa-list-alt fa-fw"></i></a>
                            </td>
                            <td>
                                <a title="에러 상세 정보" href="javascript:fn_eventDetailView('${list.DKEY}', '${list.FC_ID}', '${list.OC_DATETIME}')" >${list.FC_NAME}</a>
                                <a title="에러 코드 정보" href="javascript:fn_eventCodeView('${list.FC_ID}')" ><i className="fa fa-external-link fa-fw"></i></a>
                            </td>
                            <td><a title="업체 정보" href="javascript:fn_custDetailView(${list.CUSTOMER_ID});">${list.CUSTOMER_ID}</a>&nbsp;${list.CUSTOMER_NM}</td>
                            <td><a title="운전자 정보" href="javascript:fn_driverDetailView('${list.DRIVER_ID}')" >${list.DRIVER_ID}</a>${list.DRIVER_NM}</td>
                            <td style={{textAlign: "center"}}><button type="button" className="btn btn-sm btn-primary" style={{padding: "0px 7px"}} onClick={()=>{$("#FAILURE_ID").val(failureId); $("#event-eventAck-layer").dialog("open")}}>처리</button></td>
                        </tr>
                    </c:forEach>
                </c:otherwise>
            </c:choose>
            </tbody>
    </table>



    )
}


function EventListPaging(){
    return(

    <div className="row">
										 
        <div className="col-sm-4">
        </div>
        
        <div className="col-sm-8">
            <div className="dataTables_paginate paging_simple_numbers">
                <c:if test="${fn:length(EventList) > 0}">
                    <ul className="pagination">
                       <ui:pagination paginationInfo = "${paginationInfo}" type="image" jsFunction="fn_listPaging"/>
                   </ul>
               </c:if>
            </div>
        </div>
    </div>

    )

}
















function EventListFrame(){
	
	

return (

    <div id="wrapper">
            <form id="eventForm" name="eventForm" method="post">
                <input type="hidden" id="pageNo" name="pageNo" value="${EventSearchVO.pageNo}"/>
                    <div id="page-wrapper">


                        {/* EventListTop */}
						<EventListTop/>


                        <div className="row">
                            <div className="col-lg-12">
                                <div className="panel panel-default">

                                    {/*  엑셀 버튼 */}
									<EventListExcel/>


                                    <div className="panel-body">
                                        <div className="dataTable_wrapper">
                                            <div id="dataTables-example_wrapper" className="dataTables_wrapper form-inline dt-bootstrap no-footer">
                                               
                                               {/* 검색 부분  */}
                                           		<EventListSearch/>


                                                <div className="row">
                                                    <div className="col-sm-12">


                                                        {/* 테이블 바디  */}
														<EventListTableBody/>

                                                    </div>
                                                </div>

                                             {/* 테이블 페이징 부분 */}
											<EventListPaging/>



                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
            </form>
        </div>
)			
}
// ReactDOM렌더 함수 