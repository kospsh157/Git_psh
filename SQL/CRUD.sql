-- RDMS : 행과 열을 가지는 표 형식 데이터를 저장하는 형태의 DB
-- 행(레코드), 열(컬럼/필드), 셀(행과 열이 만나는 부분, 하나의 데이터 값)

-- DML data manipulation language
-- 데이터 조작
-- DB에 새롭게 데이터를 추가하거나 삭제 및 내용 갱신
SELECT 
INSERT
UPDATE
DELETE



-- DDL data definition LANGUAGE
-- 데이타 정의
-- 테이블, 뷰 생성 등에 쓰이는 명령어들
CREATE
ALTER
DROP
TRUNCATE

-- DCL data control LANGUAGE
-- 데이터 제어
-- 트랜잭션을 제어하거나 데이터 접근 권한 등을 제어하는 명령어들
GRANT
REVOKE


-- 예약어와 DB 객체명은 대소문자를 구별하지 않는다.


-- DB 생성 사용 삭제 조회
create database DB명; 
use DB명; 
drop database DB명;
show databases; 


-- 테이블 구조 참조
desc tablename;

-- 테이블 목록 조회
show tables; 

-- 테이블 생성 
create table tableName (
    id int(11) not null auto_increment,
    username VARCHAR(20) not null,
    age int(11) not null,
    PRIMARY KEY(id)
);



-- 테이블 컬럼 추가/수정/삭제
alter table tableName add columnName int;

alter table tableName modify column columnName varchar(20);

alter table tableName drop columnName


-- 테이블 삭제
drop table tableName;


-- 데이터 삽입  
insert into tableName(column1, column2, ..) values( 'data1', 'data2', ...);


-- 데이터 조회
select * from tableName;

-- 데이터 수정/삭제
update tableName set columnName = '데이터1' where 조건;

delete from tableName where columnName = '조건';
-- 수정과 삭제는 특히 조심해야한다. 
-- where 문 조건을 기본값 컬럼으로 하지 않으면 중복된 모든 데이터가 다 수정되거나 삭제되므로
-- update/delete 문은 항상 조건절을 조심히, 반드시 써야한다.

