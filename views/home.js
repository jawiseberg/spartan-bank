import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { theme } from '../core/theme';
import { auth } from '../firebase';

const HomeView = ({ navigation }) => {
  const handleSignOut = () => {
    auth.signOut()
    .then(() => {
        navigation.replace("Login")
    }).catch(error => alert(error.message))
}
  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Account')}>
          <Text style={styles.buttonText}>Bank{'\n'}Account</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PayChecks')}>
          <Text style={styles.buttonText}>Student{'\n'}Employment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '45%',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: theme.colors.primary,
    margin: 10,
    height: '100%',
  },
  buttonText: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',

    fontWeight: 'bold',
  },
});

export default HomeView;
