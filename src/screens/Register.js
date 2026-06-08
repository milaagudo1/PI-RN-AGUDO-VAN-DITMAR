import { auth, db } from "../firebase/config";

auth.createUserWithEmailAndPassword(email, password)

function register(email, password, username) {
    auth.createUserWithEmailAndPassword(email, password)
    .then((response) => {
        setRegistered(true);
    })
    .catch((error) => {
        setError("Fallo en el registro.");
    });
}

<Pressable>
    onPress={() => navigation.navigate("Login")}
</Pressable>
