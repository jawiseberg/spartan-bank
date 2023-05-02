import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal } from 'react-native';
import { DataTable } from 'react-native-paper';
import EmployeeNav from '../components/EmployeeNav';
import { theme } from '../core/theme';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const PayChecks = ({ navigation }) => {
  const [tableData, setData] = useState([]);
  const userId = firebase.auth().currentUser.uid;
  const db = firebase.firestore();
  const payCheckRef = db.collection('PayStatements').doc(userId);

  useEffect(() => {
    const fetchData = async () => {
    const payCheckData = await payCheckRef.collection("entries").orderBy("Date","asc").get();
    const payCheckEntries = payCheckData.docs.map(doc => {
      const data = doc.data();
      const date = data.Date.toDate();
      const startFormatted = `${date.getMonth() + 1}/${date.getDate()}`;
      const gross = "$" + data.GrossPay.toFixed(2)
      const net = "$" + data.NetPay.toFixed(2)
      return [startFormatted, gross, net];
    });      
    setData(payCheckEntries);
      };
  const intervalId = setInterval(() => {
    fetchData();
  }, 1000); // 1 seconds

  return () => clearInterval(intervalId); // cleanup function to clear interval on unmount
}, [tableData]);

  return (
    <View style={styles.parent}>
    <ScrollView style={styles.scrollView}>
      <View style={styles.header}>
        <Text style={styles.title}>Pay Statements</Text>
      </View>
      <View style={styles.tableContainer}>
        <DataTable style={styles.table}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title style={styles.tableTitle}><Text style={styles.headerText}>Pay Date</Text></DataTable.Title>
            <DataTable.Title style={styles.tableTitle}><Text style={styles.headerText}>Gross</Text></DataTable.Title>
            <DataTable.Title style={styles.tableTitle}><Text style={styles.headerText}>Net</Text></DataTable.Title>
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
    width: '25%',
    justifyContent: 'center',
    borderColor:  '#0A304E',
    borderWidth: 1,
  },
  tableTitle: {
    width: '25%',
    justifyContent: 'center',
    borderColor:  '#0A304E',
    borderWidth: 1,
    backgroundColor:'#0A304E',
  },
  headerText:{
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 18,
  },
  table:{
    width: "100%",
  },
});


export default PayChecks;



