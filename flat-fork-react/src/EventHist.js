
function ErrorListTop() {    // 이름은 수정해줘야함   

  return (
      <div className="row">
          <div className="col-lg-12">
              <h1 className="page-header">에러 이력</h1>
          </div>
      </div>
  )
}





function ErrorListSearch(){    // 페이지 마다 검색 부분도 조금씩 다름 


  return(
<div className="row">
  <div className="col-sm-12">
    <div className="panel panel-default" style={{marginBottom: "5px"}}>
      <div className="panel-body">
        <div className="col-sm-11">
          <label>기간:
            <input type="text" className="form-control input-sm width-120 datePicker" placeholder="시작일" name="fromDate" id="fromDate" />
            &nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;
            <input type="text" className="form-control input-sm width-120 datePicker" placeholder="종료일" name="toDate" id="toDate" />
          </label>
          
          <label>장비:<input type="text" id="device" name="device"  className="form-control input-sm width-120" placeholder=""/></label>
          <label>업체:<input type="text" id="customer" name="customer"  className="form-control input-sm width-120" placeholder=""/></label>
          
        </div>
        <div className="col-sm-1 right">
          <button type="button" className="btn btn-primary" onClick={	()=> {$("#curPage").val(1); $("#eventForm").attr("action","/event/eventHist.do").submit()}}>검색</button>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}





function Table(props){
  const colList = props.colList.map(
(item, index) => {
return (<th><span key={index} className="hint--top">{item}</span></th>)
}
)



return (
  <table className="table table-striped table-bordered table-hover dataTable no-footer" id="dataTables-example" role="grid" aria-describedby="dataTables-example_info">
                                      
  <thead>
      <tr role="row">
            {colList}
      </tr>
  </thead>
  {/* 티바디 부터 복사해서 복붙  */}
  
  <tbody>
            <c:choose>
              <c:when test="${fn:length(EventHist) == 0}">
                <tr>
                  <td colspan="10" style={{textAign: "center"}}>데이터가 없습니다</td>
                </tr>
              </c:when>
              <c:otherwise>
                <c:forEach items="${EventHist}" var="list" varStatus="status">
                  <tr>
                    <td style={{textAlign: "center"}}>
                      ${status.count + ((Page.currentPageNo - 1) * Page.recordCountPerPage)}
                      </td>
                    <td style={{textAlign: "center"}}>
                      <fmt:parseDate var="ocDatetime" value="${list.OC_DATETIME}" pattern="yyyyMMddHHmmss" />
      <fmt:formatDate value="${ocDatetime}" pattern="yyyy-MM-dd HH:mm" />
                    </td>
                    <td style={{textAlign: "center"}}>
                      <fmt:parseDate var="recDatetime" value="${list.REC_DATETIME}" pattern="yyyyMMddHHmmss" />
      <fmt:formatDate value="${recDatetime}" pattern="yyyy-MM-dd HH:mm" />
                    </td>
                    <td>
                      <a title="장비 정보" href="javascript:fn_devcieDetailView('${list.DKEY}')">${list.DEVICE_SN}</a>&nbsp;${list.DEVICE_NM}
                    </td>
                        <td>
                          <a title="에러 상세 정보" href="javascript:fn_eventDetailView('${list.DKEY}', '${list.FC_ID}', '${list.OC_DATETIME}')" >${list.FC_NAME}</a>
                          <a title="에러 코드 정보" href="javascript:fn_eventCodeView('${list.FC_ID}')" ><i className="fa fa-external-link fa-fw"></i></a>
                        </td>
                        <td><a title="업체 정보" href="javascript:fn_custDetailView(${list.CUSTOMER_ID});">${list.CUSTOMER_ID}</a>&nbsp;${list.CUSTOMER_NM}</td>
                        <td><a title="운전자 정보" href="javascript:fn_driverDetailView('${list.DRIVER_ID}')" >${list.DRIVER_ID}</a>${list.DRIVER_NM}</td>
                  </tr>
                </c:forEach>
              </c:otherwise>
            </c:choose>
        </tbody>



</table>

)
}



function ErrorListPaging(){  // 페이지마다 length() 파라미터가 다름
  return(

    <div className="row">
    <div className="col-sm-4">
      </div>
      <div className="col-sm-8">
        <div className="dataTables_paginate paging_simple_numbers">
          <c:if test="${fn:length(EventHist) > 0}">
            <ul className="pagination">
              <ui:pagination paginationInfo = "${Page}" type="image" jsFunction="fn_listPaging"/>
           </ul>
          </c:if>
        </div>
      </div>
    </div>

  )
}

function TableContainer(){


  return(
    <div id="wrapper">
      {/* 이부분 페이지 마다 다를 수 있음    시작점*/}
    <form id="eventForm" name="eventForm" method="post">
    <input type="hidden" id="curPage" name="curPage" value="${searchEventVO.curPage}"/>
	  <input type="hidden" id="dkey" name="dkey" value="${Dkey}"/>
      {/* 이부분 페이지 마다 다를 수 있음   종료점 */}
      <div id="page-wrapper">

        {/* ErrorListTop */}
        <ErrorListTop />

        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-default">

              {/* 테이블top 회색 부분 */}
              <div className="panel-heading" style ={{height : "30px"}}> </div>

              <div className="panel-body">
                <div className="dataTable_wrapper">
                  <div id="dataTables-example_wrapper" className="dataTables_wrapper form-inline dt-bootstrap no-footer">

                    {/* 검색버튼 */}
                    <ErrorListSearch />

                    <div className="row">
                      <div className="col-sm-12">
                    

                      {/* 테이블 */}
                      <Table
          colList = {["No.", "발생일시", "복구일시", "장비","에러", "업체", "운전자"]}
        
                     />

                      </div>
                    </div>

                    {/* 페이징 버튼 */}
                    <ErrorListPaging />

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