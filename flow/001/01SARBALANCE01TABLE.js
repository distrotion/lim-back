const express = require("express");
const router = express.Router();
var mssql = require('../../function/mssql');
var mongodb = require('../../function/mongodb');
var httpreq = require('../../function/axios');
var axios = require('axios');




router.post('/GETBALANCE01REQ', async (req, res) => {
  //-------------------------------------
  console.log(req.body);
  //-------------------------------------



  //-------------------------------------
  res.json(output);
});



module.exports = router;
