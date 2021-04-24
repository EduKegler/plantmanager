import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '../styles/colors';
import Welcolme from '../pages/Welcome';
import Confirmation from '../pages/Confirmation';
import UserIdentification from '../pages/UserIdentification';
import AuthRoutes from './tab.routes';
import PlantSave from '../pages/PlantSave';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Load from '../components/Load';

const stackRoutes = createStackNavigator();

export default function AppRoutes() {
    const [initialRoute, setInitial] = React.useState('Welcome');
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        async function getName() {
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setInitial(user ? 'PlantSelect' : 'Welcome');
            setIsLoading(false);
        }
        getName();
    }, [])

    if (isLoading) {
        return <Load />
    }

    return (
        <stackRoutes.Navigator headerMode='none' initialRouteName={initialRoute} screenOptions={{ cardStyle: { backgroundColor: colors.white } }}>
            <stackRoutes.Screen name='Welcome' component={Welcolme} />
            <stackRoutes.Screen name='UserIdentification' component={UserIdentification} />
            <stackRoutes.Screen name='Confirmation' component={Confirmation} />
            <stackRoutes.Screen name='PlantSelect' component={AuthRoutes} />
            <stackRoutes.Screen name='PlantSave' component={PlantSave} />
            <stackRoutes.Screen name='MyPlants' component={AuthRoutes} />
        </stackRoutes.Navigator>
    );
}
