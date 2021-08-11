//Dependencies
const db = require('./db/connection');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const Promise = require('bluebird');
//Promise.promisifyAll(db);

//Inquirer interface
const mainMenu = () => {
    return inquirer.prompt(
        {
            type:'list',
            name: 'menu',
            message: 'Hello! What would you like to do?',
            choices: [
            'View all departments', 
            'View all roles', 
            'View all employees',
            'Add department',
            'Add employee',
            'Update employee role',
            'Update employee managers',
            'View employees by manager',
            'View employees by department',
            'Delete department',
            'Delete role',
            'Delete employee',
            'View total utilized budget'
        ]})
        .then((response) => {
            switch (response.menu) {
                case "View all departments":
                    allDept();
                    break;
            }

            switch (response.menu) {
                case "View all roles":
                    allRoles();
                    break;
            }

            switch (response.menu) {
                case "View all employees":
                    allEmplys();
                    break;
            }

            switch (response.menu) {
                case "Add department":
                    addDept();
                    break;
            }

            switch (response.menu) {
                case "Add employee":
                    addEmply();
                    break;
            }

            switch (response.menu) {
                case "Update employee role":
                    updateEmply();
                    break;
            }

            switch (response.menu) {
                case "Update employee managers":
                    updateMangr();
                    break;
            }

            switch (response.menu) {
                case "View employees by manager":
                    viewbyMangr();
                    break;
            }

            switch (response.menu) {
                case "View employees by department":
                    viewbyDept();
                    break;
            }

            switch (response.menu) {
                case "Delete department":
                    delDept();
                    break;
            }

            switch (response.menu) {
                case "Delete role":
                    delRole();
                    break;
            }

            switch (response.menu) {
                case "Delete employee":
                    delEmply();
                    break;
            }

            switch (response.menu) {
                case "View total utilized budget":
                    budget();
                    break;
            }
            
        })

} 



// Function to view all departments --similar to get routes functionality

//Function to view all rows 

//Function to view all Employees

//Function to add department --similar to post functionality

//Function to add employee


//Function to update employee role


//Bonuses 
    // Update employee managers
    //view employees by manager
    //view employees by department
    //delete departments, roles, and employees
    //View total utilized budget of a department (add all salaries in department)