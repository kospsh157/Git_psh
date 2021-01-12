create database mydb;

use mydb;

-- 각각 01점포, 02점포 상품정보 테이블 하나씩 생성
create table 01products(no INT PRIMARY KEY, name VARCHAR(20), price INT);
create table 02products(no INT PRIMARY KEY, name VARCHAR(20), price INT);

-- 실험과 이해를 위해 실제로 데이터 입력
insert into 01products values (1, 'A', 1000);
insert into 01products values (2, 'B', 2000);
insert into 01products values (3, 'C', 3000);
insert into 01products values (4, 'D', 4000);


insert into 02products values (2, 'B', 2000);
insert into 02products values (3, 'C', 3000);

-- 02테이블에서 no를 서브쿼리로 불러와서 01테이블 no와 비교하여 01테이블에만 있는 no 값으로 다시 01테이블에서 select 해서
-- 02테이블에 insert 하기
insert into 02products (no, name, price)
select * from 01products 
where no in 
(select no from 01products where no not in (select no from 02products));