import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const ProfileView = ({ navigation }) => {
    return (
        <View>
            <Text>Welcome to the profile view</Text>
            <Button
                title="Go to home"
                onPress={() => navigation.navigate('Home')}
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

export default ProfileView;