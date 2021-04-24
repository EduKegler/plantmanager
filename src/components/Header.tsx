import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import userImg from '../assets/avatar.jpg'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface HeaderProps {
    name?: string;
    title: string;
};

export default function Header(props: HeaderProps) {
    const { name, title } = props;

    const [userName, setUserName] = React.useState('');

    React.useEffect(() => {
        async function getName() {
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setUserName(user ?? '');
        }
        if (!name) { 
            getName() 
        };
    }, [])

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>{title}</Text>
                <Text style={styles.userName}>{name || userName}</Text>
            </View>
            <Image style={styles.image} source={userImg} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    userName: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 40
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35
    }
});
