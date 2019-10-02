const firebase = require('firebase/app');
require('firebase/analytics');
require('firebase/auth');
require('firebase/firestore');

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  });
}

export const createUserWithEmailAndPassword = async (email, password) => {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const signInWithEmailAndPassword = async (email, password) => {
  await firebase.auth().signInWithEmailAndPassword(email, password);
};

const signInWithProvider = async (provider) => {
  const result = await firebase.auth().signInWithPopup(provider);
  return result;
};

export const signInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  await signInWithProvider(provider);
};

export const signInWithFacebook = async () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  // provider.addScope('user_birthday');
  await signInWithProvider(provider);
};

export const getCurrentUser = () => new Promise((resolve) => {
  firebase.auth().onAuthStateChanged((user) => resolve(user));
});

export const signOut = async () => firebase.auth().signOut();
