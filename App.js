//import React, { useState } from 'react';
//import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginView from './views/login';
import ProfileView from './views/profile';
import HomeView from './views/home';
import AccountView from './views/account';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginView} />
        <Stack.Screen
          name="Home"
          component={HomeView}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Profile" component={ProfileView} />
        <Stack.Screen name="Account" component={AccountView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}