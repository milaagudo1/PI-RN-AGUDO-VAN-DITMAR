import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { db, auth } from '../firebase/config';

export default function Comentarios({ route }) {
    const postId = route.params.id;

    const [comentario, setComentario] = useState('');
    const [comentarios, setComentarios] = useState([]);

    useEffect(() => {
        db.collection('posts').doc(postId).onSnapshot(doc => {
            setComentarios(doc.data().comments || []);
        });
    }, []);

    function agregarComentario() {
        if (comentario === '') {
            return;
        }

        db.collection('posts').doc(postId).update({
            comments: firebase.firestore.FieldValue.arrayUnion({
                owner: auth.currentUser.email,
                text: comentario
            })
        })
        .then(() => {
            setComentario('');
        })
        .catch(e => console.log(e));
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={comentarios}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                    <View style={styles.comentario}>
                        <Text style={styles.owner}>{item.owner}</Text>
                        <Text>{item.text}</Text>
                    </View>
                )}
            />

            <TextInput
                style={styles.field}
                placeholder='Escribí un comentario...'
                value={comentario}
                onChangeText={text => setComentario(text)}
            />

            <Pressable style={styles.boton} onPress={() => agregarComentario()}>
                <Text style={styles.textoBoton}>Comentar</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15
  },

  comentario: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10
  },

  owner: {
    fontWeight: 'bold',
    marginBottom: 5
  },

  field: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 15,
    minHeight: 80,
    marginVertical: 15
  },

  boton: {
    backgroundColor: '#A8D5FF',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center'
  },

  textoBoton: {
    fontWeight: 'bold',
    fontSize: 16
  }
});