const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.firestore
.document('test/test1')
.onUpdate((change, context) => {
    console.log('Hallo Welt!');
});
