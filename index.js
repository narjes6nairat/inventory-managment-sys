var http = require("http");
//instance from express
const express = require('express');
//call the express function
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
//require for out db module
const mysql = require('./db')
var corsoptions =
{
  origin: 'http://localhost: 4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsoptions))
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//run the server on spefic port
//const port=process.env.port||8000*/
app.listen(8000,
  () => {
    console.log('Server started!')
  })
//rest api to get all results http://localhost:8000
app.get('/', async function (req, res) {
  let sql = "SELECT * FROM product";
  let results = await mysql.connection.execute(sql)
  res.status(200).json(results[0])
});
//rest api to get a single product data http://localhost:8000/product/:productid
app.get('/product/:productid', function (req, res) {
   mysql.connection.query('select * from product  where productid =?', [req.params.productid], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.json(results));
	});
});

//rest api to get a single pruduct data http://localhost:8000/api/product/:productid
app.get('/api/product/:productid', function (req, res) {
   mysql.connection.execute('SELECT * FROM product WHERE productid = ?', 
   [req.params.productid], 
   function (error, results, fields) {
	  if (error) {
      // throw error
      console.log(error)
    };
   
	  res.json(results);
    //res.status(200).json(results)
	});
});
//rest api to create a new record into mysql database http://localhost:8000/product
app.post('/product', function (req, res) {
  var postData = req.body;
  mysql.connection.query('INSERT INTO product SET ?', postData, function (error, results, fields) {
    if (error) throw error;
    res.status(200).json(results);
    res.status(200).json("proudect Successfully added."); 
  });
});
//delete product by your id http://localhost:8000/api/backend/deleteProduect
app.delete('/api/backend/deleteProduect', async (req, res) => {
  let y = "delete from product where productid =?"
  let x = await mysql.connection.execute(y, [req.body.productid])
  res.status(200).json("proudect Successfully Deleted.");
}
);
//rest api to update record into mysql database http://localhost:8000/update
app.put('/update', async function (req, res) {
    await mysql.connection.query('UPDATE `product` SET `product_name`=?,`category`=?,`price`=?,`cost`=?,`quantity`=?,`customerid`=? where `productid`=?',
    [req.body.product_name,req.body.category, req.body.price, req.body.cost, req.body.quantity, req.body.customerid, req.body.productid],
     function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});





