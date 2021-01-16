// 기본적인 명령어

show dbs      // 현재 존재하는 데이터베이스 목록을 출력

db            // 현재 사용 중인 데이터베이스

use 데이터베이스이름    //  다른 데이터베이스로 바꾸기

// 주의할 점은 현재 없는 DB라고 할 지라도, use를 사용하면 임시로 생성된다. 도큐먼트를 생성하면 show dbs 로 보이게 된다.

db.stats()    // 현재 데이터베이스의 사용 현황을 bytes단위로 조회한다. 




// 컬렉션 
// 데이터베이스는 복수개의 컬렉션의 집합으로 구성된다. 
// show tables, show colllections 명령으로 현재 데이터베이스에 저장된 컬렉션 목록을 확인할 수 있다.
show tables 
show collections



// 도큐먼트
// 