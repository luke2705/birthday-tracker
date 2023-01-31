const startOfToday = require('date-fns/startOfToday');
const format = require('date-fns/format');
const sendTextMessage = require('../src/sms-service/send_sms');
const executeQuery = require('../src/database/execute-query');

async function sendTodaysReminders() {
    const todaysReminders = await getRemindersForToday();

    todaysReminders.forEach(reminder => {
        sendTextMessage(reminder.PhoneNumber, reminder.ReminderMessage);
        console.log('sending message to ', reminder.PhoneNumber, '. ', reminder.ReminderMessage);
    })
}

async function getRemindersForToday() {
    const today = startOfToday();
    const numericMonth = format(today, 'MM')
    const numericDay = format(today, 'dd')

    const queryString = `
        SELECT ReminderMessage, PhoneNumber
        FROM reminders
        WHERE MONTH(ReminderDay)=${numericMonth} AND DAY(ReminderDay)=${numericDay}
    `;

    results = await executeQuery(queryString);
    return results.recordset;
}

sendTodaysReminders();

module.exports = sendTodaysReminders;