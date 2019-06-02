import firebase from 'firebase';
import { firebaseConfig } from './config.js';
import 'firebase/auth'

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseDb = firebaseApp.database();
export const db = firebase.firestore();
export default firebase;