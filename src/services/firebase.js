import firebase, { analytics } from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/analytics'

// Your web app's Firebase configuration

///*
const firebaseConfig = {
  apiKey: "AIzaSyDLf8BiEYkMJUadgZFZA4Fbmo3jOZAAcSc",
  authDomain: "sports-market.firebaseapp.com",
  databaseURL: "https://sports-market.firebaseio.com",
  projectId: "sports-market",
  storageBucket: "sports-market.appspot.com",
  messagingSenderId: "885803982199",
  appId: "1:885803982199:web:f5aba75eb192366c7b1572",
  measurementId: "G-V8RKGW9DF7"
};
//*/

/*
var firebaseConfig = {
    apiKey: "AIzaSyBa9JkykB8eHCvyVVG51bDCFpD1VIvuh_I",
    authDomain: "simbulltest-4c6f6.firebaseapp.com",
    projectId: "simbulltest-4c6f6",
    storageBucket: "simbulltest-4c6f6.appspot.com",
    messagingSenderId: "599206778370",
    appId: "1:599206778370:web:4fe2e021293cb6a128391b",
    measurementId: "G-1JRWRSNNGL"
};
*/

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const firebaseAnalytics = firebase.analytics()

export const auth = firebase.auth()
export const db = firebase.firestore()


export default firebase