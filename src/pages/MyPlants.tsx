import React from 'react';
import { StyleSheet, Text, FlatList, View, Alert } from 'react-native';
import colors from '../styles/colors';
import Tip from '../components/Tip';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import PlantCardSecondary from '../components/PlantCardSecondary';
import { loadPlant, PlantProps, RemovePlant } from '../libs/storage';
import fonts from '../styles/fonts';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Load from '../components/Load';

export default function MyPlants() {

    const [myPlants, setMyPlants] = React.useState<PlantProps[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [nextWatered, setNextWatered] = React.useState<string>();

    React.useEffect(() => {
        async function loadStorage() {
            const plantsStoraged = await loadPlant();
            const nextTime = formatDistance(new Date(plantsStoraged[0]?.dateTimeNotification).getTime(), new Date().getTime(), { locale: ptBR });
            setNextWatered(`Não esquece de regar a ${plantsStoraged[0]?.name} à ${nextTime}`)
            setMyPlants(plantsStoraged);
            setIsLoading(false);
        }

        loadStorage();
    }, [])

    function handleRemove(plant: PlantProps) {
        Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
            { text: 'Não', style: 'cancel' },
            {
                text: 'Sim', onPress: async () => {
                    try {
                        await RemovePlant(plant.id);
                        setMyPlants((oldValue) =>
                            oldValue.filter(item => item.id !== plant.id));
                    } catch (error) {
                        Alert.alert('Não foi possivel remover.')
                    }
                }, style: 'cancel'
            }
        ])

    }

    if (isLoading) {
        return <Load />
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header title='Minhas' name='Plantinha' />
            <View style={styles.content}>
                <View style={styles.tipContainer}>
                    <Tip waterTip={"Regue sua Aningapara daqui a 2 horas."} />
                </View>
                <View style={styles.plants}>
                    <Text style={styles.plantsTitle}>Próximas Regadas</Text>
                    <FlatList
                        data={myPlants}
                        renderItem={({ item }) =>
                            <PlantCardSecondary
                                data={item}
                                handleRemove={() => handleRemove(item)}
                            />}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.background,
        paddingHorizontal: 30,
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
    },
    tipContainer: {
    },
    plants: {
        flex: 1
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }
});
