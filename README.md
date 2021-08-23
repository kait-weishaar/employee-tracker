# Employee-Tracker



## Table of Contents
* [Description](#description)
* [Technologies](#technologies)
* [Deployment](#deployment)
* [Usage](#usage)
* [Built With](#built-with)
* [Future Development](#future-development)



## Description:
Employee Tracker is a simple node.js application designed for a small business owner to track and manage their employees. It utilizes mysql for persistent storage in a database, Inquirer for handling user input, and mysql2 to link mysql to node. A user can view departments, roles, or employees. They can also edit an employee, and add a new employee or role. All funtionality is available from the main menu, which appears upon starting the app and after each task is completed.



## Technologies
The application was built for the node.js environment and utilized the npm modules MYSQL, INQUIRER, and MYSQL2. MYSQL is used to create and manage the relational database, Inquirer facilitates the user interaction, and MYSQL2 links mysql to node.



## Deployment:
Not deployable. Please clone the files and install dependencies to test out the app.




## Usage
The user can choose an action from the main menu and complete the prompts to manage their data. Before use, all dependencies must be installed including node, inquirer, mysql, and mysql2.
Demo video: 




![Demo Video](tracker.gif)






## Built With
 - Javascript
 - Node.js
 - NPM Inquirer
 - Mysql
 - Mysql2



## Future Development
I'd like to add some functionality such as deletion and the ability to quit the application without exiting node. The overall structure of the app logic (specifically the calls to the database) could be modularized to increase the dryness and perhaps legibility of the code.
 

