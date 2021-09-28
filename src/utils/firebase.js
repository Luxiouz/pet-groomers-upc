import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, setDoc, doc, orderBy } from "firebase/firestore";

// eslint-disable-next-line no-unused-vars
const firebaseConfig = {
    apiKey: "AIzaSyAns71ISDSsAdSAT5ygDdaNkqNaCOXI6EA",
    authDomain: "petgroomers-887a5.firebaseapp.com",
    projectId: "petgroomers-887a5",
    storageBucket: "petgroomers-887a5.appspot.com",
    messagingSenderId: "265376726262",
    appId: "1:265376726262:web:2b8033f076ffedb59200d7",
    measurementId: "G-MPQLVSFHV4",
  };


const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const db = getFirestore(app);

const userRefName = 'users';

const storesRefName = 'groomers';


export { auth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, db, collection, query, where, getDocs, doc, setDoc, userRefName, signOut,
  storesRefName, orderBy}