const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.createUser = functions.https.onRequest(async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    password,
    photoURL,
  } = req.body;

  try {
    const { uid } = await admin.auth().createUser({
      displayName: firstName,
      email,
      password,
      photoURL,
    });

    await admin.firestore().collection('users').add({
      firstName,
      lastName,
      uid,
    });

    res.send(userData);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }


});
