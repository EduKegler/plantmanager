import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacityProps, View } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import waterdrop from '../assets/waterdrop.png';

interface TipProps {
    waterTip: string;
}

export default function Tip(props: TipProps) {
    const { waterTip } = props;
    return (
        <View style={styles.container}>
            <Image source={waterdrop} style={styles.image} />
            <Text style={styles.text}>
                {waterTip}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
 
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.blue_light,
        borderRadius: 20,
        height: 110,
        paddingHorizontal: 20
    },
    image: {
        width: 60,
        height: 60
    },
    text: {
        flex: 1,
        paddingHorizontal: 20,
        fontFamily: fonts.text,
        fontSize: 17,
        alignContent: 'center',
        color: colors.blue,
    },
});
