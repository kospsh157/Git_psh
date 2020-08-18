<%--
  Created by IntelliJ IDEA.
  User: phd
  Date: 2019-06-14
  Time: 오후 4:47
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<%-- CSS / Javascript 선언된 페이지 추가 --%>
<jsp:include page="/WEB-INF/views/v1/common/home_header.jsp"/>

<html>
<head>
    <title>Test</title>
    
    <script>
        $( document ).ready( function ()
        {
    
            var admin = "${User}";
            console.log( "admin : " + admin );
    
        } );
    </script>
</head>
<body>
    
    <div class="container">
        <h2>Admin Board</h2>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <td>관리자 ID</td>
                    <td>${User.userId}</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>관리자 이름</td>
                    <td>${User.userNm}</td>
                </tr>
            </tbody>
        </table>
    </div>

</body>
</html>
