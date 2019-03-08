'use strict';

var response = require('../model/res');
var accountDao = require('../dao/account-dao');

exports.account = function(req, res) {
    accountDao.getAll(function (error, rows){
        if(error){
            response.err(error, res);
        } else{
            response.ok(rows, res)
            return res.json(rows);
        }
    });
};

exports.getAccById = function (req, res) {
    accountDao.getById(req.params['id'], function (err, data) {
        if (err) {
            response.err(err, res);
        }
        response.ok(data, res)
    });
};

exports.insertAcc = function (req, res) {
    accountDao.insert(req.body, function (err, data) {
        if (err) {
            response.err(err, res);
        }
        response.ok('data inserted with id ' + data.accountid, res);
        // return res.json(rows);
    });
};

exports.updateAcc = function updateAcc(req, res) {
    accountDao.getById(req.body.accountid, function(err, data){//check customer exists
        if(err){
            response.err(err, res);
        } else if(data==null){
            response.datanotfound('account not found', res);
        }else{
            //if exists, then continue update
            accountDao.update(req.body.accountid, req.body, function(err, data){
                if(err){
                    response.err(err, res);
                } 
                // response.ok('updated data : '+ data.accountid, res);
                return res.json(data);
            });
        }
    });
};


exports.delAcc = function (req, res) {
    accountDao.del(req.params['id'], function (err, data) {
        if (err) {
            response.ok(err, res);
        } else {
            response.ok('success delete id : '+req.params['id'], res)
        }
    });
}
