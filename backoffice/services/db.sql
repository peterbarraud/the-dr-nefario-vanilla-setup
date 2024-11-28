create database test;
use test;
create table appuser (
    id tinyint not null auto_increment,
    username varchar(20),
    password varchar(20),
    primary key (id)
);
