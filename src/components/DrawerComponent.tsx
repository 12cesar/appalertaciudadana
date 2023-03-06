import React, { useContext, useState, useEffect } from 'react';
import {
    DrawerContentScrollView,
    DrawerContentComponentProps,
    DrawerItem

} from '@react-navigation/drawer';
import { View, StyleSheet } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Paragraph
} from 'react-native-paper'

import AuthContext from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const MenuDrawer = (props: DrawerContentComponentProps) => {
    const { logOut } = useContext(AuthContext);
    const [ciudadano, setCiudadano] = useState('');
    useEffect(() => {
        getNombre();
    }, [ciudadano])


    const getNombre = async () => {
        const nombre = await AsyncStorage.getItem('ciudadano');
        console.log(nombre);
        setCiudadano(nombre!)

    }
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
            >
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={require('../assets/img/fondo8.png')}
                                size={50}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>{ciudadano}</Title>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>M.P.C.P</Paragraph>
                                <Caption style={styles.caption}>Alerta Ciudadana</Caption>
                            </View>

                        </View>
                    </View>

                    <View style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="send-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Enviar Alerta"
                            onPress={() => { props.navigation.navigate('Mapa') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="alert-circle-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Alerta"
                            onPress={() => { props.navigation.navigate('Alertas') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="person-circle-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Mi Perfil"
                            onPress={() => { props.navigation.navigate('Perfil') }}
                        />

                    </View>

                </View>
            </DrawerContentScrollView>
            <View
                style={{
                    borderTopWidth: 1,
                    padding: 5,
                    borderTopColor: "#ccc",
                }}
            >
                <DrawerItem
                    pressOpacity={0.1}
                    icon={({ color, size }) => (
                        <Icon
                            name='log-out-outline'
                            color={color}
                            size={size}
                        />
                    )}
                    label='Cerrar Sesión'
                    onPress={logOut}
                />
            </View>

        </View>
    );
};
export default MenuDrawer;
const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});