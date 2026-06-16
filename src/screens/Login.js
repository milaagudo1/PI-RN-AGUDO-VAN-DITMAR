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
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    paddingHorizontal: 30
  },

  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center'
  },

  input: {
    backgroundColor: '#fff',
    height: 55,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15
  },

  button: {
    backgroundColor: '#A8D5FF',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});





