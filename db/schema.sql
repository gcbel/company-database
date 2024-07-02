DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

\c business_db;

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    dept_id INTEGER NOT NULL,
    FOREIGN KEY dept_id
    REFERENCES departments(id)
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first VARCHAR(40) NOT NULL,
    last VARCHAR(40) NOT NULL,
    manager_id INTEGER,
    role_id INTEGER NOT NULL,
    FOREIGN KEY role_id
    REFERENCES role(id)
);