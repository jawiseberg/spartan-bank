import  { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCZpz6eS7j_Lfs8YgP0RDdsRmwt7EvbPk8",
    authDomain: "spartan-bank.firebaseapp.com",
    projectId: "spartan-bank",
    storageBucket: "spartan-bank.appspot.com",
    messagingSenderId: "727185710857",
    appId: "1:727185710857:web:720b61233d6b5ba9cf3dd8",
    measurementId: "G-CGNPXLSCVX"
};

//const firestore = getFirestore();
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);

export default app;     
