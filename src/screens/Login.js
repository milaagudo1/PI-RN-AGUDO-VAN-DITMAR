import { Pressable } from "react-native";
import { auth, db } from "../firebase/config";

auth.signInWithEmailAndPassword(email, password)

function login(email, password) {
    auth.signInWithEmailAndPassword(email, password)
    .then((response) => {
        setLoggedIn(true);
    })
    .catch((error) => {
        setError("Fallo en el inicio de sesión.");
    }); 

    auth.onAuthStateChanged((user) => {
        console.log(user);
    });
}

<Pressable>
    onPress={() => navigation.navigate("Home")}
</Pressable>