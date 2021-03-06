import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

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

const db = firebase.firestore();

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user;
  return {
    avatar: photoURL,
    email: email,
    userName: displayName,
    uid,
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

export const addDevit = ({ avatar, content, userId, userName, img }) => {
  return db.collection("devits").add({
    avatar,
    content,
    userId,
    userName,
    img,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  });
};

export const fetchLatestDevits = () => {
  return db
    .collection("devits")
    .orderBy("createdAt", "desc")
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        const { createdAt } = data;

        return {
          ...data,
          id,
          createdAt: +createdAt.toDate(), // lo transformamos a numero
        };
      });
    });
};

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`images/${file.name}`);
  const task = ref.put(file);
  return task;
};
