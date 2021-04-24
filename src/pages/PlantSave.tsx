import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import React from 'react';
import { Alert, Image, Platform, StyleSheet, Text, TouchableHighlightBase, View } from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import Button from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { getBottomSpace } from 'react-native-iphone-x-helper';
import { format, isBefore } from 'date-fns';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { loadPlant, PlantProps, savePlant } from '../libs/storage';
import Tip from '../components/Tip';

interface Params {
    plant: PlantProps;
}

export default function PlantSave() {
    const navigation = useNavigation();
    const route = useRoute();
    const [selectedDateTime, setSelectedDateTime] = React.useState(new Date);
    const [showDatePicker, setShowDatePicker] = React.useState(Platform.OS === 'ios');

    function handleChangeTime(_: Event, dateTime: Date | undefined) {
        if (Platform.OS === 'android') {
            setShowDatePicker(oldValue => !oldValue)
        }

        if (dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha uma data no futuro!')
        }

        if (dateTime) {
            setSelectedDateTime(dateTime);
        }
    };

    function handleOpenDatePicker() {
        setShowDatePicker(oldValue => !oldValue)
    };

    async function handleSave() {
        try {
            await savePlant({
                ...plant, dateTimeNotification: selectedDateTime
            });

            navigation.navigate('Confirmation', {
                title: 'Tudo Certo',
                subtitle: "Fique tranquilo que sempre vamos \n lembrar você de cuidar da sua plantinha \n com bastante amor.",
                buttonTitle: 'Muito obrigado :D',
                icon: 'hug',
                nextScreen: "MyPlants"
            });

        } catch (error) {
            return Alert.alert('Não foi possivel salvar!')
        }
    }

    const { plant } = route.params as Params;

    return (
        <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={styles.container}
        >
            <View style={styles.container}>
                <View style={styles.plantInfo}>
                    <SvgFromUri uri={plant.photo} height={150} width={150} />
                    <Text style={styles.plantName}>
                        {plant.name}
                    </Text>
                    <Text style={styles.plantAbout}>
                        {plant.about}
                    </Text>
                </View>
                <View style={styles.controller}>
                    <View style={styles.tipContainer}>
                        <Tip waterTip={plant.water_tips} />
                    </View>
                    <Text style={styles.alertLabel}>
                        Escolha o melhor horário para ser lembrado.
                </Text>
                    {showDatePicker && (
                        <DateTimePicker
                            value={selectedDateTime}
                            mode='time'
                            display='spinner'
                            onChange={handleChangeTime}
                        />
                    )}
                    {Platform.OS === 'android' && (
                        <TouchableOpacity style={styles.dateTimePickerButton} onPress={handleOpenDatePicker}>
                            <Text style={styles.dateTimePickerText}>
                                Mudar {format(selectedDateTime, "HH:mm")}
                            </Text>
                        </TouchableOpacity>
                    )}
                    <Button onPress={handleSave} title="Cadastrar Planta" />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape,
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape,
    },
    plantName: {
        fontFamily: fonts.heading,
        color: colors.heading,
        fontSize: 24,
        marginTop: 15
    },
    plantAbout: {
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10,
        textAlign: 'center'
    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 30,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20
    },
    tipContainer: {
        position: 'relative',
        bottom: 60
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complememnt,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5,
    },
    dateTimePickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,
    },
    dateTimePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text,
    }
});
