-- NOTE-----------

-- create database
CREATE DATABASE bookdb;

-- create table
CREATE TABLE book (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(20),
    description VARCHAR(255)
);


-- info insert into table

INSERT INTO book (id, name, description)
VALUES
(111, X, Nice book),
(112, Y, Nice book2);

-- from table get all books specific info or all info

SELECT id, name
-- or
SELECT *
FROM book;

-- GET book by id
SELECT *
FROM book
WHERE id=111

-- Delete a book by id
DELETE FROM book
WHERE id=111

-- Update book by id
UPDATE book
SET name="abc" description="heyyyyyyyyyy"
WHERE id=112

