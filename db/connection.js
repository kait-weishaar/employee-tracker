const mysql = require('mysql2');
// Connect to database

welcome = ()=>{
  console.log('-----------------------------------')
  console.log('|                                 |')
  console.log('|         EMPLOYEE TRACKER        |')
  console.log('|                                 |')
  console.log('-----------------------------------')
 }
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'KAITweish5323!',
      database: 'employees_db'
    },
    welcome()
    
  );
 
  module.exports = db;