import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import LoadAnimation from '../assets/load.json';

interface LoadProps {
}

export default function Load(props: LoadProps) {
    return (
        <View style={styles.container} >
            <LottieView 
            source={LoadAnimation} 
            autoPlay={true} 
            loop={true} 
            style={styles.animation}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    animation: {
        width: 200,
        height: 200
    }
});
