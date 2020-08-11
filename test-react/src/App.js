import React from 'react';
import logo from './logo.svg';
import './App.css';


function fn_listPaging() {
	return null

}

function App() {


	return (
		<>
			<div id="page-wrapper">
				<form id="operationForm" name="operationForm" method="post">
					<input type="hidden" id="curPage" name="curPage" value="1">
						<input type="hidden" id="rfid_card" name="rfid_card">
							<div class="row">
								<div class="col-lg-12">
									<h1 class="page-header">운전자 운영효율(일일)</h1>
									<label style="float:right; font-size:15px;"><i class="fa icon-folk fa-fw"></i>${Page.totalRecordCount}명</label>
								</div>


							</div>
							<div class="row">
								<div class="col-sm-12">
									<div class="panel panel-default" style="margin-bottom: 5px;">
										<div class="panel-body">
											<div class="col-sm-11">
												<label>날짜:
						    {/* <fmt: {searchOperationVO.toDate}" pattern="yyyyMMdd" />
						    <fmt: {newDate}" pattern="yyyy-MM-dd" /> */}
													<input type="text" class="datePicker form-control input-sm width-120" value="${newDate2}" id="toDate" name="toDate" />
												</label>
					    &nbsp;&nbsp;
   						<label>운전자명:<input type="text" class="form-control input-sm width-120" id="searchWord" name="searchWord" value="${searchOperationVO.searchWord}" /></label>
											</div>
											<div class="col-sm-1 right">
												<button type="button" class="btn btn-primary" onclick="javascript:fn_listPaging(1);">검색</button>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-lg-12">
									<div class="panel panel-default">
										<div style="height:40px;" class="panel-heading">
										</div>
									</div>
									<div class="panel-body">
										<div class="dataTable_wrapper">
											<div id="dataTables-example_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">
												<div class="row">
													<div class="col-sm-12">
														<table id="driveropTable" class="table table-striped table-bordered table-hover dataTable no-footer">
															{/* <colgroup>
																<col width="5%" />
																<col width="10%" />
																<col width="10%" />
																<col width="10%" />
																<col width="10%" />
																<col width="10%" />
																<c: {SessionUser.POWER != 4}">
	                                 			<col width="10%" />
	                                 		</c:if>
			                                <col width="*" />
															<col width="*" />
		                              	</colgroup> */}
															<thead>
																<tr role="row">
																	<th>No.</th>
																	<th>운전자</th>
																	<th>가동시간</th>
																	<th>운행시간</th>
																	<th>작업시간</th>
																	<th>실 가동시간</th>
																	<c: {SessionUser.POWER != 4}">
		                                  			<th>운영효율</th>
		                                  		</c:>
		                                  		<th>RFID 번호</th>
																<th>소속</th>
		                                  	</tr>
		                              	</thead>
														<tbody>
															<c:choose>
	                                			<c: {fn:length(DriverOperationList) == 0}">
	                                				<tr>
																<td colspan="8" style="text-align: center;">데이터가 없습니다</td>
															</tr>
	                                			</c:when>
	                                			<c:otherwise>

	                                				<c: {DriverOperationList}" var="list" varStatus="status">
			                                			 <tr>
															<td style="text-align: center;">
																${status.count + ((Page.currentPageNo - 1) * Page.recordCountPerPage)}
															</td>
															<td class="center"><a href="#" onclick="fn_driverOperationView('${list.RFID_CARD}');">${list.DRIVER_NM}</a></td>
															<td class="center">${list.KEYON_TIME_MIN_TEXT} </td>
															<td class="center">${list.RUNNING_TIME_MIN_TEXT} </td>
															<td class="center">${list.WORK_TIME_MIN_TEXT} </td>
															<td class="center">${list.REAL_OP_TIME_TEXT} </td>

															<c: {SessionUser.POWER != 4}">
					                                       		<td class="center">
																${list.OPERATION}%
					                                       		</td>
					                                      	 </c:if>

					                                       	<td class="center">${list.RFID_CARD}</td>
														<td class="center">${list.CUSTOMER_NM}</td>
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
									<c: {fn:length(DriverOperationList) > 0}">
		             						<ul class="pagination">
										<ui: {Page}" type="image" jsFunction="fn_listPaging"/>
											</ul>
										</c:>
		           					</div>
						</div>
							</div>
			</div>
			</div>
		</div >
		</div >
		</div >
	</div >
	</form >
</div >

		</>
	);
}

export default App;
