import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import EmployeeNav from '../components/EmployeeNav';
import { theme } from '../core/theme';
import uuid from 'react-native-uuid';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const getWeekDates = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startOfWeek = new Date(today.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)));
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);
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

  return {startDate: startOfWeek, endDate: endOfWeek, dates: weekDates};
};

const TimeSheets = ({ navigation }) => {
  const userId = firebase.auth().currentUser.uid;
  const db = firebase.firestore();
  const timeSheetsRef = db.collection('Timesheets').doc(userId);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null)
  const [tableData, setData] = useState([]);

  
  useEffect(() => {
    const { startDate, endDate } = getWeekDates();
    setStartDate(startDate);
    setEndDate(endDate);
  }, []);

  useEffect(() => {
      const fetchData = async () => {
      const timeSheetData = await timeSheetsRef.collection("entries").orderBy("end","asc").get();
      const timeSheetEntries = timeSheetData.docs.map(doc => {
        const data = doc.data();
        const inDate = new Date(data.start);
        const outDate = new Date(data.end);
        const startFormatted = `${inDate.getMonth() + 1}/${inDate.getDate()}`;
        const startHourFormatted = `${inDate.getHours()}:${inDate.getMinutes().toString().padStart(2, '0')}`;
        const endHourFormatted = `${outDate.getHours()}:${outDate.getMinutes().toString().padStart(2, '0')}`;
        const numHours = data.numhours;
        const approved = data.approved ? "Yes" : "No";
        return [startFormatted, startHourFormatted, endHourFormatted, numHours, approved];
      }).filter(entry => {
        const dateStr = entry[0]
        const parts = dateStr.split('/');
        const month = parseInt(parts[0], 10) - 1; // JavaScript months are zero-based
        const day = parseInt(parts[1], 10);
        const date = new Date();
        date.setMonth(month);
        date.setDate(day);
        date.setFullYear(new Date().getFullYear()); // Set the year to the current year        const inDate = new Date(`${entry[0]}`);
        return date >= startDate && date <= endDate;
      });      
      setData(timeSheetEntries);
        };
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000); // 10 seconds
  
    return () => clearInterval(intervalId); // cleanup function to clear interval on unmount
  }, [tableData]);
  
  const { dates } = getWeekDates();

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
        {tableData.map((row, index) => (
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
