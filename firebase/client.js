import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAzANLds_bB4FT0RrbrxFt5qFTdd-uNcuA",
    authDomain: "devter-167cd.firebaseapp.com",
    databaseURL: "https://devter-167cd.firebaseio.com",
    projectId: "devter-167cd",
    storageBucket: "devter-167cd.appspot.com",
    messagingSenderId: "526431781361",
    appId: "1:526431781361:web:59c93ad5787bf9ac8e4450"
};

firebase.apps.length === 0 && firebase.initializeApp(firebaseConfig);

export const loginWithGitHub = () => {
    const githubProvider = new firebase.auth.GithubAuthProvider()
    return firebase
      .auth()
      .signInWithPopup(githubProvider)
      .then(user => {
        const { additionalUserInfo } = user;
        const { username, profile } = additionalUserInfo; 
        const { avatar_url, blog } = profile;

        return {
            avatar: avatar_url,
            url: blog,
            username: username
        }
      })
  }