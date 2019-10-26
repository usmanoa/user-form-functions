const functions = require('firebase-functions');
const admin = require('firebase-admin');
const uuidv5 = require('uuid/v5');

admin.initializeApp();

exports.addUser = functions.https.onRequest(async (req, res) => {
    const user = req.body;
    const snapshot = await admin.database().ref('/users').push(user);
    res.redirect(303, snapshot.ref.toString());
  });

  exports.getUsers = functions.https.onRequest(async (req, res) => {
    return admin.database().ref('/users').on("value", snapshot => {
        return res.status(200).send(snapshot.val());
    }, error => {
        console.error(error);
        return response.status(500).send('Oh no! Error: ' + error);
    });
  });

exports.addUserId = functions.database.ref('/users/{pushId}/age')
  .onCreate((snapshot, context) => {
    const name = snapshot.val().lastName
    const userId = uuidv5(name, uuidv5.URL);
    return snapshot.ref.parent.child('userId').set(userId);
  });

  