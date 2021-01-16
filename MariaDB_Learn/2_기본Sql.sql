--  기본 SQL 문장
-- 데이터 저장
create database 
drop database
use
create table
alter table
drop table
describe


-- 데이터 조작
select 
insert
update
delete 
replace 
truncate



-- 트랜잭션
start transaction
commit
rollback


-- Creating a Structure
create database bookstore;
use bookstore;

create table books (
    isbn CHAR(20) PRIMARY KEY,
    title VARCHAR(50),
    author_id INT,
    publisher_id INT,
    year_pub CHAR(4),
    description TEXT 
);

describe books; 



create table authors 
(
    author_id int auto_increment primary key,
    name_last varchar(50),
    name_first varchar(50),
    country varchar(50)
);


insert into authors 
( name_last, name_first, country)
values('Kafka', 'Franz', 'Czech Republic');



-- 컬럼 이름 수정
alter table books change tile title varchar(50);

-- 컬럼 기본값 변경 
alter table books alter column title set default 100;

-- 컬럼 타입 변경
alter table books modify title varchar(100);

-- 컬럼 추가 
alter table books add subTitle varchar(50) default "no-subtitle"

-- 제일 첫번째로 지정해서 컬럼 추가하기
alter table books add column subTitle2 varchar(30) default "no-subTitle2" first;

-- 컬럼 삭제
alter table books drop column subTitle2;


