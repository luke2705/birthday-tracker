var sendTextMessage = require('../sms-service/send_sms');

var executeQuery = require('../database/execute-query');
var format = require('date-fns/format')
var parseISO = require('date-fns/parseISO')
var add = require('date-fns/add')
var express = require('express');
var router = express.Router();

/* POST reminder */
router.post('/', async function(req, res, next) {
    try {
        const birthdays = req.body.birthdayData;
        const phoneNumber = req.body.phoneNumber;
        const peopleWithReminders = [];

        birthdays.forEach(birthday => {
            const newReminder = generateNewReminderObject(birthday, phoneNumber);
            if (birthday.reminderEnabled) {
                createOrUpdateReminder(newReminder);
                peopleWithReminders.push(birthday.name);
            } else {
                removeReminderIfExists(newReminder);
            }
        });

        sendSuccessTextMessage(peopleWithReminders);
        return res.status(204).send();
    } catch {
        return res.status(500).send('Error updating reminders');
    }
})

function generateNewReminderObject(birthday, phoneNumber) {
    const parsedBirthday = parseISO(birthday.birthday)
    const reminderDayUnformatted = add(parsedBirthday,   ({days:-1 * (birthday.precedingDaysForReminder)})  );
    const reminderDay = format(reminderDayUnformatted, 'MMM d, yyyy')
    const reminderMessage = generateReminderMessage(birthday);

    const newReminder = {
        reminderDay,
        reminderMessage,
        phoneNumber
    }

    return newReminder;
}

async function createOrUpdateReminder(newReminder) {
    if (await doesReminderAlreadyExist(newReminder)) {
        updateExistingReminder(newReminder);
    } else {
        insertIntoRemindersTable(newReminder);
    }
}

async function doesReminderAlreadyExist(newReminder) {
    const results = await executeQuery(`select * from reminders where ReminderMessage='${newReminder.reminderMessage}' and PhoneNumber='${newReminder.phoneNumber}'`);
    return results.recordset.length > 0;
}

async function updateExistingReminder(newReminder) {
    await executeQuery(`update reminders set reminderDay='${newReminder.reminderDay}' where reminderMessage='${newReminder.reminderMessage}' and phoneNumber='${newReminder.phoneNumber}'`);
}

async function insertIntoRemindersTable(newReminder) {
    await executeQuery(`insert into reminders (ReminderDay, ReminderMessage, PhoneNumber) values ('${newReminder.reminderDay}', '${newReminder.reminderMessage}', '${newReminder.phoneNumber}')`)
}

async function removeReminderIfExists(newReminder) {
    await executeQuery(`delete from reminders where reminderMessage='${newReminder.reminderMessage}' and phoneNumber='${newReminder.phoneNumber}'`);
}

function generateReminderMessage(birthday) {
    const formattedDate = format(parseISO(birthday.birthday), 'MMM d')
    return `Automated Reminder: ${birthday.name}s birthday is coming up on ${formattedDate}!`
}

function sendSuccessTextMessage(peopleWithReminders, phoneNumber) {
    const lastPerson = peopleWithReminders.pop();
    const peopleString = peopleWithReminders.join(', ') + ' and ' + lastPerson;
    const successMessage = `You have signed up for birthday reminders for ${peopleString}!`
    sendTextMessage(phoneNumber, successMessage);
}

module.exports = router;