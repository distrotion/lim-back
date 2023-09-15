const express = require("express");
const router = express.Router();
let mongodb = require('../../function/mongodb');
var mssql = require('../../function/mssql');

let Auth  = 'Auth';
let user  = 'user';


const d = new Date();
let day = d;

router.post('/register', async (req, res) => {
    //-------------------------------------
    console.log(req.body);
    let input = req.body;
    //-------------------------------------
    let output = {"return":'NOK'}
    let findDB = await mongodb.find(Auth,user,{"ID":input['ID']});

    if(findDB.length == 0){
        input['date'] = day;
        var ins = await mongodb.insertMany(Auth,user,[input]);
        output = {"return":'OK'}
    }
    


    res.json(output);
});

router.post('/SAR/login', async (req, res) => {
    //-------------------------------------
    console.log(req.body);
    let input = req.body;
    //-------------------------------------
    let output = {"return":'NOK'}
    // let findDB = await mongodb.find(Auth,user,{"ID":input['ID']});
    var findDB = await mssql.qurey(`SELECT  *  FROM [SAR].[dbo].[Master_User] WHERE [UserName] LIKE '${input['UserName']}'`);
  try{
    if(findDB['recordsets'].length > 0){
        console.log(findDB['recordsets']);
        if(findDB['recordsets'][0][0]['Password'] === input['Password']){
            output = {
                "UserName":findDB['recordsets'][0][0]['UserName'],
                "NAME":findDB['recordsets'][0][0]['Name'],
                "Section":findDB['recordsets'][0][0]['Section'],
                "Roleid":findDB['recordsets'][0][0]['Roleid'] || '1',
                "return":'OK'
            }
        }else{
            output = {"return":'PASSWORD INCORRECT'}
        }

    }
  }catch{

  }
    // console.log(input['PASS']);
   
    
    console.log(output)
    return res.json(output);
});

router.post('/newpass', async (req, res) => {
    //-------------------------------------
    console.log(req.body);
    let input = req.body;
    //-------------------------------------
    let output = {"return":'NOK'}
    let findDB = await mongodb.find(Auth,user,{"ID":input['ID']});

    // console.log(findDB);

    if(findDB.length > 0){
        console.log("---?");

        if(findDB[0]['PASS'] === input['PASS']){           
            let upd = await mongodb.update(Auth,user,{ "ID":input['ID'] }, { $set: {"PASS":input['NEWPASS'],"EDIT":day} });
            output = {"return":'OK'}
        }else{
            output = {"return":'PASSWORD INCORRECT'}
        }
       
    }

    return res.json(output);
});


module.exports = router;