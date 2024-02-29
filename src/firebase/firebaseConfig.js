// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import {getAuth} from 'firebase/auth'
// import { getAnalytics, isSupported } from "firebase/analytics";
// import {getFirestore, collection} from 'firebase/firestore'
// // import { ReactNativeAsyncStorage } from "firebase/auth";
// import { initializeAuth, getReactNativePersistence,Auth } from 'firebase/auth';
// import { ReactNativeAsyncStorage } from '@react-native-async-storage/async-storage';

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries



// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyA9QTkUhZHbWBpTF0HyDbEI9CQj1qIv72E",
//   authDomain: "app-order-drinks.firebaseapp.com",
//   projectId: "app-order-drinks",
//   storageBucket: "app-order-drinks.appspot.com",
//   messagingSenderId: "606054776173",
//   appId: "1:606054776173:web:eb295abee3191b14fb2e64",
//   measurementId: "G-78MVWFTWMC"
// };
// const app = initializeApp(firebaseConfig);
// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });
// // export const auth = getAuth(app)
// export const db = getFirestore(app);
// export const userRef = collection(db, 'user')

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore } from "firebase/firestore";

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHDpKEvaA7ZVzL-3XHbFbV3l9UOQ9Ha9A",
  authDomain: "cong-cafe-app.firebaseapp.com",
  databaseURL: "https://cong-cafe-app-default-rtdb.firebaseio.com",
  projectId: "cong-cafe-app",
  storageBucket: "cong-cafe-app.appspot.com",
  messagingSenderId: "956275766314",
  appId: "1:956275766314:web:e363c23aa7cbdf68a63f53",
  measurementId: "G-XD2RSQWXX9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app)
export const userRef = collection(db,'user')

// export default app;
