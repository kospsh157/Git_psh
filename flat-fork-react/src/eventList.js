
import React from 'react';



function fn_ackEventPop(failureId) {
    $("#FAILURE_ID").val(failureId)
    $("#event-eventAck-layer").dialog("open");
}

() => { $("#FAULURE_ID").val(failureId) $("#event-eventAck-layer").dialog("open") }

function fn_listPaging(num) {

    // 클릭한 페이지 번호를 curPage 값으로 설정.
    $("#pageNo").val(num);

    // curPage 값을 담은 상태로 form을 submit
    $("#eventForm").attr("action", "/event/eventList.do").submit();
}

() => { $("#pageNo").val(num); $("#eventForm").attr("action", "/event/eventList.do").submit() }

function EventList() {
    const [stateData, setStateData] = React.useState([]);

    React.useEffect(
        () => {
            fetch('http://localhost:8080/event/eventList.do')
                .then(res => res.json())
                .then((data) => {
                    console.log(data)
                    setStateData(data)
                })
        },
        []
    )
    const labelStyle = {
        float: "right",
        fontSize: "15px",
    }

    const dataTr = stateData.map((item, index) => {
        return (
            <tr>
                <td style={{ textAlign: "center" }}>
                    ${item.ROWNUM}
                </td>
                <td style={{ textAlign: "center" }}>
                    <fmt: {list.OC_DATETIME}" pattern="yyyyMMddHHmmss" />
                <fmt: {ocDatetime}" pattern="yyyy-MM-dd HH:mm" />
            </td>
                <td>
                    <a title="장비 정보" href={fn_devcieDetailView(${ list.DKEY })}>${item.DEVICE_SN}</a>&nbsp;${item.DEVICE_NM}
                    <a title="장비 에러 이력" href={fn_eventHistView(${ list.DKEY })}><i class="fa fa-list-alt fa-fw"></i></a>
                </td>
                <td>
                    <a title="에러 상세 정보" href={fn_eventDetailView('${list.DKEY}', '${list.FC_ID}', '${list.OC_DATETIME}')}>${item.FC_NAME}</a>
                    <a title="에러 코드 정보" href={fn_eventCodeView('${list.FC_ID}')} ><i className="fa fa-external-link fa-fw"></i></a>
                </td>
                <td><a title="업체 정보" href={fn_custDetailView(${ item.CUSTOMER_ID })}>${item.CUSTOMER_ID}</a>&nbsp;${item.CUSTOMER_NM}</td>
                <td><a title="운전자 정보" href={fn_driverDetailView('${list.DRIVER_ID}')} >${item.DRIVER_ID}</a>${item.DRIVER_NM}</td>
                <td style={{ textAlign: "center" }}><button type="button" className="btn btn-sm btn-primary" style={{ padding: "0px 7px" }} onClick={() => { $("#FAULURE_ID").val(failureId); $("#event-eventAck-layer").dialog("open") }}>처리</button></td>
            </tr>
        )
    })


    return (
        <React.Fragment>
            <form name="eventForm" method="post">
                <input type="hidden" name="pageNo" value="${EventSearchVO.pageNo}"></input>
                <div>
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-header">실시간 장비 에러 현황</h1>
                            <label style={labelStyle}><i className="fa icon-folk fa-fw"></i>&nbsp;${paginationInfo.totalRecordCount} 건</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="panel panel-default">

                                <div className="panel-heading" style={{ height: "45px" }}>
                                    <div className="col-sm-11">
                                    </div>

                                    <div className="col-sm-1" style={{ paddingLeft: "6px", paddingTop: "5px" }}>
                                        <button type="button" className="btn btn-primary" style={{ float: "left" }} onClick={() => { $("#eventForm").attr("action", "/event/eventListExcel.do").submit() }}>Excel</button>
                                    </div>
                                </div>



                                <div className="panel-body">
                                    <div className="dataTable_wrapper">
                                        <div className="dataTables_wrapper form-inline dt-bootstrap no-footer">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="panel panel-default" style={{ marginBottom: "5px" }}>
                                                        <div className="panel-body">
                                                            <div className="col-sm-11">
                                                                <label>장비:
                                                    <input type="text" name="device" className="form-control input-sm width-120" placeholder="" />
                                                                </label>
                                                                <label>업체:
                                                    <input type="text" name="customer" className="form-control input-sm width-120" placeholder="" />
                                                                </label>
                                                            </div>
                                                            <div className="col-sm-1 right">
                                                                <button type="button" className="btn btn-primary" onClick={() => { $("#pageNo").val(num); $("#eventForm").attr("action", "/event/eventList.do").submit() }} >검색</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <table className="table table-striped table-bordered table-hover dataTable no-footer" role="grid" aria-describedby="dataTables-example_info">



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
                                                            {
                                                                stateData.length === 0 &&
                                                                <tr>
                                                                    <td colSpan="10" style={{ textAlign: "center" }}> 데이터가 없습니다.</td>
                                                                </tr>
                                                            }
                                                            {
                                                                stateData.length > 0 &&
                                                                stateData.map((list, index) => (
                                                                    stateData.map((list, index) => (
                                                                        <tr>
                                                                            <td style={{ textAlign: "center" }}>
                                                                                ${list.ROWNUM}
                                                                            </td>
                                                                            <td style={{ textAlign: "center" }}>

                                                                            </td>
                                                                            <td>
                                                                                <a title="장비 정보" onClick={() => { location.href = "/device/deviceView.do?dkey=" + list.DKEY }}>${list.DEVICE_SN}</a>&nbsp;${list.DEVICE_NM}
                                                                                <a title="장비 에러 이력" onClick={() => { location.href = "/event/eventHist.do?dkey=" + list.DKEY }}><i className="fa fa-list-alt fa-fw"></i></a>
                                                                            </td>
                                                                            <td>
                                                                                <a title="에러 상세 정보" onClick={() => { location.href = "/event/eventView.do?dkey=" + list.DKEY + "&fcId=" + list.FC_ID + "&ocDatetime=" + list.OC_DATETIME }}>${list.FC_NAME}</a>
                                                                                <a title="에러 코드 정보" onClick={() => { location.href = "/config/eventCodeView.do?fcId=" + list.FC_ID }}> <i className="fa fa-external-link fa-fw"></i></a>
                                                                            </td>

                                                                            <td><a title="업체 정보" onClick={() => { location.href = "/cust/custView.do?custId=" + list.CUSTOMER_ID }}>${list.CUSTOMER_ID}</a>&nbsp;${list.CUSTOMER_NM}</td>
                                                                            <td><a title="운전자 정보" onClick={() => { location.href = "/config/driverView.do?driverId=" + list.DRIVER_ID }} >${list.DRIVER_ID}</a> ${list.DRIVER_NM}</td>


                                                                            <td style={{ textAlign: "center" }}><button type="button" className="btn btn-sm btn-primary" style={{ padding: "0px 7px" }} onClick={() => { $("#FAULURE_ID").val(failureId); $("#event-eventAck-layer").dialog("open") }}>처리</button></td>
                                                                        </tr>


                                                                    ))
                                                            }
                                                        </tbody>

                                                    </table>


                                                </div>
                                            </div>

                                            <div className="row">

                                                <div className="col-sm-4">
                                                </div>

                                                <div className="col-sm-8">
                                                    <div className="dataTables_paginate paging_simple_numbers">
                                                        {
                                                            stateData.length > 0 &&
                                                            <ul className="pagination">
                                                                <ui: {paginationInfo}" type="image" jsFunction="fn_listPaging"/>
												</ul>
                                                        }

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
        </React.Fragment>


    )
}

export default EventList;