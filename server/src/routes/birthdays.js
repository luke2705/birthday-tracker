var executeQuery = require('../database/execute-query');

var express = require('express');
var router = express.Router();

/* GET birthdays  */
router.get('/', async function(req, res) {
    try {
        const results = await executeQuery('select * from birthdays order by birthday');
        res.send(results.recordset);
    } catch {
        return res.status(500).send('Error inserting birthday');
    }
});

/* POST birthday */
router.post('/', async function(req, res) {
    try {
        await executeQuery(`insert into birthdays (name, birthday) values ('${req.body.name}', '${req.body.birthday}')`);
        return res.status(204).send();
    } catch {
        return res.status(500).send('Error inserting birthday');
    }
});

/* DELETE birthday */
router.delete('/', async function(req, res) {
    try {
        await executeQuery(`delete from birthdays where name='${req.body.name}'`);
        return res.status(204).send();
    } catch {
        return res.status(500).send('Error inserting birthday');
    }
});


module.exports = router;
