import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import Button from '../components/Button'
import TextInput from '../components/TextInput';
import Header from '../components/Header'
import { theme } from '../core/theme'
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const RegisterView = ({ navigation }) => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                firebase.firestore().collection("BankAccount").doc(user.uid).set({balance: 0});
                firebase.firestore().collection("CaseCashSwipes").doc(user.uid).set({Casecash: 0, Mealswipes: 0, Portableswipes: 0});
                firebase.firestore().collection("Settings").doc(user.uid).set({notifications: true});
                navigation.navigate("Home");
            })
            .catch((error) => {
                handleSignUpError(error);
                
            });

    }

    function handleSignUpError(error) {
        let title = 'Sign Up Error';
        let errorMessage = error.code;
      
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'Please enter a valid email address.';
            break;
          case 'auth/email-already-in-use':
            errorMessage = 'The email address is already in use by another account.';
            break;
          case 'auth/operation-not-allowed':
            errorMessage = 'Email/password accounts are not enabled. Please contact support.';
            break;
          case 'auth/weak-password':
            errorMessage = 'Your password is too weak. Please choose a stronger password.';
            break;
          default:
            console.error('Sign Up Error:', error);
        }
      
        Alert.alert(title, errorMessage);
      }

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/output-onlinepngtools.png')}
                style={styles.image}
            />
            <Header>
                Create Account
            </Header>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            <Button
                mode="contained"
                onPress={handleRegister}
            >
                Sign Up
            </Button>
            <View style={styles.row}>
                <Text style={styles.label}>Have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.link}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
//#20384A
//#19384C
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
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    label: {
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});

export default RegisterView;