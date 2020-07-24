<!-- 인클루드 방식에는 사용법이 2가지 존재함 -->
<!-- 
    주로 공통으로 페이지마다 있는 코드를 따로 페이지로 빼서
    인클루드로 해서 불러온다. 
    인클루드로 불러오는 페이지가 자식페이지고 
    인클루드 태그가 있는 곳이 (현재페이지) 부모 페이지이다. 
    부모 페이지에서는 자식 페이지의 모든 자원을 사용할 수 있다.(정적방법일 경우만) 
    

    1. 지시어 방법 (정적인 방법)
    <%@ include file="/WEB-INF/views/include/header.jsp" %>
    --- 현재 파일 ---
    <%@ include file="/WEB-INF/views/include/footer.jsp" %>
    주의할 점은 : 인클루드한 파일과 현재 파일에서 동일한 변수명이있거나 하면 심각한 오류를 발생한다. 
    성능은 정적인 방법을 선택하는게 더 빠르다. 
    다른 말로 표현하면 상위 파일의 변수명을 그대로 이어서 사용가능하다. 

    2. 액션 방법   (동적인 방법)
    <jsp:include page="/WEB-INF/views/include/header.jsp"/>
    --- 현재 파일 ---
    <jsp:include page="/WEB-INF/views/include/footer.jsp"/>
    주의할 점 : 동적인 방법과는 달리 상위페이지의 변수명이 그대로 넘어오지 않는다. 
    그래서 동일한 변수명을 사용할 수 있지만, 햇갈릴수 있으므로 가급적 추천되지 않는다. 
    그래서 현재 파일에서 인클루드 파일쪽으로 파라미터를 넘기는 기능이 있다. 
    
    include file 은 상위파일에서 쓰던 변수를 그대로 사용할 수 있고
    include page 는
    <jsp:include page="a.jsp" flush="true">
    <jsp:param name="abc" value="<%=abc%>"/>
    </jsp:include>
    이런식으로 useBean에서 파라미터 넘기는것 처럼.. 사용합니다..
    해당 a.jsp 에서 받을때는 request.getParameter("abc")와 같이 받고요..

    
    
    3. 액션에서 파람태그 사용
    액션 방법을 사용할 때 파람 태그를 써서 데이터를 보낼 수 있다. 
    <jsp:include page="/WEB-INF/views/include/footer.jsp">
        <jsp:param name="email" value="sesok808@naver.com" />
        <jsp:param name="tel" value="010-1234-5678" />
    </jsp:include>

    4. 간단요약
        - 정적인 방식: <%@ include file="관련 URL" %>
        - 동적인 방식: <jsp:include page="relativeURL" />



 -->