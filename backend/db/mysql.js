const sql = require('mysql2')
const config = require('../functions/config')

const sql_config = {
    host: config().APP_DB_HOST,
    user: config().APP_DB_USER,
    port : config().APP_DB_PORT,
    password: config().APP_DB_PWD,
    database: config().APP_DB_NAME
};

const pool = sql.createPool(sql_config);

module.exports = pool

