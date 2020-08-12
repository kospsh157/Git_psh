import React from 'react';

function App() {


  return (
    <div class="row">
      <div class="col-sm-12">
        <table class="table table-striped table-bordered table-hover dataTable no-footer" id="dataTables-example" role="grid" aria-describedby="dataTables-example_info">

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
                      <c: {fn:length(EventList) == 0}">
                          <tr>
              <td colspan="10" style="text-align: center;">데이터가 없습니다</td>
            </tr>
                      </c:when>
                      <c:otherwise>
                          <c: {EventList}" var="list" varStatus="status">
                              <tr>
            <td style="text-align: center;">
              ${list.ROWNUM}
            </td>
            <td style="text-align: center;">
              <fmt: {list.OC_DATETIME}" pattern="yyyyMMddHHmmss" />
                                      <fmt: {ocDatetime}" pattern="yyyy-MM-dd HH:mm" />
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
                  </c: choose >
                 </tbody >
          </table >
        
          
      </div >
  </div >
  )
}

export default App;
