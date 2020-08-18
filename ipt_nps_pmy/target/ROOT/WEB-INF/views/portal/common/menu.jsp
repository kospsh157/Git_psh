<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

    <header>
        <div>
            <h1><img src="/images/logo.png" alt="트래픽분석시스템" onClick="location.href='/v1/dashboard'" style="cursor:pointer"></h1>
            <ul>
                <li><a href="#none">국내</a>
                    <ul>
                        <li><a href="/v1/statics/statics_general">총괄분석</a></li>
                        <li><a href="/v1/statics/statics_direct">직접</a></li>
                        <li><a href="/v1/statics/statics_transit">중계</a></li>
                        <li><a href="/v1/statics/statics_iptopn">IP별 분석</a></li>
                    </ul>
                </li>

                <li><a href="#none">국제</a>
                    <ul>
                        <li><a href="#none">직연동</a></li>
                        <li><a href="#none">국제CP</a></li>
                    </ul>
                </li>

                <li><a href="#none">MRTG</a>
                    <ul>
                        <li><a href="#none">트래픽모니터링</a></li>
                        <li><a href="#none">라우터관리</a></li>
                    </ul>
                </li>

                <li><a href="#none">기업</a>
                    <ul>
                        <li><a href="#none">고객/회선별 집계분석</a></li>
                    </ul>
                </li>

                <li><a href="#none">KTOA</a>
                    <ul>
                        <li><a href="#none">총괄분석 비교</a></li>
                        <li><a href="#none">CP별</a></li>
                        <li><a href="#none">정산/flow 비교</a></li>
                    </ul>
                </li>

                <li><a href="#none">통합관리</a>
                    <ul>
                        <li><a href="#none">시스템 모니터링</a></li>
                        <li><a href="#none">사용자 관리</a></li>
                        <li><a href="/v1/mng/mngCircuit">회선그룹 관리</a></li>
                        <li><a href="/v1/device/devicePort">고객번호 관리</a></li>
                        <li><a href="/v1/device/device">서비스 관리</a></li>
                    </ul>
                </li>
                <!--
                <li><a href="#none">연동데이터</a>
                    <ul>
                        <li><a href="#none">SWING</a></li>
                        <li><a href="#none">BMS</a></li>
                        <li><a href="#none">DNS</a></li>
                        <li><a href="#none">SKB BGP Community</a></li>
                        <li><a href="#none">BGP as Path</a></li>
                        <li><a href="#none">Netgrid</a></li>
                        <li><a href="#none">IDC</a></li>
                        <li><a href="#none">KTOA</a></li>
                        <li><a href="#none">AS</a></li>
                    </ul>
                </li>
                 -->
            </ul>
            <div class="box_login">
                <span>홍길동 님</span><a href="#none">logout</a>
            </div>
        </div>
    </header>

