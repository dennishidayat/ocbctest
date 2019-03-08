const { Transaction } = require('../db/sequelize');
const { Account } = require('../db/sequelize');

exports.getAll = function getAll(whereclause, callback) {
    Transaction.findAll({where: whereclause, include: [Account] })
        .then((transaction) => {
            return callback(null, transaction)
        })
        .catch((error) => {
            return callback(error);
        });
};

exports.getById = function getById(id, callback) {
    Transaction.findById(id)
    .then((transaction) => {
        return callback(null, transaction);
    })
    .catch((error) => {
        return callback(error);
    })
};

exports.insert = function insert(data, callback) {
    let transaction = data;
    if (transaction.account == null && transaction.accountid == null) {
        return callback('unassigned account id');
    } else {
        if (transaction.accountid == null) {
            transaction.accountid = transaction.account.accountid;
        }
    }

    Transaction.create(data)
        .then((account) => {
            return callback(null, account)
        })
        .catch((error) => {
            return callback(error);
        });
};

exports.update = function update(id, data, callback) {
    Transaction.update(data, {
        where: { transactionid: data.transactionid },
        returning: true,
        plain: true
      })
    .then(result => {
        return callback(null, data);
    })
    .catch((error) => {
        return callback(error);
    })
};

exports.del = function del(id, callback) {
    Transaction.destroy({
        where: { transactionid: id }
      })
    .then(result => {
        return callback(null, id);
    })
    .catch((error) => {
        return callback(error);
    })
};

exports.reporting = function reporting(startdate, enddate, accountid, callback) {
    Transaction.findAll({
        where: {
            tdate: 
            {
                $between: [startdate, enddate]
            },
            accountid : accountid
        }, include: [Account]})
        .then((transaction) => {
            return callback(null, transaction)
        })
        .catch((error) => {
            return callback(error);
        });
};
