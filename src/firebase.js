import * as firebase from 'firebase';
// import 'firebase/firestore';

var config = {
  apiKey: 'AIzaSyAIDpjtMKnn8sMgwrEH30X9MULYZUZSnmw',
  authDomain: 'fcc-map-1503581293899.firebaseapp.com',
  databaseURL: 'https://fcc-map-1503581293899.firebaseio.com',
  projectId: 'fcc-map-1503581293899',
  storageBucket: 'fcc-map-1503581293899.appspot.com',
  messagingSenderId: '642536645019',
};
firebase.initializeApp(config);

export const database = firebase.database();
