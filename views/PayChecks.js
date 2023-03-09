import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal } from 'react-native';
import { DataTable } from 'react-native-paper';
import EmployeeNav from '../components/EmployeeNav';

const PayChecks = ({ navigation }) => {
  const data = [
    ['2/21', '$112.56', '$99.56','View'],
    ['2/28', '$112.56', '$99.56', 'View'],
    ['3/5', '$112.56', '$99.56',  'View'],
    ['2/12', '$112.56', '$99.56', 'View'],
  ];

  const [selectedPaystub, setSelectedPaystub] = useState(null);

  const handlePaystubPress = (index) => {
    setSelectedPaystub(data[index]);
  }
  const handleClosePaystub = () => {
    setSelectedPaystub(null);
  };

  return (
    <View style={styles.container}>
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pay Statements</Text>
      </View>
      <View style={styles.tableContainer}>
      <DataTable style={styles.table}>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title style={styles.tableTitle}><Text style={styles.headerText}>Pay Date</Text></DataTable.Title>
        <DataTable.Title style={styles.tableTitle}><Text style={styles.headerText}>Gross</Text></DataTable.Title>
        <DataTable.Title style={styles.tableTitle}><Text style={styles.headerText}>Net</Text></DataTable.Title>
        <DataTable.Title style={styles.tableTitle}><Text style={styles.headerText}>Paystub</Text></DataTable.Title>
      </DataTable.Header>
      {data.map((row, index) => (
        <DataTable.Row key={index}>
          {row.map((cell, cellIndex) => (
            <DataTable.Cell key={cellIndex} style={styles.cell} onPress={
              cellIndex === 3 ? () => handlePaystubPress(index) : null
            }>{cell}</DataTable.Cell>
          ))}
        </DataTable.Row>
      ))}
    </DataTable>
    </View>
    <Modal
        visible={selectedPaystub !== null}
        animationType="slide"
        onRequestClose={handleClosePaystub}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Paystub for {selectedPaystub == null ? "null" : selectedPaystub[0]}</Text>
          {/* Display the paystub content here */}
        </View>
      </Modal>
    </ScrollView>
    <EmployeeNav navigation={navigation}/>
    </View>
    
  );
};

const styles = StyleSheet.create({
  modelContainer:{

  },
  modelTitle: {

  },
  container: {
    flex: 1,
    backgroundColor: '#f1f8ff',
    padding: 10,
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
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#888',
  },
  tableContainer:{
    width: "100%",
    height: "70%",
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


export default PayChecks;
