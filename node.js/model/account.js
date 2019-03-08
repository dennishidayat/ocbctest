module.exports = (sequelize, type) => {
    return sequelize.define('account', {
        accountid: {
            field: 'account_id',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            field: 'name',
            type: type.STRING,
        },
        balance: {
            field: 'balance',
            type: type.INTEGER,
            defultValue: 0
        },
        totalpoint: {
            field: 'total_point',
            type: type.INTEGER,
            defultValue: 0
        }
    }, {
        tableName: 'account',
        timestamps: false
    });
}