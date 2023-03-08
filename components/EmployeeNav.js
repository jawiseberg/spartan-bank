import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function EmployeeNav(props) {
  const { currentPage, handlePageChange } = props;

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => handlePageChange('ClockPunch')}>
        <Text style={[styles.headerButton, currentPage === 'ClockPunch' && styles.activeHeaderButton]}>Punch the Clock</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePageChange('TimeSheets')}>
        <Text style={[styles.headerButton, currentPage === 'TimeSheets' && styles.activeHeaderButton]}>View Timesheets</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePageChange('PayChecks')}>
        <Text style={[styles.headerButton, currentPage === 'PayChecks' && styles.activeHeaderButton]}>View Pay Statements</Text>
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