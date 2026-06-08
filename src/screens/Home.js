import { db, auth } from "../firebase/config";
import { useEffect } from "react";

function logout() {
    auth.signOut()
}  