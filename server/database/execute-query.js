function executeQuery(queryString, response) {


    const sql = require('mssql/msnodesqlv8');

// config for your database
    const config = {
        database: 'birthday-tracker',
        server: '(LocalDb)\\MSSQLLocalDB',
        driver: 'msnodesqlv8',
        options: {
            trustedConnection: true
        }
    };

    sql.connect(config, function (err) {
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query(queryString, function (err, recordset) {

            if (err) console.log(err)
            // send records as a response
            response.send(recordset.recordset);
        });
    });
}

module.exports = executeQuery;