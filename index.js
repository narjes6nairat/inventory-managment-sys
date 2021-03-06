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
 

//rest api to get a single supplier data http://localhost:8000/api/supplier/:Supplier_ID
app.get('/api/supplier/:Supplier_ID', function (req, res) {


  mysql
  .execute(`SELECT * FROM supplier WHERE Supplier_ID = ?`, [req.params.Supplier_ID])
    .then((data) => {
      if (!data[0].length) {
        res.status(404).json({ status: false, message: 'supplier not found!' });
        return;
      }
      res.json({ status: true, product: data[0] });
    })
    .catch((err) => 
    {
      res.status(404).json({ status: false, message: 'database error!' });
    });


});


//rest api to create a new record into mysql database http://localhost:8000/supplier/add
app.post('/supplier/add',async  function (req, res) {


  var postData = req.body;
  mysql.execute(`INSERT INTO supplier (Supplier_ID, Supplier_Name, address,phone, fax, Email, other_details) VALUES (?, ?, ?, ?, ?, ?,?)`,
 [postData.Supplier_ID, postData.Supplier_Name,postData.address, postData.phone, postData.fax, postData.Email, postData.other_details ]).then((response) => {
       res.json(response)
 }).catch(console.log)


});


//deletesupplier by your id http://localhost:8000/api/supplier/delete
app.delete('/api/supplier/delete', async (req, res) => {


  let y = "delete from supplier where Supplier_ID =?"
  let x = await mysql.execute(y, [req.body.Supplier_ID])
  res.status(200).json("supplier Successfully Deleted.");


});


//rest api to update record into mysql database http://localhost:8000/api/supplier/update
app.put('/api/supplier/update', async function (req, res) {


    await mysql.query('UPDATE `supplier` SET `Supplier_Name`=?,`address`=?,`phone`=?,`fax`=?,`Email`=?,`other_details`=? where `Supplier_ID`=?',
    [req.body.Supplier_Name,req.body.address, req.body.phone, req.body.fax, req.body.Email, req.body.other_details, req.body.Supplier_ID],
     function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});


});



//////////////////////////////////////order////////////////////////////////

//rest api to get all order  http://localhost:8000/api/inv_order/getall
app.get('/api/inv_order/getall', async function (req, res) {
              

  mysql
    .execute('SELECT * FROM inv_order')
    .then((response) => {
      res.json(response[0]);
    })
    .catch(console.log);


});


//rest api to get a single order data http://localhost:8000/api/inv_order/:order_ID
app.get('/api/inv_order/:order_ID', function (req, res) {
  mysql
    .execute(`SELECT * FROM inv_order WHERE order_ID = ?`, [req.params.order_ID])
    .then((data) => {
      if (!data[0].length) {
        res.status(404).json({ status: false, message: 'order not found!' });
        return;
      }
      res.json({ status: true, product: data[0] });
    })
    .catch((err) => {
      res.status(404).json({ status: false, message: 'database error!' });
    });
});

//rest api to create a new record into mysql database http://localhost:8000/api/inv_order/add
app.post('/api/inv_order/add',async  function (req, res) {


  var postData = req.body;
  mysql.execute(`INSERT INTO inv_order (order_ID, dete_of_order, order_details,customer_ID) VALUES (?, ?, ?, ?)`,
 [postData.order_ID, postData.dete_of_order,postData.order_details, postData.customer_ID]).then((response) => {
       res.json(response)
 }).catch(console.log)


});


//delete order by your id http://localhost:8000/api/inv_order/deleteorder
app.delete('/api/inv_order/deleteorder', async (req, res) => {


  let y = "delete from inv_order where order_ID =?"
  let x = await mysql.execute(y, [req.body.order_ID])
  res.status(200).json("order Successfully Deleted.");


});


//rest api to update record into mysql database http://localhost:8000/api/inv_order/update
app.put('/api/inv_order/update', async function (req, res) {


  await mysql.query('UPDATE `inv_order` SET `dete_of_order`=?,`order_details`=?,`customer_ID`=? where `order_ID`=?',
  [req.body.dete_of_order,req.body.order_details, req.body.customer_ID,req.body.order_ID],
  function (error, results, fields) 
  {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });


});
