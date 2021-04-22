import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';
import Load from '../components/Load';
import EnvironmentButton from '../components/EnvironmentButton';
import Header from '../components/Header';
import PlantCardPrimary from '../components/PlantCardPrimary';
import api from '../service/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { ActivityIndicator } from 'react-native';

interface EnvironmentProps {
    key: string;
    title: string;
}

interface PlantProps {
    id: number;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: string[],
    frequency: {
        times: number;
        repeat_every: "week" | "day"
    }
}


export default function PlantSelect() {

    const [environments, setEnvironments] = React.useState<EnvironmentProps[]>([]);
    const [plants, setPlants] = React.useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = React.useState<PlantProps[]>(plants);
    const [activeEnvironment, setActiveEnvironment] = React.useState('all');
    const [loading, setLoading] = React.useState(true);

    const [page, setPage] = React.useState(1);
    const [loadingMore, setLoadingMore] = React.useState(false);
    const [loadedAll, setLoadedAll] = React.useState(false);
    
    async function fetchPlants() {
        const { data } = await api.get(`plants?_sort=name&order=asc&_page=${page}&_limit=8`);
        console.log(page)
        if (!data) {
            return setLoading(false);
        }

        if (page > 1) {
            setPlants(oldValue => [...oldValue, ...data])
            setFilteredPlants(oldValue => [...oldValue, ...data])
        } else {
            setPlants(data);
            setFilteredPlants(data);
        }

        setLoading(false);
        setLoadingMore(false);
    }

    function handleFetchMore(distance: number) {
        if (distance < 1) {
            return;
        }

        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
        fetchPlants();
    }

    function handleActiveEnvironment(environment: string) {
        setActiveEnvironment(environment);
        if (environment === 'all') {
            return setFilteredPlants(plants);
        } else {
            setFilteredPlants(plants.filter(plant => plant.environments.includes(environment)))
        }
    }

    React.useEffect(() => {
        async function fetchEnvironment() {
            const { data } = await api.get('plants_environments?_sort=title&order=asc');
            setEnvironments([{
                key: 'all',
                title: 'Todos'
            }, ...data]);
        }
        fetchEnvironment();
    }, []);

    React.useEffect(() => { fetchPlants(); }, []);

    if (loading) {
        return <Load />
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Header />
                    <Text style={styles.title}>Em qual ambiente </Text>
                    <Text style={styles.subtitle}>Você quer colocar sua planta?</Text>
                </View>
                <View>
                    <FlatList
                        data={environments}
                        renderItem={({ item }) =>
                            <EnvironmentButton
                                title={item.title}
                                active={activeEnvironment === item.key}
                                onPress={() => handleActiveEnvironment(item.key)}
                            />}
                        keyExtractor={({ key }) => key}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.environmentList}
                    >
                    </FlatList>
                </View>
                <View style={styles.plants}>
                    <FlatList
                        data={filteredPlants}
                        renderItem={({ item }) => <PlantCardPrimary data={item} />}
                        keyExtractor={({ id }, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        onEndReachedThreshold={0.1}
                        onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
                        ListFooterComponent={
                            loadingMore ? <ActivityIndicator color={colors.green} />
                                : <React.Fragment />
                        }
                    >
                    </FlatList>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 30
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subtitle: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.text,
        lineHeight: 20,
    },
    environmentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },
    plants: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
});
