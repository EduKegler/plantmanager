import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, SafeAreaView, StyleSheet, View, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Button from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function UserIdentification() {

    const [isFocused, setIsFocused] = React.useState(false);
    const [isFilled, setIsFilled] = React.useState(false);
    const [name, setName] = React.useState('');
    const navigation = useNavigation();

    function handleInputBlur() {
        setIsFocused(false)
        setIsFilled(!!name)
    }

    function handleInputFocus() {
        setIsFocused(true)
    }

    function handleInputChange(value: string) {
        setIsFilled(!!value)
        setName(value)
    }

    function handleSubmit() {
        navigation.navigate('Confirmation');
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    {isFilled ? '😀' : '😄'}</Text>
                                <Text style={styles.title}>
                                    Como podemos {'\n'} chamar você?
                            </Text>
                            </View>
                            <TextInput
                                style={[styles.input, (isFocused || isFilled) && { borderColor: colors.green }]}
                                placeholder='Digite um nome'
                                value={name}
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}
                            />
                            <View style={styles.footer}>
                                <Button title='Confirmar' onPress={handleSubmit} />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    content: {
        flex: 1,
        width: '100%',
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        fontFamily: fonts.heading,
        color: colors.heading,
        marginTop: 20
    },
    form: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 54
    },
    header: {
        alignItems: 'center'
    },
    emoji: {
        fontSize: 44
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    footer: {
        marginTop: 40,
        width: '100%',
        paddingHorizontal: 20
    }
});
