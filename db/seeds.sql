INSERT INTO department (name)
VALUES 
('Marketing/Sales'), 
('IT'), 
('Engineering'),
('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES 
('Manager (Marketing)', '70000.00', 1),
('Manager (IT)', '70000.00', 2),
('Manager (Engineering)', '70000.00', 3),
('Manager (HR)', '70000.00', 4),
('Engineer', '68000.00', 3),
('Graphic Designer', '40000.00', 1),
('Sales Reprentative', '65000.00', 1),
('Digital marketing strategist', '67000.00', 1),
('Technician', '68000.00', 2),
('Talent Manager', '65000.00', 4),
('Administrator', '69000.00', 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('John', 'Doe', 1, NULL),
('Susan', 'Boyd', 2, NULL),
('Raj', 'Patel', 3, NULL),
('Hyung', 'Doo', 4, NULL),
('Harley', 'Robinson', 5, 3),
('Amandeep', 'Panach', 6, 1),
('Yuan', 'Chen', 7, 1),
('Damla', 'Ozturk', 8, 1),
('Steven', 'Bolling', 9, 2),
('Sam', 'Chang', 10, 4),
('Kim', 'Soss', 11, 4);