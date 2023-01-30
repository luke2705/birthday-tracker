const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'You signed up for messages!',
        from: '+15644447342',
        to: '+18883334444'
    })
    .then(message => console.log(message.sid));