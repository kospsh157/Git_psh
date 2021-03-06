// Rest와 라우팅 사용하기
/*
    쉽게 말해서 요청의 내용이 주소를 통해 표현되도록 하는게 REST이다.

    REST (REpresentational State Transfer)
    서버의 자원을 정의하고 
    자원에 대한 주소를 지정하는 방법이다.

    일종의 약속이라고 봐도 무방하다.

    자원이라고 해서 꼭 파일일 필요는 없고 서버가 행할 수 있는 모든 것들을 통틀어서 의미한다.
    REST API에는 많은 규칙들이 있는데, 모든 규칙을 지키는 것은 현실적으로 어려우므로, 이 책에서는 기본적인 
    개념만 빌려 사용한다.

    주소는 의미를 명확히 전달하기 위해 명사로 구성된다. 
    /user이면 사용자 정보에 관련된 자원을 요청하는 것이다. 
    /post이면 게시글에 관련된 자원을 요청하는 것으로 추측할 수 있다.
    
    단순히 명사만 있으면 무슨 동작을 행하라는 건지 알기 어려우므로 REST에서는 주소 외에도 HTTP
    요청 메서드라는 것을 사용한다.

    여기서 바로 이게 나온다 요청 메서드
    GET     : 서버 자원을 가져오고자 할 때 사용. 요청의 본문에 데이터를 넣지 않는다. 
    만약 데이터를 보내야 한다면, 쿼리스트링을 사용한다.

    POST    : 서버에 자원을 새로 등록 할 때 사용. 요청의 본문에 새로 등록할 데이터를 넣어 보낸다.

    PUT     : 서버의 자원을 요청에 들어 있는 자원으로 치환하고자 할 때 사용.
    요청의 본문에 치환할 데이터를 넣어 보낸다.

    PATCH   : 서버 자원의 일부만 수정하고자 할 때 사용. 요청의 본문에 일부 수정할 데이터를 넣어 보낸다.

    DELETE  : 서버의 자원을 삭제하고자 할 때 사용한다. 요청의 본문에 데이터를 넣지 않는다.

    OPTIONS : 요청을 하기 전에 통신 옵션을 설명하기 위해 사용. 12장에서 자주 쓰게 됨.


    주소 하나가 요청 메서드를 여러 개 가질 수 있다.
    /user 주소에 GET메서드 >>> 사용자 정보를 가져오라는 요청 일 것임.
    /user 주소에 POST메서드 >>> 새로운 사용자를 등록하려 한다는 것임.

    만약 위의 메서드로 표현하기 애매한 동작 같은 경우
    예를 들어 로그인 같은 경우는 그냥 POST를 사용하면 된다.

    이렇게 주소와 메서드만 보고 요청의 내용을 추측할 수 있는게 장점이다.

    GET메서드의 경우는 브라우저에서 캐싱(기억)할 수도 있으므로, 같은 주소로 GET요청을 할 때
    서버에서 가져오는 것이 아니라, 캐시에서 가져올 수도 있다. 이러면 성능이 좋아진다.

    HTTP통신을 사용하면 클라이언트가 누구든 상관없이 같은 방식으로 서버와 소통할 수 있다.
    iOS, 안드로이드, 웹, 다른 서버가 모두 같은 주소로 요청을 보낼 수 있다. 
    즉 서버와 클라이언트가 분리되어 있다는 뜻이다. 
    이렇게 분리되어 있다면, 나중에 서버를 확장할 때 클라이언트에 구애되지 않아 좋다.

    이제 REST를 사용한 주소 체계로 RESTful한 웹 서버를 만들어보자.
    REST를 따르는 서버를 RESTful하다 라고 한다.
    코드를 작성하기 전에 표로 일단 만들어서 대략적인 주소를 먼저 설계하는 것이 좋다.
    주소 구조를 미리 머릿속에 정리해둔 후 코딩을 시작하는게 좋다.
*/


