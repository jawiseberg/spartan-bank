import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function EmployeeNav({navigation}) {

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
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      flexDirection: 'column',
      backgroundColor: '#eee',
      paddingVertical: 5,
      paddingHorizontal: 10,
    },
    headerButton: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      marginVertical: 5,
    },
    activeHeaderButton: {
      color: 'blue',
    },
});