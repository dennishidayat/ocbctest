const { Account } = require('../db/sequelize');

exports.getById = function getById(id, callback) {
    Account.findById(id)
    .then((account) => {
        return callback(null, account);
    })
    .catch((error) => {
        return callback(error);
    })
};

exports.getAll = function getAll(callback) {
    Account.findAll()
    .then((account) => {
        return callback(null, account);
    })
    .catch((error) => {
        return callback(error);
    })
};

exports.insert = function insert(data, callback) {
    Account.create(data)
        .then((transaction) => {
            return callback(null, transaction)
        })
        .catch((error) => {
            return callback(error);
        });
};

exports.debit = function debit(body, callback) {
    console.log("dao accountid : ",accountid);
    this.getById(body.accountid, function (err, result) {
        if (err) {
            callback(err);
        } else if (result.balance > amount) {
            var point1 = 0;
            var point2 = 0;
            var point = result.totalpoint;
            if (body.description == "beli pulsa") {
                if (amount <= 10000) {
                    point = result.totalpoint;
                } else {
                    if (amount >= 10001 && amount <= 30000) {
                        point1 = ((amount - 10000) / 1000) * 1;
                    }
                    if (amount > 30000) {
                        point2 = ((amount - 30000) / 1000) * 2;
                        point1 = ((30000 - 10000) / 1000) * 1;
                    }
                }

                point += point1 + point2;
            } else if (body.description == "bayar listrik") {
                if (amount <= 50000) {
                    point = result.totalpoint;
                } else {
                    if (amount >= 50001 && amount <= 100000) {
                        point1 = ((amount - 50000) / 2000) * 1
                    }
                    if (amount > 100000) {
                        point2 = ((amount - 100000) / 2000) * 2
                        point1 = ((100000 - 50000) / 2000) * 1
                    }
                }

                point += point1 + point2;

            }

            Account.update({
                balance: (result.balance - amount),
                totalpoint: (point)
            },
                { where: { accountid: accountid } }
            )
                .then((account) => {
                    return callback(null, result)
                })
                .catch((error) => {
                    return callback(error);
                })
        } else {
            callback('your balance is insufficient');
        }
    });
}

exports.credit = function credit(accountid, amount, callback) {
    console.log("dao accountid : ",accountid);
    this.getById(accountid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            if (result) {
                Account.update({
                    balance: (result.balance + parseInt(amount))

                },
                    { where: { accountid: accountid } }
                )
                    .then((account) => {
                        return callback(null, result)
                    })
                    .catch((error) => {
                        return callback(error);
                    })

            } else {
                callback('account not found');
            }
        }
    });
}

// exports.credit = function credit(data, callback) {
//     this.getById(data.accountid, function (err, result) {
//         if (err) {
//             return callback(err);
//         } else {
//             if (result) {
//                 Account.update(
//                     {
//                         balance: (result.balance + amount)
//                     },
//                     {
//                     where: { accountid: data.accountid },
//                     returning: true,
//                     plain: true
//                   })
//                 .then(account => {
//                     return callback(null, data);
//                 })
//                 .catch((error) => {
//                     return callback(error);
//                 })
//             } else {
//                 callback ("account not found");
//             }
//         }

//     })
// };

exports.update = function update(id, data, callback) {
    Account.update(data, {
        where: { accountid: data.accountid },
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
