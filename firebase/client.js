import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAzANLds_bB4FT0RrbrxFt5qFTdd-uNcuA",
  authDomain: "devter-167cd.firebaseapp.com",
  databaseURL: "https://devter-167cd.firebaseio.com",
  projectId: "devter-167cd",
  storageBucket: "devter-167cd.appspot.com",
  messagingSenderId: "526431781361",
  appId: "1:526431781361:web:59c93ad5787bf9ac8e4450",
};

firebase.apps.length === 0 && firebase.initializeApp(firebaseConfig);

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL } = user;
  return {
    avatar: photoURL,
    email: email,
    username: displayName,
  };
};
export const onAuthStateChanged = (onChange) => {
  // Recibe la función setUser del componente Home
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null;
    onChange(normalizedUser);
  });
};

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(githubProvider)
    .then(mapUserFromFirebaseAuthToUser);
};
