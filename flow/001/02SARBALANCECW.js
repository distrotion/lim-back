const express = require("express");
const router = express.Router();
var mssql = require('../../function/mssql');
var mongodb = require('../../function/mongodb');
var httpreq = require('../../function/axios');
var axios = require('axios');

let database = `LIMinstrument`;
// let collection = `BALANCEdata`;
let collection = `BALANCEdataCoatingweight`;


router.post('/02SARBALANCECW/GENREQ', async (req, res) => {
  //-------------------------------------
  console.log("--02SARBALANCECW/GENREQ--");
  console.log(req.body);
  input = req.body;
  //-------------------------------------
  let output = 'nok';
  if (input['ReqNo'] != undefined && input['InstrumentName'] != undefined && input['ReqNo'] != ''&& input['INSNO'] != '') {

    let timestamp = Date.now();
    let neworder = input;
    neworder['GENREQtimestamp'] = timestamp;


    let check1 = await mongodb.find(database, collection, { "ReqNo": neworder['ReqNo'],"UID": neworder['UID'], "LIMstatus": "IP" });
    let check2 = await mongodb.find(database, collection, { "ReqNo": neworder['ReqNo'],"UID": neworder['UID'], "LIMstatus": "SEND" });


    if (check1.length === 0 && check2.length === 0) {
      neworder['LIMstatus'] = 'IP';
      neworder['LIMTYPE'] = '02SARBALANCECW';
      neworder['INSNO'] = input['INSNO'];
      neworder['data'] = { 
      "W11": '', "W12": '' 
      // ,"W13": '', "W14": '' ,
      };
      neworder['data_area'] = { "area": '' };
      neworder['data_ans'] = { "ans": '' };
      let ins1 = await mongodb.insertMany(database, collection, [neworder]);

      output = 'ok';
    } else {
    }
  }

  //-------------------------------------
  res.json(output);
});

router.post('/02SARBALANCECW/UPDATEDATAWEIGHT', async (req, res) => {
  //-------------------------------------
  console.log("--02SARBALANCECW/UPDATEDATAW11--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'nok';
  if (input['ReqNo'] != undefined && input['DataPreview'] != undefined && input['ReqNo'] != '') {

    let timestamp = Date.now();
    let neworder = input;

    let check1 = await mongodb.find(database, collection, { "ReqNo": neworder['ReqNo'],"UID": neworder['UID'], "LIMstatus": "IP" });
    if (check1.length > 0) {
      if (check1[0]['data']['W11'] == '') {
        let ins2 = await mongodb.update(database, collection, { "ReqNo": neworder['ReqNo'],"UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data.W11": input['DataPreview'] } });
        output = 'ok';
      } else if (check1[0]['data']['W12'] == '') {
        let ins2 = await mongodb.update(database, collection, { "ReqNo": neworder['ReqNo'],"UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data.W12": input['DataPreview'] } });
        output = 'ok';
      }
      
      
      // else if (check1[0]['data']['W13'] == '') {
      //   let ins2 = await mongodb.update(database, collection, { "ReqNo": neworder['ReqNo'], "LIMstatus": "IP" }, { $set: { "data.W13": input['DataPreview'] } });
      //   output = 'ok';
      // }else if (check1[0]['data']['W14'] == '') {
      //   let ins2 = await mongodb.update(database, collection, { "ReqNo": neworder['ReqNo'], "LIMstatus": "IP" }, { $set: { "data.W14": input['DataPreview'] } });
      //   output = 'ok';
      // }

    }

  }

  //-------------------------------------
  res.json(output);
});

router.post('/02SARBALANCECW/UPDATEDATAAREA', async (req, res) => {
  //-------------------------------------
  console.log("--02SARBALANCECW/UPDATEDATAW11--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'nok';
  if (input['ReqNo'] != undefined && input['DataPreview'] != undefined && input['ReqNo'] != '') {

    let timestamp = Date.now();
    let neworder = input;

    let check1 = await mongodb.find(database, collection, { "ReqNo": neworder['ReqNo'],"UID": neworder['UID'], "LIMstatus": "IP" });
    if (check1.length > 0) {
      if (check1[0]['data']['data_area'] == '') {
        let ins2 = await mongodb.update(database, collection, { "ReqNo": neworder['ReqNo'],"UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data_area.area": input['DataPreview'] } });
        output = 'ok';
      }

    }

  }

  //-------------------------------------
  res.json(output);
});

router.post('/02SARBALANCECW/DELETEDATAW11', async (req, res) => {
  //-------------------------------------
  console.log("--02SARBALANCECW/DELETEDATAW11--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'nok';
  if (input['ReqNo'] != undefined && input['DataPreview'] != undefined && input['ReqNo'] != '') {

    let timestamp = Date.now();
    let neworder = input;

    let check1 = await mongodb.find(database, collection, { "ReqNo": neworder['ReqNo'],"UID": neworder['UID'], "LIMstatus": "IP" });
    if (check1.length > 0) {

      // if (check1[0]['data']['W14'] != '') {
      //   let ins2 = await mongodb.update(database, collection, { "ReqNo": neworder['ReqNo'], "LIMstatus": "IP" }, { $set: { "data.W14": '' } });
      //   output = 'ok';
      // } else if (check1[0]['data']['W13'] != '') {
      //   let ins2 = await mongodb.update(database, collection, { "ReqNo": neworder['ReqNo'], "LIMstatus": "IP" }, { $set: { "data.W13": '' } });
      //   output = 'ok';
      // }else 
      
      if (check1[0]['data']['W12'] != '') {
        let ins2 = await mongodb.update(database, collection, { "ReqNo": neworder['ReqNo'],"UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data.W12": '' } });
        output = 'ok';
      }else if (check1[0]['data']['W11'] != '') {
        let ins2 = await mongodb.update(database, collection, { "ReqNo": neworder['ReqNo'],"UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data.W11": '' } });
        output = 'ok';
      }

    }

  }

  //-------------------------------------
  res.json(output);
});



module.exports = router;
