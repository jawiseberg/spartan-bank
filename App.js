import React, { useState } from 'react';
<<<<<<< HEAD
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Image } from 'react-native';
=======
>>>>>>> b0d271eb3c0f7227e54685e498e44aaf4a020618
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import LoginView from './views/login';
import ProfileView from './views/profile';
import HomeView from './views/home';
import RegisterView from './views/register';
import ForgotPasswordView from './views/forgot_password';
import { theme } from './core/theme'
import AccountView from './views/account';
import ClockPunch from './views/ClockPunch';
import TimeSheets from './views/TimeSheets';
import PayChecks from './views/PayChecks';
import ProfileSettings from './views/ProfileSettings';

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
