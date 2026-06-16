import { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import Post from '../components/Post';

export default function Profile({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [misPosteos, setMisPosteos] = useState([]);

    useEffect(() => {
        const emailActual = auth.currentUser.email;
        setEmail(emailActual);

        db.collection('users')
            .where('email', '==', emailActual)
            .onSnapshot(docs => {
                docs.forEach(doc => {
                    setUsername(doc.data().username);
                });
            });

        db.collection('posts')
            .where('owner', '==', emailActual)
            .onSnapshot(docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                setMisPosteos(posts);
            });
    }, []);

    function logout() {
        auth.signOut()
            .then(() => {
                navigation.navigate('Login');
            })
            .catch(e => console.log(e));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.email}>{email}</Text>

            <Pressable style={styles.boton} onPress={() => logout()}>
                <Text style={styles.textoBoton}>Cerrar sesión</Text>
            </Pressable>

            <FlatList
                data={misPosteos}
                keyExtractor={post => post.id}
                renderItem={({item}) => <Post post={item} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    username: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    email: {
        color: '#666',
        marginBottom: 15
    },
    boton: {
        backgroundColor: '#e74c3c',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20
    },
    textoBoton: {
        color: '#fff',
        fontWeight: 'bold'
    }
});