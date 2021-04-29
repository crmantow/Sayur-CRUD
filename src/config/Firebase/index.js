import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCnJa7HAgI6LpsuuVsgiZ_oei7DskwsEfM",
  authDomain: "sayur-crud.firebaseapp.com",
  projectId: "sayur-crud",
  storageBucket: "sayur-crud.appspot.com",
  messagingSenderId: "1017854094502",
  appId: "1:1017854094502:web:f254e1daf530de44a09867",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
