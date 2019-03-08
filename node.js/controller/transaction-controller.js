'use strict';

var response = require('../model/res');
var transactionDao = require('../dao/transaction-dao');
var accountDao = require('../dao/account-dao');

exports.transaction = function transaction(req, res) {
    let params = {};
    if (req.query.account){
        params.accountid = req.query.account;
    }
    console.log(params);
    transactionDao.getAll(params, function (err, rows) {
        if (err) {
            response.err(err, res);
        }
        response.ok(rows, res);
    });
};

exports.getTrxById = function (req, res) {
    transactionDao.getById(req.params['id'], function (err, data) {
        if (err) {
            response.err(err, res);
        }
        response.ok(data, res)
    });
};

exports.insertTrx = function (req, res) {
    transactionDao.insert(req.body, function (err, data) {
        if (err) {
            response.err(err, res);
        }
        response.ok('data inserted with id ' + data.accountid, res);
        // return res.json(rows);
    });
};

exports.updateTrx = function updateTrx(req, res) {
    transactionDao.getById(req.body.transactionid, function(err, data){//check if transaction exists
        if(err){
            response.err(err, res);
        } else if(data==null){
            response.datanotfound('transaction not found', res);
        }else{
            //if exists, then continue update
            transactionDao.update(req.body.transactionid, req.body, function(err, data){
                if(err){
                    response.err(err, res);
                } 
                response.ok('transaction has been updated with number : '+ data.transactionid, res);
                // return response.json(data);
            });
        }
    });
};

exports.getTrxByDate = function getTrxByDate(req, res) {
    let startdate = req.query.startdate;
    let enddate = req.query.enddate;
    let accountid = req.query.accountid
    console.log("start date : ", startdate);
    console.log("end date : ", enddate);
    transactionDao.reporting(startdate, enddate, accountid, function (err, rows) {
        if (err) {
            response.err(err,res);
        }
        response.ok(rows, res);
    });
};

exports.insertTransaction = function (req, res) {
    const body = req.body;
    console.log("body accountid : ", body.accountid)
    if (body.description != "setor tunai") {
        accountDao.debit(body, function (err, result) {
            if (err) {
                response.err(err, res);
            } else {
                body.type = "d";
                transactionDao.insert(body, function (error, result2) {
                    if (error) {
                        console.log('error call insert : ' + error);
                        response.err(error, res);
                    } else {

                        response.success('transaction success', res);
                    }
                });
            }
        })
    } else {
        accountDao.credit(body.accountid, body.amount, function (err, result) {
            if (err) {
                response.err(err, res);
            } else {
                let credit = body;
                credit.type = "c"
                transactionDao.insert(credit, function (error, result2) {
                    if (error) {
                        console.log('error call insert : ' + error);
                        response.err(error, res);
                    } else {

                        response.success('transaction success', res);
                    }
                });
            }
        })


    }

}


