import React from 'react';
import { Image, Text, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions, View } from 'react-native';
import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

export default function Welcolme() {

    const navigation = useNavigation();

    function handleSubmit() {
        navigation.navigate('UserIdentification');
    } 

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.title}>Gerencie {'\n'} suas plantas de {'\n'} forma fácil</Text>
                <Image source={wateringImg} style={styles.image} resizeMode='contain' />
                <Text style={styles.subtitle}>
                    Não esqueça mais de regar suas plantas.
                    Nós cuidamos de lembrar você sempre que precisar.
                </Text>
                <TouchableOpacity onPress={handleSubmit} style={styles.button} activeOpacity={0.7}>
                    <Entypo name="chevron-right" style={styles.buttonIcon} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        width: '100%',
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
        fontFamily: fonts.heading
    },
    image: {
        height: Dimensions.get('window').width * 0.7,
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 16,
        width: 56,
        height: 56,
    },
    buttonIcon: {
        color: colors.white,
        fontSize: 24
    }
});