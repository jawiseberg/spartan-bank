import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Button from '../components/Button'
import TextInput from '../components/TextInput';
import Header from '../components/Header'
import { theme } from '../core/theme'

const ForgotPasswordView = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handleReset = () => {
        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/output-onlinepngtools.png')}
                style={styles.image}
            />
            <Header>
                Restore Password
            </Header>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <Button
                mode="contained"
                onPress={handleReset}
            >
                Send Reset Instructions
            </Button>
            <TouchableOpacity
                style={styles.back}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.label}>← Back to login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    image: {
        width: 200,
        height: 200,
    },
    label: {
        color: theme.colors.secondary,
    },
    back: {
        width: '100%',
        marginTop: 12,
    },
});

export default ForgotPasswordView;