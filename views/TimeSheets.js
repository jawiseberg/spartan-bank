import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import EmployeeNav from '../components/EmployeeNav';
import { theme } from '../core/theme';

const TimeSheets = ({ navigation }) => {
  const data = [
    ['2/21', '9:00 AM', '5:00 PM', '8', 'Yes'],
    ['2/22', '8:30 AM', '5:30 PM', '9', 'Yes'],
    ['2/23', '9:15 AM', '4:45 PM', '7.5', 'Yes'],
    ['2/24', '10:00 AM', '6:00 PM', '8', 'No'],
    ['2/25', '9:30 AM', '4:30 PM', '7', 'No'],
    ['2/26', '9:30 AM', '', '', ''],
    ['2/27', '', '', '', ''],
    ['2/27', '', '', '', ''],
    ['2/27', '', '', '', ''],
    ['2/27', '', '', '', ''],
    ['2/27', '', '', '', ''],
    ['2/27', '', '', '', ''],
    ['2/27', '', '', '', ''],
    ['2/27', '', '', '', ''],


  ];
  function getWeekDates() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)));
    
    const weekDates = [];
    const dayNames = ['Monday', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sunday'];
  
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      
      const dayName = dayNames[i];
      const month = date.getMonth() + 1;
      const day = date.getDate();
  
      weekDates.push(`${dayName} ${month}/${day}`);
    }
  
    return weekDates;
  }

  const dates = getWeekDates();

  return (
    <View style={styles.parent}>
    <ScrollView style={styles.scrollView}>
      <View style={styles.header}>
        <Text style={styles.title}>Time Sheets</Text>
        <Text style={styles.subTitle}>{dates[0]} - {dates[6]}</Text>
      </View>
      <View style={styles.tableContainer}>
        <DataTable style={styles.table}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title style={styles.tableTitle}><Text style={styles.headerText}>Date</Text></DataTable.Title>
          <DataTable.Title style={styles.tableTitle}><Text style={styles.headerText}>Time In</Text></DataTable.Title>
          <DataTable.Title style={styles.tableTitle}><Text style={styles.headerText}>Time Out</Text></DataTable.Title>
          <DataTable.Title style={styles.tableTitle}><Text style={styles.headerText}>Total</Text></DataTable.Title>
          <DataTable.Title style={styles.tableTitle}><Text style={styles.headerText}>Approved</Text></DataTable.Title>
        </DataTable.Header>
        {data.map((row, index) => (
          <DataTable.Row key={index}>
            {row.map((cell, cellIndex) => (
              <DataTable.Cell key={cellIndex} style={styles.cell}>{cell}</DataTable.Cell>
            ))}
          </DataTable.Row>
        ))}
        </DataTable>
      </View>
    </ScrollView>
    <View style={styles.navContainer}>
      <EmployeeNav navigation={navigation}/>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    width: '100%',
    height: '50%',
  },
  navContainer: {
    width: '90%',
    height: '20%',
  },
  header: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%"
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.secondary,
  },
  cell: {
    width: '20%',
    justifyContent: 'center',
    borderColor:  '#0A304E',
    borderWidth: 1,
  },
  tableTitle: {
    width: '20%',
    justifyContent: 'center',
    borderColor:  '#0A304E',
    borderWidth: 1,
    backgroundColor:'#0A304E',
  },
  headerText:{
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  table:{
    width: "100%",
  },
});


export default TimeSheets;
