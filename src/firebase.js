import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAFcT-eVYsD8Nf3KwdrFEV3ZMunX5Viwh8",
  authDomain: "pragya-111.firebaseapp.com",
  databaseURL: "https://pragya-111-default-rtdb.firebaseio.com/",
  projectId: "pragya-111",
  storageBucket: "pragya-111.firebasestorage.app",
  messagingSenderId: "153790568208",
  appId: "1:153790568208:web:3ccbd709c4abebb4407795",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
