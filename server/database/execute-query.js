const config = require('./database-config');

async function executeQuery(queryString, response) {
    const sql = require('mssql/msnodesqlv8');
    let pool = await sql.connect(config)
    return pool.request()
        .query(queryString)
}

module.exports = executeQuery;