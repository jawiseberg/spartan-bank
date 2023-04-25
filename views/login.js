import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import Button from '../components/Button'
import TextInput from '../components/TextInput';
import Header from '../components/Header'
import { theme } from '../core/theme'
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

const LoginView = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if(user != null) {
                navigation.navigate('Home')
            }
        });
        return unsubscribe
    }, [])

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                handleLoginError(error);
            });

    }

    function handleLoginError(error) {
        let title = 'Login Error';
        let errorMessage = error.code;
      
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'Please enter a valid email address.';
            break;
        case "auth/missing-password":
            errorMessage = "Please enter a password.";
            break;
          case 'auth/user-disabled':
            errorMessage = 'Your account has been disabled. Please contact support.';
            break;
          case 'auth/user-not-found':
            errorMessage = 'No account found with the provided email.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password. Please try again.';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Too many failed login attempts. Please wait and try again later.';
            break;
          case 'auth/network-request-failed':
            errorMessage = 'A network error occurred. Please check your connection and try again.';
            break;
          default:
            console.error('Login Error:', error);
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
                Spartan Bank
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
            <View style={styles.forgotPassword}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPassword')}
                >
                    <Text style={styles.label}>Forgot your password?</Text>
                </TouchableOpacity>
            </View>
            <Button
                mode="contained"
                onPress={handleLogin}
            >
                Login
            </Button>
            <View style={styles.row}>
                <Text style={styles.label}>Don’t have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.link}>Sign up</Text>
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
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
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

export default LoginView;
//export const user;