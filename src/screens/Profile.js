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
    backgroundColor: '#f5f5f5',
    padding: 20
  },

  username: {
    fontSize: 28,
    fontWeight: 'bold'
  },

  email: {
    fontSize: 14,
    color: '#777',
    marginBottom: 25
  },

  boton: {
    backgroundColor: '#d45555',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 25
  },

  textoBoton: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff'
  }
});