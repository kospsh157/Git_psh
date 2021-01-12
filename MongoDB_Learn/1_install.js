// 몽고 디비  맥에 설치하기 

/*
    1. homebrew 설치
    2. brew tap | grep mongodb 
        1. 리스트로 몽고디비에 관련된 리스트들이 나와야함
        2. 그러지 않으면 필수 구성 요소를 설치하러 가야함
        3. brew tap mongodb/brew 실행
    3. brew install mongodb-community@4.4 
    4. 몽고서버와 클러스터 쿼리 라우터, 몽고쉘이 설치된다.
    5. 또한 주요 설치 폴더는 다음과 같다.
        1. the configuration file (/usr/local/etc/mongod.conf)
        2. the log directory path (/usr/local/var/log/mongodb)
        3. the data directory path (/usr/local/var/mongodb)
*/


// 몽고DB 실행하기
/*
    1. brew services start mongodb-community@4.4 // 시작
    2. brew services stop mongodb-community@4.4  // 중지
    3. brew services list   // 확인

    4. 몽고 쉘 이용하기 : mongo 
    5. 몽고 DB툴 이용하기 : mongotop

    6. 몽고DB 인증 상태로 접속하기
    먼저 몽고DB는 설정을 따로해줘야 admin 계정이 생기고 아무나 접속을 못하게 되어 있다.
    하나의 DB당 하나의 관리자 계정만 설정이 가능하다.
    먼저 admin 계정을 설정해주자
        0. use admin 으로 admin DB로 이동하고 다음과 같이 admin계정 정보를 저장한다.
            1. db.createUser(
                user:"admin",
                pwd:passwordPrompt(),
                roles:[{ role: "userAdminAnyDatabase",db:"admin"}, "readWriteAnyDatabase"]
                }
            )
            2. db.auth('아이디', '비밀번호')   // 위에서 만든 아이디로 확인차 로그인해본다.
            여기서 1이 반환되면 제대로 로그인이 된 것이다.
        1. /etc/mongo.conf 파일안에 security 주석을 없애고 authorization : enabled 옵션을 넣어준다.
        2. 몽고 재시작

    7. 만약 유저name이 alice 일 경우 다음과 같이 치면 된다.
        로컬로 접속할 경우 --host 는 생략해도 될 듯?
        --port도 생략하면 기본 포트로 되겠지.
        --authenticationDatabase 다음에 오는 admin은 어드민 계정이 담겨 있는 mongodb의 DB이다.
        mongo --username alice --password --authenticationDatabase admin --host mongodb0.examples.com --port 28015
*/