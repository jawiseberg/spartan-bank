import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../core/theme';

export default function EmployeeNav({ navigation }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('ClockPunch')}>
        <Text style={[styles.headerButton]}>Punch the Clock</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('TimeSheets')}>
        <Text style={[styles.headerButton]}>View Timesheets</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('PayChecks')}>
        <Text style={[styles.headerButton]}>View Pay Statements</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
      position: 'absolute',
      position: 'absolute',
      bottom: 10,
      width: '100%',
      alignSelf: 'center',
      flexDirection: 'column',
      backgroundColor: theme.colors.primary,
      paddingVertical: 5,
      paddingHorizontal: 10,
    },
    headerButton: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginVertical: 5,
      borderWidth: 1,
      borderColor: 'white',
    },
    activeHeaderButton: {
      color: 'blue',
    },
});