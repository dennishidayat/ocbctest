module.exports = (sequelize, type) => {
    return sequelize.define('transaction', {
        transactionid: {
            field: 'transaction_id',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tdate: {
            field: 'transaction_date',
            type: type.DATE,
        },
        description: {
            field: 'description',
            type: type.STRING,
        },
        amount: {
            field: 'amount',
            type: type.INTEGER,
        },
        type: {
            field: 'type',
            type: type.STRING,
        },
        accountid: {
            field: 'account_id',
            type: type.INTEGER,
            onDelete: 'CASCADE',

            referece : {
                model : 'account',
                targetkey : 'account_id'
            }
        }
    }, {
        tableName: 'transaction',
        timestamps: false
    });
}