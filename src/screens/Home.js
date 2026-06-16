import { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { db } from '../firebase/config';
import Post from '../components/Post';

export default function Home({navigation}) {
    const [posteos, setPosteos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        db.collection('posts')
            .orderBy('createdAt', 'desc')
            .onSnapshot(docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                setPosteos(posts);
                setLoading(false);
            });
    }, []);

    return (
        <View style={styles.flatlist}>
            {
                loading
                ?
                <ActivityIndicator size='large' color='green' />
                :
                <FlatList
                    data={posteos}
                    keyExtractor={post => post.id}
                    renderItem={({item}) => <Post post={item} navigation={navigation} />}
                />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    flatlist: {
        width: '100%',
        flex: 1
    }
});