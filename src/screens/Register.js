import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth, db } from "../firebase/config";

export default function Register({ navigation }) {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => { 
      auth.onAuthStateChanged((user) => {
        if (user) {
          navigation.navigate("NavegationTab");
        }
      });
    }, []);
  

  function onSubmit() {

    auth.createUserWithEmailAndPassword(
      email,
      password
    )
      .then(() => {

        alert("Usuario registrado correctamente");
        db.collection("users").add({
          email: email,
          username: username
        }).then(() => {
          navigation.navigate("Login");
        }).catch((error) => {
          alert("Error al agregar el usuario a la base de datos: ", error);
        });


      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <View style={styles.container}>

      <Text>Registro</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(texto) => setEmail(texto)}
      />

      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={(texto) => setUsername(texto)}
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
          Registrate
        </Text>
      </Pressable>

       <Pressable
              style={styles.button}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttonText}>
                Ir a Login
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
