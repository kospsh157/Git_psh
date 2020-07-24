<!-- 기본 jsp 페이지 틀  -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title> 아무 제목 </title>
</head>
<body>
 
    html 내용 여기다가 

</body>
</html>





<!-- 

    forward 태그는 
    우선 페이지가 버퍼를 지원해야 한다. 
    포워드는 버퍼에다 현재 포워드가 태그가 실행된 그 페이지의 
    req, res 객체를 담아 보내기 때문이다. 

    그 이전의 버퍼에 있던 것은 싸그리 지우고 현재 포워드 태그가
    있는 페이지에서 부터 요청/반응 객체를 새로 담아서 보낸다. 



-->

<!-- 일반적인 사용 패턴 -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
  String gorwardPage= null;
 
  //조건에 따라 이동할 페이지를 지정
  if(조건판단1)
  {
    forwardPage="페이지URL1";
  }
  else if(조건판단2)
  {
    forwardPage="페이지URL2";
  }
  else if(조건판단3)
  {
    forwardPage="페이지URL3";
  }
%>
 <jsp:forward page="<%=forwardPage%>"/>



<!-- 페이지에서 파라미터자료를 받고 다시 포워드를 보내는 패턴 -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>옵션 선택화면</title>
</head>
<body>
<form action="view.jsp">
 
보고싶은 페이지 선택 :
  <select name="code">   
      <option value="A">A 페이지</option>
      <option value="B">B 페이지</option>
      <option value="C">C 페이지</option>
  </select>
  
  <input type="submit" value="value">
</form>
 
 
</body>
</html>

<!-- 여기서 셀렉트에서 보낸 데이터를 받아서 어떤 페이지로 이동할지 정하고
그 페이지로 포워드 시킴  -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
  String code = request.getParameter("code");
  String viewPageURI = null;
  
  if(code.equals("A")){
      viewPageURI="a.jsp";
  }else if(code.equals("B")){
      viewPageURI="b.jsp";
  } else if(code.equals("C")){
      viewPageURI="c.jsp";
  }
  %>
  <jsp:forward page="<%=viewPageURI %>"/>

<!-- 만약에 포워드페이지에서 어떤 데이타를 담아서 포워드 시킬려면 다음과 같이
하면 된다. 
include 액션태그와 동일하게 param 태그를 사용하면된다.  -->
<jsp:forward page="moveTo.jsp">
  <jsp:param name="first" value="BK"/>
  <jsp:param name="last" value="Choi"/>
</jsp:forward>



   