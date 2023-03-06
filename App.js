//import React, { useState } from 'react';
//import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import LoginView from './views/login';
import ProfileView from './views/profile';
import HomeView from './views/home';
import RegisterView from './views/register';
import ForgotPasswordView from './views/forgot_password';
import { theme } from './core/theme'
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
          <Stack.Screen name="Login" component={LoginView} />
          <Stack.Screen
            name="Home"
            component={HomeView}
            options={{ title: 'Welcome' }}
          />
          <Stack.Screen name="Profile" component={ProfileView} />
          <Stack.Screen name="Register" component={RegisterView} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordView} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const navigationOptions = {
  headerStyle: { backgroundColor: theme.colors.primary },
  headerTitleStyle: { color: 'white' },
}
