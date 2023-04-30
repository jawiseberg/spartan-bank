import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import LoginView from './views/login';
import HomeView from './views/home';
import RegisterView from './views/register';
import ForgotPasswordView from './views/forgot_password';
import { theme } from './core/theme'
import AccountView from './views/account';
import ClockPunch from './views/ClockPunch';
import TimeSheets from './views/TimeSheets';
import PayChecks from './views/PayChecks';
import ProfileSettings from './views/ProfileSettings';
//import { initializeApp } from 'firebase/app';
//import { getAnalytics } from "firebase/analytics";
//import { getAuth } from "firebase/auth";
//import firebase from 'firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCZpz6eS7j_Lfs8YgP0RDdsRmwt7EvbPk8",
    authDomain: "spartan-bank.firebaseapp.com",
    projectId: "spartan-bank",
    storageBucket: "spartan-bank.appspot.com",
    messagingSenderId: "727185710857",
    appId: "1:727185710857:web:720b61233d6b5ba9cf3dd8",
    measurementId: "G-CGNPXLSCVX"
};

firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
//const auth = getAuth(app);
const Stack = createNativeStackNavigator();

export default function App() {
  const [currentPage, setCurrentPage] = useState('TimeSheets');

  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={navigationOptions}>
        <Stack.Screen name="Login">
            {(props) => <LoginView {...props} />}
        </Stack.Screen>
          <Stack.Screen
            name="Home"
            component={HomeView}
            options={{ title: 'Welcome' }}
          />
          <Stack.Screen name="Profile" component={ProfileSettings} />
          <Stack.Screen name="Register" component={RegisterView} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordView} />
          <Stack.Screen name="Account" component={AccountView} />
          <Stack.Screen name="ClockPunch" component={ClockPunch} />
          <Stack.Screen name="PayChecks" component={PayChecks} />
          <Stack.Screen name="TimeSheets" component={TimeSheets} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const navigationOptions = {
  headerStyle: { backgroundColor: theme.colors.primary },
  headerTitleStyle: { color: 'white' },
}
