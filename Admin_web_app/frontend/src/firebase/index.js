import firebase from 'firebase';

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);

export const githubProvider = new firebase.auth.GithubAuthProvider();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const firebaseRef = firebase.database().ref();
export default firebase;
