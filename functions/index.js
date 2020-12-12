/* eslint-disable promise/no-nesting */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const xlsx = require('xlsx');

admin.initializeApp();
const db = admin.firestore();

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
            to: change.after.data().email,
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

// exports.generateSpreadsheetOfReports = functions.firestore
//     .document('reports/{report}')
//     .onUpdate((change, context) => {
//         db.collection('reports').get().then(snapshot => {
//             var reportsList = [];

//             snapshot.forEach(doc => reportsList.push({
//                 uid: doc.id,
//                 username: doc.data().username,
//                 email: doc.data().email,
//                 month: doc.data().month,
//                 year: doc.data().year,
//                 waterUsage: doc.data().waterUsage,
//                 energyUsage: doc.data().energyUsage,
//                 co2Emission: doc.data().co2Emission,
//             }));

//             var wb = xlsx.utils.book_new();
//             var ws = xlsx.utils.json_to_sheet(reportsList);
//             xlsx.utils.book_append_sheet(wb, ws, 'New Data');

//             var fileName = "New Data File.xlsx";
//             xlsx.utils.writeFile(wb, fileName);


//             const bucket = admin.storage().bucket();
//             const destination = 'excel/' + fileName;

//             try {
//                 bucket.upload(xlsx.write(wb, fileName), {
//                     destination: destination,
//                     gzip: true,
//                     metadata: {
//                         cacheControl: 'public, max-age=31536000',
//                     },
//                 })
//             } catch (e) {
//                 console.log('error:', e);
//             }

//         });
//     });

