CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL
);

INSERT INTO items (title) VALUES ('Buy milk'), ('Finish homework');

CREATE TABLE employees (
    employeeID SERIAL PRIMARY KEY,
    employeeName VARCHAR(100),
    designation VARCHAR(100),
    gender CHAR(1)
);


INSERT INTO employees (employeeID, employeeName, designation, gender) VALUES
(1, 'angila', 'Web Developer', 'F'),
(2, 'jon', 'Software Developer', 'M');

