var http = require("http");
//instance from express
const express = require('express');
//call the express function
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
//require for out db module
const mysql = require('./db');
var corsoptions = 
{
  origin: 'http://localhost: 4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsoptions))
app.use(bodyParser.json());        // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({                     // to support URL-encoded bodies
    extended: true
  })
);

//run the server on spefic port
app.listen(8000, () => {
  console.log('Server started!');
});


////////////////////////// supplier //////////////////////////

//rest api to get all suppliers  http://localhost:8000/api/supplier/getall
app.get('/api/supplier/getall', async function (req, res) {
              

  mysql
    .execute('SELECT * FROM supplier')
    .then((response) => {
      res.json(response[0]);
    })
    .catch(console.log);

   
});