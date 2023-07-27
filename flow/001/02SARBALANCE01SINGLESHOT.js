const express = require("express");
const router = express.Router();
var mssql = require('../../function/mssql');
var mongodb = require('../../function/mongodb');
var httpreq = require('../../function/axios');
var axios = require('axios');

let database = `LIMinstrument`;
// let collection = `BALANCEdata`;
let collection = `BALANCEdataSingle`;


router.post('/02SARBALANCE01SINGLESHOT/GENREQ', async (req, res) => {
  //-------------------------------------
  console.log("--02SARBALANCE01SINGLESHOT/GENREQ--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'nok';
  if (input['ReqNo'] != undefined && input['InstrumentName'] != undefined && input['ReqNo'] != '') {

    let timestamp = Date.now();
    let neworder = input;
    neworder['GENREQtimestamp'] = timestamp;


    let check1 = await mongodb.find(database, collection, { "ReqNo": neworder['ReqNo'], "LIMstatus": "IP" });
    let check2 = await mongodb.find(database, collection, { "ReqNo": neworder['ReqNo'], "LIMstatus": "SEND" });
    console.log("-------->");
    
    if (check1.length === 0 && check2.length === 0) {
      neworder['LIMstatus'] = 'IP';
      neworder['LIMTYPE'] = '02SARBALANCE01SINGLESHOT';
      neworder['data'] = { "W11": '' };
      neworder['data_adj'] = { "W11": '' };
      let ins1 = await mongodb.insertMany(database, collection, [neworder]);

      output = 'ok';
    } else {
    }
  }

  //-------------------------------------
  res.json(output);
});


router.post('/02SARBALANCE01SINGLESHOT/UPDATEDATAW11', async (req, res) => {
  //-------------------------------------
  console.log("--02SARBALANCE01SINGLESHOT/UPDATEDATAW11--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'nok';
  if (input['ReqNo'] != undefined && input['DataPreview'] != undefined && input['ReqNo'] != '') {

    let timestamp = Date.now();
    let neworder = input;

    let check1 = await mongodb.find(database, collection, { "ReqNo": neworder['ReqNo'], "LIMstatus": "IP" });
    if (check1.length > 0) {
      if (check1[0]['data']['W11'] == '') {
        let ins2 = await mongodb.update(database, collection, { "ReqNo": neworder['ReqNo'], "LIMstatus": "IP" }, { $set: { "data.W11": input['DataPreview'] } });
        output = 'ok';
      }else if(check1[0]['data_adj']['W11'] == ''){
        let ins2 = await mongodb.update(database, collection, { "ReqNo": neworder['ReqNo'], "LIMstatus": "IP" }, { $set: { "data_adj.W11": input['DataPreview'] } });
        output = 'ok';
      }

    }

  }

  //-------------------------------------
  res.json(output);
});


router.post('/02SARBALANCE01SINGLESHOT/DELETEDATAW11', async (req, res) => {
  //-------------------------------------
  console.log("--02SARBALANCE01SINGLESHOT/DELETEDATAW11--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'nok';
  if (input['ReqNo'] != undefined && input['DataPreview'] != undefined && input['ReqNo'] != '') {

    let timestamp = Date.now();
    let neworder = input;

    let check1 = await mongodb.find(database, collection, { "ReqNo": neworder['ReqNo'], "LIMstatus": "IP" });
    if (check1.length > 0) {

      let ins2 = await mongodb.update(database, collection, { "ReqNo": neworder['ReqNo'], "LIMstatus": "IP" }, { $set: { "data.W11": '' } });
      output = 'ok';

    }

  }

  //-------------------------------------
  res.json(output);
});

router.post('/02SARBALANCE01SINGLESHOT/DELETEDATAW11_adj', async (req, res) => {
  //-------------------------------------
  console.log("--02SARBALANCE01SINGLESHOT/DELETEDATAW11--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'nok';
  if (input['ReqNo'] != undefined && input['DataPreview'] != undefined && input['ReqNo'] != '') {

    let timestamp = Date.now();
    let neworder = input;

    let check1 = await mongodb.find(database, collection, { "ReqNo": neworder['ReqNo'], "LIMstatus": "IP" });
    if (check1.length > 0) {

      let ins2 = await mongodb.update(database, collection, { "ReqNo": neworder['ReqNo'], "LIMstatus": "IP" }, { $set: { "data_adj.W11": '' } });
      output = 'ok';

    }

  }

  //-------------------------------------
  res.json(output);
});


module.exports = router;
