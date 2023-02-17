import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const HomeView = ({ navigation }) => {
    return (
        <View>
            <Text>Welcome to the home view</Text>
            <Button
                title="Go to profile"
                onPress={() => navigation.navigate('Profile')}
            />
            <Button
                title="Go to login"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HomeView;