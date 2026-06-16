import React, { useState, useEffect } from 'react';
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
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    paddingHorizontal: 30
  },

  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40
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
    fontWeight: 'bold',
    fontSize: 16
  }
});