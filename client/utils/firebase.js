// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB6VWGHhQTbNAGb8jqJp_Ac6sLk0WlTJ-Q',
  authDomain: 'youpixels.firebaseapp.com',
  projectId: 'youpixels',
  storageBucket: 'youpixels.appspot.com',
  messagingSenderId: '36544663310',
  appId: '1:36544663310:web:c9e0cb94f5be55c27ed15f',
  measurementId: 'G-TXBB2TCDCS',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)

export default app
