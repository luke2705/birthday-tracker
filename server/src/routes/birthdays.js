var executeQuery = require('../database/execute-query');

var express = require('express');
var router = express.Router();

/* GET birthdays  */
router.get('/', async function(req, res) {
    try {
        const results = await executeQuery('select * from birthdays order by birthday');
        res.send(results.recordset);
    } catch {
        return res.status(500).send('Error getting birthdays');
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
        return res.status(500).send('Error deleting birthday');
    }
});

/* UPDATE birthday */
async function updateBirthday(birthday) {
    let queryString = `
        update birthdays set precedingDaysForReminder=${birthday.precedingDaysForReminder}, 
        reminderEnabled='${birthday.reminderEnabled}'
        where name='${birthday.name}' and birthday='${birthday.birthday}' 
    `;
    queryString = removeQuotationMarksFromNulls(queryString)
    await executeQuery(queryString);
}

function removeQuotationMarksFromNulls(queryString) {
    return queryString.replaceAll("'null'", "null");
}


module.exports = {
    birthdaysRouter: router,
    updateBirthday
};
