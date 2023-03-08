import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, BottomNavigation, Text } from 'react-native-paper';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

const Header = () => (
  <Appbar.Header>
    <Appbar.Content title="Home" subtitle="Balance: $1,000.00" />
  </Appbar.Header>
);

const BalanceScreen = () => (
  <View style={styles.container}>
    <Header />
    <View style={styles.card}>
      <Text>Balance: $1,000.00</Text>
    </View>
  </View>
);

const SettingsScreen = () => (
  <View style={styles.container}>
    <Header />
    <Text>Settings Screen</Text>
  </View>
);

const BottomBar = createAppContainer(
  createBottomTabNavigator(
    {
      Home: {
        screen: BalanceScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon name="home" size={24} color={tintColor} />
          ),
        },
      },
      Profile: {
        screen: SettingsScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon name="person" size={24} color={tintColor} />
          ),
        },
      },
    },
    {
      tabBarOptions: {
        activeTintColor: '#6200ee',
        inactiveTintColor: '#828282',
      },
    }
  )
);

const App = () => (
  <View style={{ flex: 1 }}>
    <BottomBar />
  </View>
);
