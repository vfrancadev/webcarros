
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'
import { getStorage} from 'firebase/storage'

const firebaseConfig = {
 //CREDENCIAIS FIREBASEAQUI 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export  { auth, db, storage};