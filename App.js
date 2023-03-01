//import React, { useState } from 'react';
//import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import LoginView from './views/login';
import ProfileView from './views/profile';
import HomeView from './views/home';
const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Spartan Bank">
          <Stack.Screen name="Spartan Bank" component={LoginView} />
          <Stack.Screen
            name="Home"
            component={HomeView}
            options={{ title: 'Welcome' }}
          />
          <Stack.Screen name="Profile" component={ProfileView} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}