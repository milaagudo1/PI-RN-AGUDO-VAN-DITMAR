import { doc, setDoc } from "firebase/firestore";

await setDoc(
 doc(db, "users", user.uid),
 {
   email: email,
   username: username
 }
);