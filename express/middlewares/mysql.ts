const mysql = require('mysql');
const dbOptions = {
    host: '47.108.78.245',
    user: 'root',
    password: 'y2pe2NF7#',
    port: 3307,
    database: 'stock',
    multipleStatements: true
}

const getConnection = function getConnection() {
    return mysql.createConnection(dbOptions);
}
const mysqlUtil = {
    getConnection
}
export default mysqlUtil;