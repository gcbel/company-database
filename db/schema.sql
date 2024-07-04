DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

\c company;

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    department_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE CASCADE
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first VARCHAR(40) NOT NULL,
    last VARCHAR(40) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE CASCADE
);