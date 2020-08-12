
function WarningListTop() {    // 이름은 수정해줘야함   

  return (
      <div className="row">
          <div className="col-lg-12">
              <h1 className="page-header">과속 경고</h1>
          </div>
      </div>
  )
}





function WarningListSearch(){    // 페이지 마다 검색 부분도 조금씩 다름 


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
          
          <label>장비:<input type="text" id="device" name="device"  value="${searchEventVO.device}"  className="form-control input-sm width-120" placeholder=""/></label>
          <label>업체:<input type="text" id="customer" name="customer"  value="${searchEventVO.customer}" className="form-control input-sm width-120" placeholder=""/></label>
          <label>운전자:<input type="text" id="driverId" name="driverId" value="${searchEventVO.driverId}" className="form-control input-sm width-120" placeholder=""/> </label>
        </div>
        <div className="col-sm-1 right">
          {/* 페이지 마다 여기가 다름  */}
          <button type="button" className="btn btn-primary" onClick={	()=> {$("#curPage").val(1); $("#warningForm").attr("action","/event/warningList.do" ).submit();}}>검색</button>
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
            <c:if test="${fn:length(WarningList) != 0}">
        <c:forEach items="${WarningList}" var="list" varStatus="status">
          <tr>
            <td class="center">${status.count + ((Page.currentPageNo - 1) * Page.recordCountPerPage)}</td>
            <td class="center">${list.REG_DATETIME}</td>
            
            <td class="center"><a href="javascript:fn_devcieDetailView(${list.DKEY})">${list.DEVICE_NM}</a></td>
            
            <td class="center">${list.DEVICE_SN}</td>
            <td class="center">${list.TYPE}</td>
            <td class="center">${list.MESSAGE}</td>
              
            <td class="center">${list.CUSTOMER_NM}</td>
            
            <td class="center">${list.DRIVER_NM}</td>
            
            
          </tr>
        </c:forEach>
            </c:if>
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
	  <input type="hidden" id="dkey" name="dkey"/>
      {/* 이부분 페이지 마다 다를 수 있음   종료점 */}
      <div id="page-wrapper">

        {/* ErrorListTop */}
        <WarningListTop />

        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-default">

              {/* 테이블top 회색 부분 */}
              <div className="panel-heading" style ={{height : "30px"}}> </div>

              <div className="panel-body">
                <div className="dataTable_wrapper">
                  <div id="dataTables-example_wrapper" className="dataTables_wrapper form-inline dt-bootstrap no-footer">

                    {/* 검색버튼 */}
                    <WarningListSearch />

                    <div className="row">
                      <div className="col-sm-12">
                    

                      {/* 테이블 */}
                      <Table
                        colList = {["No." , "경고일시", "장비명", "장비SN", "경고타입", "경고메시지", "업체", "운전자"]}
        
                     />

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

)

}