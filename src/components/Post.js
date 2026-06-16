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
            <Text style={styles.owner}>{props.post.data.owner}</Text>

            {
                props.post.data.photo
                ?
                <Image
                    style={styles.image}
                    source={{ uri: `data:image/png;base64,${props.post.data.photo}` }}
                />
                :
                null
            }

            <Text>{props.post.data.description}</Text>

            <Pressable onPress={() => toggleLike()}>
                <Text style={styles.accion}>Me gusta ({props.post.data.likes.length})</Text>
            </Pressable>

            {
                props.navigation
                ?
                <Pressable onPress={() => props.navigation.navigate('Comentarios', { id: props.post.id })}>
                    <Text style={styles.accion}>Comentar</Text>
                </Pressable>
                :
                null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 20,
        padding: 10
    },
    owner: {
        fontWeight: 'bold',
        marginBottom: 5
    },
    image: {
        width: '100%',
        height: 300,
        marginBottom: 5
    },
    accion: {
        color: '#2ecc40',
        marginTop: 5
    }
});