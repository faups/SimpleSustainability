const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

exports.mailTest = functions.firestore
.document('emailToggles/{uid}')
.onUpdate((change, context) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sustainabilitysimplified@gmail.com',
            pass: 'Potter02bari$',
        }
    });

    var mailOptions = {
        from: 'sustainabilitysimplified@gmail.com',
        to: 'lukefaupel@gmail.com',
        subject: 'test message',
        text: 'this is a test message',
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email Sent: ' + info.response);
        }
    });
});


