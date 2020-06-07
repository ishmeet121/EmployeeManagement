DROP TABLE IF EXISTS EMPLOYEES;
DROP TABLE IF EXISTS MANAGERS;

CREATE TABLE MANAGERS (
	id BIGINT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (ID),
    firstName VARCHAR(252) NOT NULL,
    lastName VARCHAR(252) NOT NULL,
    email VARCHAR(252) NOT NULL,
    password VARCHAR(252) NOT NULL,
);

CREATE TABLE EMPLOYEES (
    id BIGINT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(252) NOT NULL,
    lastName VARCHAR(252) NOT NULL,
    PRIMARY KEY (id),
    mngid BIGINT NOT NULL,
    FOREIGN KEY (mngid) REFERENCES MANAGERS(id)
);



 