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
        padding: 20,
        backgroundColor: '#fff'
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15
    },
    field: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        minHeight: 100,
        textAlignVertical: 'top',
        marginBottom: 10
    },
    error: {
        color: 'red',
        marginBottom: 10
    },
    boton: {
        backgroundColor: '#2ecc40',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center'
    },
    textoBoton: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});