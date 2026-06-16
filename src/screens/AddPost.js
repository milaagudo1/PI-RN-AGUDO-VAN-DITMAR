import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import Camara from '../components/Camara';


export default function AddPost({ navigation }) {
    const [descripcion, setDescripcion] = useState('');
    const [error, setError] = useState('');
    const [photoUri, setPhotoUri] = useState(null);

    function onSubmit() {
        if (descripcion === '') {
            setError('La descripción no puede estar vacía');
            return;
        }

        db.collection('posts').add({
            owner: auth.currentUser.email,
            description: descripcion,
            createdAt: Date.now(),
            likes: [],
            photo: photoUri
    
        })
        .then(() => {
            setDescripcion('');
            setError('');
            navigation.navigate('Home');
        })
        .catch(e => console.log(e));
    }

    return (
    <>
        {
            photoUri === null
            ?
            <Camara setPhotoUri={(uri) => setPhotoUri(uri)} />
            :
            <View style={styles.container}>
                <Text style={styles.titulo}>Agregar Publicación</Text>

                <TextInput
                    style={styles.field}
                    keyboardType='default'
                    placeholder='Escribí una descripción...'
                    multiline={true}
                    onChangeText={text => setDescripcion(text)}
                    value={descripcion}
                />

                {error !== '' ? <Text style={styles.error}>{error}</Text> : null}

                <Pressable style={styles.boton} onPress={() => onSubmit()}>
                    <Text style={styles.textoBoton}>Postear</Text>
                </Pressable>
            </View>
        }
    </>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 25
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25
  },

  field: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 12,
    minHeight: 150,
    padding: 15,
    textAlignVertical: 'top'
  },

  error: {
    color: 'red',
    marginTop: 10
  },

  boton: {
    backgroundColor: '#A8D5FF',
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center'
  },

  textoBoton: {
    fontWeight: 'bold',
    fontSize: 18
  }
});