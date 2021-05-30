//require for mysql2
var mysql = require('mysql2/promise');
//export our db module
module.exports={};
connection()
async function connection(){
    var dbconnection = await mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '2021',
    database : 'mydb'
     });
     
 module.exports.connection=dbconnection;
 }
