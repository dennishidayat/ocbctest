'use strict';

module.exports = function(app) {
    var controller = require('../controller/transaction-controller');

    app.route('/transaction').get(controller.transaction);
    app.route('/transaction/:id').get(controller.getTrxById);
    app.route('/transaction').post(controller.insertTrx);
    app.route('/transactions').post(controller.insertTransaction);
    app.route('/transactiondate').get(controller.getTrxByDate);
};