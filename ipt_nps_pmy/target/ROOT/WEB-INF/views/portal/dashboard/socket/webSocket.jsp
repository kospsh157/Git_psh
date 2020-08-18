<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
    <script type="text/javascript" src="./jquery-2.2.3.min.js"></script>
    <script type="text/javascript" src="./sockjs.js"></script>
    <script type="text/javascript" src="./sockjs.min.js"></script>
    
    
    <meta charset="UTF-8">
    <title>Insert title here</title>
    
    <script>
        var conn = new WebSocket( 'ws://127.0.0.1:8079/echo/websocket' );
        conn.onmessage = function ( e )
        {
            console.log( e.data );
        };

        // $(document).ready(function(){
        conn.onopen = function ( e )
        {
            conn.send( 'hello' );
        };
        // });

        conn.onclose = function ( e )
        {
            console.log( "error" );
        };
    </script>
</head>

<body>

</body>

</html>