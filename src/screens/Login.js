import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { auth } from "../firebase/config";
import { useEffect } from "react";

export default function Login({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => { 
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("NavegationTab");
      }
    });
  }, []);

  function onSubmit() {

    auth.signInWithEmailAndPassword( email, password)
      .then(() => {

        alert("Login correcto");

        navigation.navigate("NavegationTab");

      })
      .catch(() => {
        alert("Credenciales incorrectas");
      });
  }

  return (
    <View style={styles.container}>

      <Text>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(texto) => setEmail(texto)}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={(texto) => setPassword(texto)}
      />

      <Pressable
        style={styles.button}
        onPress={onSubmit}
      >
        <Text style={styles.buttonText}>
          Login
        </Text>
      </Pressable>

       <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.buttonText}>
          Ir a Registro
        </Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 20
  },

  input: {
    height: 50,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginVertical: 10
  },

  button: {
    backgroundColor: '#28a745',
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#28a745'
  },

  buttonText: {
    color: '#fff'
  }
});