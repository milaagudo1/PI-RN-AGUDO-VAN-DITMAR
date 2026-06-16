import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { manipulateAsync } from 'expo-image-manipulator';

export default function Camara(props) {

    const [permisos, setPermisos] = useState(false);
    const [uri, setUri] = useState(null);

    const metodosCamara = useRef(null);

    useEffect(() => {
        Camera.requestCameraPermissionsAsync()
            .then(() => setPermisos(true))
            .catch(error => console.log(error));
    }, []);

    function takePicture() {
        metodosCamara.current.takePictureAsync()
            .then((imgTemp) => {
                return manipulateAsync(
                    imgTemp.uri,
                    [{ resize: { width: 200 } }],
                    {
                        compress: 0.7,
                        base64: true
                    }
                );
            })
            .then((imgManipulated) => {
                setUri(imgManipulated.base64);
            })
            .catch(error => console.log(error));
    }

    function savePhoto() {
        props.setPhotoUri(uri);
    }

    function clearPhoto() {
        setUri(null);
    }

    return (
        <View style={styles.container}>
            {
                !permisos
                ?
                <View>
                    <Text>Necesitamos permisos para usar la cámara</Text>
                </View>
                :
                uri === null
                ?
                <>
                    <CameraView
                        style={styles.camera}
                        facing="back"
                        ref={metodosCamara}
                    />

                    <Pressable
                        style={styles.shootButton}
                        onPress={() => takePicture()}
                    >
                        <Text>Sacar Foto</Text>
                    </Pressable>
                </>
                :
                <>
                    <Image
                        style={styles.preview}
                        source={{ uri: `data:image/png;base64,${uri}` }}
                    />

                    <View style={styles.buttonArea}>
                        <Pressable
                            style={styles.button}
                            onPress={() => savePhoto()}
                        >
                            <Text>Aceptar</Text>
                        </Pressable>

                        <Pressable
                            style={styles.button}
                            onPress={() => clearPhoto()}
                        >
                            <Text>Rechazar</Text>
                        </Pressable>
                    </View>
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center'
  },

  camera: {
    width: '90%',
    height: 500,
    borderRadius: 20,
    overflow: 'hidden'
  },

  shootButton: {
    backgroundColor: '#A8D5FF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 20
  },

  preview: {
    width: 300,
    height: 300,
    borderRadius: 20
  },

  buttonArea: {
    flexDirection: 'row',
    marginTop: 20
  },

  button: {
    backgroundColor: '#A8D5FF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 10
  }
});