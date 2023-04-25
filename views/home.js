import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { auth } from '../firebase';

const HomeView = ({ navigation }) => {

    const handleSignOut = () => {
        auth.signOut()
        .then(() => {
            navigation.replace("Login")
        }).catch(error => alert(error.message))
    }

    return (
        <View>
            <Text>Welcome to the home view</Text>
            <Button
                title="Go to profile"
                onPress={() => navigation.navigate('Profile')}
            />
            <Button
                title="Go to bank account"
                onPress={() => navigation.navigate('Account')}
            />
            <Button
                title="Go to timesheet"
                onPress={() => navigation.navigate('TimeSheets')}
            />
            <Button
                title="Sign out"
                onPress={handleSignOut}
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