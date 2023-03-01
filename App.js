import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import ClockPunch from './screens/ClockPunch';
import TimeSheets from './screens/TimeSheets';
import PayChecks from './screens/PayChecks';


export default function App() {
  const [currentPage, setCurrentPage] = useState('TimeSheets');

  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {currentPage === 'ClockPunch' && <ClockPunch />}
        {currentPage === 'TimeSheets' && <TimeSheets />}
        {currentPage === 'PayChecks' && <PayChecks />}
      </View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handlePageChange('ClockPunch')}>
          <Text style={[styles.headerButton, currentPage === 'ClockPunch' && styles.activeHeaderButton]}>ClockPunch</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePageChange('TimeSheets')}>
          <Text style={[styles.headerButton, currentPage === 'TimeSheets' && styles.activeHeaderButton]}>TimeSheets</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePageChange('PayChecks')}>
          <Text style={[styles.headerButton, currentPage === 'PayChecks' && styles.activeHeaderButton]}>PayChecks</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 20,
  },
  headerButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  activeHeaderButton: {
    color: '#007aff',
    borderBottomWidth: 2,
    borderBottomColor: '#007aff',
  },
  content: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
