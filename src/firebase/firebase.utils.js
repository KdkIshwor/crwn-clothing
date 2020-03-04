import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDTy00OzJr7TFguyzX43uhzYdZDdIhVn1s",
    authDomain: "crwn-db-78481.firebaseapp.com",
    databaseURL: "https://crwn-db-78481.firebaseio.com",
    projectId: "crwn-db-78481",
    storageBucket: "crwn-db-78481.appspot.com",
    messagingSenderId: "734815697374",
    appId: "1:734815697374:web:ca57fc8c4c2a955e3dc54f",
    measurementId: "G-9GT3SJD6K3"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }

    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
