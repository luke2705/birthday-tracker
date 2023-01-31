// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);

const sendTextMessage = (phoneNumber, body) => {
    // this return is here right now to not spam the twilio account during dev
    return;
    // client.messages
    //     .create({
    //         body,
    //         from: '+15644447342',
    //         to: phoneNumber
    //     })
    //     .then(message => console.log(message.sid));
};

module.exports = sendTextMessage;