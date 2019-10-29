const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true})
const uuidv5 = require('uuid/v5');

admin.initializeApp();

exports.addUser = functions.https.onRequest(async (req, res) => {
    cors(req, res, ()=> {
      const user = req.body;
      admin.database().ref('/users').push(user);
      res.status(200).send("Request Succesful")
    })
  });


exports.getUsers = functions.https.onRequest(async (req, res) => {
  cors(req, res, () => {
    return admin.database().ref('/users').on("value", snapshot => {
      return res.status(200).send(snapshot.val());
    }, error => {
      console.error(error);
      return response.status(500).send(error);
    });
  })
});

exports.addUserId = functions.database.ref('/users/{pushId}/userId')
  .onCreate((snapshot, context) => {
    let userId = uuidv5('user' + Date.now(), uuidv5.URL);
    return snapshot.ref.parent.child('userId').set(userId);
  });

  