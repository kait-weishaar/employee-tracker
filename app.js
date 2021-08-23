//Dependencies
const db = require('./db/connection');
const {prompt} = require('inquirer');
const consoleTable = require('console.table');
const Promise = require('bluebird'); //Promises for async?? or await and try catch blocks...what's the difference
//Promise.promisifyAll(db);

//Inquirer interface
function mainMenu() {
    
     prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'Hello! What would you like to do?',
            choices: [
            'View all departments', 
            'View all roles', 
            'View all employees',
            'Add department',
            'Add employee',
            'Add role',
            'Update employee role',
            'Update employee managers',
            'View employees by manager',
            'View employees by department',
            'Delete department',
            'Delete role',
            'Delete employee',
            'View total utilized budget'
        ],
    },
    ])
        .then((response => {
            let choice = response.menu
            switch (choice) {
                case "View all departments":
                    allDept();
                    break;
            
                case "View all roles":
                    allRoles();
                    break;
      
                case "View all employees":
                    allEmplys();
                    break;
            
                case "Add department":
                    addDept();
                    break;
            
                case "Add role":
                    addRole();
                    break;

                case "Add employee":
                    addEmply();
                    break;
            
                case "Update employee role":
                    updateEmply();
                    break;
            
                case "Update employee managers":
                    updateMangr();
                    break;
           
                case "View employees by manager":
                    viewbyMangr();
                    break;
            
                case "View employees by department":
                    viewbyDept();
                    break;
            
                case "Delete department":
                    delDept();
                    break;
           
                case "Delete role":
                    delRole();
                    break;
            
                case "Delete employee":
                    delEmply();
                    break;
           
                case "View total utilized budget":
                    budget();
                    break;
                    default:
                        quit();
            }
            
        })

        )} 


// Function to view all departments --similar to get routes functionality
function allDept() {
    console.log('Displaying all departments\n');
    
        const sql = 'SELECT * FROM department';
        db.promise().query(sql)
        .then(([rows]) => {
            let dept = rows;
            console.table(dept);
            mainMenu();
        })

        
};


//Function to view all roles 

function allRoles() {
    console.log('Displaying all roles\n');

        const sql = 'SELECT role.id, role.title, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id';
        db.promise().query(sql)
        .then(([rows]) => {
            let roles = rows;
            console.table(roles);
            mainMenu();
        })
};


//Function to view all Employees
function allEmplys() {
    console.log('Displaying all employees\n');
    
        const sql = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id';
        db.promise().query(sql)
        .then(([rows]) => {
            let roles = rows;
            console.table(roles);
            mainMenu();
        })
};

//Function to add department --similar to post functionality
function addDept() {
    console.log('Adding new department\n');
    
       
       prompt([
           {name: 'dept',
            type: 'input',
            message: 'Please provide the name of the new department'
        },
       ])
       .then(answer => {
           const sql = 'INSERT INTO department (name) VALUES (?)';
           db.query(sql, answer.dept, (err, res) => {
               if (err) throw err;
               console.log(`${answer.dept} was successfully added to departments!`);
               allDept();
               mainMenu();
           })
       });
};


//Function to add employee
function addEmply() {
    console.log('Adding new employee\n');

       prompt([
           
            {       name: 'firstName',
                    type: 'input',
                    message: "Please provide the employee's first name",
                    validate: firstName => {
                        if (firstName) {
                            return true;
                        } else {
                            console.log('Please enter a first name!');
                            return false;
                        }
                    }
            },

        
                {   name: 'lastName',
                    type: 'input',
                    message: "Please provide the employee's last name",
                    validate: lastName => {
                        if (lastName) {
                            return true;
                        } else {
                            console.log('Please enter a last name!');
                            return false;
                        }
                    }
            }
       ])
       .then(response => {
           const params = [response.firstName, response.lastName]

           const rolesql = `SELECT role.id, role.title FROM role`;

           db.query(rolesql, (err,res) => {
               if (err) throw err;

               const rolesChoices = res.map(({id, title}) => ({name:title, value: id}))
               prompt([
                            {
                                type: 'list',
                                name: 'role',
                                message: 'Please provide the role of the employee',
                                choices: rolesChoices
                            }
                ])
                .then(roleChoice => {
                    const role = roleChoice.role;
                    params.push(role);

                    const mngrsql = `SELECT * FROM employee`;
                    db.query(mngrsql, (err, res) => {
                        if (err) throw err;
                        const employees = res.map(({id, first_name, last_name}) => ({name: first_name + " " + last_name, value: id}));

                        prompt([
                            {
                                type: 'list',
                                name: 'manager',
                                choices: employees
                            }
                        ])
                        .then(mngrChoice => {
                            const manager = mngrChoice.manager;
                            params.push(manager);
                            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                            db.query(sql, params, (err, res) => {
                                if (err) throw err;
                                console.log('Employee was succesffully added!')
                                allEmplys();
                            })
                        })
                    })
                })
            })
       });

      

};

//Function to add employee role

function addRole() {
    console.log('Adding new role\n');
        const deptsql = `SELECT * FROM department`;
        
        db.query(deptsql, (err, res) => {
            if (err) throw err;
            const deptChoices = res.map(({name, id}) =>({name: name, value: id}));
            prompt([
                {
                     name: 'title',
                     type: 'input',
                     message: 'Please provide the name of the new role'
                 },
     
             {
                 name: 'salary',
                 type: 'input',
                 message: 'Please provide the salary of the new role'
             },
     
             {   name: 'dept',
                 type: 'list',
                 message: 'Please provide the department for the new role',
                 choices: deptChoices
             },
            ])
            .then(function(answer) {
                const params = [];
                const title = answer.title;
                params.push(title);
                const salary = answer.salary;
                params.push(salary);
                const dept = answer.dept;
                params.push(dept);
                const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
                db.query(sql, params, (err, res) => {
                    if (err) throw err;
                    console.log(`${answer.name} was successfully added to roles!`);
                    allRoles();
                })
     
            })
            
        })
       
  
       
       

};
//Function to update employee role

function updateEmply() {
    const emplysql = `SELECT * FROM employee`;

    db.query(emplysql, (err, res) => {
        if (err) throw err;
        const employees = res.map(({id, first_name, last_name}) =>({name: first_name + " " + last_name, value: id}));
        prompt([
            {
            type: 'list',
            name: 'name',
            message: "Please select the employee you'd like to edit",
            choices: employees
        }
        ])
        .then(answer => {
            const emply = answer.name;
            const params = [];
            params.push(emply);

            const rolesql = `SELECT * FROM role`;
            db.query(rolesql, (err, res) => {
                if (err) throw err;

                const roles = res.map(({id, title}) =>({name: title, value: id}));

                prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: 'Please provide the new role for the employee',
                        choices: roles
                    }
                ])
                .then(answer => {
                    const role = answer.role;
                    params.push(role);

                    params[0] = role;
                    params[1] = emply;

                    const sql = `UPDATE employee SET role_id = ? WHERE id =?`;
                    db.query(sql, params, (err,res) => {
                        if (err) throw err;
                        console.log('Employee updated!');
                        allEmplys();
                    });
                });
            });
        });
    });
};

//Bonuses 
    // Update employee managers
    //view employees by manager
    //view employees by department
    //delete departments, roles, and employees
    //View total utilized budget of a department (add all salaries in department)
    mainMenu();