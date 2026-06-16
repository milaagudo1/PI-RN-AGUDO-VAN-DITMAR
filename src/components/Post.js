import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { db, auth } from '../firebase/config';

export default function Post(props) {

    function toggleLike() {
        const email = auth.currentUser.email;
        const yaDioLike = props.post.data.likes.includes(email);

        db.collection('posts').doc(props.post.id).update({
            likes: yaDioLike
                ? firebase.firestore.FieldValue.arrayRemove(email)
                : firebase.firestore.FieldValue.arrayUnion(email)
        })
        .then(() => {})
        .catch(e => console.log(e));
    }

    return (
        <View style={styles.card}>

            <Text style={styles.owner}>
                {props.post.data.owner}
            </Text>

            {
                props.post.data.photo
                ?
                <Image
                    style={styles.image}
                    source={{
                        uri: `data:image/png;base64,${props.post.data.photo}`
                    }}
                />
                :
                null
            }

            <Text style={styles.descripcion}>
                {props.post.data.description}
            </Text>

            <View style={styles.accionesContainer}>

                <Pressable
                    style={styles.botonAccion}
                    onPress={() => toggleLike()}
                >
                    <Text style={styles.textoBoton}>
                        ❤️ Me gusta ({props.post.data.likes.length})
                    </Text>
                </Pressable>

                {
                    props.navigation
                    ?
                    <Pressable
                        style={styles.botonAccion}
                        onPress={() =>
                            props.navigation.navigate(
                                'Comentarios',
                                { id: props.post.id }
                            )
                        }
                    >
                        <Text style={styles.textoBoton}>
                            💬 Comentar
                        </Text>
                    </Pressable>
                    :
                    null
                }

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 10,
        elevation: 3
    },

    owner: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#666',
        marginBottom: 10
    },

    image: {
        width: '100%',
        height: 250,
        borderRadius: 15,
        marginBottom: 10
    },

    descripcion: {
        fontSize: 16,
        marginBottom: 15
    },

    accionesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },

    botonAccion: {
        backgroundColor: '#A8D5FF',
        width: '48%',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center'
    },

    textoBoton: {
        fontWeight: 'bold',
        fontSize: 14
    }
});