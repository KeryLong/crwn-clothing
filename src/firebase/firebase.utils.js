import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
apiKey: "AIzaSyASX6Z-LnSOZ7JAUwVZrZZ56XywVo4Rgjk",
authDomain: "crwn-clothing-46f27.firebaseapp.com",
projectId: "crwn-clothing-46f27",
storageBucket: "crwn-clothing-46f27.appspot.com",
messagingSenderId: "480421411842",
appId: "1:480421411842:web:35de17c8a21de967233b1b",
measurementId: "G-Z5JLH01GY0"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;