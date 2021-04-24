import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, RectButtonProps, Swipeable } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { SvgFromUri } from 'react-native-svg';
import { PlantProps } from '../libs/storage';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantCardSecondaryProps extends RectButtonProps {
    data: PlantProps;
    handleRemove: () => void;
}

export default function PlantCardSecondary(props: PlantCardSecondaryProps) {
    const { data, handleRemove, ...rest } = props;
    return (
        <Swipeable overshootRight={false} renderRightActions={() =>
            <Animated.View>
                <View>
                    <RectButton style={styles.buttonRemove} onPress={handleRemove}>
                        <Feather name="trash" size={32} color={colors.white} />
                    </RectButton>
                </View>
            </Animated.View>
        }>
            <RectButton style={styles.container} {...rest}>
                <SvgFromUri uri={data.photo} width={50} height={50} />
                <Text style={styles.title}>{data.name}</Text>
                <View style={styles.details}>
                    <Text style={styles.timeLabel}>Regar às</Text>
                    <Text style={styles.time}>{data.hour}</Text>
                </View>
            </RectButton>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: colors.shape,
        borderRadius: 20,
        paddingVertical: 25,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginVertical: 5,
    },
    title: {
        flex: 1,
        color: colors.heading,
        fontFamily: fonts.heading,
        marginLeft: 10,
        fontSize: 17
    },
    details: {
        alignItems: 'flex-end'
    },
    timeLabel: {
        fontFamily: fonts.text,
        color: colors.body_light,
    },
    time: {
        marginTop: 5,
        fontFamily: fonts.heading,
        color: colors.body_dark,
    },
    buttonRemove: {
        backgroundColor: colors.red,
        width: 100,
        height: 85,
        marginTop: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        right: 20,
        paddingLeft: 15
    }
});
