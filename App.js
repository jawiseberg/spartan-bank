import React, { useState } from 'react';
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
import TimeSheetsView from './views/TimeSheets'
import ClockPunchView from './views/ClockPunch'
import PayChecksView from './views/PayChecks'

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
          <Stack.Screen name="Account" component={AccountView} />
          <Stack.Screen name="TimeSheets" component={TimeSheetsView} />
          <Stack.Screen name="PayChecks" component={PayChecksView} />
          <Stack.Screen name="ClockPunch" component={ClockPunchView} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const navigationOptions = {
  headerStyle: { backgroundColor: theme.colors.primary },
  headerTitleStyle: { color: 'white' },
}
