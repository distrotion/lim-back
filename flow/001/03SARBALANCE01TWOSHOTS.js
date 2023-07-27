const express = require("express");
const router = express.Router();
var mssql = require('../../function/mssql');
var mongodb = require('../../function/mongodb');
var httpreq = require('../../function/axios');
var axios = require('axios');


router.post('/03SARBALANCE01TWOSHOTS/GENREQ', async (req, res) => {
  //-------------------------------------
  console.log("--03SARBALANCE01TWOSHOTS/GENREQ--");
  console.log(req.body);
  input = req.body;
  //-------------------------------------
  
  



  //-------------------------------------
  res.json(output);
});



module.exports = router;
