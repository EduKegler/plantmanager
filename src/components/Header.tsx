import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import userImg from '../assets/avatar.jpg'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface HeaderProps {

}

export default function Header(props: HeaderProps) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá</Text>
                <Text style={styles.userName}>Eduardo</Text>
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
